import mongoose from "mongoose";
import slugify from "slugify";

// Cloudinary can serve transformed URLs without a file extension, so keep the
// image validation loose (just require an http(s) URL).
const imageUrlValidator = {
  validator: (v) => !v || /^https?:\/\/.+/i.test(v),
  message: "Image must be a valid URL",
};

const seoSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    metaKeywords: [{ type: String, trim: true }],
  },
  { _id: false }
);

// One step in the "how we did it" breakdown of the solution
const approachStepSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true, maxlength: 150 },
    description: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// A headline result number ( e.g. prefix "+" · value "312" · suffix "%" )
const metricSchema = new mongoose.Schema(
  {
    label: { type: String, trim: true, required: true, maxlength: 120 },
    value: { type: String, trim: true, required: true, maxlength: 40 },
    prefix: { type: String, trim: true, default: "" },
    suffix: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const caseStudySchema = new mongoose.Schema(
  {
    /* ---------------- Identity ---------------- */
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 3,
      maxlength: 150,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      index: true,
    },
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
      maxlength: 120,
    },
    // Logo used on the grid card of the listing page
    clientLogo: { type: String, default: null, validate: imageUrlValidator },
    // Sector grouping
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CaseStudyCategory",
      required: [true, "Category is required"],
      index: true,
    },
    industry: { type: String, trim: true, maxlength: 120, default: "" },
    // Hero background image on the detail page
    heroImage: { type: String, default: null, validate: imageUrlValidator },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [300, "Short description must be under 300 characters"],
      default: "",
    },

    /* ---------------- Narrative (rich text / HTML) ---------------- */
    background: { type: String, trim: true, default: "" },
    challenge: { type: String, trim: true, default: "" },
    solution: { type: String, trim: true, default: "" },
    approach: { type: [approachStepSchema], default: [] },
    results: { type: String, trim: true, default: "" },
    metrics: { type: [metricSchema], default: [] },

    /* ---------------- Meta ---------------- */
    seo: seoSchema,
    order: { type: Number, default: 0, index: true },
    isActive: { type: Boolean, default: true, index: true },
    isFeature: { type: Boolean, default: false, index: true },
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
    collection: "casestudies",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Keep slug in sync with the title
caseStudySchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

caseStudySchema.index({
  title: "text",
  clientName: "text",
  "seo.metaKeywords": "text",
});
caseStudySchema.index({ isActive: 1, order: 1, createdAt: -1 });

const CaseStudy = mongoose.model("CaseStudy", caseStudySchema);
export default CaseStudy;
