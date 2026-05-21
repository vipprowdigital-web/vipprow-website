"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Rocket, Loader2, Send } from "lucide-react";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Chandigarh",
];

interface ServiceItem {
  _id: string;
  title: string;
}

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    service: "",
    city: "",
    state: "",
    message: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const response = await fetch(`${apiUrl}/service/public/names`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setServices(data.data || []);
        }
      } catch (e) {
        console.error("Error fetching services:", e);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const payload = {
        ...form,
        type: "Services",
        services: [form.service],
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const errData = await response.json().catch(() => ({}));
        setErrorMessage(errData.message || "Failed to submit request.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center max-w-135 mx-auto bg-white/4 border border-border rounded-xl p-8 backdrop-blur-md"
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 text-2xl bg-blue-700/15 border border-blue-700/30">
          <Rocket size={30} className="text-blue-700" />
        </div>
        <h3 className="font-heading font-bold text-xl text-foreground mb-2 tracking-wide">
          Request Sent!
        </h3>
        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed font-sans">
          Thanks for reaching out. Our strategy team will contact you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-135 mx-auto bg-white/4 border border-border rounded-xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
      <h2 className="mb-6 text-center text-2xl font-bold tracking-wide text-foreground font-heading">
        Enquiry Now
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        {/* Error handling banner */}
        {errorMessage && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md font-sans">
            {errorMessage}
          </div>
        )}

        {/* Name & Business */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-muted-foreground tracking-wider uppercase mb-1.5 font-heading">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Rahul Sharma"
              required
              className="w-full bg-white/[0.04] border border-input rounded-md px-4 py-3 text-sm text-foreground font-sans outline-none placeholder-muted-foreground/30 transition-all duration-200 focus:border-blue-700/50"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-muted-foreground tracking-wider uppercase mb-1.5 font-heading">
              Business Name
            </label>
            <input
              name="businessName"
              type="text"
              value={form.businessName}
              onChange={handleChange}
              placeholder="Company Name"
              required
              className="w-full bg-white/[0.04] border border-input rounded-md px-4 py-3 text-sm text-foreground font-sans outline-none placeholder-muted-foreground/30 transition-all duration-200 focus:border-blue-700/50"
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-muted-foreground tracking-wider uppercase mb-1.5 font-heading">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="rahul@brand.com"
              required
              className="w-full bg-white/[0.04] border border-input rounded-md px-4 py-3 text-sm text-foreground font-sans outline-none placeholder-muted-foreground/30 transition-all duration-200 focus:border-blue-700/50"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-muted-foreground tracking-wider uppercase mb-1.5 font-heading">
              Phone / WhatsApp
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="00000 00000"
              required
              className="w-full bg-white/[0.04] border border-input rounded-md px-4 py-3 text-sm text-foreground font-sans outline-none placeholder-muted-foreground/30 transition-all duration-200 focus:border-blue-700/50"
            />
          </div>
        </div>

        {/* Services Dropdown */}
        <div>
          <label className="block text-[11px] font-semibold text-muted-foreground tracking-wider uppercase mb-1.5 font-heading">
            Service Required
          </label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            required
            className="w-full bg-white/[0.04] border border-input rounded-md px-4 py-3 text-sm text-foreground font-sans outline-none cursor-pointer transition-all duration-200 focus:border-blue-700/50 appearance-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e\")",
              backgroundPosition: "right 16px center",
              backgroundSize: "14px",
              backgroundRepeat: "no-repeat",
            }}
          >
            <option value="" className="bg-card text-muted-foreground">
              Select a service
            </option>
            {services.map((s) => (
              <option
                key={s._id}
                value={s._id}
                className="bg-card text-foreground capitalize"
              >
                {s.title}
              </option>
            ))}
          </select>
        </div>

        {/* City & State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-muted-foreground tracking-wider uppercase mb-1.5 font-heading">
              City
            </label>
            <input
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              placeholder="e.g. Mumbai"
              required
              className="w-full bg-white/[0.04] border border-input rounded-md px-4 py-3 text-sm text-foreground font-sans outline-none placeholder-muted-foreground/30 transition-all duration-200 focus:border-blue-700/50"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-muted-foreground tracking-wider uppercase mb-1.5 font-heading">
              State
            </label>
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              className="w-full bg-white/[0.04] border border-input rounded-md px-4 py-3 text-sm text-foreground font-sans outline-none cursor-pointer transition-all duration-200 focus:border-blue-700/50 appearance-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e\")",
                backgroundPosition: "right 16px center",
                backgroundSize: "14px",
                backgroundRepeat: "no-repeat",
              }}
            >
              <option value="" className="bg-card text-muted-foreground">
                Select State
              </option>
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st} className="bg-card text-foreground">
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message requirements */}
        <div>
          <label className="block text-[11px] font-semibold text-muted-foreground tracking-wider uppercase mb-1.5 font-heading">
            Specific Requirements
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Briefly describe your goals..."
            rows={3}
            className="w-full bg-white/[0.04] border border-input rounded-md px-4 py-3 text-sm text-foreground font-sans outline-none placeholder-muted-foreground/30 resize-vertical transition-all duration-200 focus:border-blue-700/50"
          />
        </div>

        {/* Submit button with custom gradient */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{
            scale: loading ? 1 : 1.01,
            // boxShadow: "0 0 35px rgba(139,92,246,0.4)",
          }}
          whileTap={{ scale: loading ? 1 : 0.99 }}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-md text-sm font-semibold text-white border-none cursor-pointer mt-2 disabled:opacity-40 transition-opacity bg-linear-to-r from-blue-700 via-blue-900 to-black"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              Submit Inquiry <Send size={13} />
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}
