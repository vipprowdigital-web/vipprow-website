import rateLimit from "express-rate-limit";

// ===============================================
// Contact form rate limiters (keyed by client IP)
// ===============================================

const tooMany = (res, message) =>
  res.status(429).json({
    status: "error",
    message,
  });

/**
 * Burst limiter — blocks the same IP from firing multiple
 * submissions within a few seconds (spam / double-click / bots).
 */
export const contactBurstLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  limit: 2, // max 2 submissions per IP per 10s
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    tooMany(
      res,
      "You're sending messages too quickly. Please wait a few seconds and try again.",
    ),
});

/**
 * Sustained limiter — caps how many submissions a single IP
 * can make over a longer window.
 */
export const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // max 5 submissions per IP per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    tooMany(
      res,
      "Too many contact requests from this IP. Please try again later.",
    ),
});

// ===============================================
// Newsletter rate limiters (keyed by client IP)
// ===============================================
// The subscribe endpoint triggers an outbound transactional email per new
// subscription, so it needs a tight per-IP throttle — otherwise it can be
// used as a free tool to spam an inbox or burn email-provider quota.

/**
 * Burst limiter — blocks the same IP from firing multiple
 * subscribe/unsubscribe requests within a few seconds.
 */
export const newsletterBurstLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  limit: 2, // max 2 requests per IP per 10s
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    tooMany(
      res,
      "You're sending requests too quickly. Please wait a few seconds and try again.",
    ),
});

/**
 * Sustained limiter — caps how many subscribe/unsubscribe requests a
 * single IP can make over a longer window.
 */
export const newsletterFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // max 5 requests per IP per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    tooMany(
      res,
      "Too many newsletter requests from this IP. Please try again later.",
    ),
});

// ===============================================
// Applicant / careers upload rate limiters (keyed by client IP)
// ===============================================
// This endpoint accepts a file upload written to disk, so it must be
// throttled BEFORE multer runs — otherwise a bot can fill the disk with
// junk uploads. Job applications are rare, so the limits are tight.

/**
 * Burst limiter — blocks rapid-fire uploads from the same IP.
 */
export const applicantBurstLimiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  limit: 2, // max 2 uploads per IP per 30s
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    tooMany(
      res,
      "You're submitting too quickly. Please wait a moment and try again.",
    ),
});

/**
 * Sustained limiter — caps applications from a single IP over an hour.
 */
export const applicantUploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 6, // max 6 applications per IP per hour
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    tooMany(
      res,
      "Too many application submissions from this IP. Please try again later.",
    ),
});

// ===============================================
// Website AI chat rate limiters (keyed by client IP)
// ===============================================
// Every /chat/message call costs an LLM request, so it's throttled in
// layers, same pattern as the contact form:
//   - a burst limiter (blocks a tight scripted loop within seconds)
//   - a sustained limiter (caps total cost per IP even if a bot paces
//     itself just under the burst limit)
// A per-session cooldown + hard message cap in chatSession.service.js adds
// a third layer that isn't fooled by a bot spreading requests across many
// sessions or IPs — see MIN_MESSAGE_INTERVAL_MS / MAX_MESSAGES_PER_SESSION
// there. The app-wide limiter in app.js (200 req / 15 min per IP) also
// applies on top of all of these.

export const chatMessageBurstLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  limit: 4, // max 4 messages per IP per 10s
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    tooMany(res, "You're sending messages too quickly. Please slow down."),
});

export const chatMessageSustainedLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 30, // max 30 messages per IP per 5 min
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    tooMany(res, "Too many chat messages from this IP. Please try again later."),
});

export const chatEndLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => tooMany(res, "Too many requests. Please try again later."),
});
