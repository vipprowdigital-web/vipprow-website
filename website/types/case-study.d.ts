// website\types\case-study.d.ts

export interface CaseStudySEO {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
}

export interface CaseStudyCategory {
  _id: string;
  name: string;
  slug: string;
  heading?: string;
  description?: string;
  order?: number;
}

export interface CaseStudyApproachStep {
  title: string;
  description?: string;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  description?: string;
}

export interface CaseStudy {
  _id?: string;
  title: string;
  slug: string;
  clientName: string;
  clientLogo?: string | null;
  category?: string | CaseStudyCategory | null;
  industry?: string;
  heroImage?: string | null;
  shortDescription?: string;

  background?: string;
  challenge?: string;
  solution?: string;
  approach?: CaseStudyApproachStep[];
  results?: string;
  metrics?: CaseStudyMetric[];

  seo?: CaseStudySEO;
  order?: number;
  isActive?: boolean;
  isFeature?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CaseStudyResponse {
  success?: boolean;
  data: CaseStudy[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CaseStudyCategoryResponse {
  message?: string;
  data: CaseStudyCategory[];
}
