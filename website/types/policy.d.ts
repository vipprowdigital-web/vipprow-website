export interface Policy {
  _id: string;
  title: string;
  slug?: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface PolicyQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isActive?: boolean;
}

export interface PolicyApiResponse {
  data: Policy[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
