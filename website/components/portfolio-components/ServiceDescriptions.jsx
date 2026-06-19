// components/Services.jsx
"use client";

import { motion } from "framer-motion";
import { Globe, Rocket, Bot } from "lucide-react";

const SERVICES = [
  {
    Icon: Rocket,
    title: "Performance\nMarketing",
    pills: [
      "Google Ads — Search, Display, YouTube",
      "Meta Ads — Facebook & Instagram",
      "LinkedIn Ads — B2B Targeting",
    ],
    focus: "Leads + Sales, not just clicks",
  },
  {
    Icon: Globe,
    title: "Website & Funnel\nDevelopment",
    pills: [
      "Landing Pages — built to convert",
      "Sales Funnels — end-to-end journeys",
      "Conversion Optimization",
    ],
    focus: "Visitors → paying clients",
  },
  {
    Icon: Bot,
    title: "Automation &\nCRM Systems",
    pills: ["Lead Tracking Systems", "WhatsApp Automation", "CRM Integration"],
    focus: "Better follow-up = More conversions",
  },
];

function ServiceCard({ Icon, title, pills, focus, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        borderColor: "rgba(139,92,246,0.42)",
        background: "rgba(139,92,246,0.05)",
        y: -6,
      }}
      //   transition={{ duration: 0.3 }}
      className="group relative flex flex-col rounded-2xl p-8 overflow-hidden cursor-default"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "border-color 0.3s, background 0.3s",
      }}
      //   onHoverStart={(e) => {
      //     e.currentTarget.style.borderColor = "rgba(139,92,246,0.42)";
      //     e.currentTarget.style.background = "rgba(139,92,246,0.05)";
      //   }}
      //   onHoverEnd={(e) => {
      //     e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
      //     e.currentTarget.style.background = "rgba(255,255,255,0.03)";
      //   }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(140deg, rgba(139,92,246,0.08), transparent)",
        }}
      />

      {/* Icon */}
      <div
        className="w-13 h-13 rounded-xl flex items-center justify-center text-2xl mb-6 relative z-10 shrink-0 brand-color"
        style={{
          width: 52,
          height: 52,
          background: "rgba(139,92,246,0.14)",
          border: "1px solid rgba(139,92,246,0.28)",
        }}
      >
        <Icon />
      </div>

      {/* Title */}
      <h3
        className="font-sora font-bold text-white mb-5 relative z-10 leading-snug"
        style={{ fontSize: "1.05rem", whiteSpace: "pre-line" }}
      >
        {title}
      </h3>

      {/* Pills */}
      <div className="flex flex-col gap-2 mb-6 relative z-10">
        {pills.map((p) => (
          <div
            key={p}
            className="flex items-center gap-2.5 text-white/60 text-sm"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: "#8B5CF6",
                boxShadow: "0 0 6px rgba(139,92,246,0.6)",
              }}
            />
            {p}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.07] mb-5 relative z-10" />

      {/* Focus tag */}
      <div
        className="inline-flex justify-center items-center gap-2 text-purple-300 text-xs font-medium rounded-lg px-3.5 py-2 relative z-10 mt-auto"
        style={{
          background: "rgba(139,92,246,0.12)",
          border: "1px solid rgba(139,92,246,0.28)",
        }}
      >
        {/* <span>👉</span> */}
        <span className="text-center">Focus: {focus}</span>
      </div>
    </motion.div>
  );
}

export default function ServiceDescriptions() {
  return (
    <section id="services" className="relative z-10 py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="section-label mb-5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What We Do
        </motion.p>

        <motion.h2
          className="font-sora text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          Our{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#8B5CF6,#c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Core Services
          </span>
        </motion.h2>

        <motion.p
          className="text-white/45 text-sm mb-14 max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.14 }}
        >
          Not just marketing — complete systems designed to generate traffic,
          capture leads, and convert them into revenue.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
