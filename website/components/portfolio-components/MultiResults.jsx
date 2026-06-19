"use client";

// components/MultiResults.jsx
import { motion } from "framer-motion";
import Divider from "./Divider";
import { scrollTo } from "../../utils/scrollTo";
import {
  RefreshCcw,
  GraduationCap,
  Hospital,
  ShoppingBag,
  Search,
  Brain,
  Settings,
  ChartArea,
  Rocket,
  Zap,
  Target,
  MessageCircle,
  Flame,
} from "lucide-react";

const SNAP = [
  { num: "8×", label: "ROI Growth" },
  { num: "↑", label: "High Quality Leads" },
  {
    num: <RefreshCcw size={24} color="#8b5cf6" />,
    label: "Automated Follow-up",
  },
  { num: "↓CPA", label: "Lower Acquisition Cost" },
  { num: "↑CVR", label: "Better Conversions" },
];

const INDUSTRIES = [
  {
    icon: <GraduationCap size={24} color="#8b5cf6" />,
    sector: "Education",
    title: "EdTech Brand",
    rows: [
      "5× student enrollment increase",
      "Full funnel automation",
      "Consistent monthly leads",
    ],
  },
  {
    icon: <ShoppingBag size={24} color="#8b5cf6" />,
    sector: "Local Business",
    title: "Retail & Local",
    rows: [
      "10× growth in visibility",
      "Daily inbound inquiries",
      "Strong local brand presence",
    ],
  },
  {
    icon: <Hospital size={24} color="#8b5cf6" />,
    sector: "Healthcare",
    title: "Healthcare Client",
    rows: [
      "More appointment bookings",
      "Optimized lead conversion",
      "Improved trust via branding",
    ],
  },
];

const STEPS = [
  {
    num: "01",
    icon: <Search size={24} color="#8b5cf6" />,
    title: "Deep Understanding",
    desc: "Your business, audience & market",
  },
  {
    num: "02",
    icon: <Brain size={24} color="#8b5cf6" />,
    title: "Custom Strategy",
    desc: "No templates. Only tailored plans",
  },
  {
    num: "03",
    icon: <Settings size={24} color="#8b5cf6" />,
    title: "System Building",
    desc: "Ads + Funnel + Automation",
  },
  {
    num: "04",
    icon: <ChartArea size={24} color="#8b5cf6" />,
    title: "Optimization",
    desc: "Data-driven improvements",
  },
  {
    num: "05",
    icon: <Rocket size={24} color="#8b5cf6" />,
    title: "Scaling",
    desc: "We scale what works profitably",
  },
];

const STAY = [
  {
    icon: <ChartArea size={20} color="#8b5cf6" />,
    title: "Transparency in Reporting",
    desc: "Full visibility into every metric, always",
  },
  {
    icon: <Zap size={20} color="#8b5cf6" />,
    title: "Real-Time Performance Tracking",
    desc: "Live dashboards, no waiting for monthly reports",
  },
  {
    icon: <MessageCircle size={20} color="#8b5cf6" />,
    title: "Fast Communication & Support",
    desc: "Quick responses, dedicated point of contact",
  },
  {
    icon: <Target size={20} color="#8b5cf6" />,
    title: "Focus on Business Outcomes",
    desc: "We measure success by your revenue, not vanity KPIs",
  },
];

const gradText = {
  background: "linear-gradient(135deg,#8B5CF6,#c084fc)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};
const outerBorder = {
  borderTop: "1px solid rgba(255,255,255,0.06)",
  borderLeft: "1px solid rgba(255,255,255,0.06)",
};
const cell = {
  borderRight: "1px solid rgba(255,255,255,0.06)",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};
// const Rule = () => (
//   <div
//     className="mx-8"
//     style={{ height: 1, background: "rgba(255,255,255,0.06)" }}
//   />
// );

function SectionHead({ label, children }) {
  return (
    <motion.div
      className="mb-11"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
    >
      <p className="section-label mb-4">{label}</p>
      <h2 className="font-sora font-extrabold text-3xl md:text-5xl tracking-tight leading-tight">
        {children}
      </h2>
    </motion.div>
  );
}

export default function MultiResults() {
  return (
    <div className="relative z-10">
      {/* ── 1. Results Snapshot — number grid ── */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <SectionHead label="Results Snapshot">
          Delivered <span style={gradText}>across industries.</span>
        </SectionHead>
        <div className="grid grid-cols-2 md:grid-cols-5" style={outerBorder}>
          {SNAP.map((s, i) => (
            <motion.div
              key={s.label}
              className="px-5 py-7 hover:bg-purple-900/10 transition-colors"
              style={cell}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <p
                className="font-sora font-extrabold text-3xl mb-2 leading-none"
                style={gradText}
              >
                {s.num}
              </p>
              <p className="text-md text-white/35 leading-snug">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── 2. Industry Impact — hover cards ── */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <SectionHead label="Industry Impact">
          Results that <span style={gradText}>cross verticals.</span>
        </SectionHead>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {INDUSTRIES.map((d, i) => (
            <motion.div
              key={d.sector}
              className="group relative rounded-2xl p-8 overflow-hidden cursor-default flex flex-col items-start"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{
                borderColor: "rgba(139,92,246,0.4)",
                background: "rgba(139,92,246,0.04)",
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0
                group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(139,92,246,0.07),transparent)",
                }}
              />
              <div className="text-2xl mb-4 bg-violet-500/10 p-3 rounded-lg">
                {d.icon}
              </div>
              <p className="text-xs font-bold tracking-widest uppercase text-purple-500/70 mb-2">
                {d.sector}
              </p>
              <h3 className="font-sora font-extrabold text-base text-white mb-4">
                {d.title}
              </h3>
              <div className="flex flex-col gap-2">
                {d.rows.map((r) => (
                  <div
                    key={r}
                    className="flex items-center gap-2.5 text-md text-white/45"
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-violet-500 shrink-0
                      shadow-[0_0_5px_rgba(139,92,246,0.5)]"
                    />
                    {r}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── 3. Steps — horizontal scrollable timeline ── */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <SectionHead label="How It Works">
          How clients <span style={gradText}>experience Vipprow.</span>
        </SectionHead>
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="flex overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                className="flex-1 min-w-40 px-6 py-7 relative"
                style={{
                  borderLeft:
                    i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p
                  className="font-sora text-sm font-extrabold tracking-widest
                  text-purple-500/55 mb-4"
                >
                  Step {s.num}
                </p>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-base mb-4"
                  style={{
                    background: "rgba(139,92,246,0.12)",
                    border: "1px solid rgba(139,92,246,0.25)",
                  }}
                >
                  {s.icon}
                </div>
                <p className="font-sora font-extrabold text-sm text-white mb-1.5">
                  {s.title}
                </p>
                <p className="text-sm text-white/35 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 4. Why Clients Stay — 2-col border grid ── */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <SectionHead label="Client Retention">
          Why clients <span style={gradText}>stay.</span>
        </SectionHead>
        <div className="grid grid-cols-1 md:grid-cols-2" style={outerBorder}>
          {STAY.map((s, i) => (
            <motion.div
              key={s.title}
              className="flex items-start gap-4 px-7 py-6 hover:bg-purple-900/10 transition-colors"
              style={cell}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0"
                style={{
                  background: "rgba(139,92,246,0.12)",
                  border: "1px solid rgba(139,92,246,0.25)",
                }}
              >
                {s.icon}
              </div>
              <div>
                <p className="font-sora font-bold text-sm text-white mb-1">
                  {s.title}
                </p>
                <p className="text-sm text-white/35 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust quote */}
        <motion.div
          className="text-center mt-8 py-8 px-6 rounded-2xl"
          style={{
            border: "1px solid rgba(139,92,246,0.15)",
            background: "rgba(139,92,246,0.04)",
          }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="font-sora font-bold text-xl md:text-2xl text-white/75 leading-snug">
            &quot;Clients don&apos;t stay with Vipprow for services —<br />
            they stay for <span style={gradText}>results.</span>&quot;
          </p>
          <span
            className="inline-block w-2 h-2 rounded-full mt-5 animate-pulse"
            style={{
              background: "#8B5CF6",
              boxShadow: "0 0 10px rgba(139,92,246,0.7)",
            }}
          />
        </motion.div>
      </section>

      {/* <Divider /> */}

      {/* ── 5. CTA — radial glow centrepiece ── */}
      <section className="relative px-8 py-24 text-center overflow-hidden max-w-6xl mx-auto">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 0%,rgba(139,92,246,0.12),transparent)",
          }}
        />
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-7
            text-[11px] font-semibold tracking-widest uppercase text-violet-400"
            style={{
              background: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.25)",
            }}
          >
            <Flame size={18} /> Ready to grow?
          </div>
          <h2 className="font-sora font-extrabold text-4xl md:text-5xl tracking-tight leading-tight mb-5">
            Want results
            <br />
            <span style={gradText}>like these?</span>
          </h2>
          <p className="text-md text-white/40 leading-relaxed mb-10 max-w-md mx-auto">
            Let&apos;s build your growth system — strategy, execution, and
            automation in one place.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              // href="https://vipprow.com/contact"
              onClick={() => scrollTo("contact")}
              className="px-8 py-4 rounded-xl font-sora font-bold text-sm text-white
              bg-linear-to-br from-violet-700 to-violet-500 hover:opacity-85 transition-opacity"
            >
              Book Free Strategy Call
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-8 py-4 rounded-xl text-sm font-medium text-white/60
              border border-purple-500/35 hover:border-purple-500/70 hover:text-white transition-all"
            >
              Get Free Marketing Audit
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
