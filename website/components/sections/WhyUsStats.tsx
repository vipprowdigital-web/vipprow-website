"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

type VizKind = "brands" | "leads" | "revenue";

type Stat = {
  viz: VizKind;
  value: number;
  suffix: string;
  label: string;
  /** desktop height of the block, so the row climbs left to right */
  height: string;
  tone: string;
};

// Ordered smallest → biggest: the row climbs, and revenue is the summit.
const STATS: Stat[] = [
  {
    viz: "brands",
    value: 150,
    suffix: "+",
    label: "Brands",
    height: "md:min-h-[17rem]",
    tone: "bg-white/[0.06] text-white",
  },
  {
    viz: "leads",
    value: 10,
    suffix: "k",
    label: "Quality Leads",
    height: "md:min-h-[22rem]",
    tone: "bg-white/[0.11] text-white",
  },
  {
    viz: "revenue",
    value: 90,
    suffix: " Cr+",
    label: "Revenue",
    height: "md:min-h-[27rem]",
    tone: "bg-linear-to-br from-blue-600 via-blue-900 to-black text-white",
  },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

/* ---------- small per-card animations ---------- */

function useVizStart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = !!useReducedMotion();
  return { ref, run: inView, reduce };
}

// Brands: a wall of tiles pops in, then tiles keep lighting up one by one.
function BrandsViz() {
  const { ref, run, reduce } = useVizStart();
  const tiles = Array.from({ length: 15 });
  return (
    <div ref={ref} aria-hidden="true" className="grid grid-cols-5 gap-1.5">
      {tiles.map((_, i) => (
        <motion.span
          key={i}
          className="block h-4 w-4 rounded-md bg-white md:h-5 md:w-5"
          initial={{ scale: reduce ? 1 : 0, opacity: reduce ? 0.35 : 0 }}
          animate={
            run && !reduce
              ? { scale: 1, opacity: [0, 0.95, 0.3, 0.3, 0.95, 0.3] }
              : undefined
          }
          transition={{
            duration: 4.2,
            delay: 0.3 + ((i * 7) % 15) * 0.09,
            times: [0, 0.12, 0.3, 0.6, 0.78, 1],
            repeat: Infinity,
            repeatDelay: 0.6,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// Quality leads: many enquiries drop in, the funnel narrows them, fewer come out.
function LeadsViz() {
  const { ref, run, reduce } = useVizStart();
  const drops = [
    { x: 14, d: 0 },
    { x: 34, d: 0.5 },
    { x: 54, d: 1.0 },
    { x: 74, d: 0.25 },
    { x: 94, d: 0.75 },
    { x: 114, d: 1.25 },
  ];
  return (
    <div ref={ref} aria-hidden="true">
      <svg viewBox="0 0 128 112" className="h-20 w-24 md:h-28 md:w-32">
        <polygon points="0,18 128,18 84,66 84,112 44,112 44,66" fill="rgba(255,255,255,0.12)" />
        {drops.map((dot, i) => (
          <motion.circle
            key={i}
            r={4.5}
            fill="#fff"
            initial={{ cx: dot.x, cy: reduce ? 60 : -6, opacity: reduce ? 0.7 : 0 }}
            animate={
              run && !reduce
                ? {
                    cx: [dot.x, dot.x, 64, 64],
                    cy: [-6, 24, 70, 118],
                    opacity: [0, 0.8, 1, 0],
                  }
                : undefined
            }
            transition={{
              duration: 2.4,
              delay: dot.d,
              times: [0, 0.3, 0.65, 1],
              ease: "easeIn",
              repeat: Infinity,
              repeatDelay: 0.4,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// Revenue: bars climb, the tallest one in solid white.
function RevenueViz() {
  const { ref, run, reduce } = useVizStart();
  const heights = [28, 40, 34, 56, 70, 92];
  return (
    <div ref={ref} aria-hidden="true" className="flex h-20 items-end gap-1.5 md:h-24">
      {heights.map((h, i) => {
        const last = i === heights.length - 1;
        return (
          <motion.span
            key={i}
            className={`block w-3 origin-bottom rounded-md md:w-3.5 ${last ? "bg-white" : "bg-white/35"}`}
            style={{ height: `${h}%` }}
            initial={{ scaleY: reduce ? 1 : 0 }}
            animate={run && !reduce ? { scaleY: [0, 1, 1, 0.82, 1] } : undefined}
            transition={{
              duration: 3.6,
              delay: i * 0.12,
              times: [0, 0.25, 0.7, 0.85, 1],
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 0.6,
            }}
          />
        );
      })}
    </div>
  );
}

const VIZ: Record<VizKind, () => React.JSX.Element> = {
  brands: BrandsViz,
  leads: LeadsViz,
  revenue: RevenueViz,
};

export default function WhyUsStats() {
  return (
    <section
      aria-labelledby="why-us-heading"
      className="mx-auto max-w-7xl px-4 md:px-6"
    >
      <motion.h2
        id="why-us-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-5xl text-center font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl"
      >
        You know? Why Us?
      </motion.h2>

      <ul className="mt-12 grid grid-cols-1 items-end gap-3 md:mt-16 md:grid-cols-3 md:gap-4">
        {STATS.map((stat, i) => {
          const Viz = VIZ[stat.viz];
          return (
          <motion.li
            key={stat.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
            className={`group relative flex min-h-56 flex-col justify-end rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1 md:p-8 ${stat.height} ${stat.tone}`}
          >
            <div className="absolute right-5 top-5 md:right-8 md:top-8">
              <Viz />
            </div>
            <p className="font-heading text-4xl font-semibold leading-none tracking-tight sm:text-5xl lg:text-6xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 text-lg font-medium text-white/75 md:text-xl">
              {stat.label}
            </p>
          </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
