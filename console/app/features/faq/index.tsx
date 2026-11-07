// app/features/faq/index.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import {
  useGetFaqsQuery,
  useGetFaqPagesQuery,
  useDeleteFaqMutation,
  usePartiallyUpdateFaqMutation,
} from "./data/faqApi";
import { DataTable, BulkActions } from "@/components/crud";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpDown,
  CirclePlus,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function FaqPage() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [pageKey, setPageKey] = React.useState("all");
  const [tableInstance, setTableInstance] = React.useState<any>(null);

  const { data: pagesData } = useGetFaqPagesQuery();
  const pageOptions = pagesData?.data ?? [];
  const pageLabel = (value: string) =>
    pageOptions.find((p) => p.value === value)?.label ?? value;

  const { data, isLoading } = useGetFaqsQuery({ page, limit, pageKey });
  const [deleteFaq] = useDeleteFaqMutation();
  const [partiallyUpdateFaq] = usePartiallyUpdateFaqMutation();

  const rows = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  const handleDelete = async (item: any) => {
    await toast.promise(deleteFaq(item._id).unwrap(), {
      loading: "Deleting FAQ...",
      success: "FAQ deleted successfully!",
      error: (err) => err?.data?.message || "Failed to delete FAQ.",
    });
  };

  const handleToggleActive = async (faq: any) => {
    try {
      await partiallyUpdateFaq({
        id: faq._id,
        data: { isActive: !faq.isActive },
      }).unwrap();
      toast.success(`FAQ ${faq.isActive ? "hidden" : "shown"} on the website.`);
    } catch {
      toast.error("Failed to update FAQ status.");
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: "question",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Question
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="block max-w-md truncate font-medium text-foreground">
          {row.original.question}
        </span>
      ),
    },
    {
      accessorKey: "page",
      header: "Page",
      cell: ({ row }) => (
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
          {pageLabel(row.original.page)}
        </span>
      ),
    },
    {
      accessorKey: "order",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.order ?? 0}</span>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => (
        <Switch
          checked={row.original.isActive}
          onCheckedChange={() => handleToggleActive(row.original)}
        />
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) =>
        row.original.createdAt
          ? new Date(row.original.createdAt).toLocaleDateString("en-IN")
          : "—",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row, table }) => {
        const faq = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate(`/admin/faq/edit/${faq._id}`)}
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  (table.options.meta as any)?.openDeleteDialog(faq)
                }
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="p-0 space-y-3">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h1 className="text-2xl font-semibold">FAQs</h1>
        <div className="flex items-center gap-3">
          <Select
            value={pageKey}
            onValueChange={(v) => {
              setPageKey(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-56">
              <SelectValue placeholder="All pages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All pages</SelectItem>
              {pageOptions.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() =>
              navigate(
                pageKey === "all"
                  ? "/admin/faq/create"
                  : `/admin/faq/create?page=${pageKey}`,
              )
            }
          >
            <CirclePlus className="mr-2 h-4 w-4" /> Add FAQ
          </Button>
        </div>
      </div>

      {tableInstance && <BulkActions table={tableInstance} entityName="faq" />}

      <DataTable
        columns={columns}
        data={rows}
        isLoading={isLoading}
        searchKey="question"
        pagination={{
          page,
          totalPages,
          onPageChange: setPage,
          pageSize: limit,
          onPageSizeChange: setLimit,
        }}
        onDelete={handleDelete}
        deleteItemNameKey="question"
        onTableReady={setTableInstance}
      />
    </div>
  );
}
