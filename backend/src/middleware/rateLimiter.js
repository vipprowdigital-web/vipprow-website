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
