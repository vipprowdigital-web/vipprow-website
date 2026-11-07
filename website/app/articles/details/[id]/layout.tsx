import type { Metadata } from "next";
import type { Article } from "@/types/article";
import { buildMetadata, cleanKeywords, fetchItem, stripHtml, truncate } from "@/lib/seo";

type Params = { params: Promise<{ id: string }> };

// Title, description and keywords come from what was entered in the console (SEO fields),
// falling back to the article's own title and text when those are empty.
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const item = await fetchItem<Article>(`/blog/${id}`);
  if (!item) return {};

  const category = typeof item.category === "object" && item.category ? item.category.name : "";
  return buildMetadata({
    title: item.seo?.metaTitle?.trim() || item.title,
    description:
      item.seo?.metaDescription?.trim() ||
      truncate(item.short_description?.trim() || stripHtml(item.description)),
    keywords: cleanKeywords(item.seo?.metaKeywords, category),
    image: item.thumbnail,
    path: `/articles/details/${id}`,
  });
}

export default function ArticleDetailsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
