// components/Intro.jsx
"use client";
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

const CHALLENGES = [
  "Struggling with leads",
  "Struggling with conversions",
  "Struggling with scaling",
];

export default function Intro() {
  return (
    <div
      className="max-w-6xl mx-auto px-6"
      // style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left */}
        <motion.div
          className="py-16 pr-0 md:pr-14 border-b md:border-b-0 md:border-r"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-6">Our Philosophy</p>
          <h2 className="font-sora font-extrabold text-3xl md:text-4xl leading-tight tracking-tight mb-8">
            Every business has a{" "}
            <span style={gradText}>different challenge.</span>
          </h2>
          <div style={border}>
            {CHALLENGES.map((c) => (
              <div
                key={c}
                className="flex items-center gap-3 px-5 py-4 text-md text-white/45
                hover:text-white/80 hover:bg-purple-900/10 transition-all"
                style={cell}
              >
                <span
                  className="w-1 h-1 rounded-full bg-violet-500 shrink-0
                  shadow-[0_0_6px_rgba(139,92,246,0.6)]"
                />
                {c}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          className="py-16 pl-0 md:pl-14 flex flex-col justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="text-md text-white/42 leading-relaxed">
            At Vipprow, we don&apos;t apply templates. We build{" "}
            <span className="text-white/80">custom growth systems</span> for
            each client using strategy, execution, and automation.
          </p>
          <div
            className="flex items-center gap-3 px-5 py-4 rounded-2xl"
            style={{
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.25)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0 animate-pulse"
              style={{
                background: "#8B5CF6",
                boxShadow: "0 0 10px rgba(139,92,246,0.7)",
              }}
            />
            <p className="text-md text-white/60 leading-relaxed">
              <strong className="font-sora font-bold" style={gradText}>
                Result:
              </strong>{" "}
              Measurable business growth, not guesswork.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
