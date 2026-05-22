import express from "express";
import {
  submitApplication,
  getApplications,
  deleteApplication,
} from "../controllers/applicant.controller.js";
import upload from "../config/multer.js";
import { ensureAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

const applicantUpload = upload.fields([{ name: "resume", maxCount: 1 }]);

router.post("/", applicantUpload, submitApplication);
router.get("/", ensureAuth, getApplications);
router.delete("/:id", ensureAuth, deleteApplication);

export default router;
