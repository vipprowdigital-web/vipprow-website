import ContactUs from "../models/contactus.model.js";
import mongoose from "mongoose";
import { readConsent, CONSENT_REQUIRED_MESSAGE } from "../utils/consent.js";
import { sendContactReplyEmail } from "../services/email.service.js";

/* ============================================================
   📌 CREATE ContactUs (Public)
============================================================ */
export const createContactUs = async (req, res) => {
  try {
    const {
      type,
      name,
      email,
      phone,
      subject,
      message,
      meta,
      services,
      businessName,
      city,
      state,
      course,
      qualification,
    } = req.body;

    const consent = readConsent(req);
    if (!consent) {
      return res
        .status(400)
        .json({ status: "error", message: CONSENT_REQUIRED_MESSAGE });
    }

    // Validate required fields
    if (!type) {
      return res.status(400).json({
        status: "error",
        message: "Form type is required.",
      });
    }

    if (!name || !phone) {
      return res.status(400).json({
        status: "error",
        message: "Name & Phone are required.",
      });
    }

    // Validate name — must be a string of reasonable length/characters
    if (typeof name !== "string") {
      return res.status(400).json({
        status: "error",
        message: "Name must be a string.",
      });
    }

    const trimmedName = name.trim();

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return res.status(400).json({
        status: "error",
        message: "Name must be between 2 and 100 characters.",
      });
    }

    if (!/^[\p{L}\p{M}.'\- ]+$/u.test(trimmedName)) {
      return res.status(400).json({
        status: "error",
        message:
          "Name can only contain letters, spaces, hyphens, apostrophes and periods.",
      });
    }

    // Enrollment-specific validation
    if (type === "Enrollment") {
      if (!course) {
        return res.status(400).json({
          status: "error",
          message: "Course selection is required for enrollment.",
        });
      }
      if (!qualification) {
        return res.status(400).json({
          status: "error",
          message: "Qualification is required for enrollment.",
        });
      }
      if (!city) {
        return res.status(400).json({
          status: "error",
          message: "City is required for enrollment.",
        });
      }
    }

    if (services && Array.isArray(services)) {
      const isInvalid = services.some(
        (id) => !mongoose.Types.ObjectId.isValid(id),
      );

      if (isInvalid) {
        return res.status(400).json({
          status: "error",
          message: "Invalid Service ID detected.",
        });
      }
    }

    // ---------------------------------------------
    // 🌟 CREATE DOCUMENT
    // ---------------------------------------------
    const contact = await ContactUs.create({
      type,
      name: trimmedName,
      email,
      phone: phone || null,
      subject: subject || null,
      businessName: businessName,
      city: city,
      state: state,
      // enrollment specific
      course: course || null,
      qualification: qualification || null,
      // enrollment specific
      message,
      meta: meta || {},
      services: services || null,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      consent,
      createdBy: req.user?._id || null,
    });

    return res.status(201).json({
      status: "success",
      message: "Form submitted successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("❌ Error creating contact:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

/* ============================================================
   📌 GET ALL ContactUs (Admin)
============================================================ */
export const getAllContactUs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const total = await ContactUs.countDocuments();

    const messages = await ContactUs.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      // services are stored as ids; include each service's title for the console
      .populate("services", "title")
      .lean();

    return res.status(200).json({
      status: "success",
      message: "Contact messages fetched successfully.",
      data: messages,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("❌ Error fetching contact list:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

/* ============================================================
   📌 GET ContactUs by ID
============================================================ */
export const getContactUsById = async (req, res) => {
  try {
    const contact = await ContactUs.findById(req.params.id)
      .populate("services", "title")
      // Show who replied by name in the console's reply history
      .populate("replies.respondedBy", "name")
      .lean();

    if (!contact) {
      return res.status(404).json({
        status: "error",
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      status: "success",
      data: contact,
    });
  } catch (error) {
    console.error("❌ Error fetching contact:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

/* ============================================================
   📌 PUT — Full Update
============================================================ */
export const updateContactUs = async (req, res) => {
  try {
    const data = req.body;

    const updated = await ContactUs.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ status: "error", message: "Contact not found." });
    }

    return res.status(200).json({
      status: "success",
      message: "Contact updated successfully.",
      data: updated,
    });
  } catch (error) {
    console.error("❌ Error updating contact:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

/* ============================================================
   📌 PATCH — Partial Update (status, read, etc.)
============================================================ */
export const partiallyUpdateContactUs = async (req, res) => {
  try {
    const data = req.body;

    const updated = await ContactUs.findByIdAndUpdate(
      req.params.id,
      { $set: data },
      { new: true },
    );

    if (!updated) {
      return res
        .status(404)
        .json({ status: "error", message: "Contact not found." });
    }

    return res.status(200).json({
      status: "success",
      message: "Contact partially updated.",
      data: updated,
    });
  } catch (error) {
    console.error("❌ Error partial updating contact:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

/* ============================================================
   📌 ADMIN Respond to Contact Message
============================================================ */
export const respondToContactUs = async (req, res) => {
  try {
    const message =
      typeof req.body?.message === "string" ? req.body.message.trim() : "";

    if (!message) {
      return res.status(400).json({
        status: "error",
        message: "Response message cannot be empty.",
      });
    }
    if (message.length > 2000) {
      return res.status(400).json({
        status: "error",
        message: "Response cannot exceed 2000 characters.",
      });
    }

    const contact = await ContactUs.findById(req.params.id);
    if (!contact) {
      return res
        .status(404)
        .json({ status: "error", message: "Contact not found." });
    }
    if (!contact.email) {
      return res.status(400).json({
        status: "error",
        message: "This enquiry has no email address to reply to.",
      });
    }

    // Email the reply first. Only record it (and mark the enquiry answered)
    // once the person has actually been sent it, so a failed send can be
    // retried instead of silently showing as answered.
    const sent = await sendContactReplyEmail({
      to: contact.email,
      name: contact.name,
      replyMessage: message,
      originalMessage: contact.message,
    });

    if (!sent.success) {
      return res.status(502).json({
        status: "error",
        message: `The reply could not be emailed to ${contact.email}. Please try again.`,
      });
    }

    const now = new Date();
    contact.response = {
      message,
      respondedBy: req.user._id,
      respondedAt: now,
    };

    contact.replies.push({
      message,
      respondedBy: req.user._id,
      respondedAt: now,
      emailedTo: contact.email,
      emailId: sent.id ?? null,
    });

    contact.status = "answered";

    await contact.save();

    return res.status(200).json({
      status: "success",
      message: `Reply emailed to ${contact.email}.`,
      data: contact,
    });
  } catch (error) {
    console.error("❌ Error responding contact:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

/* ============================================================
   📌 DELETE ContactUs by ID
============================================================ */
export const destroyContactUsById = async (req, res) => {
  try {
    const deleted = await ContactUs.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Contact message deleted successfully.",
      data: deleted,
    });
  } catch (error) {
    console.error("❌ Error deleting contact:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};
