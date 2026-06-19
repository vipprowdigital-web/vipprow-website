import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, Rocket, ArrowUpRight } from "lucide-react";
import Image from "next/image";

// const SERVICES = [
//   "CRM Automation",
//   "WhatsApp Automation",
//   "Social Media Marketing",
//   "Web Development",
//   "Software Development",
//   "Graphic Design",
//   "Pay Per Click Advertising",
//   "Content Marketing",
//   "Generative A.I Automation",
// ];

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

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/service/public/names`,
          {
            method: "GET",
          },
        );
        if (response.ok) {
          const data = await response.json();
          // console.log("Data from services: ", data);
          setServices(data.data);
        } else {
          // console.error("Error fetching services...");
        }
      } catch (e) {
        console.error(e);
        // console.error("Error while making API call..", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    service: "",
    city: "",
    state: "",
    industry: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        type: "Services",
        services: [form.service],
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (response.ok) {
        // const data = await response.json();
        // console.log("Data from response: ", data);
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    padding: "0.7rem 1rem",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.875rem",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontSize: "0.7rem",
    color: "rgba(255,255,255,0.4)",
    letterSpacing: "0.05em",
    display: "block",
    marginBottom: "0.35rem",
    fontFamily: "'Sora', sans-serif",
  };

  const focusHandlers = {
    onFocus: (e) => (e.target.style.borderColor = "rgba(139,92,246,0.5)"),
    onBlur: (e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)"),
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5 text-2xl"
          style={{
            background: "rgba(139,92,246,0.15)",
            border: "1px solid rgba(139,92,246,0.3)",
          }}
        >
          <Rocket size={30} color="var(--violet)" />
        </div>
        <h3 className="font-sora font-bold text-xl text-white mb-2">
          Request Sent!
        </h3>
        <p className="text-white/50 text-sm max-w-xs leading-relaxed">
          Thanks for reaching out. Our strategy team will contact you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name & Business */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Rahul Sharma"
            style={inputStyle}
            required
            {...focusHandlers}
          />
        </div>
        <div>
          <label style={labelStyle}>Business Name</label>
          <input
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            placeholder="Company Name"
            style={inputStyle}
            required
            {...focusHandlers}
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Email Address</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="rahul@brand.com"
            style={inputStyle}
            required
            {...focusHandlers}
          />
        </div>
        <div>
          <label style={labelStyle}>Phone / WhatsApp</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="00000 00000"
            style={inputStyle}
            required
            {...focusHandlers}
          />
        </div>
      </div>

      {/* Services Dropdown */}
      <div>
        <label style={labelStyle}>Service Required</label>
        {/* <select
          name="service"
          value={form.service}
          onChange={handleChange}
          style={{ ...inputStyle, cursor: "pointer" }}
          required
          {...focusHandlers}
        >
          <option value="" style={{ background: "#0a0a10" }}>
            Select a service
          </option>
          {services.length !== 0 &&
            services.map((s) => (
              <option
                key={s._id}
                value={s.title}
                style={{ background: "#0a0a10" }}
                className="capitalize"
              >
                {s.title}
              </option>
            ))}
        </select> */}
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          style={{ ...inputStyle, cursor: "pointer" }}
          required
          {...focusHandlers}
        >
          <option value="" style={{ background: "#0a0a10" }}>
            Select a service
          </option>
          {services.map((s) => (
            <option
              key={s._id}
              value={s._id}
              style={{ background: "#0a0a10" }}
              className="capitalize"
            >
              {s.title}
            </option>
          ))}
        </select>
      </div>

      {/* City & State */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="e.g. Mumbai"
            style={inputStyle}
            required
            {...focusHandlers}
          />
        </div>
        <div>
          <label style={labelStyle}>State</label>
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            style={{ ...inputStyle, cursor: "pointer" }}
            required
            {...focusHandlers}
          >
            <option value="" style={{ background: "#0a0a10" }}>
              Select State
            </option>
            {INDIAN_STATES.map((st) => (
              <option key={st} value={st} style={{ background: "#0a0a10" }}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Industry & Budget */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Industry</label>
          <select
            name="industry"
            value={form.industry}
            onChange={handleChange}
            style={{ ...inputStyle, cursor: "pointer" }}
            {...focusHandlers}
          >
            <option value="" style={{ background: "#0a0a10" }}>
              Select Industry
            </option>
            {[
              "E-commerce",
              "Ed-Tech",
              "Real Estate",
              "Healthcare",
              "B2B SaaS",
              "Other",
            ].map((v) => (
              <option key={v} value={v} style={{ background: "#0a0a10" }}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Monthly Budget</label>
          <select
            name="budget"
            value={form.budget}
            onChange={handleChange}
            style={{ ...inputStyle, cursor: "pointer" }}
            {...focusHandlers}
          >
            <option value="" style={{ background: "#0a0a10" }}>
              Select Range
            </option>
            {["Under ₹50K", "₹50K – ₹2L", "₹2L – ₹10L", "₹10L+"].map((v) => (
              <option key={v} value={v} style={{ background: "#0a0a10" }}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div> */}

      <div>
        <label style={labelStyle}>Specific Requirements</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Briefly describe your goals..."
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
          {...focusHandlers}
        />
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{
          scale: loading ? 1 : 1.02,
          boxShadow: "0 0 40px rgba(139,92,246,0.5)",
        }}
        whileTap={{ scale: loading ? 1 : 0.97 }}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium text-white border-none cursor-pointer mt-1 disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg,#8B5CF6,#6D28D9)",
          boxShadow: "0 0 28px rgba(139,92,246,0.3)",
        }}
      >
        {loading ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <>
            Submit Inquiry <Send size={14} />
          </>
        )}
      </motion.button>
    </form>
  );
}

// ── Footer links data ─────────────────────────────────────────────────────────
const FOOTER_COLS = [
  {
    heading: "Services",
    links: [
      { name: "Performance Ads", href: "/" },
      { name: "Branding", href: "/" },
      { name: "SEO", href: "/" },
      { name: "Web Experience", href: "/" },
      { name: "Content Strategy", href: "/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { name: "About", href: "/portfolio/#about" },
      { name: "Clients", href: "/portfolio/client-experience" },
      { name: "Milestones", href: "/portfolio/milestones" },
    ],
  },
];

// const SOCIALS = [
//   { icon: Linkedin, label: "LinkedIn" },
//   { icon: Twitter, label: "Twitter" },
//   // { icon: Instagram, label: "Instagram" },
//   { icon: Youtube, label: "YouTube" },
// ];

// ── Main footer ───────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <>
      {/* Contact section */}
      <section id="contact" className="relative z-10 py-24 px-4 md:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            className="section-label mb-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get in touch
          </motion.p>

          <motion.h2
            className="font-sora text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            Ready to Bring{" "}
            <span style={{ color: "#8B5CF6" }}>Your Vision to Life?</span>
          </motion.h2>

          <motion.p
            className="text-white/45 text-sm mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
          >
            Share your project details, ideas, and goals — we’ll connect with
            you to discuss the best way forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl px-4 py-5 sm:p-8 text-left"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Top row */}
      <footer
        className="relative z-10 px-6 md:px-10 pt-12 pb-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        id="contact"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-14 mb-12">
            {/* BRAND */}

            <div className="lg:max-w-md">
              <Image
                src="/assets/images/logo/vipprow_logo.svg"
                alt="VIPPROW Logo"
                width={40}
                height={40}
                className="w-40 mb-4"
              />

              <p className="text-white/25 text-sm leading-relaxed">
                Let Vipprow be your partner in achieving unparalleled digital
                success. Together, we’ll create impactful stories that resonate
                with your audience and deliver lasting results.
              </p>

              <p className="text-white/45 mt-4 text-sm italic">
                Build. Scale. Dominate.
              </p>
              {/* ── NEW: PORTFOLIO REDIRECT SECTION ── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="mb-6 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between text-left gap-4 my-4"
                style={{
                  background: "rgba(139, 92, 246, 0.05)",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                }}
              >
                <div>
                  <h4 className="font-sora font-semibold text-sm text-white mb-0.5">
                    Viewing Showcase Portfolio
                  </h4>
                  <p className="text-white/50 text-xs leading-normal">
                    You are currently exploring our interactive showcase. To
                    check active availability, corporate tools, or place
                    real-time corporate business contracts, visit our production
                    link.
                  </p>
                </div>
                <a
                  href="https://vipprow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all duration-300 hover:bg-violet-600/20"
                  style={{
                    background: "rgba(139, 92, 246, 0.15)",
                    border: "1px solid rgba(139, 92, 246, 0.4)",
                  }}
                >
                  Official Website <ArrowUpRight size={14} />
                </a>
              </motion.div>
              {/* ───────────────────────────────────── */}
            </div>

            {/* LINKS */}

            <div className="grid grid-cols-2 gap-x-14 gap-y-10">
              {/* DYNAMIC COLS */}

              {FOOTER_COLS.map((col) => (
                <div key={col.heading}>
                  <h4 className="font-sora text-[0.65rem] tracking-widest uppercase text-white/30 mb-4">
                    {col.heading}
                  </h4>

                  <ul className="flex flex-col gap-2.5 list-none">
                    {col.links.map((link) => (
                      <li key={link.name}>
                        {link.href === "/" ? (
                          <p className="text-[0.8rem] text-white/50">
                            {link.name}
                          </p>
                        ) : (
                          <a
                            href={link.href}
                            className="text-[0.8rem] text-white/50 hover:text-white transition-colors duration-200"
                          >
                            {link.name}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* CONTACT */}

              <div>
                <h4 className="font-sora text-[0.65rem] tracking-widest uppercase text-white/30 mb-4">
                  Contact
                </h4>

                <ul className="w-full flex flex-col gap-2.5 list-none">
                  <li>
                    <a
                      href="mailto:vipprowdigital@gmail.com"
                      className="text-[0.8rem] text-white/50 hover:text-white transition-colors duration-200"
                    >
                      vipprowdigital@gmail.com
                    </a>
                  </li>

                  <li>
                    <a
                      href="tel:9669932121"
                      className="text-[0.8rem] text-white/50 hover:text-white transition-colors duration-200"
                    >
                      +91 96699 32121
                    </a>
                  </li>

                  <li className="text-[0.8rem] text-white/50">
                    Jabalpur, India
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-white/25 text-xs">
              &copy; {new Date().getFullYear()} VIPPROW. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

{
  /* Footer */
}
{
  /* <footer
        className="relative z-10 px-6 md:px-10 pt-12 pb-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
            <div>
              <img
                src="/images/vipprow-logo-removebg-preview.png"
                alt="VIPPROW Logo"
                className="w-40 mb-3"
              />
              <p className="text-white/25 w-full sm:w-1/2 text-md">
                Let Vipprow be your partner in achieving unparalleled digital
                success. Together, we’ll create impactful stories that resonate
                with your audience and deliver lasting results
              </p>
              <p className="text-white/45 mt-3 text-md italic">
                Build. Scale. Dominate.
              </p>
            </div>

            <div className="flex flex-wrap gap-10">
              {FOOTER_COLS.map((col) => (
                <div key={col.heading}>
                  <h4 className="font-sora text-[0.65rem] tracking-widest uppercase text-white/30 mb-4">
                    {col.heading}
                  </h4>
                  <ul className="flex flex-col gap-2.5 list-none">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="/"
                          className="text-[0.78rem] text-white/50 hover:text-white transition-colors duration-200"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="flex flex-wrap gap-10">
                <h4 className="font-sora text-[0.65rem] tracking-widest uppercase text-white/30 mb-4">
                  Contact
                </h4>
                <ul className="flex flex-col gap-2.5 list-none">
                  <li>
                    <a
                      href="mailto:vipprowdigital@gmail.com"
                      className="text-[0.78rem] text-white/50 hover:text-white transition-colors duration-200"
                    >
                      vipprowdigital@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:9669932121"
                      className="text-[0.78rem] text-white/50 hover:text-white transition-colors duration-200"
                    >
                      +91 96699 32121
                    </a>
                  </li>
                  <li className="text-[0.78rem] text-white/50 hover:text-white transition-colors duration-200">
                    Jabalpur, India
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-white/25 text-xs">
              &copy; {new Date().getFullYear()} VIPPROW. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */
}

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Send } from "lucide-react";

// // ── Contact form ─────────────────────────────────────────────────────────────
// function ContactForm() {
//   const [submitted, setSubmitted] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     industry: "",
//     budget: "",
//     message: "",
//   });

//   const handleChange = (e) =>
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   const inputStyle = {
//     background: "rgba(255,255,255,0.04)",
//     border: "1px solid rgba(255,255,255,0.08)",
//     borderRadius: "10px",
//     padding: "0.7rem 1rem",
//     color: "#fff",
//     fontFamily: "'DM Sans', sans-serif",
//     fontSize: "0.875rem",
//     outline: "none",
//     width: "100%",
//     transition: "border-color 0.2s",
//   };

//   const labelStyle = {
//     fontSize: "0.7rem",
//     color: "rgba(255,255,255,0.4)",
//     letterSpacing: "0.05em",
//     display: "block",
//     marginBottom: "0.35rem",
//     fontFamily: "'Sora', sans-serif",
//   };

//   if (submitted) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="flex flex-col items-center justify-center py-16 text-center"
//       >
//         <div
//           className="w-16 h-16 rounded-full flex items-center justify-center mb-5 text-2xl"
//           style={{
//             background: "rgba(139,92,246,0.15)",
//             border: "1px solid rgba(139,92,246,0.3)",
//           }}
//         >
//           🚀
//         </div>
//         <h3 className="font-sora font-bold text-xl text-white mb-2">
//           You're on the list!
//         </h3>
//         <p className="text-white/50 text-sm max-w-xs leading-relaxed">
//           We'll review your brief and reach out within 24 hours with a tailored
//           growth strategy.
//         </p>
//       </motion.div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div>
//           <label style={labelStyle}>Full Name</label>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Rahul Sharma"
//             style={inputStyle}
//             required
//             onFocus={(e) =>
//               (e.target.style.borderColor = "rgba(139,92,246,0.5)")
//             }
//             onBlur={(e) =>
//               (e.target.style.borderColor = "rgba(255,255,255,0.08)")
//             }
//           />
//         </div>
//         <div>
//           <label style={labelStyle}>Email Address</label>
//           <input
//             name="email"
//             type="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder="rahul@brand.com"
//             style={inputStyle}
//             required
//             onFocus={(e) =>
//               (e.target.style.borderColor = "rgba(139,92,246,0.5)")
//             }
//             onBlur={(e) =>
//               (e.target.style.borderColor = "rgba(255,255,255,0.08)")
//             }
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <div>
//           <label style={labelStyle}>Phone / WhatsApp</label>
//           <input
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             placeholder="+91 98765 43210"
//             style={inputStyle}
//             onFocus={(e) =>
//               (e.target.style.borderColor = "rgba(139,92,246,0.5)")
//             }
//             onBlur={(e) =>
//               (e.target.style.borderColor = "rgba(255,255,255,0.08)")
//             }
//           />
//         </div>
//         <div>
//           <label style={labelStyle}>Industry</label>
//           <select
//             name="industry"
//             value={form.industry}
//             onChange={handleChange}
//             style={{ ...inputStyle, cursor: "pointer" }}
//             onFocus={(e) =>
//               (e.target.style.borderColor = "rgba(139,92,246,0.5)")
//             }
//             onBlur={(e) =>
//               (e.target.style.borderColor = "rgba(255,255,255,0.08)")
//             }
//           >
//             <option value="" style={{ background: "#0a0a10" }}>
//               Select your industry
//             </option>
//             {[
//               "E-commerce / D2C",
//               "Ed-Tech",
//               "Real Estate",
//               "Healthcare",
//               "B2B SaaS",
//               "Other",
//             ].map((v) => (
//               <option key={v} value={v} style={{ background: "#0a0a10" }}>
//                 {v}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div>
//         <label style={labelStyle}>Monthly Ad Budget</label>
//         <select
//           name="budget"
//           value={form.budget}
//           onChange={handleChange}
//           style={{ ...inputStyle, cursor: "pointer" }}
//           onFocus={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.5)")}
//           onBlur={(e) =>
//             (e.target.style.borderColor = "rgba(255,255,255,0.08)")
//           }
//         >
//           <option value="" style={{ background: "#0a0a10" }}>
//             Select budget range
//           </option>
//           {["Under ₹50K", "₹50K – ₹2L", "₹2L – ₹10L", "₹10L+"].map((v) => (
//             <option key={v} value={v} style={{ background: "#0a0a10" }}>
//               {v}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label style={labelStyle}>Biggest challenge right now</label>
//         <textarea
//           name="message"
//           value={form.message}
//           onChange={handleChange}
//           placeholder="e.g. High CAC, scaling plateaus, no brand awareness..."
//           rows={3}
//           style={{ ...inputStyle, resize: "vertical" }}
//           onFocus={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.5)")}
//           onBlur={(e) =>
//             (e.target.style.borderColor = "rgba(255,255,255,0.08)")
//           }
//         />
//       </div>

//       <motion.button
//         type="submit"
//         whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(139,92,246,0.5)" }}
//         whileTap={{ scale: 0.97 }}
//         className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
//                    text-sm font-medium text-white border-none cursor-pointer mt-1"
//         style={{
//           background: "linear-gradient(135deg,#8B5CF6,#6D28D9)",
//           boxShadow: "0 0 28px rgba(139,92,246,0.3)",
//         }}
//       >
//         Book Strategy Call <Send size={14} />
//       </motion.button>
//     </form>
//   );
// }

{
  /* <div className="flex gap-2">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{
                    scale: 1.1,
                    borderColor: "rgba(139,92,246,0.5)",
                  }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <Icon size={15} color="rgba(255,255,255,0.45)" />
                </motion.a>
              ))}
            </div> */
}
