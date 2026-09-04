// components/bento/AnalyticsAnimation.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

const PATH = "M10,90 L60,70 L110,78 L160,40 L210,52 L260,20 L290,28";

export function AnalyticsAnimation({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg viewBox="0 0 300 120" className="h-full w-full">
        <defs>
          <linearGradient id="analyticsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.path
          d={`${PATH} L290,120 L10,120 Z`}
          fill="url(#analyticsFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <motion.path
          d={PATH}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={reduced ? { pathLength: 1 } : { pathLength: [0, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {!reduced && (
          <motion.circle
            r="5"
            fill="var(--card)"
            stroke="var(--primary)"
            strokeWidth="2"
            animate={{
              cx: [10, 60, 110, 160, 210, 260, 290],
              cy: [90, 70, 78, 40, 52, 20, 28],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </svg>

      <motion.div
        className="absolute right-3 top-3 rounded-full px-2 py-1 text-[10px] font-medium"
        style={{ background: "var(--secondary)", color: "var(--card)" }}
        animate={reduced ? undefined : { opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.6, repeat: Infinity }}
      >
        +24.6%
      </motion.div>
    </div>
  );
}
