"use client";

import { usePublicPolicyById } from "@/app/features/policy/hook/usePolicy";
import PrimaryHeading from "@/components/ui/heading/PrimaryHeading";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function DetailPage() {
  const { id } = useParams();
  const { data: item, isLoading, isError } = usePublicPolicyById(id as string);

  /* ---------------- Loading State ---------------- */
  if (isLoading) {
    return (
      <div className="pt-40 max-w-4xl mx-auto px-6">
        <div className="space-y-8">
          <div className="h-10 w-3/4 rounded-lg bg-white/10 animate-pulse" />
          <div className="h-4 w-40 rounded bg-white/10 animate-pulse" />

          <div className="space-y-4 pt-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-4 w-full rounded bg-white/5 animate-pulse"
              />
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
        <h2 className="text-xl font-semibold text-red-400">
          Policy not found
        </h2>
        <p className="mt-2 text-sm text-white/60">
          This policy may have been removed or is currently unavailable.
        </p>
      </div>
    );
  }

  /* ---------------- Content ---------------- */
  return (
    <motion.main
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="pt-40 max-w-4xl mx-auto px-6"
    >
      <PrimaryHeading
        heading={item.title}
        des={new Date(item.createdAt!).toDateString()}
      />

      <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-8">
        <div
          className="
            space-y-6 font-heading
            text-sm leading-7 text-white/80

            [&_h1]:text-xl
            [&_h1]:font-semibold
            [&_h1]:text-white

            [&_h2]:text-lg
            [&_h2]:font-semibold
            [&_h2]:text-white
            [&_h2]:pt-6

            [&_h3]:text-md
            [&_h3]:font-semibold
            [&_h3]:text-white
            [&_h3]:pt-4

            [&_p]:text-white/80

            [&_ul]:list-disc
            [&_ul]:pl-6

            [&_ol]:list-decimal
            [&_ol]:pl-6

            [&_li]:my-1
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
  );
}
