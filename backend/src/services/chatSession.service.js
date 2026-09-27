import { getResponse, normalizePhone } from "./intentExtractor.service.js";
import { submitLead } from "./leadsClient.service.js";
import { sendLeadNotificationEmail } from "./email.service.js";

/**
 * In-memory chat sessions for the website widget. Replaces the CLI tester:
 * instead of typing "q" to end, a session is saved as a lead when
 *   - the visitor is inactive for INACTIVITY_MS, or
 *   - the visitor closes the chat / leaves the page (endSession).
 *
 * Sessions live in this process only — fine for a single instance; move to
 * Redis if the API is ever scaled horizontally.
 */
const INACTIVITY_MS = 60 * 1000; // 1 minute of silence -> save lead
const SESSION_TTL_MS = 30 * 60 * 1000; // drop idle sessions after 30 min
const MAX_HISTORY = 30; // messages sent to the LLM (cost / context cap)
const MAX_SESSIONS = 5000;

// --- Per-session abuse guards -------------------------------------------
// The IP-based limiters in rateLimiter.js stop a single client from
// hammering the endpoint, but they don't catch a bot that spreads requests
// across many sessions/IPs, or one that paces itself just under the IP
// limit. These two guards apply per sessionId regardless of where the
// request came from:
const MIN_MESSAGE_INTERVAL_MS = 1200; // no two messages from one session closer than this
const MAX_MESSAGES_PER_SESSION = 40; // hard cap on LLM calls per conversation

const sessions = new Map();

const hasContact = (intent) =>
  Boolean(intent?.name || intent?.contactPhone || intent?.contactEmail);

// Later turns often return null for fields captured earlier — never lose them.
function mergeIntent(prev, next) {
  if (!prev) return next;
  const merged = { ...next };
  for (const [key, value] of Object.entries(prev)) {
    if (merged[key] == null && value != null) merged[key] = value;
  }
  return merged;
}

function getSession(id) {
  let session = sessions.get(id);
  if (!session) {
    if (sessions.size >= MAX_SESSIONS) {
      // evict the oldest session to bound memory
      sessions.delete(sessions.keys().next().value);
    }
    session = {
      history: [],
      intent: null,
      dirty: false, // new user turns not yet saved as a lead
      busy: false,
      timer: null,
      lastActive: Date.now(),
      lastMessageAt: 0,
      messageCount: 0,
    };
    sessions.set(id, session);
  }
  return session;
}

function scheduleInactivitySave(id, session) {
  clearTimeout(session.timer);
  session.timer = setTimeout(() => {
    endSession(id, "inactivity").catch(() => {});
  }, INACTIVITY_MS);
  session.timer.unref?.();
}

/**
 * Runs one visitor message through the LLM. Returns the reply text.
 */
async function handleMessage(id, message) {
  const session = getSession(id);
  if (session.busy) {
    const err = new Error("Previous message is still being processed.");
    err.status = 429;
    throw err;
  }

  const now = Date.now();

  if (
    session.lastMessageAt &&
    now - session.lastMessageAt < MIN_MESSAGE_INTERVAL_MS
  ) {
    const err = new Error(
      "You're sending messages too quickly. Please slow down.",
    );
    err.status = 429;
    throw err;
  }

  if (session.messageCount >= MAX_MESSAGES_PER_SESSION) {
    const err = new Error(
      "This conversation has reached its limit for now — someone from the team will follow up directly.",
    );
    err.status = 429;
    throw err;
  }

  clearTimeout(session.timer);
  session.busy = true;
  session.lastActive = now;
  session.lastMessageAt = now;
  session.messageCount += 1;

  const history = [...session.history, { role: "user", content: message }];

  try {
    const { reply, intent } = await getResponse(history.slice(-MAX_HISTORY));

    // The model is told to only extract a phone number that looks valid,
    // but it doesn't reliably enforce that (e.g. it has accepted 15-20
    // digit strings) — normalizePhone is the deterministic backstop. A
    // phone number that fails it is dropped rather than saved, and the
    // reply is swapped for a direct ask so the visitor knows to retry.
    const phoneWasOffered = Boolean(intent.contactPhone);
    const normalizedPhone = normalizePhone(intent.contactPhone);
    intent.contactPhone = normalizedPhone;

    session.intent = mergeIntent(session.intent, intent);
    session.dirty = true;

    const finalReply =
      phoneWasOffered && !normalizedPhone
        ? "Please provide a valid phone number."
        : reply;

    session.history = [...history, { role: "assistant", content: finalReply }];
    return finalReply;
  } finally {
    session.busy = false;
    scheduleInactivitySave(id, session);
  }
}

/**
 * Saves the session as a lead (if anything new was said and we have some way
 * to identify the visitor). Safe to call repeatedly — a no-op unless there is
 * unsaved conversation.
 */
async function endSession(id, reason = "closed") {
  const session = sessions.get(id);
  if (!session) return null;

  clearTimeout(session.timer);
  if (!session.dirty || !hasContact(session.intent)) return null;

  try {
    const lead = await submitLead(session.intent, "website");
    session.dirty = false;
    console.log(`[chat] lead saved (${reason}) for session ${id}`);

    // Notify the team even on success — acts as a live heads-up that a new
    // lead just landed, on top of it being saved to the leads system.
    sendLeadNotificationEmail({
      intent: session.intent,
      sessionId: id,
      reason,
      saved: true,
    }).catch((mailErr) =>
      console.error(
        `[chat] lead notification email failed: ${mailErr.message}`,
      ),
    );

    return lead;
  } catch (err) {
    console.error(`[chat] failed to save lead (${reason}): ${err.message}`);

    // Don't keep retrying (and re-notifying) on the same snapshot every time
    // another trigger fires for this session — one email per outcome.
    session.dirty = false;

    // Backup: the leads endpoint rejected it or couldn't be reached, so
    // email the team everything captured instead of losing the lead silently.
    sendLeadNotificationEmail({
      intent: session.intent,
      sessionId: id,
      reason,
      saved: false,
      error: err.message,
    }).catch((mailErr) =>
      console.error(
        `[chat] lead notification email also failed: ${mailErr.message}`,
      ),
    );

    return null;
  }
}

// Sweep sessions that have been idle for a long time.
setInterval(
  () => {
    const cutoff = Date.now() - SESSION_TTL_MS;
    for (const [id, s] of sessions) {
      if (s.lastActive < cutoff && !s.busy) {
        clearTimeout(s.timer);
        sessions.delete(id);
      }
    }
  },
  10 * 60 * 1000,
).unref();

export { handleMessage, endSession };
