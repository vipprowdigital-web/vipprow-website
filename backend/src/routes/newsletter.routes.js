// backend/src/routes/newsletter.routes.js
import express from "express";
import {
  subscribeToNewsletter,
  unsubscribeNewsletter,
} from "../controllers/newsletter.controller.js";

const router = express.Router();

router.post("/subscribe", subscribeToNewsletter);
router.patch("/unsubscribe", unsubscribeNewsletter);

export default router;
