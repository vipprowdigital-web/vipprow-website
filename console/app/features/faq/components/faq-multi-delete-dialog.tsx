// app/features/faq/components/faq-multi-delete-dialog.tsx

"use client";

import type { Table } from "@tanstack/react-table";
import { MultiDeleteDialog } from "@/components/crud/MultiDeleteDialog";
import { useDeleteFaqMutation } from "../data/faqApi";

type Props<TData> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  table: Table<TData>;
};

export function FaqMultiDeleteDialog<TData>({
  open,
  onOpenChange,
  table,
}: Props<TData>) {
  const [deleteFaq] = useDeleteFaqMutation();

  return (
    <MultiDeleteDialog
      open={open}
      onOpenChange={onOpenChange}
      table={table}
      entityName="FAQ"
      deleteFn={(id) => deleteFaq(id).unwrap()}
    />
  );
}
