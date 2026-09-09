// app/features/case-study/data/caseStudyApi.ts - (using RTK Query)

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "~/utils/auth";

export const caseStudyApi = createApi({
  reducerPath: "caseStudyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/`,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["CaseStudy"],

  endpoints: (builder) => ({
    /**
     * 🟢 Public Routes
     */

    // ✅ Get all active case studies (Public)
    getPublicCaseStudies: builder.query({
      query: (params: Record<string, any> = {}) => {
        const q = new URLSearchParams(
          Object.entries(params).filter(([, v]) => v !== undefined && v !== ""),
        ).toString();
        return `case-study/public${q ? `?${q}` : ""}`;
      },
      providesTags: ["CaseStudy"],
    }),

    // ✅ Get single public case study by ID / slug
    getPublicCaseStudyById: builder.query({
      query: (id: string) => `case-study/public/${id}`,
      providesTags: ["CaseStudy"],
    }),

    /**
     * 🔒 Admin-Protected Routes
     */

    // ✅ Get all case studies (paginated + searchable)
    getCaseStudies: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        filter = "all",
        sortBy = "createdAt",
        sortOrder = "desc",
      }) =>
        `case-study/admin/all?page=${page}&limit=${limit}&search=${search}&filter=${filter}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
      providesTags: ["CaseStudy"],
    }),

    // ✅ Get single case study (admin)
    getCaseStudyById: builder.query({
      query: (id: string) => `case-study/${id}`,
      providesTags: ["CaseStudy"],
    }),

    // ✅ Create case study (multipart/form-data)
    createCaseStudy: builder.mutation({
      query: (formData: FormData) => ({
        url: `case-study/admin`,
        method: "POST",
        body: formData, // ⚠️ Don't serialize FormData
      }),
      invalidatesTags: ["CaseStudy"],
    }),

    // ✅ Update case study (PUT, multipart/form-data)
    updateCaseStudy: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `case-study/admin/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["CaseStudy"],
    }),

    // ✅ Partial update (PATCH) — small JSON patch e.g. { isActive: false }
    partiallyUpdateCaseStudy: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `case-study/admin/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["CaseStudy"],
    }),

    // ✅ Delete case study
    deleteCaseStudy: builder.mutation({
      query: (id: string) => ({
        url: `case-study/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CaseStudy"],
    }),
  }),
});

export const {
  useGetPublicCaseStudiesQuery,
  useGetPublicCaseStudyByIdQuery,
  useGetCaseStudiesQuery,
  useGetCaseStudyByIdQuery,
  useCreateCaseStudyMutation,
  useUpdateCaseStudyMutation,
  usePartiallyUpdateCaseStudyMutation,
  useDeleteCaseStudyMutation,
} = caseStudyApi;
