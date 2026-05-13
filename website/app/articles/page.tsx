import EditorialCard from "@/components/ui/cards/EditorialCard";
import { ArticlesClient } from "./ArticlesClient";
import ClientCTA from "@/components/client-sections/ClientCTA";
import PrimaryHeading from "@/components/ui/heading/PrimaryHeading";
import { fetchPublicArticles } from "../features/articles/services/article.api";

// app/articles/page.tsx  (NO "use client")
export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;

  const page = Number(pageParam ?? 1);

  let data;

  try {
    data = await fetchPublicArticles({
      page,
      limit: 12,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  } catch (error) {
    console.error("🔥 Articles fetch error:", error);

    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Failed to load articles.
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No articles found.
      </div>
    );
  }

  return (
    <main className="py-44 max-w-7xl mx-auto">
      <PrimaryHeading
        heading="Insights for Modern Digital Growth"
        des="Stay ahead with expert-backed content on performance marketing and automation."
      />

      <section className="bg-black px-6 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.map((item) => (
            <EditorialCard
              key={item._id}
              href={`/articles/details/${item._id}`}
              image={item.thumbnail ?? "/image/placeholder.png"}
              title={item.title}
              category_name={
                typeof item.category === "object" && item.category != null
                  ? item.category.name
                  : undefined
              }
            />
          ))}
        </div>

        <ArticlesClient
          currentPage={page}
          totalPages={data?.pagination?.totalPages ?? 1}
        />
      </section>

      <div className="pt-20 max-w-7xl mx-auto">
        <ClientCTA />
      </div>
    </main>
  );
}
