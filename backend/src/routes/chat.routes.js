import { Router } from "express";
import { sendMessage, endChat } from "../controllers/chat.controller.js";
import {
  chatMessageBurstLimiter,
  chatMessageSustainedLimiter,
  chatEndLimiter,
} from "../middleware/rateLimiter.js";

const router = Router();

router.post(
  "/message",
  chatMessageBurstLimiter,
  chatMessageSustainedLimiter,
  sendMessage,
);
router.post("/end", chatEndLimiter, endChat);

export default router;
