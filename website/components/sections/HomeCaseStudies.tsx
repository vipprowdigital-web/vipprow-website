"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePublicCaseStudies } from "@/app/features/case-study/hook/useCaseStudy";
import type { CaseStudy } from "@/types/case-study";

const FALLBACK_LOGO = "/assets/images/articals/1x1.webp";

const categoryName = (s: CaseStudy) =>
  typeof s.category === "object" && s.category ? s.category.name : "";

function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl bg-white/5">
      <div className="h-44 w-full bg-white/10" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-1/3 rounded bg-white/10" />
        <div className="h-5 w-4/5 rounded bg-white/10" />
        <div className="h-3 w-full rounded bg-white/5" />
        <div className="h-3 w-3/4 rounded bg-white/5" />
      </div>
    </div>
  );
}

function CaseCard({ study }: { study: CaseStudy }) {
  const sector = categoryName(study);
  const metrics = (study.metrics ?? []).slice(0, 2);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/5 transition-colors duration-300 hover:bg-white/8 focus-within:bg-white/8">
      {study.heroImage ? (
        <div className="relative h-44 w-full overflow-hidden bg-black">
          <Image
            src={study.heroImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-white">
            <Image
              src={study.clientLogo || FALLBACK_LOGO}
              alt=""
              fill
              sizes="40px"
              className="object-contain p-1"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{study.clientName}</p>
            {sector && <p className="truncate text-xs text-white/50">{sector}</p>}
          </div>
        </div>

        <h3 className="font-heading text-lg font-semibold leading-snug text-white">
          {study.title}
        </h3>

        {study.shortDescription && (
          <p className="line-clamp-3 text-sm leading-relaxed text-white/60">
            {study.shortDescription}
          </p>
        )}

        {metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {metrics.map((m, i) => (
              <div key={i} className="rounded-2xl bg-white/8 px-3 py-2 text-center">
                <p className="font-heading text-base font-semibold text-white">
                  {m.prefix}
                  {m.value}
                  {m.suffix}
                </p>
                <p className="truncate text-[11px] text-white/50">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        <Link
          href={`/client-case-study/details/${study._id}`}
          aria-label={`Read case study: ${study.title}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          Read Case Study
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export default function HomeCaseStudies() {
  // The three most recent active case studies
  const { data, isLoading, isError } = usePublicCaseStudies({
    page: 1,
    limit: 3,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const items = data?.data ?? [];

  // Optional section: stay out of the way when there is nothing to show
  if (isError || (!isLoading && items.length === 0)) return null;

  return (
    <section aria-labelledby="home-case-studies" className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="flex flex-col items-center px-2 text-center">
        <h2
          id="home-case-studies"
          className="max-w-5xl font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl"
        >
          Client Case Studies
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          The background, the challenge, our approach and the measurable results, straight from the brands we work with.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          : items.map((study) => <CaseCard key={study._id ?? study.slug} study={study} />)}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/client-case-study"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.03] active:scale-95"
        >
          View all case studies
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
