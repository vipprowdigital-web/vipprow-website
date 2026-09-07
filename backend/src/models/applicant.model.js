import mongoose from "mongoose";

const ApplicantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name is too long"],
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [150, "Job title is too long"],
    },
    resume: {
      url: {
        type: String,
        required: [true, "Resume file URL is required"],
      },
      cloudinaryId: {
        type: String,
        required: [true, "Cloudinary public ID is required"],
      },
    },
  },
  {
    timestamps: true,
  },
);

const Applicant = mongoose.model("Applicant", ApplicantSchema);
export default Applicant;
