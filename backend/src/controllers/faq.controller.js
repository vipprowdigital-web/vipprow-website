import mongoose from "mongoose";
import Faq from "../models/faq.model.js";
import { FAQ_PAGES, FAQ_PAGE_VALUES } from "../config/faqPages.js";

const validationMessage = (err) =>
  Object.values(err.errors || {})[0]?.message || "Invalid data.";

/* ============================
   🟢 PUBLIC
============================ */

// Pages that can have FAQs (used by the console's Page selector)
export const getFaqPages = (req, res) => {
  res.status(200).json({ success: true, data: FAQ_PAGES });
};

// Active FAQs of one page, in display order
export const getPublicFaqs = async (req, res) => {
  try {
    const page = String(req.query.page || "").trim();
    if (!FAQ_PAGE_VALUES.includes(page)) {
      return res.status(200).json({ success: true, data: [] });
    }

    const faqs = await Faq.find({ page, isActive: true })
      .select("page question answer order")
      .sort({ order: 1, createdAt: 1 })
      .lean();

    res.status(200).json({ success: true, data: faqs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/* ============================
   🔒 ADMIN
============================ */

export const getAllFaqs = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const pageFilter = String(req.query.pageKey || "").trim();
    const search = String(req.query.search || "").trim();

    const query = {};
    if (pageFilter && pageFilter !== "all") query.page = pageFilter;
    if (search) {
      query.$or = [
        { question: { $regex: search, $options: "i" } },
        { answer: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Faq.countDocuments(query);
    const items = await Faq.find(query)
      .populate("createdBy updatedBy", "name email")
      .sort({ page: 1, order: 1, createdAt: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.status(200).json({
      success: true,
      data: items,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getFaqById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid FAQ ID." });
    }
    const faq = await Faq.findById(req.params.id).lean();
    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found." });
    }
    res.status(200).json({ success: true, data: faq });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createFaq = async (req, res) => {
  try {
    const { page, question, answer, order, isActive } = req.body;
    if (!page || !question?.trim() || !answer?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Page, question and answer are required.",
      });
    }

    const faq = await Faq.create({
      page,
      question,
      answer,
      order,
      isActive,
      createdBy: req.user?._id,
    });
    res.status(201).json({ success: true, data: faq });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ success: false, message: validationMessage(err) });
    }
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateFaq = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found." });
    }

    const { page, question, answer, order, isActive } = req.body;
    if (page !== undefined) faq.page = page;
    if (question !== undefined) faq.question = question;
    if (answer !== undefined) faq.answer = answer;
    if (order !== undefined) faq.order = order;
    if (isActive !== undefined) faq.isActive = isActive;
    faq.updatedBy = req.user?._id;

    await faq.save();
    res.status(200).json({ success: true, data: faq });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ success: false, message: validationMessage(err) });
    }
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const partiallyUpdateFaq = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found." });
    }

    const allowed = ["page", "question", "answer", "order", "isActive"];
    for (const [key, value] of Object.entries(req.body)) {
      if (allowed.includes(key) && value !== undefined) faq[key] = value;
    }
    faq.updatedBy = req.user?._id;

    await faq.save();
    res.status(200).json({ success: true, data: faq });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ success: false, message: validationMessage(err) });
    }
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const destroyFaqById = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found." });
    }
    await faq.deleteOne();
    res.status(200).json({ success: true, message: "FAQ deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
