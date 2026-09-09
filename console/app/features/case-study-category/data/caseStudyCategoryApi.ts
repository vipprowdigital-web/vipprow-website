// app/features/case-study-category/data/caseStudyCategoryApi.ts - (using RTK Query)

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "~/utils/auth";

export const caseStudyCategoryApi = createApi({
  reducerPath: "caseStudyCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/`,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["CaseStudyCategory"],

  endpoints: (builder) => ({
    // ✅ Public — active sectors
    getPublicCaseStudyCategories: builder.query({
      query: () => `case-study-category/public`,
      providesTags: ["CaseStudyCategory"],
    }),

    // ✅ Admin — paginated list
    getCaseStudyCategories: builder.query({
      query: ({ page = 1, limit = 50 }) =>
        `case-study-category?page=${page}&limit=${limit}`,
      providesTags: ["CaseStudyCategory"],
    }),

    // ✅ Admin — single
    getCaseStudyCategoryById: builder.query({
      query: (id: string) => `case-study-category/${id}`,
      providesTags: ["CaseStudyCategory"],
    }),

    // ✅ Create (JSON)
    createCaseStudyCategory: builder.mutation({
      query: (data: any) => ({
        url: `case-study-category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CaseStudyCategory"],
    }),

    // ✅ Update (PUT, JSON)
    updateCaseStudyCategory: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `case-study-category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CaseStudyCategory"],
    }),

    // ✅ Partial update (PATCH)
    partiallyUpdateCaseStudyCategory: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `case-study-category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["CaseStudyCategory"],
    }),

    // ✅ Delete
    deleteCaseStudyCategory: builder.mutation({
      query: (id: string) => ({
        url: `case-study-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CaseStudyCategory"],
    }),
  }),
});

export const {
  useGetPublicCaseStudyCategoriesQuery,
  useGetCaseStudyCategoriesQuery,
  useGetCaseStudyCategoryByIdQuery,
  useCreateCaseStudyCategoryMutation,
  useUpdateCaseStudyCategoryMutation,
  usePartiallyUpdateCaseStudyCategoryMutation,
  useDeleteCaseStudyCategoryMutation,
} = caseStudyCategoryApi;
