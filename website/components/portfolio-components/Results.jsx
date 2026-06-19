// components/Results.jsx
"use client";

import { motion } from "framer-motion";
import {
  ChartArea,
  Bot,
  TrendingUp,
  Handshake,
  RefreshCcw,
  ChevronsRight,
} from "lucide-react";
import IndiaClientMap from "./IndiaClientMap";

const STATS = [
  { num: "3–10×", label: "Growth in Leads" },
  { num: "40%↓", label: "Reduction in Cost Per Lead" },
  { num: "↑CVR", label: "Improved Conversion Rates" },
  {
    num: <RefreshCcw size={24} color="#8b5cf6" />,
    label: "Consistent Monthly Lead Flow",
  },
];

const CLIENT_ROWS = [
  "Targeted lead generation system",
  "EPC + MMS segment focus",
  "High-quality B2B inquiries",
];

const WHY = [
  {
    icon: <ChartArea size={18} color="#8b5cf6" />,
    label: "Data-Driven Execution",
  },
  { icon: <Bot size={18} color="#8b5cf6" />, label: "AI-Powered Systems" },
  {
    icon: <RefreshCcw size={18} color="#8b5cf6" />,
    label: "End-to-End Solutions",
  },
  { icon: <TrendingUp size={18} color="#8b5cf6" />, label: "Proven Results" },
  { icon: <Handshake size={18} color="#8b5cf6" />, label: "Dedicated Support" },
];

const grad = {
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

export default function Results() {
  return (
    <div className="relative z-10 flex flex-col gap-24 px-6 py-24 md:px-3 max-w-6xl mx-auto">
      {/* ── Results Snapshot ── */}
      <div>
        <motion.p
          className="section-label mb-5"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Results Snapshot
        </motion.p>
        <motion.h2
          className="font-sora text-3xl md:text-5xl font-extrabold tracking-tight mb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          Numbers our <span style={grad}>clients celebrate</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4" style={border}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="px-6 py-8 transition-colors duration-300 hover:bg-purple-900/10"
              style={cell}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
            >
              <div
                className="font-sora text-3xl font-extrabold mb-2 leading-none"
                style={grad}
              >
                {s.num}
              </div>
              <div className="text-sm text-white/40 leading-snug">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <IndiaClientMap />

      {/* ── Client + Why ── */}
      {/* Client Work */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="section-label mb-4">Featured Work</p>
          <h3 className="font-sora font-extrabold text-xl text-white mb-5">
            Shivam Infracon
          </h3>
          <div style={border}>
            {CLIENT_ROWS.map((r) => (
              <div
                key={r}
                className="flex items-center gap-3 px-5 py-3.5 text-md text-white/50 hover:text-white/80 transition-colors"
                style={cell}
              >
                <span className="w-1 h-1 rounded-full bg-violet-500 shrink-0" />
                {r}
              </div>
            ))}
          </div>
          <div
            className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-xl text-md text-purple-300 font-medium"
            style={{
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.28)",
            }}
          >
            <ChevronsRight />  3× Lead Growth in 45 Days
          </div>
        </motion.div>

        {/* Why Vipprow */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="section-label mb-4">Why Vipprow</p>
          <h3 className="font-sora font-extrabold text-xl mb-5">
            What sets us <span style={grad}>apart</span>
          </h3>
          <div style={border}>
            {WHY.map((w) => (
              <div
                key={w.label}
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-purple-900/10"
                style={cell}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
                  style={{
                    background: "rgba(139,92,246,0.12)",
                    border: "1px solid rgba(139,92,246,0.22)",
                  }}
                >
                  {w.icon}
                </div>
                <span className="font-sora font-bold text-md text-white/85">
                  {w.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Trust Quote ── */}
      <motion.div
        className="text-center border-t pt-14"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="font-sora text-7xl leading-none text-purple-500/20 mb-6">
          &quot;
        </div>
        <p className="font-sora font-bold text-2xl md:text-4xl leading-snug text-white/90 max-w-2xl mx-auto mb-7">
          Vipprow is not just a marketing agency —<br />
          it&apos;s a <span style={grad}>growth partner.</span>
        </p>
        <span
          className="inline-block w-2 h-2 rounded-full bg-violet-500 animate-pulse"
          style={{ boxShadow: "0 0 10px rgba(139,92,246,0.7)" }}
        />
      </motion.div>
    </div>
  );
}
