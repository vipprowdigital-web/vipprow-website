"use client";

import { useCaseStudyById } from "@/app/features/case-study/hook/useCaseStudy";
import ClientCTA from "@/components/client-sections/ClientCTA";
import ClientCaseStudyDetailsHeroSection from "@/components/custom-ui/ClientCaseStudyDetailsHeroSection";
import FaqSection from "@/components/mvpblock-ui/FAQSection";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

const RICH_TEXT_CLASS = `
  space-y-6
  text-sm leading-7 text-white/80

  [&_h1]:text-lg [&_h1]:font-normal [&_h1]:text-white
  [&_h2]:text-lg [&_h2]:font-normal [&_h2]:pt-6 [&_h2]:text-white
  [&_h3]:text-base [&_h3]:font-normal [&_h3]:pt-4 [&_h3]:text-white

  [&_p]:text-white/80 [&_p]:text-justify

  [&_ul]:list-disc [&_ul]:pl-6
  [&_ol]:list-decimal [&_ol]:pl-6
  [&_li]:text-white/75

  [&_a]:text-blue-400 hover:[&_a]:text-blue-300
  [&_strong]:text-white
`;

function RichSection({ title, html }: { title: string; html?: string }) {
  if (!html || !html.trim()) return null;
  return (
    <section className="pt-12">
      <h2 className="font-heading text-xl md:text-2xl font-semibold text-white">
        {title}
      </h2>
      <div
        className={`mt-4 ${RICH_TEXT_CLASS}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}

export default function ClientCaseStudyDetails() {
  const { id } = useParams();
  const { data: item, isLoading, isError } = useCaseStudyById(id as string);

  /* ---------------- Loading State ---------------- */
  if (isLoading) {
    return (
      <div className="pt-36 max-w-5xl mx-auto px-6">
        <div className="animate-pulse space-y-6">
          <div className="h-64 w-full rounded-2xl bg-white/10" />
          <div className="h-10 w-3/4 rounded bg-white/10" />
          <div className="h-4 w-40 rounded bg-white/10" />
          <div className="space-y-4 pt-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-4 w-full rounded bg-white/5" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- Error State ---------------- */
  if (isError || !item) {
    return (
      <div className="pt-40 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold text-red-400">
          Case study not found
        </h2>
        <p className="mt-2 text-sm text-white/60">
          The case study you’re looking for may have been deleted or moved.
        </p>
      </div>
    );
  }

  const categoryName =
    typeof item.category === "object" && item.category !== null
      ? item.category.name
      : undefined;

  const facts = [
    categoryName ? { label: "Sector", value: categoryName } : null,
    item.industry ? { label: "Industry", value: item.industry } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <ClientCaseStudyDetailsHeroSection
        heading={item.title}
        description={item.shortDescription}
        image={item.heroImage}
        clientName={item.clientName}
      />

      <motion.main
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pt-16 max-w-5xl mx-auto px-6"
      >
        {/* Quick facts */}
        {facts.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {facts.map((fact) => (
              <span
                key={fact.label}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70"
              >
                <span className="text-white/40">{fact.label}:</span> {fact.value}
              </span>
            ))}
          </div>
        )}

        {/* Results snapshot */}
        {item.metrics && item.metrics.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {item.metrics.map((metric, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center"
              >
                <p className="font-heading text-2xl md:text-3xl font-semibold text-white">
                  {metric.prefix}
                  {metric.value}
                  {metric.suffix}
                </p>
                <p className="mt-1 text-xs text-white/60">{metric.label}</p>
                {metric.description && (
                  <p className="mt-1 text-[11px] text-white/40">
                    {metric.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <RichSection title="Background" html={item.background} />
        <RichSection title="The Challenge" html={item.challenge} />
        <RichSection title="Our Solution" html={item.solution} />

        {/* Approach steps */}
        {item.approach && item.approach.length > 0 && (
          <section className="pt-12">
            <h2 className="font-heading text-xl md:text-2xl font-semibold text-white">
              Our Approach
            </h2>
            <ol className="mt-6 space-y-4">
              {item.approach.map((step, i) => (
                <li
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sm font-semibold text-blue-300">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-heading font-medium text-white">
                        {step.title}
                      </h3>
                      {step.description && (
                        <p className="mt-1 text-sm leading-6 text-white/70">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        <RichSection title="The Results" html={item.results} />
      </motion.main>

      {/* FAQ Start */}
      <div className="pt-20 max-w-7xl mx-auto">
        <FaqSection />
      </div>
      {/* FAQ End */}

      {/* CTA Start */}
      <div className="pt-20 max-w-7xl mx-auto">
        <ClientCTA />
      </div>
      {/* CTA End */}
    </>
  );
}
