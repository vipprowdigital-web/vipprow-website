import mongoose from "mongoose";

/**
 * Record of a visitor's consent, kept on each enquiry / application /
 * newsletter subscriber. Under the DPDP Act the business must be able to
 * prove consent was given, so we store exactly what the person agreed to,
 * when, and from where — plus when they withdrew it (newsletter unsubscribe).
 */
const consentSchema = new mongoose.Schema(
  {
    given: { type: Boolean, required: true },
    // The exact consent sentence shown next to the checkbox
    text: { type: String, trim: true, maxlength: 600, default: null },
    givenAt: { type: Date, required: true },
    ipAddress: { type: String, trim: true, default: null },
    userAgent: { type: String, trim: true, default: null },
    withdrawnAt: { type: Date, default: null },
  },
  { _id: false },
);

export default consentSchema;
