"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Zap } from "lucide-react";

const TASKS = [
  { label: "Email replies", color: "#3b82f6" },
  { label: "Invoice gen.", color: "#a855f7" },
  { label: "CRM sync", color: "#f59e0b" },
  { label: "File report", color: "#10b981" },
  { label: "Team alerts", color: "#ec4899" },
  { label: "DB updates", color: "#06b6d4" },
];

interface DoneEntry {
  uid: number;
  taskIdx: number;
}

export function BusinessAutomationSkeleton() {
  const [phase, setPhase] = useState<"idle" | "processing">("idle");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [doneList, setDoneList] = useState<DoneEntry[]>([]);
  const [count, setCount] = useState(0);
  const currentIdxRef = useRef(0);
  const uidRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const idx = currentIdxRef.current;
      setPhase("processing");

      const timer = setTimeout(() => {
        setDoneList((prev) =>
          [{ uid: uidRef.current++, taskIdx: idx }, ...prev].slice(0, 3),
        );
        setCount((c) => c + 1);
        const nextIdx = (idx + 1) % TASKS.length;
        currentIdxRef.current = nextIdx;
        setCurrentIdx(nextIdx);
        setPhase("idle");
      }, 1200);

      return () => clearTimeout(timer);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const queueStart =
    phase === "processing"
      ? (currentIdx + 1) % TASKS.length
      : currentIdx;
  const queueItems = [
    TASKS[queueStart],
    TASKS[(queueStart + 1) % TASKS.length],
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center gap-3 p-3">
      {/* Three-column pipeline */}
      <div className="w-full flex items-start gap-2">
        {/* Queue column */}
        <div className="flex-1 min-w-0">
          <p className="text-[7px] font-mono text-[#484f58] tracking-widest uppercase mb-1.5 text-center">
            Queue
          </p>
          <div className="space-y-1.5 min-h-[52px]">
            <AnimatePresence mode="popLayout">
              {queueItems.map((task, i) => (
                <motion.div
                  key={`q-${currentIdx}-${i}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 14, scale: 0.9 }}
                  transition={{ duration: 0.28, delay: i * 0.06 }}
                  className="rounded-md px-2 py-1 text-[7.5px] font-mono font-medium border truncate"
                  style={{
                    background: `${task.color}14`,
                    borderColor: `${task.color}30`,
                    color: task.color,
                  }}
                >
                  {task.label}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* AI Engine column */}
        <div className="flex flex-col items-center w-[58px] shrink-0">
          <p className="text-[7px] font-mono text-[#484f58] tracking-widest uppercase mb-1.5">
            AI
          </p>
          <div className="relative flex items-center justify-center w-11 h-11">
            {phase === "processing" &&
              [0, 1].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-cyan-400/50"
                  animate={{ scale: [1, 1.85 + i * 0.4], opacity: [0.6, 0] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay: i * 0.38,
                    ease: "easeOut",
                  }}
                />
              ))}
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center z-10 transition-all duration-500"
              style={{
                background: "rgba(6,182,212,0.12)",
                border: `1.5px solid ${
                  phase === "processing"
                    ? "rgba(6,182,212,0.75)"
                    : "rgba(6,182,212,0.28)"
                }`,
                boxShadow:
                  phase === "processing"
                    ? "0 0 20px rgba(6,182,212,0.35)"
                    : "none",
              }}
            >
              <Zap
                size={16}
                className="text-cyan-400 transition-opacity duration-300"
                style={{ opacity: phase === "processing" ? 1 : 0.5 }}
              />
            </div>
          </div>
          <div className="h-4 mt-0.5 flex items-center justify-center">
            <AnimatePresence>
              {phase === "processing" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                  className="text-[6px] font-mono text-cyan-400 text-center"
                >
                  running…
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Done column */}
        <div className="flex-1 min-w-0">
          <p className="text-[7px] font-mono text-[#484f58] tracking-widest uppercase mb-1.5 text-center">
            Done
          </p>
          <div className="space-y-1.5 min-h-[52px]">
            <AnimatePresence mode="popLayout">
              {doneList.map(({ uid, taskIdx }) => (
                <motion.div
                  key={uid}
                  initial={{ opacity: 0, scale: 0.82, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 220,
                    damping: 18,
                  }}
                  className="rounded-md px-2 py-1 text-[7.5px] font-mono flex items-center gap-1 border"
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    borderColor: "rgba(34,197,94,0.22)",
                    color: "#4ade80",
                  }}
                >
                  <span className="shrink-0">✓</span>
                  <span className="truncate">{TASKS[taskIdx].label}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="w-full flex items-center gap-2">
        <span className="text-[7px] font-mono text-[#484f58] shrink-0">
          automated
        </span>
        <motion.span
          key={count}
          initial={{ scale: 1.45, color: "#4ade80" }}
          animate={{ scale: 1, color: "#e2e8f0" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-[11px] font-mono font-bold tabular-nums shrink-0"
        >
          {String(count).padStart(3, "0")}
        </motion.span>
        {/* Shimmer bar */}
        <div className="flex-1 h-[3px] rounded-full overflow-hidden bg-[rgba(255,255,255,0.07)] relative">
          <motion.div
            className="h-full w-full absolute"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #06b6d4 40%, #22c55e 70%, transparent 100%)",
            }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <span className="text-[7px] font-mono text-[#4ade80] shrink-0">
          98%
        </span>
      </div>
    </div>
  );
}
