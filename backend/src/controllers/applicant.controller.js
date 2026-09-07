import fs from "node:fs";
import Applicant from "../models/applicant.model.js";
import {
  uploadToCloudinary,
  destroyFromCloudinary,
} from "../utils/cloudinaryService.js";

const NAME_MAX = 100;
const JOB_TITLE_MAX = 150;

/**
 * Authoritative file-type check: read the first bytes of the uploaded file
 * and confirm they match an allowed document signature. This catches files
 * that were simply renamed to .pdf/.docx (the extension and client MIME
 * type can't be trusted).
 */
const hasAllowedResumeSignature = (filePath) => {
  let fd;
  try {
    fd = fs.openSync(filePath, "r");
    const buf = Buffer.alloc(8);
    const bytesRead = fs.readSync(fd, buf, 0, 8, 0);
    if (bytesRead < 4) return false;

    // %PDF-
    if (buf.slice(0, 5).toString("latin1") === "%PDF-") return true;
    // ZIP-based (DOCX and other OOXML): "PK\x03\x04" / "PK\x05\x06" / "PK\x07\x08"
    if (buf[0] === 0x50 && buf[1] === 0x4b) return true;
    // Legacy OLE2 (.doc): D0 CF 11 E0 A1 B1 1A E1
    if (
      buf[0] === 0xd0 &&
      buf[1] === 0xcf &&
      buf[2] === 0x11 &&
      buf[3] === 0xe0
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  } finally {
    if (fd !== undefined) {
      try {
        fs.closeSync(fd);
      } catch {
        /* ignore */
      }
    }
  }
};

const safeUnlink = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlink(filePath, () => {});
  }
};

// @desc    Submit application (Create)
// @route   POST /api/applicants
export const submitApplication = async (req, res) => {
  const tempPath = req.files?.resume?.[0]?.path || null;
  let uploadAttempted = false;

  try {
    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
    const jobTitle =
      typeof req.body?.jobTitle === "string" ? req.body.jobTitle.trim() : "";

    if (!name) return res.status(400).json({ message: "Name is required." });
    if (name.length > NAME_MAX)
      return res
        .status(400)
        .json({ message: `Name must be at most ${NAME_MAX} characters.` });

    if (!jobTitle)
      return res.status(400).json({ message: "Job title is required." });
    if (jobTitle.length > JOB_TITLE_MAX)
      return res.status(400).json({
        message: `Job title must be at most ${JOB_TITLE_MAX} characters.`,
      });

    if (!tempPath) {
      return res.status(400).json({ message: "Resume file is required." });
    }

    if (!hasAllowedResumeSignature(tempPath)) {
      return res.status(400).json({
        message: "Resume must be a valid PDF or Word document.",
      });
    }

    uploadAttempted = true;
    const upload = await uploadToCloudinary(tempPath, "applicants/resumes");
    const resumeUrl = upload.secure_url;
    const cloudinaryId = upload.public_id;

    const applicant = await Applicant.create({
      name,
      jobTitle,
      resume: {
        url: resumeUrl,
        cloudinaryId: cloudinaryId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      data: applicant,
    });
  } catch (error) {
    console.error("Error creating applicant:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  } finally {
    // Safety net for the paths that never reach Cloudinary (early 400s,
    // validation throws). Once uploadToCloudinary is called it owns the
    // temp-file cleanup itself, so skip it here to avoid a double unlink.
    if (!uploadAttempted) safeUnlink(tempPath);
  }
};

// @desc    Get all applications & log them to console
// @route   GET /api/applicants
export const getApplications = async (req, res) => {
  try {
    // 1. Extract and parse incoming query parameters matching frontend state hooks
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search?.trim() || "";
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const skip = (page - 1) * limit;

    // 2. Construct search criteria to match against applicant Name or jobTitle
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { jobTitle: { $regex: search, $options: "i" } },
      ];
    }

    // 3. Compute structural pagination bounds concurrently
    const total = await Applicant.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    // 4. Query chunked records out of the database collection
    const applicants = await Applicant.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    // 5. Explicitly log the processed data to the terminal console as requested
    // console.log("\n====== FETCHED PAGINATED APPLICANTS DATA ======");
    // console.log(
    //   `Current Window -> Page: ${page} | Limit: ${limit} | Search Query: "${search || "None"}"`,
    // );
    // console.log(`Totals -> Records: ${total} | Computed Pages: ${totalPages}`);
    // console.log(JSON.stringify(applicants, null, 2));
    // console.log("================================================\n");

    // 6. Return standard structured response matching frontend shape expectations
    return res.status(200).json({
      success: true,
      message: "Applicants fetched successfully.",
      count: applicants.length,
      data: applicants,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching applicants:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    // 1. Extract the unique ID parameter from the request URL path
    const { id } = req.params;

    // 2. Find the candidate entry to capture metadata details before extraction/removal
    const applicant = await Applicant.findById(id);

    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: "Applicant record not found or already deleted.",
      });
    }

    // console.log(
    //   "Applicant's resume: ",
    //   applicant,
    //   " resume: ",
    //   applicant.resume,
    // );

    if (applicant.resume) {
      try {
        const oldPublicId = applicant.resume?.cloudinaryId
          .split("/")
          .pop()
          .split(".")[0];

        await destroyFromCloudinary(`applicants/resumes/${oldPublicId}`, {
          resource_type: "raw",
        });
      } catch (err) {
        console.warn("Cloudinary resume cleanup failed:", err.message);
      }
    }

    // 3. Purge the target record completely from your collection
    await Applicant.findByIdAndDelete(id);

    // 4. Cleanly log operation parameters to your terminal console as requested
    // console.log("\n====== APPLICANT RECORD PURGED ======");
    // console.log(`Target Document ID : ${id}`);
    // console.log(`Candidate Name     : ${applicant.name}`);
    // console.log(`Target Job Role    : ${applicant.jobTitle}`);
    // console.log(`Status             : Document safely dropped from database.`);
    // console.log("=====================================\n");

    // 5. Return success structure matching the frontend toast promise expectations
    return res.status(200).json({
      success: true,
      message: `Application for ${applicant.name} was successfully removed.`,
    });
  } catch (error) {
    console.error("Error executing applicant deletion:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
