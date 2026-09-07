// backend/src/routes/newsletter.routes.js
import express from "express";
import {
  subscribeToNewsletter,
  unsubscribeNewsletter,
} from "../controllers/newsletter.controller.js";
import {
  newsletterBurstLimiter,
  newsletterFormLimiter,
} from "../middleware/rateLimiter.js";

const router = express.Router();

// Rate limited: burst (same IP within seconds) + sustained (per 15 min)
router.post(
  "/subscribe",
  newsletterBurstLimiter,
  newsletterFormLimiter,
  subscribeToNewsletter,
);
router.patch(
  "/unsubscribe",
  newsletterBurstLimiter,
  newsletterFormLimiter,
  unsubscribeNewsletter,
);

export default router;
