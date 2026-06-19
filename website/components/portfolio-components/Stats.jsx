import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { prefix: "3-", target: 10, suffix: "X", label: "Growth in Leads" },
  {
    prefix: "Up to",
    target: 40,
    suffix: "%",
    label: "Reduction in Cost Per Lead",
  },
  { prefix: "", target: 25, suffix: "M+", label: "Improved Conversion Rates" },
  // {
  //   prefix: "",
  //   target: "",
  //   suffix: "",
  //   label: "Consistent Monthly Lead Flow",
  // },
];

// ── Animated counter hook ───────────────────────────────────────────────────
function useCounter(target, started, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return value;
}

// ── Single stat card ────────────────────────────────────────────────────────
function StatCard({ prefix, target, suffix, label, index, started }) {
  const value = useCounter(target, started);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className="relative p-8 rounded-2xl overflow-hidden cursor-default"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: hovered
          ? "1px solid rgba(139,92,246,0.45)"
          : "1px solid rgba(255,255,255,0.07)",
        transition: "border-color 0.3s",
      }}
    >
      {/* Glow overlay on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.1), transparent)",
        }}
      />

      <div
        className="font-sora text-4xl font-extrabold mb-2 relative z-10"
        style={{
          background: "linear-gradient(135deg,#fff,#8B5CF6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {prefix}
        {value}
        {suffix}
      </div>
      <p className="text-sm text-white/50 relative z-10">{label}</p>
    </motion.div>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────
export default function Stats() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative z-10 py-24 px-6 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="section-label mb-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Proof of dominance
        </motion.p>

        <motion.h2
          className="font-sora text-3xl md:text-5xl font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          Numbers that <span style={{ color: "#8B5CF6" }}>speak</span>
        </motion.h2>

        <motion.p
          className="text-white/45 text-sm mb-12 max-w-md"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.14 }}
        >
          Every metric below is real, earned through strategy and execution —
          not luck.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} started={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
