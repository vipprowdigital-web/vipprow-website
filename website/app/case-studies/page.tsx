"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  Globe2,
  Link2,
  Search,
  Share2,
  TrendingUp,
} from "lucide-react";
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
  return (c.category as string) ?? "";
}

function getCategoryName(c: CaseStudy): string {
  if (typeof c.category === "object" && c.category) return c.category.name;
  return "";
}

// "3d", "2w", "5mo" — the compact style LinkedIn uses under a post author.
function timeAgo(iso?: string): string {
  if (!iso) return "";
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  if (s < 604800) return `${Math.floor(s / 86400)}d`;
  if (s < 2592000) return `${Math.floor(s / 604800)}w`;
  if (s < 31536000) return `${Math.floor(s / 2592000)}mo`;
  return `${Math.floor(s / 31536000)}y`;
}

// Rich-text fields are stored as (sometimes entity-escaped) HTML. Turn one
// into a plain-text excerpt for the inline "see more" preview.
function toPlainText(html?: string, max = 320): string {
  if (!html) return "";
  const decode = (t: string) =>
    t
      .replace(/&nbsp;/g, " ")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&#x27;/g, "'")
      .replace(/&amp;/g, "&");
  const text = decode(decode(html))
    .replace(/<\/(p|div|li|h[1-6]|br)>|<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

const card = "rounded-xl border border-white/10 bg-[#111214]";

// ─── Feed post skeleton ──────────────────────────────────────────────────────
function PostSkeleton() {
  return (
    <div className={`${card} animate-pulse p-4`}>
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-white/10" />
        <div className="space-y-2">
          <div className="h-3 w-40 rounded bg-white/10" />
          <div className="h-3 w-24 rounded bg-white/5" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-4 w-3/4 rounded bg-white/10" />
        <div className="h-3 w-full rounded bg-white/5" />
        <div className="h-3 w-5/6 rounded bg-white/5" />
      </div>
      <div className="mt-4 h-64 rounded-lg bg-white/5" />
    </div>
  );
}

// ─── A single feed post ──────────────────────────────────────────────────────
function CasePost({ study }: { study: CaseStudy }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const categoryName = getCategoryName(study);

  // Extra content revealed by "see more"; the full story stays on the detail page.
  const sections = [
    { label: "Challenge", text: toPlainText(study.challenge) },
    { label: "Solution", text: toPlainText(study.solution) },
    { label: "Results", text: toPlainText(study.results) },
  ].filter((x) => x.text);
  const canExpand =
    sections.length > 0 || (study.shortDescription?.length ?? 0) > 180;
  const href = `/client-case-study/details/${study._id}`;
  const metrics = study.metrics?.slice(0, 3) ?? [];
  const ago = timeAgo(study.createdAt);

  const share = async () => {
    const url = `${window.location.origin}${href}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: study.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* user cancelled the share sheet */
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`${card} overflow-hidden`}
    >
      {/* Author row */}
      <div className="flex items-start gap-3 px-4 pt-4">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
          <Image
            src={study.clientLogo || FALLBACK_LOGO}
            alt={study.clientName}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
            <span className="truncate">{study.clientName}</span>
            {study.isFeature && (
              <BadgeCheck
                className="h-4 w-4 shrink-0 text-blue-400"
                aria-label="Featured"
              />
            )}
          </p>
          <p className="truncate text-xs text-white/50">
            {[study.industry, categoryName].filter(Boolean).join(" · ") ||
              "Client case study"}
          </p>
          <p className="flex items-center gap-1 text-xs text-white/40">
            {ago && <span>{ago}</span>}
            {ago && <span aria-hidden>·</span>}
            <Globe2 className="h-3 w-3" aria-hidden />
          </p>
        </div>
        {study.isFeature && (
          <span className="shrink-0 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-medium text-blue-300">
            Featured
          </span>
        )}
      </div>

      {/* Post text */}
      <div className="px-4 pt-3">
        <h2 className="text-[15px] font-semibold leading-snug text-white sm:text-base">
          {study.title}
        </h2>
        {study.shortDescription && (
          <p
            className={`mt-1.5 text-sm leading-relaxed text-white/65 ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {study.shortDescription}
          </p>
        )}

        {expanded && sections.length > 0 && (
          <div className="mt-3 space-y-3">
            {sections.map((x) => (
              <div key={x.label}>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  {x.label}
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-white/65">
                  {x.text}
                </p>
              </div>
            ))}
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300"
            >
              Read the full case study <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        {canExpand && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-1.5 text-sm font-medium text-white/45 hover:text-blue-400 hover:underline"
          >
            {expanded ? "see less" : "…see more"}
          </button>
        )}
      </div>

      {/* Media */}
      {study.heroImage && (
        <Link href={href} className="mt-3 block" tabIndex={-1} aria-hidden>
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
            <Image
              src={study.heroImage}
              alt={study.title}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
        </Link>
      )}

      {/* Results strip (where LinkedIn shows reaction counts) */}
      {metrics.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-b border-white/10 px-4 py-2.5 text-xs text-white/55">
          <TrendingUp className="h-3.5 w-3.5 text-blue-400" aria-hidden />
          {metrics.map((m, i) => (
            <span key={i}>
              <span className="font-semibold text-white">
                {m.prefix}
                {m.value}
                {m.suffix}
              </span>{" "}
              {m.label}
            </span>
          ))}
        </div>
      )}

      {/* Action bar */}
      <div className="flex items-center gap-1 px-2 py-1">
        <Link
          href={href}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          <BookOpen className="h-4 w-4" />
          Read case study
        </Link>
        <button
          type="button"
          onClick={share}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-400" /> Link copied
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" /> Share
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}

// ─── Left rail: "profile" card + industries ──────────────────────────────────
function LeftRail({
  categories,
  counts,
  total,
  active,
  onSelect,
}: {
  categories: CaseStudyCategory[];
  counts: Record<string, number>;
  total: number;
  active: string;
  onSelect: (id: string) => void;
}) {
  const item = (id: string, label: string, n: number) => (
    <button
      key={id}
      type="button"
      onClick={() => onSelect(id)}
      aria-pressed={active === id}
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
        active === id
          ? "bg-blue-500/15 font-semibold text-blue-300"
          : "text-white/60 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span className="truncate">{label}</span>
      <span className="ml-2 text-xs text-white/35">{n}</span>
    </button>
  );

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 space-y-3">
        <div className={`${card} overflow-hidden`}>
          <div className="h-14 bg-gradient-to-r from-blue-700/60 via-blue-500/30 to-slate-800" />
          <div className="px-4 pb-4">
            <div className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#111214] bg-blue-600">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <h1 className="mt-2 text-base font-semibold text-white">
              Client Case Studies
            </h1>
            <p className="mt-1 text-xs leading-relaxed text-white/50">
              Real challenges, real strategies and measurable results from the
              businesses we work with.
            </p>
            <p className="mt-3 border-t border-white/10 pt-3 text-xs text-white/50">
              <span className="font-semibold text-white">{total}</span> published
              case studies
            </p>
          </div>
        </div>

        <div className={`${card} p-2`}>
          <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-white/35">
            Industries
          </p>
          {item("all", "All", total)}
          {categories.map((c) => item(c._id, c.name, counts[c._id] ?? 0))}
        </div>
      </div>
    </aside>
  );
}

// ─── Right rail: featured list + CTA ─────────────────────────────────────────
function RightRail({ featured }: { featured: CaseStudy[] }) {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-28 space-y-3">
        {featured.length > 0 && (
          <div className={`${card} p-4`}>
            <p className="text-sm font-semibold text-white">Featured results</p>
            <ul className="mt-3 space-y-4">
              {featured.slice(0, 4).map((s) => (
                <li key={s._id}>
                  <Link
                    href={`/client-case-study/details/${s._id}`}
                    className="group flex gap-3"
                  >
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
                      <Image
                        src={s.clientLogo || FALLBACK_LOGO}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-medium leading-snug text-white/80 group-hover:text-blue-300">
                        {s.title}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-white/40">
                        {s.clientName}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={`${card} p-4`}>
          <p className="text-sm font-semibold text-white">
            Want results like these?
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/50">
            Tell us about your business and we&apos;ll show you what&apos;s
            possible.
          </p>
          <Link
            href="/contact"
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Get in touch <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </aside>
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
  const featured = useMemo(() => allStudies.filter((s) => s.isFeature), [allStudies]);

  const counts = useMemo(() => {
    const out: Record<string, number> = {};
    allStudies.forEach((s) => {
      const id = getCategoryId(s);
      if (id) out[id] = (out[id] ?? 0) + 1;
    });
    return out;
  }, [allStudies]);

  // One feed: featured posts first (like promoted posts), then newest.
  const feed = useMemo(() => {
    let list = [...allStudies];
    if (activeCategory !== "all") {
      list = list.filter((s) => getCategoryId(s) === activeCategory);
    }
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.clientName.toLowerCase().includes(q) ||
          (s.industry ?? "").toLowerCase().includes(q) ||
          (s.shortDescription ?? "").toLowerCase().includes(q) ||
          getCategoryName(s).toLowerCase().includes(q),
      );
    }
    return list.sort((a, b) => {
      if (!!a.isFeature !== !!b.isFeature) return a.isFeature ? -1 : 1;
      return (
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime()
      );
    });
  }, [allStudies, activeCategory, searchQuery]);

  const isLoading = catLoading || studiesLoading;

  const chip = (id: string, label: string) => (
    <button
      key={id}
      type="button"
      onClick={() => setActiveCategory(id)}
      aria-pressed={activeCategory === id}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
        activeCategory === id
          ? "border-blue-500 bg-blue-600 text-white"
          : "border-white/15 text-white/60 hover:border-white/30 hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className="min-h-screen bg-[#0a0b0c]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-16 pt-28 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)_300px]">
          <LeftRail
            categories={categories}
            counts={counts}
            total={allStudies.length}
            active={activeCategory}
            onSelect={setActiveCategory}
          />

          {/* ── FEED ── */}
          <main className="mx-auto w-full max-w-[640px] space-y-3 lg:max-w-none">
            {/* Mobile heading (the profile card is hidden below lg) */}
            <h1 className="px-1 text-xl font-semibold text-white lg:hidden">
              Client Case Studies
            </h1>

            {/* Search */}
            <div className={`${card} p-3`}>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="search"
                  aria-label="Search case studies"
                  placeholder="Search by client, industry or topic"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm text-white placeholder-white/35 outline-none transition focus:border-blue-500/60 focus:bg-white/[0.08]"
                />
              </div>

              {/* Mobile / tablet industry chips */}
              <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {chip("all", "All")}
                {categories.map((c) => chip(c._id, c.name))}
              </div>
            </div>

            {isLoading && (
              <>
                <PostSkeleton />
                <PostSkeleton />
              </>
            )}

            {!isLoading && feed.length > 0 && (
              <AnimatePresence mode="popLayout">
                {feed.map((study) => (
                  <CasePost key={study._id} study={study} />
                ))}
              </AnimatePresence>
            )}

            {!isLoading && feed.length === 0 && (
              <div className={`${card} flex flex-col items-center px-6 py-16 text-center`}>
                <div className="mb-4 rounded-full bg-white/5 p-5">
                  <Search className="h-7 w-7 text-white/25" />
                </div>
                <h3 className="text-base font-semibold text-white/70">
                  No case studies found
                </h3>
                <p className="mt-1.5 text-sm text-white/40">
                  {searchQuery
                    ? `No results for "${searchQuery}"`
                    : "No case studies in this industry yet."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/70 transition-colors hover:border-white/30 hover:text-white"
                >
                  <Link2 className="h-3.5 w-3.5 rotate-45" />
                  Clear filters
                </button>
              </div>
            )}
          </main>

          <RightRail featured={featured} />
        </div>
      </div>

      {/* FAQ */}
      <div className="pt-10 max-w-7xl mx-auto sm:px-4">
        <FaqSection page="case-studies" />
      </div>

      {/* CTA */}
      <div className="pt-10 sm:pt-20 max-w-7xl mx-auto sm:px-4 sm:pb-20">
        <ClientCTA />
      </div>
    </>
  );
}
