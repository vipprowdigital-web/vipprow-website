"use client";

import { useCaseStudyById } from "@/app/features/case-study/hook/useCaseStudy";
import ClientCTA from "@/components/client-sections/ClientCTA";
import ClientCaseStudyDetailsHeroSection from "@/components/custom-ui/ClientCaseStudyDetailsHeroSection";
import FaqSection from "@/components/mvpblock-ui/FAQSection";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

const RICH_TEXT_CLASS = `
  space-y-4
  text-sm leading-7 text-white/80

  [&_h1]:font-heading [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-8 [&_h1]:mb-3
  [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-7 [&_h2]:mb-2
  [&_h3]:font-heading [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white/90 [&_h3]:mt-6 [&_h3]:mb-2
  [&_h4]:font-heading [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-white/85 [&_h4]:mt-4 [&_h4]:mb-1
  [&_h5]:text-sm [&_h5]:font-semibold [&_h5]:text-white/80 [&_h5]:mt-3
  [&_h6]:text-xs [&_h6]:font-semibold [&_h6]:text-white/70 [&_h6]:uppercase [&_h6]:tracking-wider [&_h6]:mt-3

  [&_p]:text-white/75 [&_p]:leading-7

  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5
  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5
  [&_li]:text-white/70 [&_li]:leading-6
  [&_li>ul]:mt-1.5 [&_li>ol]:mt-1.5

  [&_a]:text-blue-400 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-blue-300

  [&_strong]:font-semibold [&_strong]:text-white
  [&_b]:font-semibold [&_b]:text-white
  [&_em]:italic [&_em]:text-white/80
  [&_i]:italic [&_i]:text-white/80
  [&_u]:underline [&_u]:underline-offset-2
  [&_s]:line-through [&_s]:text-white/40
  [&_del]:line-through [&_del]:text-white/40
  [&_mark]:bg-yellow-400/20 [&_mark]:text-yellow-200 [&_mark]:px-0.5 [&_mark]:rounded

  [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500/50 [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:my-4 [&_blockquote]:text-white/60 [&_blockquote]:italic [&_blockquote]:bg-white/[0.03] [&_blockquote]:rounded-r-lg

  [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:font-mono [&_code]:text-blue-200
  [&_pre]:rounded-xl [&_pre]:bg-white/5 [&_pre]:border [&_pre]:border-white/10 [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-4
  [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-white/80

  [&_hr]:my-8 [&_hr]:border-white/10

  [&_img]:rounded-xl [&_img]:my-4 [&_img]:max-w-full [&_img]:h-auto [&_img]:border [&_img]:border-white/10

  [&_table]:w-full [&_table]:my-4 [&_table]:border-collapse [&_table]:text-sm
  [&_thead]:bg-white/5
  [&_th]:border [&_th]:border-white/10 [&_th]:px-3 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:text-white/90 [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wider
  [&_td]:border [&_td]:border-white/10 [&_td]:px-3 [&_td]:py-2 [&_td]:text-white/65 [&_td]:align-top
  [&_tr:hover_td]:bg-white/[0.025]

  [&_figure]:my-4
  [&_figcaption]:mt-1.5 [&_figcaption]:text-xs [&_figcaption]:text-white/40 [&_figcaption]:text-center

  [&_div]:leading-7
`;

// Unescape HTML entities so content saved as escaped text renders correctly.
// Handles both named entities (&lt; &gt; &amp; &quot; &#39;) and any numeric
// entities, then falls back to a DOM parser on the client for anything else.
function unescapeHtml(str: string): string {
  if (!str) return str;
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    );
}

function RichSection({ title, html }: { title: string; html?: string }) {
  if (!html || !html.trim()) return null;
  const unescaped = unescapeHtml(html);
  return (
    <section className="pt-12">
      <h2 className="font-heading text-xl md:text-2xl font-semibold text-white">
        {title}
      </h2>
      <div
        className={`mt-4 ${RICH_TEXT_CLASS}`}
        dangerouslySetInnerHTML={{ __html: unescaped }}
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
        className="pt-16 max-w-5xl mx-auto px-2 sm:px-6"
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
