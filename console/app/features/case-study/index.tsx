// app/features/case-study/index.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";
import {
  useGetCaseStudiesQuery,
  usePartiallyUpdateCaseStudyMutation,
  useDeleteCaseStudyMutation,
} from "./data/caseStudyApi";
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

export default function CaseStudyPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter") ?? "all";

  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [tableInstance, setTableInstance] = React.useState<any>(null);

  const { data, isLoading } = useGetCaseStudiesQuery({ page, limit, filter });
  const [toggleStatus] = usePartiallyUpdateCaseStudyMutation();
  const [deleteCaseStudy] = useDeleteCaseStudyMutation();

  const rows = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  const handleDelete = async (item: any) => {
    await toast.promise(deleteCaseStudy(item._id).unwrap(), {
      loading: `Deleting ${item.title}...`,
      success: `Case study "${item.title}" deleted successfully!`,
      error: "Failed to delete case study.",
    });
  };

  const handleToggle = async (row: any, key: "isActive" | "isFeature") => {
    try {
      await toggleStatus({
        id: row._id,
        data: { [key]: !row[key] },
      }).unwrap();
      toast.success(`"${row.title}" updated.`);
    } catch {
      toast.error("Failed to update case study.");
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
      accessorKey: "clientLogo",
      header: "Logo",
      cell: ({ row }) =>
        row.original.clientLogo ? (
          <img
            src={row.original.clientLogo}
            alt={row.original.clientName}
            className="h-10 w-10 rounded object-contain border bg-white p-1"
          />
        ) : (
          <div className="h-10 w-10 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
            N/A
          </div>
        ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-medium text-foreground">
          {row.original.title}
        </span>
      ),
    },
    {
      accessorKey: "clientName",
      header: "Client",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.clientName || "-"}
        </span>
      ),
    },
    {
      accessorKey: "category",
      header: "Sector",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.category?.name || "-"}
        </span>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => (
        <Switch
          checked={row.original.isActive}
          onCheckedChange={() => handleToggle(row.original, "isActive")}
        />
      ),
    },
    {
      accessorKey: "isFeature",
      header: "Featured",
      cell: ({ row }) => (
        <Switch
          checked={row.original.isFeature}
          onCheckedChange={() => handleToggle(row.original, "isFeature")}
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
        const item = row.original;
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
                  navigate(`/admin/case-study/edit/${item._id}`)
                }
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  (table.options.meta as any)?.openDeleteDialog(item)
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
        <h1 className="text-2xl font-semibold">Client Case Studies</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/case-study-category")}
          >
            Manage Sectors
          </Button>
          <Button onClick={() => navigate("/admin/case-study/create")}>
            <CirclePlus className="mr-2 h-4 w-4" /> Add Case Study
          </Button>
        </div>
      </div>

      {tableInstance && (
        <BulkActions table={tableInstance} entityName="case-study" />
      )}

      <DataTable
        columns={columns}
        data={rows}
        isLoading={isLoading}
        searchKey="title"
        pagination={{
          page,
          totalPages,
          onPageChange: setPage,
          pageSize: limit,
          onPageSizeChange: setLimit,
        }}
        onDelete={handleDelete}
        deleteItemNameKey="title"
        onTableReady={setTableInstance}
      />
    </div>
  );
}
