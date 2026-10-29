"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MapPin, Facebook, Instagram, Sparkles, Star } from "lucide-react";

const PLATFORMS = [
  { icon: MapPin, label: "GBP", color: "#ef4444" },
  { icon: Facebook, label: "Facebook", color: "#1877F2" },
  { icon: Instagram, label: "Instagram", color: "#D92E7F" },
];

export function CroissixSkeleton() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((i) => (i + 1) % PLATFORMS.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 p-6">
      <div className="flex items-center gap-3">
        {PLATFORMS.map((platform, idx) => {
          const Icon = platform.icon;
          const active = idx === activeIdx;
          return (
            <motion.div
              key={platform.label}
              animate={{
                scale: active ? 1.15 : 1,
                boxShadow: active
                  ? `0 0 16px ${platform.color}66`
                  : "0 0 0px transparent",
              }}
              transition={{ duration: 0.4 }}
              className="h-11 w-11 rounded-full flex items-center justify-center border"
              style={{
                borderColor: active ? platform.color : "rgba(255,255,255,0.12)",
                background: active ? `${platform.color}1a` : "rgba(255,255,255,0.03)",
              }}
            >
              <Icon
                size={18}
                style={{ color: active ? platform.color : "#9ca3af" }}
              />
            </motion.div>
          );
        })}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="h-11 w-11 rounded-full flex items-center justify-center border border-cyan-400/30 bg-cyan-400/10"
        >
          <Sparkles size={18} className="text-cyan-400" />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono text-neutral-300"
        >
          <Star size={10} className="text-yellow-400" />
          Auto-replying on {PLATFORMS[activeIdx].label}…
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
