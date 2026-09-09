// website\app\features\case-study\hook\useCaseStudy.ts

"use client";

import { useQuery } from "@tanstack/react-query";
import {
  CaseStudyQuery,
  fetchCaseStudyById,
  fetchPublicCaseStudies,
  fetchPublicCaseStudyCategories,
} from "../services/caseStudy.api";
import {
  CaseStudy,
  CaseStudyCategoryResponse,
  CaseStudyResponse,
} from "@/types/case-study";

export const usePublicCaseStudies = (query: CaseStudyQuery = {}) => {
  return useQuery<CaseStudyResponse>({
    queryKey: ["public-case-studies", query],
    queryFn: () => fetchPublicCaseStudies(query),
    staleTime: 1000 * 60 * 5, // 5 min
  });
};

export const useCaseStudyById = (id: string) => {
  return useQuery<CaseStudy>({
    queryKey: ["public-case-study", id],
    queryFn: () => fetchCaseStudyById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const usePublicCaseStudyCategories = () => {
  return useQuery<CaseStudyCategoryResponse>({
    queryKey: ["public-case-study-categories"],
    queryFn: fetchPublicCaseStudyCategories,
    staleTime: 1000 * 60 * 5,
  });
};
