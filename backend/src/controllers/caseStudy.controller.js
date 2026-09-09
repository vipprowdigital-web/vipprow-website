import mongoose from "mongoose";
import slugify from "slugify";
import CaseStudy from "../models/caseStudy/caseStudy.model.js";
import CaseStudyCategory from "../models/caseStudy/caseStudyCategory.model.js";
import {
  uploadToCloudinary,
  destroyFromCloudinary,
} from "../utils/cloudinaryService.js";

const LOGO_FOLDER = "case-study/logos";
const HERO_FOLDER = "case-study/hero";

// Multipart form fields arrive as strings — arrays/objects need parsing.
const parseJSON = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const publicIdFromUrl = (url) => {
  try {
    const parts = url.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) return null;
    // skip an optional version segment ( v12345 )
    let rest = parts.slice(uploadIndex + 1);
    if (/^v\d+$/.test(rest[0])) rest = rest.slice(1);
    return rest.join("/").split(".")[0] || null;
  } catch {
    return null;
  }
};

const formatErrors = (err) => {
  const errors = {};
  if (err?.errors) {
    for (const [key, value] of Object.entries(err.errors)) {
      errors[key] = value.message;
    }
  }
  return errors;
};

/* ============================
   🟢 PUBLIC CONTROLLERS
============================ */

export const getAllActiveCaseStudies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;

    const sortBy = req.query.sortBy;
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const search = req.query.search?.trim() || "";
    const categories = req.query.categories?.split(",").filter(Boolean) || [];

    const matchQuery = { isActive: true };
    if (categories.length > 0) {
      matchQuery.category = {
        $in: categories
          .filter((id) => mongoose.Types.ObjectId.isValid(id))
          .map((id) => new mongoose.Types.ObjectId(id)),
      };
    }

    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { clientName: { $regex: search, $options: "i" } },
            { shortDescription: { $regex: search, $options: "i" } },
            { "category.name": { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const sortStage = sortBy
      ? { [sortBy]: sortOrder }
      : { order: 1, createdAt: -1 };

    const pipeline = [
      { $match: matchQuery },
      {
        $lookup: {
          from: "casestudycategories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
      { $match: searchQuery },
      { $sort: sortStage },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ];

    const countPipeline = [
      { $match: matchQuery },
      {
        $lookup: {
          from: "casestudycategories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
      { $match: searchQuery },
      { $count: "total" },
    ];

    const [items, countResult] = await Promise.all([
      CaseStudy.aggregate(pipeline),
      CaseStudy.aggregate(countPipeline),
    ]);

    const total = countResult[0]?.total || 0;

    res.status(200).json({
      success: true,
      data: items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("❌ Error fetching case studies:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getCaseStudyById = async (req, res) => {
  try {
    const { id } = req.params;

    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { slug: id };

    const caseStudy = await CaseStudy.findOne(query)
      .populate("category", "name slug heading description order")
      .lean();

    if (!caseStudy) {
      return res
        .status(404)
        .json({ success: false, message: "Case study not found." });
    }

    res.status(200).json({ success: true, data: caseStudy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/* ============================
   🔒 ADMIN CONTROLLERS
============================ */

export const getAllCaseStudies = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "createdAt",
      sortOrder = "desc",
      filter = "all",
    } = req.query;

    const filterQuery = {};
    if (filter === "active") filterQuery.isActive = true;
    if (filter === "inactive") filterQuery.isActive = false;
    if (filter === "featured") filterQuery.isFeature = true;
    if (filter === "nonfeatured") filterQuery.isFeature = false;

    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { clientName: { $regex: search, $options: "i" } },
            { "seo.metaKeywords": { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const finalQuery = { ...filterQuery, ...searchQuery };

    const total = await CaseStudy.countDocuments(finalQuery);

    const items = await CaseStudy.find(finalQuery)
      .populate("category", "name slug")
      .populate("createdBy updatedBy", "name email")
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    res.json({
      success: true,
      data: items,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createCaseStudy = async (req, res) => {
  const uploaded = { logo: null, hero: null };

  try {
    const { title, clientName, category } = req.body;

    if (!title?.trim() || !clientName?.trim() || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, client name and category are required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category ID." });
    }
    if (!(await CaseStudyCategory.findById(category))) {
      return res
        .status(404)
        .json({ success: false, message: "Selected category not found." });
    }

    const slug = slugify(title, { lower: true, strict: true });
    if (await CaseStudy.findOne({ slug })) {
      return res
        .status(400)
        .json({ success: false, message: "A case study with this title already exists." });
    }

    let clientLogo = null;
    let heroImage = null;

    if (req.files?.clientLogo?.[0]?.path) {
      const up = await uploadToCloudinary(
        req.files.clientLogo[0].path,
        LOGO_FOLDER
      );
      clientLogo = up.secure_url;
      uploaded.logo = up.public_id;
    }
    if (req.files?.heroImage?.[0]?.path) {
      const up = await uploadToCloudinary(
        req.files.heroImage[0].path,
        HERO_FOLDER
      );
      heroImage = up.secure_url;
      uploaded.hero = up.public_id;
    }

    const caseStudy = await CaseStudy.create({
      title,
      slug,
      clientName,
      category,
      industry: req.body.industry,
      shortDescription: req.body.shortDescription,
      clientLogo,
      heroImage,
      background: req.body.background,
      challenge: req.body.challenge,
      solution: req.body.solution,
      approach: parseJSON(req.body.approach, []),
      results: req.body.results,
      metrics: parseJSON(req.body.metrics, []),
      seo: parseJSON(req.body.seo, undefined),
      order: req.body.order,
      isActive: req.body.isActive,
      isFeature: req.body.isFeature,
      createdBy: req.user?._id,
    });

    res.status(201).json({ success: true, data: caseStudy });
  } catch (err) {
    console.error(err);

    if (uploaded.logo) destroyFromCloudinary(uploaded.logo);
    if (uploaded.hero) destroyFromCloudinary(uploaded.hero);

    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ success: false, errors: formatErrors(err) });
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateCaseStudy = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);
    if (!caseStudy) {
      return res
        .status(404)
        .json({ success: false, message: "Case study not found." });
    }

    const { title, clientName, category } = req.body;

    if (category !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid category ID." });
      }
      if (!(await CaseStudyCategory.findById(category))) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found." });
      }
      caseStudy.category = category;
    }

    // Replace logo
    if (req.files?.clientLogo?.[0]?.path) {
      if (caseStudy.clientLogo) {
        const pid = publicIdFromUrl(caseStudy.clientLogo);
        if (pid) await destroyFromCloudinary(pid);
      }
      const up = await uploadToCloudinary(
        req.files.clientLogo[0].path,
        LOGO_FOLDER
      );
      caseStudy.clientLogo = up.secure_url;
    } else if (req.body.removeClientLogo === "true" && caseStudy.clientLogo) {
      const pid = publicIdFromUrl(caseStudy.clientLogo);
      if (pid) await destroyFromCloudinary(pid);
      caseStudy.clientLogo = null;
    }

    // Replace hero image
    if (req.files?.heroImage?.[0]?.path) {
      if (caseStudy.heroImage) {
        const pid = publicIdFromUrl(caseStudy.heroImage);
        if (pid) await destroyFromCloudinary(pid);
      }
      const up = await uploadToCloudinary(
        req.files.heroImage[0].path,
        HERO_FOLDER
      );
      caseStudy.heroImage = up.secure_url;
    } else if (req.body.removeHeroImage === "true" && caseStudy.heroImage) {
      const pid = publicIdFromUrl(caseStudy.heroImage);
      if (pid) await destroyFromCloudinary(pid);
      caseStudy.heroImage = null;
    }

    if (title) {
      caseStudy.title = title;
      caseStudy.slug = slugify(title, { lower: true, strict: true });
    }
    if (clientName !== undefined) caseStudy.clientName = clientName;
    if (req.body.industry !== undefined) caseStudy.industry = req.body.industry;
    if (req.body.shortDescription !== undefined)
      caseStudy.shortDescription = req.body.shortDescription;
    if (req.body.background !== undefined)
      caseStudy.background = req.body.background;
    if (req.body.challenge !== undefined)
      caseStudy.challenge = req.body.challenge;
    if (req.body.solution !== undefined) caseStudy.solution = req.body.solution;
    if (req.body.results !== undefined) caseStudy.results = req.body.results;
    if (req.body.approach !== undefined)
      caseStudy.approach = parseJSON(req.body.approach, caseStudy.approach);
    if (req.body.metrics !== undefined)
      caseStudy.metrics = parseJSON(req.body.metrics, caseStudy.metrics);
    if (req.body.seo !== undefined)
      caseStudy.seo = parseJSON(req.body.seo, caseStudy.seo);
    if (req.body.order !== undefined) caseStudy.order = req.body.order;
    if (req.body.isActive !== undefined) caseStudy.isActive = req.body.isActive;
    if (req.body.isFeature !== undefined)
      caseStudy.isFeature = req.body.isFeature;

    caseStudy.updatedBy = req.user?._id;
    await caseStudy.save();

    res.json({ success: true, data: caseStudy });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ success: false, errors: formatErrors(err) });
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const partiallyUpdateCaseStudy = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);
    if (!caseStudy) {
      return res
        .status(404)
        .json({ success: false, message: "Case study not found." });
    }

    const allowed = [
      "title",
      "clientName",
      "category",
      "industry",
      "shortDescription",
      "background",
      "challenge",
      "solution",
      "approach",
      "results",
      "metrics",
      "seo",
      "order",
      "isActive",
      "isFeature",
    ];
    const jsonFields = new Set(["approach", "metrics", "seo"]);

    if (req.body.category !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid category ID." });
      }
      if (!(await CaseStudyCategory.findById(req.body.category))) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found." });
      }
    }

    for (const [key, value] of Object.entries(req.body)) {
      if (!allowed.includes(key) || value === undefined) continue;
      caseStudy[key] = jsonFields.has(key)
        ? parseJSON(value, caseStudy[key])
        : value;
    }

    if (req.body.title) {
      caseStudy.slug = slugify(req.body.title, { lower: true, strict: true });
    }

    caseStudy.updatedBy = req.user?._id;
    await caseStudy.save();

    res.json({ success: true, data: caseStudy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const destroyCaseStudyById = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);
    if (!caseStudy) {
      return res
        .status(404)
        .json({ success: false, message: "Case study not found." });
    }

    // Remove uploaded images
    for (const url of [caseStudy.clientLogo, caseStudy.heroImage]) {
      if (!url) continue;
      const pid = publicIdFromUrl(url);
      if (pid) {
        try {
          await destroyFromCloudinary(pid);
        } catch (e) {
          console.warn("⚠️ Failed to delete image:", e.message);
        }
      }
    }

    // Remove images embedded in the rich-text fields
    const richText = [
      caseStudy.background,
      caseStudy.challenge,
      caseStudy.solution,
      caseStudy.results,
      ...(caseStudy.approach || []).map((s) => s.description),
    ]
      .filter(Boolean)
      .join(" ");
    const embedded =
      richText.match(/https:\/\/res\.cloudinary\.com\/[^"'\s)]+/g) || [];
    for (const url of embedded) {
      const pid = publicIdFromUrl(url);
      if (pid) {
        try {
          await destroyFromCloudinary(pid);
        } catch (e) {
          console.warn("⚠️ Failed to delete embedded image:", e.message);
        }
      }
    }

    await caseStudy.deleteOne();
    res.json({ success: true, message: "Case study deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
