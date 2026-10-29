"use client";

import Image from "next/image";
import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  Award,
  BadgeCheck,
  BarChart3,
  Bot,
  Code2,
  Linkedin,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import { founder } from "@/data/founder";

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#3b82f6";
const EXPERTISE_ICONS: LucideIcon[] = [Megaphone, Bot, Code2, BarChart3];

/* ---------- shared helpers ---------- */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Avatar({
  name,
  image,
  sizes,
  className = "",
  imageClassName = "",
}: {
  name: string;
  image: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`relative overflow-hidden bg-linear-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 ${className}`}
    >
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes={sizes}
          className={`object-cover ${imageClassName}`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-heading text-5xl font-semibold text-zinc-500 dark:text-zinc-500">
          {initials}
        </div>
      )}
    </div>
  );
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (!match || !inView || !ref.current) return;
    const node = ref.current;
    if (reduce) {
      node.textContent = `${target}${suffix}`;
      return;
    }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, target, suffix, match]);

  return <span ref={ref}>{match ? `0${suffix}` : value}</span>;
}

function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white/60 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-blue-500/50 dark:border-zinc-800 dark:bg-zinc-900/40 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(260px circle at var(--sx, 50%) var(--sy, 50%), ${ACCENT}22, transparent 70%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ---------- hero ---------- */

const heroStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function FounderHero() {
  const reduce = useReducedMotion();
  return (
    <div className="relative grid items-center gap-12 lg:grid-cols-[420px_1fr] lg:gap-16">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: `radial-gradient(circle, ${ACCENT}, transparent 70%)` }}
      />

      {/* portrait */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mx-auto w-full max-w-sm lg:max-w-none"
      >
        <div className="relative rounded-[2rem] p-[2px]">
          {/* rotating gradient border */}
          <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background: `conic-gradient(from 0deg, transparent 0 55%, ${ACCENT} 80%, transparent 100%)`,
              }}
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 7, ease: "linear", repeat: Infinity }}
            />
          </div>
          <Avatar
            name={founder.name}
            image={founder.image}
            sizes="(max-width: 1024px) 384px, 420px"
            className="relative aspect-4/5 w-full rounded-[calc(2rem-2px)]"
          />
        </div>

        {/* floating chips */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
          className="absolute -left-3 bottom-10 sm:-left-8"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white/90 px-4 py-3 shadow-lg backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/90"
          >
            <BadgeCheck className="h-5 w-5" style={{ color: ACCENT }} />
            <span className="text-sm font-medium text-zinc-900 dark:text-white">
              {founder.stats[0]?.value} {founder.stats[0]?.label}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* copy */}
      <motion.div
        variants={heroStagger}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="relative"
      >
        <motion.span
          variants={heroItem}
          className="inline-flex items-center rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400"
        >
          {founder.designation}
        </motion.span>

        <motion.h2
          variants={heroItem}
          className="mt-5 font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white"
        >
          {founder.name}
        </motion.h2>

        <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {founder.bio.map((p, i) => (
            <motion.p key={i} variants={heroItem}>
              {p}
            </motion.p>
          ))}
        </div>

        <motion.div variants={heroItem} className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
          {founder.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-zinc-200 bg-white/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <div className="font-heading text-3xl font-semibold tabular-nums text-zinc-900 sm:text-4xl dark:text-white">
                <CountUp value={s.value} />
              </div>
              <div className="mt-1 text-xs text-zinc-600 sm:text-sm dark:text-zinc-400">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.a
          variants={heroItem}
          href={founder.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:gap-3 hover:shadow-[0_8px_30px_-8px_#3b82f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-white dark:text-zinc-900"
        >
          <Linkedin className="h-4 w-4" />
          Connect on LinkedIn
        </motion.a>
      </motion.div>
    </div>
  );
}

/* ---------- expertise ---------- */

function ExpertiseGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {founder.expertise.map((e, i) => {
        const Icon = EXPERTISE_ICONS[i % EXPERTISE_ICONS.length];
        return (
          <Reveal key={e.title} delay={i * 0.08}>
            <SpotlightCard className="h-full p-6">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 dark:text-blue-400">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="font-heading text-lg font-semibold text-zinc-900 dark:text-white">
                {e.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {e.description}
              </p>
            </SpotlightCard>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ---------- accreditations timeline ---------- */

function AccreditationsTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <div ref={ref} className="relative mx-auto max-w-3xl pl-10 sm:pl-12">
      <div className="absolute bottom-2 left-[15px] top-2 w-px bg-zinc-200 dark:bg-zinc-800 sm:left-[19px]" />
      <motion.div
        aria-hidden
        className="absolute bottom-2 left-[15px] top-2 w-px origin-top sm:left-[19px]"
        style={{ scaleY: reduce ? 1 : scaleY, backgroundColor: ACCENT }}
      />
      <ul className="space-y-5">
        {founder.accreditations.map((a, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-10 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-blue-500/60 bg-white text-blue-600 sm:-left-12 sm:h-10 sm:w-10 dark:bg-zinc-950 dark:text-blue-400">
              <Award className="h-4 w-4" />
            </span>
            <Reveal delay={i * 0.06}>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white/60 p-5 transition-all duration-300 hover:translate-x-1 hover:border-blue-500/50 dark:border-zinc-800 dark:bg-zinc-900/40">
                <div>
                  <div className="font-heading font-semibold text-zinc-900 dark:text-white">
                    {a.title}
                  </div>
                  <div className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                    {a.issuer}
                  </div>
                </div>
                {a.year && (
                  <span className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium tabular-nums text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                    {a.year}
                  </span>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- exports ---------- */

export default function FounderProfileSection() {
  return (
    <section className="px-4">
      <FounderHero />
    </section>
  );
}

export function FounderExpertiseSection() {
  return (
    <section className="px-4">
      <ExpertiseGrid />
    </section>
  );
}

export function FounderAccreditationsSection() {
  return (
    <section className="px-4">
      <AccreditationsTimeline />
    </section>
  );
}
