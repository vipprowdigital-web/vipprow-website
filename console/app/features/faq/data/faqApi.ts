// app/features/faq/data/faqApi.ts - (using RTK Query)

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "~/utils/auth";

export type FaqPageOption = { value: string; label: string };

export const faqApi = createApi({
  reducerPath: "faqApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/`,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Faq"],

  endpoints: (builder) => ({
    // Pages of the website that can have FAQs (single source: the backend)
    getFaqPages: builder.query<{ data: FaqPageOption[] }, void>({
      query: () => `faq/pages`,
    }),

    // Admin: paginated list, optionally for one page
    getFaqs: builder.query({
      query: ({
        page = 1,
        limit = 10,
        pageKey = "all",
        search = "",
      }: {
        page?: number;
        limit?: number;
        pageKey?: string;
        search?: string;
      }) =>
        `faq?page=${page}&limit=${limit}&pageKey=${encodeURIComponent(pageKey)}&search=${encodeURIComponent(search)}`,
      providesTags: ["Faq"],
    }),

    getFaqById: builder.query({
      query: (id: string) => `faq/${id}`,
      providesTags: ["Faq"],
    }),

    createFaq: builder.mutation({
      query: (data: any) => ({ url: `faq`, method: "POST", body: data }),
      invalidatesTags: ["Faq"],
    }),

    updateFaq: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `faq/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),

    partiallyUpdateFaq: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `faq/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),

    deleteFaq: builder.mutation({
      query: (id: string) => ({ url: `faq/${id}`, method: "DELETE" }),
      invalidatesTags: ["Faq"],
    }),
  }),
});

export const {
  useGetFaqPagesQuery,
  useGetFaqsQuery,
  useGetFaqByIdQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  usePartiallyUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
