import { Router } from "express";
import { ensureAuth } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";
import {
  getAllActiveCaseStudies,
  getCaseStudyById,
  getAllCaseStudies,
  createCaseStudy,
  updateCaseStudy,
  partiallyUpdateCaseStudy,
  destroyCaseStudyById,
} from "../controllers/caseStudy.controller.js";

const router = Router();

const imageFields = upload.fields([
  { name: "clientLogo", maxCount: 1 },
  { name: "heroImage", maxCount: 1 },
]);

/* ================================
   🟢 PUBLIC ROUTES
================================ */
router.get("/public", getAllActiveCaseStudies);
router.get("/public/:id", getCaseStudyById);

/* ================================
   🔒 ADMIN ROUTES
================================ */
router.get("/admin/all", ensureAuth, getAllCaseStudies);
router.get("/:id", ensureAuth, getCaseStudyById);
router.post("/admin", ensureAuth, imageFields, createCaseStudy);
router.put("/admin/:id", ensureAuth, imageFields, updateCaseStudy);
router.patch("/admin/:id", ensureAuth, partiallyUpdateCaseStudy);
router.delete("/admin/:id", ensureAuth, destroyCaseStudyById);

export default router;
