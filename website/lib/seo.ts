// Shared helpers that turn content from the API into page metadata (title, description, keywords,
// link-preview image and canonical address) on the server, so search engines can read it.

import type { Metadata } from "next";

export const SITE_URL = "https://vipprow.com";
const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

/** Plain text from rich-text HTML, for use as a description. */
export function stripHtml(html?: string | null): string {
  if (!html) return "";
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Cut to a search-result-friendly length without breaking a word. */
export function truncate(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 80 ? cut.lastIndexOf(" ") : cut.length).trim()}…`;
}

/** One keyword entry: plain text, comma-separated text, or JSON text such as '["a","b"]' or '[]'. */
function splitKeywordEntry(entry: unknown): string[] {
  const t = String(entry ?? "").trim();
  if (!t) return [];
  if (t.startsWith("[")) {
    try {
      const parsed = JSON.parse(t);
      return Array.isArray(parsed) ? parsed.flatMap(splitKeywordEntry) : [];
    } catch {
      return t.replace(/[\[\]"]/g, "").split(",").map((k) => k.trim()).filter(Boolean);
    }
  }
  return t.split(",").map((k) => k.trim()).filter(Boolean);
}

/** Keywords can arrive as an array, a comma-separated string, JSON text or with empty entries. */
export function cleanKeywords(...lists: Array<string | string[] | null | undefined>): string[] {
  const out: string[] = [];
  for (const list of lists) {
    const entries = Array.isArray(list) ? list : [list];
    for (const entry of entries) {
      for (const v of splitKeywordEntry(entry)) {
        if (!out.some((x) => x.toLowerCase() === v.toLowerCase())) out.push(v);
      }
    }
  }
  return out;
}

/** Server-side fetch of one item; returns null when anything goes wrong (the page then keeps the default metadata). */
export async function fetchItem<T>(path: string): Promise<T | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data ?? null) as T | null;
  } catch {
    return null;
  }
}

export function buildMetadata({
  title,
  description,
  keywords,
  image,
  path,
  type = "article",
}: {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string | null;
  path: string;
  type?: "article" | "website";
}): Metadata {
  // keep the title as typed when it already carries the brand name
  const fullTitle = /vipprow/i.test(title) ? title : `${title} | VIPPROW`;
  const url = `${SITE_URL}${path}`;
  return {
    title: { absolute: fullTitle },
    description: description || undefined,
    keywords: keywords && keywords.length ? keywords : undefined,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: description || undefined,
      url,
      siteName: "VIPPROW",
      type,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: fullTitle,
      description: description || undefined,
      images: image ? [image] : undefined,
    },
  };
}
