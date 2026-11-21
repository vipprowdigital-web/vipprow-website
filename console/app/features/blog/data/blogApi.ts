// app/routes/blog/data/blogApi.ts - (using RTK Query)

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "~/utils/auth";

interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
}

interface Blog {
    _id?: string;
    title: string;
    slug?: string;
    category?: string | null;
    short_description?: string;
    description?: string;
    faqs?: { question: string; answer: string }[];
    thumbnail?: string | null;
    gallery_images?: string[];
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        metaKeywords?: string[];
    };
    displayOn?: ("website" | "academy")[];
    isActive?: boolean;
    isFeature?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/`,
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["Blog"],

    endpoints: (builder) => ({
        /* ------------------ 🟢 PUBLIC ------------------ */
        getPublicBlogs: builder.query<
            { data: Blog[]; pagination: any },
            PaginationParams
        >({
            query: ({ page = 1, limit = 10, search = "" }) =>
                `blog?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
            providesTags: ["Blog"],
        }),

        getBlogById: builder.query<{ data: Blog }, string>({
            query: (id) => `blog/${id}`,
            providesTags: (result, error, id) => [{ type: "Blog", id }],
        }),

        /* ------------------ 🔒 ADMIN ------------------ */
        getBlogs: builder.query<
            { data: Blog[]; pagination: any },
            { page?: number; limit?: number; search?: string; sortBy?: string; sortOrder?: string; filter?: string; displayOn?: "website" | "academy" }
        >({
            query: ({
                page = 1,
                limit = 10,
                search = "",
                sortBy = "createdAt",
                sortOrder = "desc",
                filter = "all",
                displayOn,
            }) =>
                `blog/admin/all?page=${page}&limit=${limit}&search=${encodeURIComponent(
                    search
                )}&sortBy=${sortBy}&sortOrder=${sortOrder}&filter=${filter}${
                    displayOn ? `&displayOn=${displayOn}` : ""
                }`,
            providesTags: ["Blog"],
        }),


        createBlog: builder.mutation<{ message: string; data: Blog }, FormData>({
            query: (formData) => ({
                url: `blog/admin`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Blog"],
        }),

        updateBlog: builder.mutation<
            { message: string; data: Blog },
            { id: string; formData: FormData }
        >({
            query: ({ id, formData }) => ({
                url: `blog/admin/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Blog", id },
                "Blog",
            ],
        }),

        partiallyUpdateBlog: builder.mutation<
            { message: string; data: Blog },
            { id: string; data: Partial<Blog> }
        >({
            query: ({ id, data }) => ({
                url: `blog/admin/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Blog"],
        }),

        deleteBlog: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `blog/admin/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Blog"],
        }),
    }),
});

export const {
    useGetPublicBlogsQuery,
    useGetBlogByIdQuery,
    useGetBlogsQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    usePartiallyUpdateBlogMutation,
    useDeleteBlogMutation,
} = blogApi;
