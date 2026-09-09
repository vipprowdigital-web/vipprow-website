import mongoose from "mongoose";
import slugify from "slugify";

/**
 * A "sector" grouping for client case studies (Education, Healthcare, Solar…).
 * Drives the grouped sections rendered on the public Client Case Study page,
 * so the heading + description shown above each row are editable from the
 * backend instead of being hard-coded on the frontend.
 */
const caseStudyCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
      maxlength: [100, "Category name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    // Section heading shown above the row on the listing page (falls back to `name`)
    heading: {
      type: String,
      trim: true,
      maxlength: [150, "Heading cannot exceed 150 characters"],
      default: "",
    },
    // Supporting line under the heading
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },
    // Manual ordering of the sections (ascending)
    order: { type: Number, default: 0, index: true },
    isActive: { type: Boolean, default: true, index: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Auto-fill slug from name when not explicitly provided
caseStudyCategorySchema.pre("validate", function (next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

caseStudyCategorySchema.index({ name: "text" });

const CaseStudyCategory = mongoose.model(
  "CaseStudyCategory",
  caseStudyCategorySchema
);
export default CaseStudyCategory;
