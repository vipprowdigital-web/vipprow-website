/**
 * Reads the consent the website sends with a form ({ consent: true,
 * consentText: "..." }) and turns it into a record for consent.schema.js.
 * Returns null when consent wasn't given — callers reject the request.
 * Accepts "true" as well, because the careers form is sent as multipart
 * form data, where every value is a string.
 */
export const CONSENT_REQUIRED_MESSAGE =
  "Please tick the consent box to continue.";

export function readConsent(req) {
  const value = req.body?.consent;
  if (value !== true && value !== "true") return null;

  const text =
    typeof req.body?.consentText === "string"
      ? req.body.consentText.trim().slice(0, 600) || null
      : null;

  return {
    given: true,
    text,
    givenAt: new Date(),
    ipAddress: req.ip ?? null,
    userAgent: req.headers?.["user-agent"]?.slice(0, 300) ?? null,
    withdrawnAt: null,
  };
}
