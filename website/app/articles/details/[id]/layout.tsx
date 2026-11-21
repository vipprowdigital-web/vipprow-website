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

// The article's FAQs as FAQPage structured data, so Google can show them as
// rich results. Rendered on the server (the page itself loads client-side).
// fetchItem is cached, so this reuses the request made for the metadata.
export default async function ArticleDetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await fetchItem<Article>(`/blog/${id}`);
  const faqs = item?.faqs?.filter((f) => f.question && f.answer) ?? [];

  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          // "<" escaped so answer text can't close the script tag
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      {children}
    </>
  );
}
