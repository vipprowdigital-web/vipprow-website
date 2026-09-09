import { Router } from "express";
import { ensureAuth } from "../middleware/authMiddleware.js";
import {
  getPublicCaseStudyCategories,
  getCaseStudyCategories,
  getCaseStudyCategoryById,
  createCaseStudyCategory,
  updateCaseStudyCategory,
  partiallyUpdateCaseStudyCategory,
  destroyCaseStudyCategoryById,
} from "../controllers/caseStudyCategory.controller.js";

const router = Router();

/* 🟢 PUBLIC */
router.get("/public", getPublicCaseStudyCategories);

/* 🔒 ADMIN */
router.get("/", ensureAuth, getCaseStudyCategories);
router.get("/:id", ensureAuth, getCaseStudyCategoryById);
router.post("/", ensureAuth, createCaseStudyCategory);
router.put("/:id", ensureAuth, updateCaseStudyCategory);
router.patch("/:id", ensureAuth, partiallyUpdateCaseStudyCategory);
router.delete("/:id", ensureAuth, destroyCaseStudyCategoryById);

export default router;
