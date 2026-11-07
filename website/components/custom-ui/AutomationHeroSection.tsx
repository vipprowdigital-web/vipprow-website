"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Task = { name: string; desc: string; product: "Croissix AI" | "Zentovix" };

// Real automations from Vipprow's own products, Croissix AI and Zentovix.
const TASKS: Task[] = [
  {
    name: "AI Auto-Review Reply Engine",
    desc: "Reads each review and writes a personalized, brand-aligned reply instantly.",
    product: "Croissix AI",
  },
  {
    name: "AI Post Creation & One-Click Publishing",
    desc: "Upload media and AI writes the post, optimized for local search.",
    product: "Croissix AI",
  },
  {
    name: "GBP Optimization Score Card",
    desc: "A live score out of 1000 shows exactly what to fix to climb rankings.",
    product: "Croissix AI",
  },
  {
    name: "Scribble it. Zentovix files it.",
    desc: "A quick note becomes a lead, tracked from Enquiry to Admitted.",
    product: "Zentovix",
  },
  {
    name: "Zentovix Assistant",
    desc: "Answers questions about your academy, its admissions and leads.",
    product: "Zentovix",
  },
];

const STEP_MS = 2200;

function AgentBoard() {
  const reduce = useReducedMotion();
  // which row is running; one extra step rests before the loop restarts
  const [step, setStep] = useState(reduce ? TASKS.length : 0);

  useEffect(() => {
    if (reduce) {
      setStep(TASKS.length);
      return;
    }
    const id = setInterval(() => setStep((s) => (s + 1) % (TASKS.length + 1)), STEP_MS);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div
      className="w-full max-w-xl rounded-3xl bg-white/5 p-4 sm:p-6"
      role="img"
      aria-label="Automations from Croissix AI and Zentovix: review replies, post publishing, a profile score card, lead filing and an assistant"
    >
      <p className="px-2 pb-3 font-heading text-sm font-semibold text-white/60">
        Running now in Croissix AI and Zentovix
      </p>

      <ul className="grid gap-2">
        {TASKS.map((t, i) => {
          const done = step > i;
          const running = step === i;
          return (
            <li
              key={t.name}
              className={`relative overflow-hidden rounded-2xl px-4 py-4 transition-colors duration-300 ${
                running ? "bg-blue-600" : "bg-white/5"
              }`}
            >
              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-heading text-sm font-semibold leading-snug text-white sm:text-base">
                    {t.name}
                  </p>
                  <p className={`mt-0.5 text-xs leading-snug sm:text-sm ${running ? "text-white/85" : "text-white/50"}`}>
                    {t.desc}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-300 ${
                    running
                      ? "bg-white text-blue-700"
                      : done
                        ? "bg-blue-600/25 text-blue-300"
                        : "bg-white/10 text-white/55"
                  }`}
                >
                  {t.product}
                </span>
              </div>

              {/* progress for the row that is running */}
              {running && !reduce && (
                <motion.span
                  key={`bar-${i}-${step}`}
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 bg-white/15"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function AutomationHeroSection() {
  return (
    <section className="relative bg-black px-4 pb-20 pt-32 md:px-6 md:pb-28 md:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Your AI workforce,
            <br />
            always on.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
            className="mt-6 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg"
          >
            From instant WhatsApp replies to invoice generation and CRM sync, Vipprow&apos;s AI agents handle the
            repetitive work around the clock, so your team only steps in when it actually matters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: "easeOut" }}
            className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-500 active:scale-95"
            >
              Talk to an Automation Expert
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <a
              href="#industries"
              className="inline-flex items-center justify-center rounded-full bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/15 active:scale-95"
            >
              See it by industry
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center lg:justify-end"
        >
          <AgentBoard />
        </motion.div>
      </div>
    </section>
  );
}
