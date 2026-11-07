"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";

const STAGES = ["Enquiry", "Follow-up", "Counselling", "Admitted"];

export function ZentovixSkeleton() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((i) => (i + 1) % STAGES.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  const admitted = activeIdx === STAGES.length - 1;

  return (
    <div className="h-full flex flex-col items-center justify-center gap-5 p-6">
      <div className="flex items-center gap-2">
        {STAGES.map((stage, idx) => {
          const reached = idx <= activeIdx;
          const active = idx === activeIdx;
          return (
            <div key={stage} className="flex items-center gap-2">
              <motion.div
                animate={{ scale: active ? 1.12 : 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className="h-9 w-9 rounded-full flex items-center justify-center border transition-colors duration-300"
                  style={{
                    borderColor: reached ? "#22d3ee" : "rgba(255,255,255,0.12)",
                    background: reached
                      ? "rgba(34,211,238,0.14)"
                      : "rgba(255,255,255,0.03)",
                    boxShadow: active ? "0 0 16px rgba(34,211,238,0.4)" : "none",
                  }}
                >
                  {reached ? (
                    <Check size={15} className="text-cyan-400" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
                  )}
                </div>
                <span
                  className={`text-[9px] ${
                    reached ? "text-neutral-200" : "text-neutral-500"
                  }`}
                >
                  {stage}
                </span>
              </motion.div>
              {idx < STAGES.length - 1 && (
                <span
                  className="h-px w-3 -mt-4 transition-colors duration-300"
                  style={{
                    background:
                      idx < activeIdx ? "#22d3ee" : "rgba(255,255,255,0.15)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={admitted ? "done" : "going"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-neutral-300"
        >
          {admitted
            ? "From first call to first class"
            : "Track every lead, follow-up and fee"}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
