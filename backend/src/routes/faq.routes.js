import { Router } from "express";
import { ensureAuth } from "../middleware/authMiddleware.js";
import {
  getFaqPages,
  getPublicFaqs,
  getAllFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  partiallyUpdateFaq,
  destroyFaqById,
} from "../controllers/faq.controller.js";

const router = Router();

/* 🟢 PUBLIC */
router.get("/pages", getFaqPages);
router.get("/public", getPublicFaqs);

/* 🔒 ADMIN */
router.get("/", ensureAuth, getAllFaqs);
router.get("/:id", ensureAuth, getFaqById);
router.post("/", ensureAuth, createFaq);
router.put("/:id", ensureAuth, updateFaq);
router.patch("/:id", ensureAuth, partiallyUpdateFaq);
router.delete("/:id", ensureAuth, destroyFaqById);

export default router;
