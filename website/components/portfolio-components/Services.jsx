"use client";

import { useState } from "react";
import { motion } from "framer-motion";
// import { Zap, Layers, Search, Monitor, Wind } from "lucide-react";

import { Target, BarChart3, Filter, Globe, TrendingUp } from "lucide-react";

const SERVICES = [
  {
    icon: Target,
    name: "High Quality Leads (B2B + B2C)",
    desc: "Precise audience targeting that delivers qualified leads for both business and consumer markets.",
    accent: "#8B5CF6",
  },
  {
    icon: BarChart3,
    name: "Scalable Ad Campaigns",
    desc: "Campaign frameworks built to expand effortlessly, ensuring consistent performance as your brand grows.",
    accent: "#EC4899",
  },
  {
    icon: Filter,
    name: "Automated Sales Funnels",
    desc: "Streamlined funnels that capture, nurture, and convert prospects into loyal customers automatically.",
    accent: "#06B6D4",
  },
  {
    icon: Globe,
    name: "Conversion-Optimized Websites",
    desc: "Websites and landing pages designed with persuasive layouts and UX to maximize conversions.",
    accent: "#10B981",
  },
  {
    icon: TrendingUp,
    name: "ROI Focused Strategy",
    desc: "Data-driven marketing strategies that prioritize measurable growth and sustainable returns.",
    accent: "#F59E0B",
  },
];

// ── Service card with cursor-tracking border glow ──────────────────────────
function ServiceCard({ icon: Icon, name, desc, accent, index }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: index * 0.09,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative p-7 rounded-2xl overflow-hidden cursor-default group"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Cursor-following radial glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(200px circle at ${pos.x}px ${pos.y}px, ${accent}22, transparent 70%)`,
        }}
      />

      {/* Hover border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          boxShadow: `inset 0 0 0 1px ${accent}55`,
        }}
      />

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 relative z-10"
        style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
      >
        <Icon size={20} color={accent} strokeWidth={1.8} />
      </div>

      {/* Text */}
      <h3 className="font-sora font-semibold text-base text-white mb-2 relative z-10">
        {name}
      </h3>
      <p className="text-sm text-white/50 leading-relaxed relative z-10">
        {desc}
      </p>
    </motion.div>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <section id="services" className="relative z-10 py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="section-label mb-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What we deliver
        </motion.p>

        <motion.h2
          className="font-sora text-3xl md:text-5xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          No vanity metrics.{" "}
          <span style={{ color: "#8B5CF6" }}>Only measurable growth.</span>
        </motion.h2>

        <motion.p
          className="text-white/45 text-md mb-12 max-w-lg"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.14 }}
        >
          We focus on outcomes that actually matter
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.name} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
