// website\app\features\faq\hook\useFaq.ts

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPublicFaqs } from "../services/faq.api";
import { FaqResponse } from "@/types/faq";

export const usePublicFaqs = (page?: string) => {
  return useQuery<FaqResponse>({
    queryKey: ["public-faqs", page],
    queryFn: () => fetchPublicFaqs(page as string),
    enabled: !!page,
    staleTime: 1000 * 60, // 1 min, so new FAQs show up quickly
  });
};
