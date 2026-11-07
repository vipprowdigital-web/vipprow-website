import mongoose from "mongoose";
import { FAQ_PAGE_VALUES } from "../config/faqPages.js";

/**
 * A question + answer shown in the FAQ section of one specific page of the
 * website. The page is chosen from the console (see config/faqPages.js).
 */
const faqSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: [true, "Page is required"],
      enum: {
        values: FAQ_PAGE_VALUES,
        message: "Unknown page",
      },
      index: true,
    },
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
      maxlength: [300, "Question cannot exceed 300 characters"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
      trim: true,
      maxlength: [2000, "Answer cannot exceed 2000 characters"],
    },
    // Ascending order within the page
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

faqSchema.index({ page: 1, isActive: 1, order: 1, createdAt: 1 });

const Faq = mongoose.model("Faq", faqSchema);
export default Faq;
