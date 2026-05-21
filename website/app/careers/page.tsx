"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// --- TYPES & INTERFACES ---
interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
}

// --- SERVER ACTION (THE BACKEND API INSIDE THE PAGE) ---
async function handleApplicationSubmit(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const resumeFile = formData.get("resume") as File | null;

    if (!name || !jobTitle || !resumeFile || resumeFile.size === 0) {
      return {
        success: false,
        message: "Missing required profile parameter details.",
      };
    }

    // Convert file binary into a secure buffer for your file storage bucket or internal database push
    const bytes = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // --- FUTURE BACKEND WORKSPACE IMPLEMENTATION ---
    console.log(
      `Processing intake file for ${name} applying to position: ${jobTitle}`,
    );
    console.log(
      `Payload configuration: ${resumeFile.name} (${resumeFile.size} bytes)`,
    );
    // -----------------------------------------------

    return { success: true, message: "Application submitted successfully!" };
  } catch (error) {
    console.error("Internal server action failure:", error);
    return {
      success: false,
      message: "Server encountered an operational execution fault.",
    };
  }
}

// --- CLIENT UI COMPONENT ---
export default function CareersPage() {
  // Initialized directly with your core job positions including Sales
  const [jobs, setJobs] = useState<Job[]>([
    // {
    //   _id: "f1",
    //   title: "Senior Full Stack Engineer",
    //   department: "Engineering",
    //   location: "Remote (India)",
    //   type: "Full-time",
    // },
    // {
    //   _id: "f2",
    //   title: "Frontend Specialist (React / Next.js)",
    //   department: "Engineering",
    //   location: "Hybrid (Mumbai)",
    //   type: "Full-time",
    // },
    // {
    //   _id: "f3",
    //   title: "Backend Infrastructure Developer",
    //   department: "Engineering",
    //   location: "Remote",
    //   type: "Contract",
    // },
    // {
    //   _id: "f4",
    //   title: "UI/UX Product Designer",
    //   department: "Design",
    //   location: "Remote (India)",
    //   type: "Full-time",
    // },
    {
      _id: "f5",
      title: "Sales Executive & Accounts Manager",
      department: "Sales",
      location: "Onsite (Jabalpur)",
      type: "Full-time",
    },
  ]);

  const [loadingJobs, setLoadingJobs] = useState(false); // Set to false to show jobs instantly
  const [selectedDept, setSelectedDept] = useState("All");

  // Form Fields State
  const [form, setForm] = useState({ name: "", jobTitle: "" });
  const [resume, setResume] = useState<File | null>(null);

  // Status Handling
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  /* =========================================
  FUTURE BACKEND DYNAMIC FETCH INTEGRATION
  =========================================
  Uncomment this block when you want to plug this directly into your API endpoints.
  
  useEffect(() => {
    async function fetchJobs() {
      setLoadingJobs(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const response = await fetch(`${apiUrl}/jobs/public`); // Adjust target endpoint route dynamically
        if (response.ok) {
          const resData = await response.json();
          setJobs(resData.data || []);
        }
      } catch (err) {
        console.error("Error fetching jobs from server registry:", err);
      } finally {
        setLoadingJobs(false);
      }
    }
    fetchJobs();
  }, []);
  =========================================
  */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleApplyClick = (jobTitle: string) => {
    setForm((prev) => ({ ...prev, jobTitle }));
    document
      .getElementById("apply-form-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setSubmitStatus({
        type: "error",
        message: "Please upload your resume file.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const dataPayload = new FormData();
      dataPayload.append("name", form.name);
      dataPayload.append("jobTitle", form.jobTitle);
      dataPayload.append("resume", resume);

      const result = await handleApplicationSubmit(dataPayload);

      if (result.success) {
        setSubmitStatus({ type: "success", message: result.message });
        setForm({ name: "", jobTitle: "" });
        setResume(null);
      } else {
        setSubmitStatus({ type: "error", message: result.message });
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({
        type: "error",
        message: "Network error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const departments = [
    "All",
    ...Array.from(new Set(jobs.map((j) => j.department))),
  ];
  const filteredJobs =
    selectedDept === "All"
      ? jobs
      : jobs.filter((j) => j.department === selectedDept);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-600/30">
      {/* Structural Hero Grid Section */}
      <section className="relative mt-30 py-20 px-4 text-center overflow-hidden border-b border-white/8 bg-linear-to-b from-blue-950/20 via-black to-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[32px_32px]" />
        <div className="relative max-w-3xl mx-auto z-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
            Join the workspace
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-linear-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
            Build the Future With Us
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Join an agile engineering and market operations team focused on
            scaling highly optimized micro platforms.
          </p>
        </div>
      </section>

      {/* Available Openings Area */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-white mb-1">
              Current Openings
            </h2>
            <p className="text-sm text-gray-500">
              Select an open position below to begin matching requirements.
            </p>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
                  selectedDept === dept
                    ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    : "bg-white/[0.02] border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Card Generation Engine */}
        {loadingJobs ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  key={job._id}
                  className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-200"
                >
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-md">
                        {job.department}
                      </span>
                      <span className="text-xs text-gray-500">
                        • {job.type}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">{job.location}</p>
                  </div>
                  <button
                    onClick={() => handleApplyClick(job.title)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-white/[0.05] border border-white/[0.1] hover:bg-blue-600 hover:border-blue-500 transition-all duration-200 cursor-pointer"
                  >
                    Apply Now
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredJobs.length === 0 && (
              <div className="text-center py-16 border border-dashed border-white/[0.08] rounded-xl bg-white/[0.01]">
                <Briefcase className="mx-auto text-gray-600 mb-3" size={28} />
                <p className="text-sm text-gray-400 font-medium">
                  No open tracks matched this selection query.
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Target Intake Form Area */}
      <section
        id="apply-form-section"
        className="max-w-2xl mx-auto px-4 py-16 scroll-mt-6"
      >
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-white mb-2">
              Submit Your Application
            </h2>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Fill out these three core fields to inject your profile data into
              our workflow queue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Context Feedback Messaging */}
            {submitStatus.type === "success" && (
              <div className="flex items-start gap-3 p-4 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                <span>{submitStatus.message}</span>
              </div>
            )}
            {submitStatus.type === "error" && (
              <div className="flex items-start gap-3 p-4 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{submitStatus.message}</span>
              </div>
            )}

            {/* Field 1: Name */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-1.5 font-heading">
                Full Name <span className="text-blue-500">*</span>
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full bg-black border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white font-sans outline-none placeholder-white/20 transition-all duration-200 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            {/* Field 2: Job Title Position Selector */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-1.5 font-heading">
                Job Title Position <span className="text-blue-500">*</span>
              </label>
              <select
                name="jobTitle"
                value={form.jobTitle}
                onChange={handleChange}
                required
                className="w-full bg-black border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white font-sans outline-none cursor-pointer transition-all duration-200 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 appearance-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e\")",
                  backgroundPosition: "right 16px center",
                  backgroundSize: "14px",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <option value="" className="text-gray-500">
                  Select an open position...
                </option>
                {jobs.map((job) => (
                  <option
                    key={job._id}
                    value={job.title}
                    className="bg-black text-white"
                  >
                    {job.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Field 3: Resume Upload Zone */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-1.5 font-heading">
                Upload Resume / CV <span className="text-blue-500">*</span>
              </label>
              <div className="relative group/zone w-full flex flex-col items-center justify-center border-2 border-dashed border-white/[0.08] hover:border-blue-500/40 bg-black/40 rounded-xl p-6 text-center transition-colors duration-200">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required={!resume}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <Upload
                  size={24}
                  className="text-gray-500 group-hover/zone:text-blue-400 transition-colors mb-2"
                />
                <span className="text-xs text-gray-300 font-medium">
                  {resume ? resume.name : "Click or drag file to upload"}
                </span>
                <span className="text-[10px] text-gray-500 mt-1">
                  PDF, DOCX formats up to 5MB max
                </span>
              </div>
            </div>

            {/* Submission Interface Trigger */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 border-none cursor-pointer mt-4 hover:bg-blue-500 disabled:opacity-40 transition-all duration-200 shadow-[0_0_24px_rgba(37,99,235,0.2)]"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <span className="flex items-center gap-2">
                  Submit Application
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </span>
              )}
            </motion.button>
          </form>
        </div>
      </section>
    </div>
  );
}
