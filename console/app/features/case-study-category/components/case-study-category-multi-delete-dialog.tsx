// app/features/case-study-category/components/case-study-category-multi-delete-dialog.tsx

"use client";

import type { Table } from "@tanstack/react-table";
import { MultiDeleteDialog } from "@/components/crud/MultiDeleteDialog";
import { useDeleteCaseStudyCategoryMutation } from "../data/caseStudyCategoryApi";

type Props<TData> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  table: Table<TData>;
};

export function CaseStudyCategoryMultiDeleteDialog<TData>({
  open,
  onOpenChange,
  table,
}: Props<TData>) {
  const [deleteCategory] = useDeleteCaseStudyCategoryMutation();

  return (
    <MultiDeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      table={table}
      entityName="Sector"
      deleteFn={(id) => deleteCategory(id).unwrap()}
    />
  );
}
