import axios from "axios";
import config from "../config/chatbot.js";

/**
 * Maps our extracted intent shape onto the public leads endpoint's body.
 * branchId is deliberately omitted — the endpoint resolves a branch itself
 * when it's absent. Fields we never collected are sent as null (matches
 * the endpoint's own `?.trim() ?? null` handling for optional fields).
 */
function toLeadPayload(intent, source = "website") {
  return {
    name: intent.name || null,
    mobile: intent.contactPhone || null,
    email: intent.contactEmail || null,
    city: null,
    state: null,
    courseInterested: null,
    serviceInterested: intent.serviceInterested || null,
    respondentType: null,
    remarks: intent.summary || null,
    source,
  };
}

/**
 * Submits the conversation's final intent to the leads endpoint. Returns
 * the created/updated lead on success and throws if it failed (e.g. required
 * fields like name/mobile were never collected) — callers should treat that
 * as non-fatal.
 */
async function submitLead(intent, source = "website") {
  const payload = toLeadPayload(intent, source);

  const res = await axios.post(config.leads.url, payload, {
    headers: { "Content-Type": "application/json" },
    timeout: 15000,
    validateStatus: () => true,
  });

  console.log("lead res: ", res);

  if (res.status >= 200 && res.status < 300 && res.data?.success) {
    return res.data.data;
  }

  throw new Error(
    res.data?.message || `Leads endpoint responded with status ${res.status}`,
  );
}

export { submitLead, toLeadPayload };
