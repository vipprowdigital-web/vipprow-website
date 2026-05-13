"use client";

import { useState } from "react";
import { FEATURES } from "@/data/features";
import { motion, AnimatePresence } from "framer-motion";

export default function MultiSectionScroller() {
  const [active, setActive] = useState(FEATURES[0].key);
  const current = FEATURES.find((f) => f.key === active)!;

  return (
    <section className=" text-white">
      <div className="mx-auto max-w-7xl">
        {/* TABS */}
        <div className="relative mb-6 flex gap-10 text-sm">
          {FEATURES.map((item) => {
            const isActive = active === item.key;

            return (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className="relative pb-4 font-medium transition"
                style={{
                  color: isActive ? item.color : "#9ca3af",
                }}
              >
                {item.label}

                {isActive && (
                  <motion.span
                    layoutId="active-tab"
                    className="absolute left-0 bottom-0 h-[2px] w-full"
                    style={{ backgroundColor: item.color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* COLORED CONTAINER */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-3xl p-10"
            style={{ backgroundColor: current.color }}
          >
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[420px_1fr]">
              {/* LEFT PANEL */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-semibold text-black">
                  {current.title}
                </h2>
                <p className="mt-4 max-w-sm text-black/80">
                  {current.description}
                </p>

                {/* mock dashboard image placeholder */}
                <div className="mt-6 aspect-video rounded-xl bg-black/20" />
              </motion.div>

              {/* RIGHT SCROLLER */}
              <div className="overflow-hidden">
                <motion.div
                  className="flex gap-6"
                  initial="hidden"
                  animate="show"
                  variants={{
                    show: { transition: { staggerChildren: 0.12 } },
                  }}
                >
                  {current.cards.map((card, i) => (
                    <motion.div
                      key={i}
                      variants={{
                        hidden: { opacity: 0, x: 60 },
                        show: { opacity: 1, x: 0 },
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="min-w-[260px] rounded-2xl bg-[#1f1f1f] p-6"
                    >
                      <h3 className="text-base font-semibold">{card.title}</h3>
                      <p className="mt-3 text-sm text-zinc-400">{card.text}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
