"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

type VizKind = "brands" | "leads" | "revenue";

type Stat = {
  viz: VizKind;
  value: number;
  suffix: string;
  label: string;
  /** desktop height of the block, so the row climbs left to right */
  height: string;
  /** card surface */
  tone: string;
  /** ambient glow colours (top-right, bottom-left) */
  glowA: string;
  glowB: string;
  shadow: string;
  /** diagonal light sweep across the card */
  shine: boolean;
};

// Ordered smallest → biggest: the row climbs, and revenue is the summit.
const STATS: Stat[] = [
  {
    viz: "brands",
    value: 150,
    suffix: "+",
    label: "Brands",
    height: "md:min-h-[28rem]",
    tone: "bg-white/[0.06]",
    glowA: "",
    glowB: "",
    shadow: "",
    shine: false,
  },
  {
    viz: "leads",
    value: 10,
    suffix: "k",
    label: "Quality Leads",
    height: "md:min-h-[28rem]",
    tone: "bg-white/[0.11]",
    glowA: "",
    glowB: "",
    shadow: "",
    shine: false,
  },
  {
    viz: "revenue",
    value: 90,
    suffix: " Cr+",
    label: "Revenue",
    height: "md:min-h-[28rem]",
    tone: "bg-linear-to-br from-blue-600 via-blue-900 to-black",
    glowA: "bg-sky-400/30",
    glowB: "bg-blue-500/30",
    shadow: "shadow-[0_30px_80px_-20px_rgba(37,99,235,0.55)]",
    shine: true,
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

function useVizStart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = !!useReducedMotion();
  return { ref, run: inView, reduce };
}

/* ---------- shared card pieces ---------- */

// Glow orbs, faint grid and a slow shine sweep behind every card.
function Ambient({ stat, reduce }: { stat: Stat; reduce: boolean }) {
  return (
    <>
      <motion.span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl ${stat.glowA}`}
        animate={reduce ? undefined : { scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full blur-3xl ${stat.glowB}`}
        animate={reduce ? undefined : { scale: [1.2, 1, 1.2], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      {!reduce && stat.shine && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["0%", "600%"] }}
          transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
        />
      )}
    </>
  );
}

function Chip({ children, reduce, dot }: { children: ReactNode; reduce: boolean; dot: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium tracking-wide text-white/90 backdrop-blur">
      <span className="relative flex h-2 w-2">
        {!reduce && (
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${dot}`} />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
      </span>
      {children}
    </span>
  );
}

function Badge({
  children,
  run,
  reduce,
  delay,
}: {
  children: ReactNode;
  run: boolean;
  reduce: boolean;
  delay: number;
}) {
  return (
    <motion.span
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : -8 }}
      animate={run ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay, duration: 0.5 }}
      className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-semibold text-emerald-300"
    >
      {children}
    </motion.span>
  );
}

const UpArrow = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 15l5-5 4 4 6-7M14 7h6v6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- Brands ---------- */

// A wall of tiles pops in, then a light wave travels across it.
function BrandsContent({ stat }: { stat: Stat }) {
  const { ref, run, reduce } = useVizStart();
  const cols = 6;
  const rows = 3;
  return (
    <div ref={ref} className="relative z-10 flex h-full flex-col justify-between gap-6">
      {/* <div className="flex items-center justify-between gap-3">
        <Chip reduce={reduce} dot="bg-sky-300">
          Trusted by
        </Chip>
        <Badge run={run} reduce={reduce} delay={1.2}>
          <UpArrow />
          Growing
        </Badge>
      </div> */}

      <div aria-hidden="true" className="grid grid-cols-6 gap-2">
        {Array.from({ length: cols * rows }).map((_, i) => {
          const c = i % cols;
          const r = Math.floor(i / cols);
          return (
            <motion.span
              key={i}
              className="block aspect-square rounded-lg border border-white/10 bg-white"
              initial={{ scale: reduce ? 1 : 0, opacity: reduce ? 0.2 : 0 }}
              animate={
                run && !reduce
                  ? { scale: 1, opacity: [0, 0.9, 0.2, 0.2, 0.2] }
                  : undefined
              }
              transition={{
                duration: 4,
                delay: 0.2 + (c + r) * 0.12,
                times: [0, 0.1, 0.25, 0.9, 1],
                repeat: Infinity,
                repeatDelay: 0.8,
                ease: "easeOut",
              }}
            />
          );
        })}
      </div>

      <div>
        <p className="font-heading text-5xl font-semibold leading-none tracking-tight sm:text-6xl">
          <CountUp value={stat.value} suffix="" />
          <span className="ml-0.5 text-3xl text-white/70 sm:text-4xl">+</span>
        </p>
        <p className="mt-3 text-lg font-medium text-white/85 md:text-xl">{stat.label}</p>
        <p className="mt-1 text-xs text-white/50">Brands and businesses we&apos;ve worked with</p>
      </div>
    </div>
  );
}

/* ---------- Quality leads ---------- */

// Many enquiries drop in, the funnel narrows them, qualified leads come out.
function LeadsContent({ stat }: { stat: Stat }) {
  const { ref, run, reduce } = useVizStart();
  const drops = [
    { x: 30, d: 0 },
    { x: 62, d: 0.5 },
    { x: 94, d: 1.0 },
    { x: 126, d: 0.25 },
    { x: 158, d: 0.75 },
    { x: 190, d: 1.25 },
    { x: 46, d: 1.5 },
    { x: 174, d: 1.75 },
  ];
  return (
    <div ref={ref} className="relative z-10 flex h-full flex-col justify-between gap-5">
      <div className="flex items-center justify-between gap-3">
        {/* <Chip reduce={reduce} dot="bg-indigo-300">
          Lead quality
        </Chip> */}
        <Badge run={run} reduce={reduce} delay={1.2}>
          <UpArrow />
          Qualified
        </Badge>
      </div>

      <div aria-hidden="true" className="flex justify-center">
        <svg viewBox="0 0 220 130" className="h-28 w-full max-w-[16rem] md:h-32">
          <defs>
            <linearGradient id="lead-funnel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.28" />
            </linearGradient>
          </defs>
          <motion.polygon
            points="8,14 212,14 128,74 128,112 92,112 92,74"
            fill="url(#lead-funnel)"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1"
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={run ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8 }}
          />
          {drops.map((dot, i) => (
            <motion.circle
              key={i}
              r={4}
              fill="#fff"
              initial={{ cx: dot.x, cy: reduce ? 60 : 0, opacity: reduce ? 0.7 : 0 }}
              animate={
                run && !reduce
                  ? {
                      cx: [dot.x, dot.x, 110, 110],
                      cy: [0, 22, 82, 124],
                      opacity: [0, 0.85, 1, 0],
                    }
                  : undefined
              }
              transition={{
                duration: 2.4,
                delay: dot.d,
                times: [0, 0.3, 0.65, 1],
                ease: "easeIn",
                repeat: Infinity,
                repeatDelay: 0.6,
              }}
            />
          ))}
          {/* qualified output */}
          <motion.circle
            cx="110"
            cy="122"
            r="6"
            fill="#a5b4fc"
            animate={run && !reduce ? { opacity: [0.4, 1, 0.4], r: [5, 7, 5] } : undefined}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div>
        <p className="font-heading text-5xl font-semibold leading-none tracking-tight sm:text-6xl">
          <CountUp value={stat.value} suffix="" />
          <span className="ml-0.5 bg-linear-to-r from-indigo-200 to-white bg-clip-text text-4xl text-transparent sm:text-5xl">
            k
          </span>
        </p>
        <p className="mt-3 text-lg font-medium text-white/85 md:text-xl">{stat.label}</p>
        <p className="mt-1 text-xs text-white/50">Enquiries filtered down to buyers</p>
      </div>
    </div>
  );
}

/* ---------- Revenue (hero card) ---------- */

const LINE =
  "M0,104 C26,100 38,88 58,90 S92,74 118,66 S158,68 180,52 S228,34 252,26 S278,14 296,8";

function RevenueContent({ stat }: { stat: Stat }) {
  const { ref, run, reduce } = useVizStart();
  const live = run && !reduce;
  const ticks = ["Jan", "Mar", "May", "Jul", "Sep", "Now"];

  return (
    <div ref={ref} className="relative z-10 flex h-full flex-col justify-between gap-6">
      <div className="flex items-center justify-between gap-3">
        <Chip reduce={reduce} dot="bg-emerald-400">
          Client revenue
        </Chip>
        <Badge run={run} reduce={reduce} delay={1.4}>
          <UpArrow />
          Growing
        </Badge>
      </div>

      <div aria-hidden="true" className="relative">
        <svg viewBox="0 0 310 120" className="h-28 w-full overflow-visible md:h-36" preserveAspectRatio="none">
          <defs>
            <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rev-stroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          {[30, 60, 90].map((y) => (
            <line key={y} x1="0" x2="310" y1={y} y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 5" />
          ))}
          <motion.path
            d={`${LINE} L296,120 L0,120 Z`}
            fill="url(#rev-fill)"
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={run ? { opacity: 1 } : undefined}
            transition={{ delay: 0.9, duration: 1 }}
          />
          <motion.path
            d={LINE}
            fill="none"
            stroke="url(#rev-stroke)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={run ? { pathLength: 1 } : undefined}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.g
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={run ? { opacity: 1 } : undefined}
            transition={{ delay: 1.7, duration: 0.3 }}
          >
            {live && (
              <motion.circle
                cx="296"
                cy="8"
                fill="#fff"
                initial={{ r: 5, opacity: 0.5 }}
                animate={{ r: [5, 16], opacity: [0.5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <circle cx="296" cy="8" r="5" fill="#fff" />
          </motion.g>
        </svg>
        <div className="mt-2 flex justify-between text-[10px] font-medium uppercase tracking-wider text-white/40">
          {ticks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      <div>
        <p className="flex items-baseline gap-1 font-heading text-5xl font-semibold leading-none tracking-tight sm:text-6xl lg:text-7xl">
          <span className="text-3xl text-white/70 sm:text-4xl lg:text-5xl">₹</span>
          <CountUp value={stat.value} suffix="" />
          <span className="ml-1 bg-linear-to-r from-sky-200 to-white bg-clip-text text-3xl text-transparent sm:text-4xl lg:text-5xl">
            Cr+
          </span>
        </p>
        <p className="mt-3 text-lg font-medium text-white/85 md:text-xl">Revenue generated</p>
        <p className="mt-1 text-xs text-white/50">Combined client revenue, as reported by clients</p>
      </div>
    </div>
  );
}

const CONTENT: Record<VizKind, (p: { stat: Stat }) => React.JSX.Element> = {
  brands: BrandsContent,
  leads: LeadsContent,
  revenue: RevenueContent,
};

export default function WhyUsStats() {
  const reduce = !!useReducedMotion();
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

      <ul className="mt-12 grid grid-cols-1 items-stretch gap-3 md:mt-16 md:grid-cols-3 md:gap-4">
        {STATS.map((stat, i) => {
          const Content = CONTENT[stat.viz];
          return (
            <motion.li
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: "easeOut" }}
              className={`group relative flex min-h-56 flex-col overflow-hidden rounded-3xl border border-white/10 p-6 text-white transition-transform duration-300 hover:-translate-y-1 md:p-8 [&>div]:flex-1 ${stat.height} ${stat.tone} ${stat.shadow}`}
            >
              {stat.viz === "revenue" && <Ambient stat={stat} reduce={reduce} />}
              <Content stat={stat} />
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
