import Applicant from "../models/applicant.model.js";
import {
  uploadToCloudinary,
  destroyFromCloudinary,
} from "../utils/cloudinaryService.js";

// @desc    Submit application (Create)
// @route   POST /api/applicants
export const submitApplication = async (req, res) => {
  try {
    const { name, jobTitle } = req.body;

    if (!name?.trim())
      return res.status(400).json({ message: "Name is required." });
    if (!jobTitle?.trim())
      return res.status(400).json({ message: "Job title is required." });

    let resumeUrl = null;
    let cloudinaryId = null;

    if (req.files?.resume?.[0]?.path) {
      const upload = await uploadToCloudinary(
        req.files.resume[0].path,
        "applicants/resumes",
      );
      resumeUrl = upload.secure_url;
      cloudinaryId = upload.public_id;
    } else {
      return res.status(400).json({ message: "Resume file is required." });
    }

    const applicant = await Applicant.create({
      name: name.trim(),
      jobTitle: jobTitle.trim(),
      resume: {
        url: resumeUrl,
        cloudinaryId: cloudinaryId,
      },
    });

    // console.log("Applicant: ", applicant);

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
      error: error.message,
    });
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
