import slugify from "slugify";
import CaseStudyCategory from "../models/caseStudy/caseStudyCategory.model.js";
import CaseStudy from "../models/caseStudy/caseStudy.model.js";

/* ============================
   🟢 PUBLIC
============================ */

// Active sectors, ordered — used to build the grouped sections on the site
export const getPublicCaseStudyCategories = async (req, res) => {
  try {
    const categories = await CaseStudyCategory.find({ isActive: true })
      .select("name slug heading description order")
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return res.status(200).json({
      message: "Case study categories fetched successfully.",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Error", error: error.message });
  }
};

/* ============================
   🔒 ADMIN
============================ */

export const getCaseStudyCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const total = await CaseStudyCategory.countDocuments();

    const categories = await CaseStudyCategory.find()
      .populate("createdBy updatedBy", "name email")
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return res.status(200).json({
      message: "Case study categories fetched successfully.",
      data: categories,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Error", error: error.message });
  }
};

export const getCaseStudyCategoryById = async (req, res) => {
  try {
    const category = await CaseStudyCategory.findById(req.params.id)
      .populate("createdBy updatedBy", "name email")
      .lean();

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    return res.status(200).json({
      message: "Category fetched successfully.",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Error", error: error.message });
  }
};

export const createCaseStudyCategory = async (req, res) => {
  try {
    const { name, heading, description, order, isActive } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ message: "Category name is required." });
    }

    const slug = slugify(name, { lower: true, strict: true });
    if (await CaseStudyCategory.findOne({ slug })) {
      return res
        .status(400)
        .json({ message: "Category with this name already exists." });
    }

    const category = await CaseStudyCategory.create({
      name,
      slug,
      heading,
      description,
      order,
      isActive,
      createdBy: req.user?._id,
    });

    return res.status(201).json({
      message: "Category created successfully.",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Error", error: error.message });
  }
};

export const updateCaseStudyCategory = async (req, res) => {
  try {
    const category = await CaseStudyCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    const { name, heading, description, order, isActive } = req.body;

    if (name && name !== category.name) {
      const slug = slugify(name, { lower: true, strict: true });
      const clash = await CaseStudyCategory.findOne({
        slug,
        _id: { $ne: category._id },
      });
      if (clash) {
        return res
          .status(400)
          .json({ message: "Category with this name already exists." });
      }
      category.name = name;
      category.slug = slug;
    }

    if (heading !== undefined) category.heading = heading;
    if (description !== undefined) category.description = description;
    if (order !== undefined) category.order = order;
    if (isActive !== undefined) category.isActive = isActive;
    category.updatedBy = req.user?._id;

    await category.save();

    return res.status(200).json({
      message: "Category updated successfully.",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Error", error: error.message });
  }
};

export const partiallyUpdateCaseStudyCategory = async (req, res) => {
  try {
    const category = await CaseStudyCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    const allowed = ["name", "heading", "description", "order", "isActive"];
    for (const [key, value] of Object.entries(req.body)) {
      if (allowed.includes(key) && value !== undefined) category[key] = value;
    }

    if (req.body.name) {
      category.slug = slugify(req.body.name, { lower: true, strict: true });
    }

    category.updatedBy = req.user?._id;
    await category.save();

    return res.status(200).json({
      message: "Category updated successfully.",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Error", error: error.message });
  }
};

export const destroyCaseStudyCategoryById = async (req, res) => {
  try {
    const category = await CaseStudyCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    const inUse = await CaseStudy.countDocuments({ category: category._id });
    if (inUse > 0) {
      return res.status(409).json({
        message: `Cannot delete: ${inUse} case study(ies) still use this category.`,
      });
    }

    await category.deleteOne();
    return res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Error", error: error.message });
  }
};
