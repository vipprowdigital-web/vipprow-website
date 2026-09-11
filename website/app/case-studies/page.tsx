"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, TrendingUp, Users } from "lucide-react";
import {
  usePublicCaseStudies,
  usePublicCaseStudyCategories,
} from "@/app/features/case-study/hook/useCaseStudy";
import { CaseStudy, CaseStudyCategory } from "@/types/case-study";
import ClientCTA from "@/components/client-sections/ClientCTA";
import FaqSection from "@/components/mvpblock-ui/FAQSection";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const FALLBACK_LOGO = "/assets/images/backgrounds/b2.jpg";

function getCategoryId(c: CaseStudy): string {
  if (typeof c.category === "object" && c.category) return c.category._id;
  return c.category as string;
}

function getCategoryName(c: CaseStudy): string {
  if (typeof c.category === "object" && c.category) return c.category.name;
  return "";
}

// ─── Card skeleton ────────────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-white/5 bg-white/5 p-6">
      <div className="mb-4 h-14 w-14 rounded-xl bg-white/10" />
      <div className="mb-2 h-5 w-3/4 rounded bg-white/10" />
      <div className="mb-1 h-4 w-1/2 rounded bg-white/10" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-white/5" />
        <div className="h-3 w-5/6 rounded bg-white/5" />
      </div>
    </div>
  );
}

// ─── Individual case study card ───────────────────────────────────────────────
function CaseStudyCard({ study }: { study: CaseStudy }) {
  const categoryName = getCategoryName(study);
  const hasMetrics = study.metrics && study.metrics.length > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex flex-col rounded-2xl border border-white/8 bg-gradient-to-b from-white/5 to-white/[0.02] transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] overflow-hidden"
    >
      {/* Hero image strip */}
      {study.heroImage && (
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={study.heroImage}
            alt={study.clientName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          {categoryName && (
            <span className="absolute bottom-3 left-4 rounded-full bg-blue-600/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              {categoryName}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Logo + client name */}
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
            <Image
              src={study.clientLogo || FALLBACK_LOGO}
              alt={study.clientName}
              fill
              className="object-cover"
              sizes="5vw"
            />
          </div>
          <div>
            <p className="text-xs text-white/40 font-mono uppercase tracking-widest">
              {categoryName || "Case Study"}
            </p>
            <p className="text-sm font-semibold text-white leading-tight">
              {study.clientName}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-xl font-bold text-white leading-snug group-hover:text-blue-300 transition-colors">
          {study.title}
        </h3>

        {/* Short description */}
        {study.shortDescription && (
          <p className="text-sm text-white/55 leading-relaxed line-clamp-3">
            {study.shortDescription}
          </p>
        )}

        {/* Tags row */}
        {study.industry && (
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-white/50">
              {study.industry}
            </span>
          </div>
        )}

        {/* Metrics preview */}
        {hasMetrics && (
          <div className="grid grid-cols-2 gap-2">
            {study.metrics!.slice(0, 2).map((m, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-center"
              >
                <p className="text-base font-bold text-white">
                  {m.prefix}{m.value}{m.suffix}
                </p>
                <p className="text-[10px] text-white/40 mt-0.5 leading-tight truncate">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        )}


        {/* CTA */}
        <Link
          href={`/client-case-study/details/${study._id}`}
          className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300 group/link"
        >
          Read Case Study
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Featured card (full-width) ───────────────────────────────────────────────
function FeaturedCard({ study }: { study: CaseStudy }) {
  const categoryName = getCategoryName(study);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative col-span-full overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/40 via-slate-900/50 to-slate-950/60 transition-all duration-300 hover:border-blue-400/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.12)]"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Text side */}
        <div className="flex flex-1 flex-col justify-center gap-5 p-8 lg:p-12">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-500/20">
              ★ Featured
            </span>
            {categoryName && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
                {categoryName}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <Image
                src={study.clientLogo || FALLBACK_LOGO}
                alt={study.clientName}
                fill
                className="object-contain p-1.5"
              />
            </div>
            <p className="text-sm text-white/60">{study.clientName}</p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug group-hover:text-blue-200 transition-colors">
            {study.title}
          </h2>

          {study.shortDescription && (
            <p className="text-sm text-white/55 leading-relaxed max-w-lg">
              {study.shortDescription}
            </p>
          )}

          {/* Metrics */}
          {study.metrics && study.metrics.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {study.metrics.slice(0, 4).map((m, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold text-blue-300">
                    {m.prefix}{m.value}{m.suffix}
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          <Link
            href={`/client-case-study/details/${study._id}`}
            className="flex w-fit items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:gap-3"
          >
            View Full Case Study <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Image side */}
        {study.heroImage && (
          <div className="relative h-64 w-full overflow-hidden lg:h-auto lg:w-[42%] shrink-0">
            <Image
              src={study.heroImage}
              alt={study.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent lg:from-transparent lg:to-transparent" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categoryData, isLoading: catLoading } =
    usePublicCaseStudyCategories();
  const { data: studyData, isLoading: studiesLoading } = usePublicCaseStudies({
    limit: 200,
  });

  const categories: CaseStudyCategory[] = useMemo(
    () =>
      [...(categoryData?.data ?? [])].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      ),
    [categoryData],
  );

  const allStudies: CaseStudy[] = studyData?.data ?? [];

  const featured = allStudies.filter((s) => s.isFeature);

  const filtered = useMemo(() => {
    let list = allStudies.filter((s) => !s.isFeature);
    if (activeCategory !== "all") {
      list = list.filter((s) => getCategoryId(s) === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.clientName.toLowerCase().includes(q) ||
          (s.industry ?? "").toLowerCase().includes(q),
      );
    }
    return list;
  }, [allStudies, activeCategory, searchQuery]);

  const isLoading = catLoading || studiesLoading;

  return (
    <>
      {/* ── HERO ── */}
      <div className="relative w-full bg-black overflow-hidden">
        {/* Grid background */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(59,130,246,0.25),transparent)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-10 sm:py-28 md:py-36 text-center">
          {/* Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300"
          >
            <BookOpen className="h-3.5 w-3.5" />
            Client Case Studies
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-semibold text-white leading-tight tracking-tight"
          >
            Real Results.{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              Proven Strategies.
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-white/55 leading-relaxed"
          >
            Explore how we&apos;ve helped businesses across industries overcome
            challenges, scale their operations, and achieve measurable growth.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-8"
          >
            {[
              { icon: BookOpen, value: `${allStudies.length}+`, label: "Case Studies" },
              { icon: Users,    value: `${categories.length}+`, label: "Industries" },
              { icon: TrendingUp, value: "100%",               label: "Data-Driven" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/50">
                <Icon className="h-4 w-4 text-blue-400" />
                <span className="font-bold text-white">{value}</span>
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="mx-auto max-w-7xl px-4 sm:py-16">

        {/* Search + category filter */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search case studies…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-blue-500/50 focus:bg-white/8"
            />
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                activeCategory === "all"
                  ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                  : "border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat._id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeCategory === cat._id
                    ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                    : "border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Loading skeletons */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && (
          <>
            {/* Featured studies */}
            {featured.length > 0 && activeCategory === "all" && !searchQuery && (
              <div className="mb-10">
                <p className="mb-4 text-xs font-mono uppercase tracking-widest text-white/30">
                  Featured
                </p>
                <div className="grid gap-6">
                  {featured.map((study) => (
                    <FeaturedCard key={study._id} study={study} />
                  ))}
                </div>
              </div>
            )}

            {/* All / filtered studies */}
            {filtered.length > 0 ? (
              <>
                {(activeCategory !== "all" || searchQuery) ? null : (
                  <p className="mb-4 text-xs font-mono uppercase tracking-widest text-white/30">
                    All Case Studies
                  </p>
                )}
                <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((study) => (
                      <CaseStudyCard key={study._id} study={study} />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="mb-4 rounded-full bg-white/5 p-5">
                  <BookOpen className="h-8 w-8 text-white/20" />
                </div>
                <h3 className="text-lg font-semibold text-white/60">
                  No case studies found
                </h3>
                <p className="mt-2 text-sm text-white/30">
                  {searchQuery
                    ? `No results for "${searchQuery}"`
                    : "No case studies in this category yet."}
                </p>
                <button
                  onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                  className="mt-4 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/60 hover:text-white transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* FAQ */}
      <div className="pt-10 max-w-7xl mx-auto sm:px-4">
        <FaqSection />
      </div>

      {/* CTA */}
      <div className="pt-10 sm:pt-20 max-w-7xl mx-auto sm:px-4 sm:pb-20">
        <ClientCTA />
      </div>
    </>
  );
}
