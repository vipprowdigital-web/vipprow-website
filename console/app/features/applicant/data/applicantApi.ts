// 1. Change this import line to include /react 👇
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "~/utils/auth";

export const applicantApi = createApi({
  reducerPath: "applicantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/`,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Applicant"],
  endpoints: (builder) => ({
    getApplicants: builder.query({
      query: () => "applicant",
      providesTags: ["Applicant"],
    }),
    deleteApplicant: builder.mutation({
      // 2. Fixed the colon here so it injects the ID properly clean 👇
      query: (id: string) => ({ url: `applicant/${id}`, method: "DELETE" }),
      invalidatesTags: ["Applicant"],
    }),
  }),
});

// Now these will be cleanly generated without TS complaining!
export const { useGetApplicantsQuery, useDeleteApplicantMutation } =
  applicantApi;
