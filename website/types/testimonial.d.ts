export interface Testimonial {
  _id?: string;
  name: string;
  designation?: string | null;
  description: string;
  shortDescription?: string;
  avatar?: string | null;
  rating: number;
  isActive?: boolean;
}

export interface TestimonialQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface TestimonialApiResponse {
  data: Testimonial[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
