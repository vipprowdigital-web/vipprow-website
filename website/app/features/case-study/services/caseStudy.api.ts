// website\app\features\case-study\services\caseStudy.api.ts

import { API } from "@/lib/axiosClient";
import {
  CaseStudy,
  CaseStudyCategoryResponse,
  CaseStudyResponse,
} from "@/types/case-study";

export interface CaseStudyQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  categories?: string[];
}

// Fetch case study list - Public
export const fetchPublicCaseStudies = async (
  params: CaseStudyQuery = {},
): Promise<CaseStudyResponse> => {
  const res = await API.get("/case-study/public", {
    params: {
      ...params,
      categories: params.categories?.join(","),
    },
  });
  return res.data;
};

// Fetch single case study by ID (or slug) - Public
export const fetchCaseStudyById = async (id: string): Promise<CaseStudy> => {
  const res = await API.get(`/case-study/public/${id}`);
  return res.data.data;
};

// Fetch active sectors / categories - Public
export const fetchPublicCaseStudyCategories =
  async (): Promise<CaseStudyCategoryResponse> => {
    const res = await API.get("/case-study-category/public");
    return res.data;
  };
