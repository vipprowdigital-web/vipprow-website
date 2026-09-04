// components/bento/RevenueReportAnimation.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useReducedMotion } from "framer-motion";

const BARS = [40, 65, 50, 80, 60, 95];

export function RevenueReportAnimation({
  className = "",
}: {
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced) {
      setCount(482600);
      return;
    }
    const controls = animate(0, 482600, {
      duration: 2.2,
      repeat: Infinity,
      repeatDelay: 2,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [reduced]);

  return (
    <div
      className={`relative flex flex-col justify-end gap-3 overflow-hidden p-4 ${className}`}
    >
      <div
        className="text-xs font-medium"
        style={{ color: "var(--muted-foreground)" }}
      >
        Total client revenue
      </div>
      <span
        ref={nodeRef}
        className="text-2xl font-semibold tabular-nums"
        style={{ color: "var(--foreground)" }}
      >
        ₹{count.toLocaleString("en-IN")}
      </span>

      <div className="flex h-24 items-end gap-2">
        {BARS.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md"
            style={{ background: "var(--primary)" }}
            initial={{ height: 0 }}
            animate={
              reduced
                ? { height: `${h}%` }
                : { height: [`0%`, `${h}%`, `${h}%`] }
            }
            transition={{
              duration: 1.4,
              delay: i * 0.12,
              repeat: Infinity,
              repeatDelay: 2.8,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
