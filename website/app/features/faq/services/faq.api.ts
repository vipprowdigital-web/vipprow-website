// website\app\features\faq\services\faq.api.ts

import { API } from "@/lib/axiosClient";
import { FaqResponse } from "@/types/faq";

// Active FAQs added from the console for one page of the website
export const fetchPublicFaqs = async (page: string): Promise<FaqResponse> => {
  const res = await API.get("/faq/public", { params: { page } });
  return res.data;
};
