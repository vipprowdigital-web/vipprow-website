import type { Metadata } from "next";
import type { CaseStudy } from "@/types/case-study";
import { buildMetadata, cleanKeywords, fetchItem, stripHtml, truncate } from "@/lib/seo";

type Params = { params: Promise<{ id: string }> };

// Title, description and keywords come from what was entered in the console (SEO fields),
// falling back to the case study's own title and text when those are empty.
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const item = await fetchItem<CaseStudy>(`/case-study/public/${id}`);
  if (!item) return {};

  const sector = typeof item.category === "object" && item.category ? item.category.name : "";
  return buildMetadata({
    title: item.seo?.metaTitle?.trim() || item.title,
    description:
      item.seo?.metaDescription?.trim() ||
      truncate(item.shortDescription?.trim() || stripHtml(item.background)),
    keywords: cleanKeywords(item.seo?.metaKeywords, [item.clientName, item.industry ?? "", sector]),
    image: item.heroImage || item.clientLogo,
    path: `/client-case-study/details/${id}`,
  });
}

export default function CaseStudyDetailsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
