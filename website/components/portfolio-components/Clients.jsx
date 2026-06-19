"use client";
// components/Clients.jsx
import { motion } from "framer-motion";

const gradText = {
  background: "linear-gradient(135deg,#8B5CF6,#c084fc)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};
const border = {
  borderTop: "1px solid rgba(255,255,255,0.06)",
  borderLeft: "1px solid rgba(255,255,255,0.06)",
};
const cell = {
  borderRight: "1px solid rgba(255,255,255,0.06)",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

const CLIENTS = [
  { name: "Shivam Infracon", sector: "Real Estate / EPC", init: "SI" },
  { name: "Shikhar Infotech", sector: "IT Services", init: "SK" },
  { name: "Microland Computers", sector: "Technology", init: "MC" },
  { name: "Intenics Pvt. Ltd.", sector: "B2B Solutions", init: "IN" },
  { name: "Belleza Beauty Academy", sector: "Education / Beauty", init: "BB" },
  { name: "Music Mania School", sector: "Arts & Education", init: "MM" },
  {
    name: "UK International London Beauty School",
    sector: "Beauty",
    init: "UK",
  },
];

export default function Clients() {
  return (
    <section
      className="px-6 py-20 border-t max-w-6xl mx-auto"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* header row */}
      <div className="flex items-end justify-between flex-wrap gap-5 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-4">Our Clients</p>
          <h2 className="font-sora font-extrabold text-3xl md:text-4xl tracking-tight">
            Brands we&apos;ve <span style={gradText}>partnered with</span>
          </h2>
        </motion.div>
        <motion.div
          className="inline-flex items-center gap-2 text-xs font-medium text-purple-300
            px-4 py-2 rounded-full border border-purple-500/25"
          style={{ background: "rgba(139,92,246,0.1)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          Trusted across India
        </motion.div>
      </div>

      {/* grid */}
      <div className="grid  sm:grid-cols-2 md:grid-cols-3" style={border}>
        {CLIENTS.map((c, i) => (
          <motion.div
            key={c.name}
            className="flex items-center gap-4 px-7 py-7 cursor-default
              hover:bg-purple-900/10 transition-colors"
            style={cell}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.07 }}
          >
            {/* avatar */}
            <div
              className="w-15 h-15 rounded-xl flex items-center justify-center
              font-sora font-extrabold text-lg text-purple-300 shrink-0"
              style={{
                background: "rgba(139,92,246,0.14)",
                border: "1px solid rgba(139,92,246,0.25)",
              }}
            >
              {c.init}
            </div>
            <div>
              <p className="text-md font-medium text-white/72 leading-snug">
                {c.name}
              </p>
              <p className="text-md text-white/28 mt-0.5">{c.sector}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
