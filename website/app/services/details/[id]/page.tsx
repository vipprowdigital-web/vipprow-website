"use client";

import { useServiceById } from "@/app/features/services/hook/useService";
import ClientCTA from "@/components/client-sections/ClientCTA";
import SaaSDetailsHeroSection from "@/components/custom-ui/SaaSDetailsHeroSection";
import FaqSection from "@/components/mvpblock-ui/FAQSection";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function DigitalMarketingArticleDetails() {
  const { id } = useParams();
  const { data: item, isLoading, isError } = useServiceById(id as string);

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
          Article not found
        </h2>
        <p className="mt-2 text-sm text-white/60">
          The article you’re looking for may have been deleted or moved.
        </p>
      </div>
    );
  }

  return (
    <>
      <SaaSDetailsHeroSection
        heading={item.title}
        domain={
          typeof item.domain === "object" && item.domain !== null
            ? item.domain.name
            : typeof item.domain === "string"
              ? item.domain
              : "N/A"
        }
        image={item.thumbnail ?? ""}
      />

      <motion.main
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pt-0 max-w-5xl mx-auto px-6"
      >
        {/* Content Card */}
        <div>
          <div
            className="
            space-y-6
            text-sm leading-7 text-white/80

            [&_h1]:text-lg
            [&_h1]:font-normale
            [&_h1]:text-white

            [&_h2]:text-lg
            [&_h2]:font-normale
            [&_h2]:pt-6
            [&_h2]:text-white

            [&_h3]:text-base
            [&_h3]:font-normale
            [&_h3]:pt-4
            [&_h3]:text-white

            [&_p]:text-white/80
            [&_p]:text-justify

            [&_ul]:list-disc
            [&_ul]:pl-6

            [&_ol]:list-decimal
            [&_ol]:pl-6

            [&_li]:text-white/75

            [&_a]:text-blue-400
            hover:[&_a]:text-blue-300

            [&_strong]:text-white
          "
            dangerouslySetInnerHTML={{
              __html: item.description || "",
            }}
          />
        </div>
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
