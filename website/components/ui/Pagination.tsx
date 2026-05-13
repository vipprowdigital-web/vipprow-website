"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition",
          currentPage === 1
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-white/10"
        )}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Numbers */}
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "h-10 w-10 rounded-full text-sm font-medium transition",
              page === currentPage
                ? "bg-blue-600 text-white"
                : "text-white/70 hover:bg-white/10"
            )}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition",
          currentPage === totalPages
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-white/10"
        )}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
