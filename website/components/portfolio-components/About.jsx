// components/About.jsx
"use client";

import { motion } from "framer-motion";
import { Target, Zap, Bot, TrendingUp } from "lucide-react";

const PILLARS = [
  {
    icon: <Target size={24} color="#8b5cf6" />,
    title: "Traffic Generation",
    desc: "Paid & organic strategies that bring the right audience",
  },
  {
    icon: <Zap size={24} color="#8b5cf6" />,
    title: "Lead Capture",
    desc: "High-converting funnels built to capture & qualify leads",
  },
  {
    icon: <Bot size={24} color="#8b5cf6" />,
    title: "Automation",
    desc: "Smart workflows that nurture leads without manual effort",
  },
  {
    icon: <TrendingUp size={24} color="#8b5cf6" />,
    title: "Conversion Optimization",
    desc: "Continuous testing to maximize every rupee spent",
  },
];

export default function About() {
  return (
    <section id="about" className="relative z-10 py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.p
          className="section-label mb-5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Vipprow
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="font-sora text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          We don&apos;t run ads.{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#8B5CF6,#c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            We build growth systems.
          </span>
        </motion.h2>

        {/* Tagline */}
        <motion.p
          className="text-white/45 text-md mb-12 max-w-lg leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.14 }}
        >
          Most agencies stop at running ads. We go beyond — designing complete,
          end-to-end growth engines for ambitious brands.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left: Description card */}
          <motion.div
            className="rounded-2xl p-9 flex flex-col gap-5 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* inner glow */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg,rgba(139,92,246,0.06),transparent)",
              }}
            />

            <p className="text-white/60 text-sm leading-relaxed relative z-10">
              Vipprow is a{" "}
              <strong className="text-white/90 font-semibold">
                new-age digital growth company
              </strong>{" "}
              focused on delivering real business outcomes — not just marketing
              services.
            </p>

            <div className="h-px bg-white/[0.07]" />

            <p className="text-white/60 text-sm leading-relaxed relative z-10">
              We design and execute{" "}
              <strong className="text-white/90 font-semibold">
                complete growth systems
              </strong>{" "}
              that are data-driven, scalable, and always ROI-focused.
            </p>

            <div className="h-px bg-white/[0.07]" />

            {/* Hindi line */}
            {/* <div
              className="flex items-start gap-3 rounded-xl p-4 relative z-10"
              style={{
                background: "rgba(139,92,246,0.10)",
                border: "1px solid rgba(139,92,246,0.28)",
              }}
            >
              <span className="text-lg">👉</span>
              <p className="text-white/80 text-sm italic leading-relaxed">
                <span className="not-italic font-semibold text-purple-300">
                  Simple baat:
                </span>{" "}
                Hum marketing nahi, business growth system banate hain.
              </p>
            </div> */}
          </motion.div>

          {/* Right: Pillars */}
          <div className="flex flex-col gap-4">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                className="flex items-center gap-4 rounded-2xl px-6 py-5 group cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                whileHover={{
                  x: 6,
                  borderColor: "rgba(139,92,246,0.45)",
                  background: "rgba(139,92,246,0.06)",
                  transition: { duration: 0.2 },
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{
                    background: "rgba(139,92,246,0.15)",
                    border: "1px solid rgba(139,92,246,0.25)",
                  }}
                >
                  {p.icon}
                </div>
                <div>
                  <h4 className="font-sora font-bold text-md text-white mb-0.5">
                    {p.title}
                  </h4>
                  <p className="text-sm text-white/40">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Powered by Croissix — full width */}
          <motion.div
            className="md:col-span-2 flex items-center gap-4 rounded-2xl px-7 py-5"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.7 }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full bg-violet-500 shrink-0
              shadow-[0_0_12px_#8B5CF6] animate-pulse"
            />
            <p className="text-white/50 text-sm">
              Powered by{" "}
              <strong className="text-purple-300 font-semibold">
                Croissix
              </strong>{" "}
              — every campaign is built to be measurable, scalable, and
              ROI-focused from day one.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
