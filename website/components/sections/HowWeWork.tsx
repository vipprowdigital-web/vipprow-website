"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";

const STEPS = [
  {
    title: "Understand",
    text: "We learn about your business model, target market, service areas, ideal customers, and growth objectives.",
  },
  {
    title: "Strategize",
    text: "We identify relevant channels, campaign opportunities, messaging, and the digital assets required to reach your audience.",
  },
  {
    title: "Execute",
    text: "We implement the agreed strategy across advertising, website development, creative production, SEO, and automation.",
  },
  {
    title: "Optimize",
    text: "We review performance data, identify improvement opportunities, and refine campaigns and conversion journeys.",
  },
];

export default function HowWeWork() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // how many steps the reader has scrolled to; all of them when motion is reduced
  const [lit, setLit] = useState(reduce ? STEPS.length : 0);

  // the rail fills as the section scrolls through the screen
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduce) return;
    setLit(Math.min(STEPS.length, Math.ceil(p * STEPS.length - 0.05)));
  });

  return (
    <section aria-labelledby="how-we-work" className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="flex flex-col items-center px-2 text-center">
        <h2
          id="how-we-work"
          className="max-w-5xl font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl"
        >
          How Vipprow works with brands
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          From the first conversation to ongoing improvement, one clear process that turns your goals into
          measurable growth.
        </p>
      </div>

      <div ref={ref} className="mt-12 md:mt-16">

        {/* progress rail (desktop) */}
        <div className="relative mb-6 hidden h-2 rounded-full bg-white/10 md:block" aria-hidden="true">
          <motion.div
            className="absolute inset-y-0 left-0 origin-left rounded-full bg-linear-to-r from-blue-700 to-blue-400"
            style={{ scaleX: reduce ? 1 : scrollYProgress, width: "100%" }}
          />
        </div>

        <ol className="grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-4">
          {STEPS.map((step, i) => {
            const on = i < lit;
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className={`relative overflow-hidden rounded-3xl border p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl transition-[background-color,border-color] duration-700 md:min-h-72 md:p-7 ${
                  on ? "border-blue-300/40 bg-white/[0.14]" : "border-white/12 bg-white/[0.05]"
                }`}
              >
                <div className="relative flex h-full flex-col justify-between gap-10">
                  <h3 className="font-heading text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    {step.title}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-700 md:text-base ${on ? "text-white/85" : "text-white/55"}`}>
                    {step.text}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
