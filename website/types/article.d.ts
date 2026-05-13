// website\types\article.d.ts

export interface ArticleSEO {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface ArticleCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface Article {
  _id?: string;
  title: string;
  slug: string;
  category?: string | ArticleCategory | null;
  thumbnail?: string | null;
  gallery_images?: string[];
  video_link?: string | null;
  read_time?: string;
  short_description?: string | null;
  description?: string | null;
  seo?: ArticleSEO;
  isActive?: boolean;
  isFeature?: boolean;
  createdAt?: string;

  url?: string;
}
