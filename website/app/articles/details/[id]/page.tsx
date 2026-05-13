"use client";

import { useArticleById } from "@/app/features/articles/hook/useArticle";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function DetailPage() {
  const { id } = useParams();
  const { data: item, isLoading, isError } = useArticleById(id as string);

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

  /* ---------------- Content ---------------- */
  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="pt-36 max-w-5xl mx-auto px-6"
    >
      <h1
        className="
          max-w-5xl font-heading
          text-xl font-medium leading-normal
          text-zinc-900 dark:text-white md:text-2xl
          "
      >
        {item.title}
        {new Date(item.createdAt!).toDateString()}
      </h1>

      {/* Header */}
      <div className="mt-2">
        {typeof item.category === "object" && item.category !== null && (
          <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
            {item.category.name}
          </span>
        )}
      </div>

      {/* Thumbnail */}
      {item.thumbnail && (
        <div className="my-10 overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={item.thumbnail}
            alt={item.title}
            width={1920}
            height={1080}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

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
  );
}
