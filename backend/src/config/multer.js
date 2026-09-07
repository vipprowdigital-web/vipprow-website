import multer from "multer";
import path from "path";
import fs from "node:fs";

// Temporary upload directory
const uploadDir = "uploads/temp";

// Ensure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage (temporary, Cloudinary will store permanently)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

// File Type Validation (images + videos)
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowed = /\.(jpg|jpeg|png|webp|pdf|gif|mp4|mov|avi)$/; // ✅ RegExp
  if (allowed.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only image/vidoe file are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max 10 MB per file
});

export default upload;

// ===============================================
// Resume / CV uploads (applicant form)
// ===============================================
// Resumes are documents only — never images or video — and don't need the
// generic 10 MB cap. This is a separate multer instance so tightening it
// can't affect any of the routes that use the shared `upload` above.
const RESUME_EXT = /\.(pdf|doc|docx)$/;
const RESUME_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Some browsers send a generic type for .doc/.docx — the controller does
  // an authoritative magic-byte check after the file is written, so this
  // fallback stays safe.
  "application/octet-stream",
]);

const resumeFileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (RESUME_EXT.test(ext) && RESUME_MIME.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF or Word documents are allowed for resumes."), false);
  }
};

export const resumeUpload = multer({
  storage,
  fileFilter: resumeFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Max 5 MB
    files: 1, // one resume only
    fields: 20, // guard against field-flooding
  },
});

/**
 * Express error-handling middleware for the resume upload.
 * Converts multer/fileFilter errors into clean 400 responses and removes
 * any temp file multer may have written before it errored.
 */
export const handleResumeUploadErrors = (err, req, res, next) => {
  if (!err) return next();

  const tempPath = req.files?.resume?.[0]?.path;
  if (tempPath && fs.existsSync(tempPath)) {
    fs.unlink(tempPath, () => {});
  }

  if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "Resume file is too large. Maximum size is 5MB."
        : err.code === "LIMIT_FILE_COUNT"
          ? "Only one resume file can be uploaded."
          : "Resume upload failed.";
    return res.status(400).json({ success: false, message });
  }

  // fileFilter rejection (plain Error)
  return res.status(400).json({
    success: false,
    message: err.message || "Invalid resume file.",
  });
};
