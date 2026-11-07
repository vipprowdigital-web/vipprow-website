import type { Metadata } from "next";
import type { Service } from "@/types/service";
import { buildMetadata, cleanKeywords, fetchItem, stripHtml, truncate } from "@/lib/seo";

type Params = { params: Promise<{ id: string }> };

// Services have no SEO fields of their own in the console, so the title and
// the sub-heading / description are used, with the service's area as a keyword.
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const item = await fetchItem<Service>(`/service/public/${id}`);
  if (!item) return {};

  const domain = typeof item.domain === "object" && item.domain ? item.domain.name : "";
  return buildMetadata({
    title: item.title,
    description: truncate(item.subHeading?.trim() || stripHtml(item.description)),
    keywords: cleanKeywords([item.title], domain && !/^https?:/i.test(domain) ? [domain] : []),
    image: item.thumbnail,
    path: `/services/details/${id}`,
  });
}

export default function ServiceDetailsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
