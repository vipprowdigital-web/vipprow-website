"use client";

import { Pagination } from "@/components/ui/Pagination";
import { useRouter, useSearchParams } from "next/navigation";

export function ArticlesClient({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const params = useSearchParams();

  if (totalPages <= 1) return null;

  const onPageChange = (page: number) => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", String(page));
    router.push(`?${newParams.toString()}`, { scroll: true });
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
}
