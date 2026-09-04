// components/bento/GrowthAlertAnimation.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ALERTS = [
  "New lead captured",
  "Campaign CTR up 18%",
  "Revenue milestone hit",
  "5 signups this hour",
  "ROAS crossed 4.2x",
];

export function GrowthAlertAnimation({
  className = "",
}: {
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % ALERTS.length),
      1800,
    );
    return () => clearInterval(id);
  }, [reduced]);

  const visible = ALERTS.slice(0)
    .map((_, i) => i)
    .filter((i) => {
      const diff = (index - i + ALERTS.length) % ALERTS.length;
      return diff < 3;
    });

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* rising sparkline */}
      <svg
        viewBox="0 0 300 120"
        className="absolute inset-0 h-full w-full opacity-30"
      >
        <motion.path
          d="M0,100 C40,90 60,60 90,65 C130,72 150,30 190,35 C220,38 250,10 300,15"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={reduced ? { pathLength: 1 } : { pathLength: [0, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* stacked alert toasts */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {visible
            .slice(-3)
            .reverse()
            .map((i) => (
              <motion.div
                key={ALERTS[i] + i}
                initial={{ y: 20, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-xs backdrop-blur-sm"
                style={{
                  background:
                    "color-mix(in oklch, var(--card) 85%, transparent)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: "var(--primary)" }}
                />
                {ALERTS[i]}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
