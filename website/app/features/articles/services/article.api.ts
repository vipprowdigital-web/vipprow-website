// website\app\features\articles\services\article.api.ts

import { Article } from "@/types/article";

export interface ArticleQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filter?: string;
  categories?: string[];
}

export interface ArticleResponse {
  data: Article[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

// Fetch Article List
export const fetchPublicArticles = async (
  params: ArticleQuery = {},
): Promise<ArticleResponse> => {
  const url = new URL(`${BASE_URL}/blog`);
  const query: Record<string, string | undefined> = {
    ...params,
    categories: params.categories?.join(","),
  } as Record<string, string | undefined>;

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed to fetch articles: ${res.status}`);
  return res.json();
};

// Fetch Article By ID
export const fetchArticleById = async (id: string): Promise<Article> => {
  const res = await fetch(`${BASE_URL}/blog/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch article: ${res.status}`);
  const json = await res.json();
  return json.data;
};
