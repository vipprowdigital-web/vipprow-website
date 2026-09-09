// app/features/case-study-category/index.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import {
  useGetCaseStudyCategoriesQuery,
  useDeleteCaseStudyCategoryMutation,
  usePartiallyUpdateCaseStudyCategoryMutation,
} from "./data/caseStudyCategoryApi";
import { DataTable, BulkActions } from "@/components/crud";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
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

export default function CaseStudyCategoryPage() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [tableInstance, setTableInstance] = React.useState<any>(null);

  const { data, isLoading } = useGetCaseStudyCategoriesQuery({ page, limit });
  const [deleteCategory] = useDeleteCaseStudyCategoryMutation();
  const [partiallyUpdateCategory] =
    usePartiallyUpdateCaseStudyCategoryMutation();

  const rows = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  const handleDelete = async (item: any) => {
    await toast.promise(deleteCategory(item._id).unwrap(), {
      loading: `Deleting ${item.name}...`,
      success: `Sector "${item.name}" deleted successfully!`,
      error: (err) => err?.data?.message || "Failed to delete sector.",
    });
  };

  const handleToggleActive = async (category: any) => {
    try {
      await partiallyUpdateCategory({
        id: category._id,
        data: { isActive: !category.isActive },
      }).unwrap();
      toast.success(
        `Sector "${category.name}" has been ${
          category.isActive ? "deactivated" : "activated"
        }.`,
      );
    } catch {
      toast.error("Failed to update sector status.");
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
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-medium text-foreground">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "heading",
      header: "Section Heading",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.heading || "—"}
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
        const category = row.original;
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
                onClick={() =>
                  navigate(`/admin/case-study-category/edit/${category._id}`)
                }
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  (table.options.meta as any)?.openDeleteDialog(category)
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Case Study Sectors</h1>
        <Button
          onClick={() => navigate("/admin/case-study-category/create")}
        >
          <CirclePlus className="mr-2 h-4 w-4" /> Add Sector
        </Button>
      </div>

      {tableInstance && (
        <BulkActions table={tableInstance} entityName="case-study-category" />
      )}

      <DataTable
        columns={columns}
        data={rows}
        isLoading={isLoading}
        searchKey="name"
        pagination={{
          page,
          totalPages,
          onPageChange: setPage,
          pageSize: limit,
          onPageSizeChange: setLimit,
        }}
        onDelete={handleDelete}
        deleteItemNameKey="name"
        onTableReady={setTableInstance}
      />
    </div>
  );
}
