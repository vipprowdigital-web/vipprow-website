// components/bento/AutoSaveAnimation.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

const files = [
  { angle: 0, delay: 0 },
  { angle: 72, delay: 0.6 },
  { angle: 144, delay: 1.2 },
  { angle: 216, delay: 1.8 },
  { angle: 288, delay: 2.4 },
];

const RADIUS = 90;

export function AutoSaveAnimation({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* pulse rings */}
      {!reduced &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full border"
            style={{ borderColor: "var(--primary)" }}
            initial={{ width: 40, height: 40, opacity: 0.6 }}
            animate={{ width: 220, height: 220, opacity: 0 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeOut",
            }}
          />
        ))}

      {/* central hub */}
      <div
        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
        style={{ background: "var(--primary)" }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          style={{ color: "var(--card)" }}
          animate={reduced ? undefined : { scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <path
            fill="currentColor"
            d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm-1 15l-5-5 1.4-1.4L11 14.2l6.6-6.6L19 9z"
          />
        </motion.svg>
      </div>

      {/* orbiting file chips converging inward */}
      {files.map((f, i) => {
        const rad = (f.angle * Math.PI) / 180;
        const startX = Math.cos(rad) * RADIUS;
        const startY = Math.sin(rad) * RADIUS;
        return (
          <motion.div
            key={i}
            className="absolute h-6 w-6 rounded-md border text-[10px] flex items-center justify-center"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--muted-foreground)",
            }}
            initial={{ x: startX, y: startY, opacity: 0, scale: 0.6 }}
            animate={
              reduced
                ? { x: startX, y: startY, opacity: 1 }
                : {
                    x: [startX, 0],
                    y: [startY, 0],
                    opacity: [0, 1, 0],
                    scale: [0.6, 1, 0.4],
                  }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: f.delay,
              ease: "easeInOut",
            }}
          >
            ▤
          </motion.div>
        );
      })}
    </div>
  );
}
