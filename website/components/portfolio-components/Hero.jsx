"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { scrollTo } from "../../utils/scrollTo";
// import { useRouter } from "next/router";
// useRouter from next/router is not compatible with Next.js App Router (use client components)
// Use next/navigation instead for App Router
import { useRouter } from "next/navigation";

// ── Animation variants ──────────────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ── Animated SVG mesh ───────────────────────────────────────────────────────
function Mesh() {
  return (
    <div
      className="absolute top-1/2 left-1/2 w-145 h-145 pointer-events-none opacity-[0.11]"
      style={{
        transform: "translate(-50%,-58%)",
        animation: "rotateSlow 22s linear infinite",
      }}
    >
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle
          cx="200"
          cy="200"
          r="185"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="0.6"
        />
        <circle
          cx="200"
          cy="200"
          r="145"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="0.5"
        />
        <circle
          cx="200"
          cy="200"
          r="105"
          fill="none"
          stroke="#EC4899"
          strokeWidth="0.5"
        />
        <circle
          cx="200"
          cy="200"
          r="65"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="0.6"
        />
        <line
          x1="15"
          y1="200"
          x2="385"
          y2="200"
          stroke="#8B5CF6"
          strokeWidth="0.3"
          opacity="0.5"
        />
        <line
          x1="200"
          y1="15"
          x2="200"
          y2="385"
          stroke="#8B5CF6"
          strokeWidth="0.3"
          opacity="0.5"
        />
        <line
          x1="68"
          y1="68"
          x2="332"
          y2="332"
          stroke="#EC4899"
          strokeWidth="0.3"
          opacity="0.35"
        />
        <line
          x1="332"
          y1="68"
          x2="68"
          y2="332"
          stroke="#EC4899"
          strokeWidth="0.3"
          opacity="0.35"
        />
        <polygon
          points="200,20 370,310 30,310"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="0.4"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  // const scrollToContact = () =>
  //   document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  // const scrollToCases = () =>
  //   document.getElementById("cases")?.scrollIntoView({ behavior: "smooth" });
  const router = useRouter();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center
                 text-center px-6 pt-28 pb-16 overflow-hidden"
    >
      {/* Radial violet glow */}
      <div
        className="absolute top-1/2 left-1/2 w-175 h-175 pointer-events-none"
        style={{
          transform: "translate(-50%,-62%)",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 68%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 78% 58% at 50% 38%, black 0%, transparent 100%)",
        }}
      />

      {/* Mesh SVG */}
      <Mesh />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Badge */}
        {/* <motion.div
          variants={item}
          className="inline-flex items-center gap-2 glass-card border border-white/[0.08]
                     px-4 py-1.5 rounded-full text-xs text-white/50 mb-8"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-violet-500"
            style={{
              boxShadow: "0 0 8px #8B5CF6",
              animation: "pulseDot 2s infinite",
            }}
          />
          India's Premier Digital Growth Agency
        </motion.div> */}

        {/* Headline */}
        <motion.h1
          variants={item}
          className="font-sora text-4xl sm:text-6xl md:text-6xl font-extrabold leading-[1.06] tracking-[-0.03em] mb-6"
        >
          We Build Systems That Generate
          {/* <br /> */}{" "}
          <span className="violet-gradient-text">
            Leads, Sales & Scalable Growth .
          </span>
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          variants={item}
          className="max-w-130 text-white/65 text-lg md:text-lg leading-relaxed font-light mb-10"
        >
          Vipprow helps businesses grow faster using AI-powered marketing,
          automation & performance-driven strategies
          <br className="hidden sm:block" />
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-3 items-center"
        >
          {/* <motion.button
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 48px rgba(139,92,246,0.55)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 text-white font-medium text-base
                       px-7 py-3.5 rounded-xl border-none cursor-pointer"
            style={{
              background: "linear-gradient(135deg,#8B5CF6,#6D28D9)",
              boxShadow: "0 0 28px rgba(139,92,246,0.35)",
            }}
          >
            Book a Strategy Call <ArrowRight size={16} />
          </motion.button> */}
          <motion.button
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 48px rgba(139,92,246,0.55)",
            }}
            whileTap={{ scale: 0.97 }}
            // onClick={() => window.open("https://vipprow.com/contact", "_blank")}
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center gap-2 text-white font-medium text-base
             px-7 py-3.5 rounded-xl border-none cursor-pointer"
            style={{
              background: "linear-gradient(135deg,#8B5CF6,#6D28D9)",
              boxShadow: "0 0 28px rgba(139,92,246,0.35)",
            }}
          >
            Book a Strategy Call <ArrowRight size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.07)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/portfolio/client-experience")} // change route here
            className="inline-flex items-center gap-2 text-white font-medium text-base
             px-7 py-3.5 rounded-xl cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Play size={14} fill="white" /> View Our Work
          </motion.button>
          {/* <motion.button
            whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.07)" }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToCases}
            className="inline-flex items-center gap-2 text-white font-medium text-base
                       px-7 py-3.5 rounded-xl cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Play size={14} fill="white" /> View Our Work
          </motion.button> */}
        </motion.div>

        {/* Trust strip */}
        <motion.p
          variants={item}
          className="mt-12 text-xs text-white/30 tracking-widest uppercase font-sora"
        >
          Trusted by 50+ high-growth brands across India
        </motion.p>
      </motion.div>
    </section>
  );
}
