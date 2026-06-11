"use client";

import EditorialCard from "@/components/ui/cards/EditorialCard";
import { fetchPublicArticles } from "@/app/features/articles/services/article.api";
import { useEffect, useState } from "react";
import { Article } from "@/types/article";

interface EditorialGridProps {
  itemsPerPage?: number;
  isPaggination?: boolean;
}

export default function EditorialGrid({
  itemsPerPage = 3,
}: EditorialGridProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const res = await fetchPublicArticles({
          page: 1,
          limit: itemsPerPage,
          sortBy: "createdAt",
          sortOrder: "desc",
          filter: "active",
        });

        // console.log("API RESPONSE 👉", res);

        setArticles(Array.isArray(res.data) ? res.data : [res.data]);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [itemsPerPage]);

  if (loading) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: itemsPerPage }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border border-zinc-900"
            >
              <div className="aspect-video bg-zinc-900 animate-pulse rounded-sm" />
              <div className="mt-3 space-y-2 p-4">
                <div className="h-4 bg-zinc-800 animate-pulse rounded w-3/4" />
                <div className="h-3 bg-zinc-800 animate-pulse rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((item) => (
          <EditorialCard
            key={item._id}
            href={`/articles/details/${item._id}`}
            image={item.thumbnail ?? "/assets/images/backgrounds/b2.jpg"}
            title={item.title}
            category_name={
              typeof item.category === "object" && item.category !== null
                ? item.category.name
                : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}
