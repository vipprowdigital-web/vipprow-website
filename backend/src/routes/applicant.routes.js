import express from "express";
import {
  submitApplication,
  getApplications,
  deleteApplication,
} from "../controllers/applicant.controller.js";
import { resumeUpload, handleResumeUploadErrors } from "../config/multer.js";
import { ensureAuth } from "../middleware/authMiddleware.js";
import {
  applicantBurstLimiter,
  applicantUploadLimiter,
} from "../middleware/rateLimiter.js";

const router = express.Router();

const applicantUpload = resumeUpload.fields([{ name: "resume", maxCount: 1 }]);

// Public: rate limiters run BEFORE multer so throttled requests never write
// a file to disk. handleResumeUploadErrors turns multer/filter errors into
// clean 400s instead of leaking to the global error handler.
router.post(
  "/",
  applicantBurstLimiter,
  applicantUploadLimiter,
  applicantUpload,
  handleResumeUploadErrors,
  submitApplication,
);

router.get("/", ensureAuth, getApplications);
router.delete("/:id", ensureAuth, deleteApplication);

export default router;
