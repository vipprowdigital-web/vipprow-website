// app/features/case-study/components/case-study-multi-delete-dialog.tsx

"use client";

import type { Table } from "@tanstack/react-table";
import { MultiDeleteDialog } from "@/components/crud/MultiDeleteDialog";
import { useDeleteCaseStudyMutation } from "../data/caseStudyApi";

type CaseStudyMultiDeleteDialogProps<TData> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  table: Table<TData>;
};

export function CaseStudyMultiDeleteDialog<TData>({
  open,
  onOpenChange,
  table,
}: CaseStudyMultiDeleteDialogProps<TData>) {
  const [deleteCaseStudy] = useDeleteCaseStudyMutation();

  return (
    <MultiDeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      table={table}
      entityName="Case Study"
      deleteFn={(id) => deleteCaseStudy(id).unwrap()}
    />
  );
}
