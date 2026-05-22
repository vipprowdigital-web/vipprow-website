"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useGetApplicantsQuery,
  useDeleteApplicantMutation,
} from "./data/applicantApi";
import { DataTable, BulkActions } from "@/components/crud";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowUpDown,
  MoreHorizontal,
  Trash2,
  FileText,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ApplicantPage() {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [tableInstance, setTableInstance] = React.useState<any>(null);

  // ✅ Fetch all applicants (paginated)
  const { data, isLoading } = useGetApplicantsQuery({ page, limit });
  // console.log("Data from Applicants Query: ", data);

  const [deleteApplicant] = useDeleteApplicantMutation();

  const applicantData = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  // ✅ Delete handler
  const handleDelete = async (item: any) => {
    toast.promise(deleteApplicant(item._id).unwrap(), {
      loading: `Removing application for "${item.name}"...`,
      success: `Application for "${item.name}" deleted successfully!`,
      error: "Failed to delete applicant record.",
    });
  };

  // ✅ Define table columns targeting name, jobTitle, and resume link configurations
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
          Applicant Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-medium text-foreground">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "jobTitle",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Applied Position
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.jobTitle}</span>
      ),
    },
    {
      accessorKey: "resume",
      header: "Resume / CV",
      cell: ({ row }) => {
        const resumeUrl = row.original.resume?.url;
        return resumeUrl ? (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded-md transition-colors"
          >
            <FileText className="h-3.5 w-3.5" />
            View Document
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        ) : (
          <span className="text-xs text-muted-foreground italic">
            No file attached
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Submitted At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row, table }) => {
        const applicant = row.original;
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
                  (table.options.meta as any)?.openDeleteDialog(applicant)
                }
                className="text-red-600 focus:text-red-600 focus:bg-red-500/10 cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Application
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="p-0 space-y-3">
      {/* HEADER BLOCK (Creation tools removed to match operational space parameters) */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Job Applications
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Review incoming candidate portfolios, profile details, and linked
            resumes.
          </p>
        </div>
      </div>

      {/* BULK DELETIONS / ACTIONS CONTAINER */}
      {tableInstance && (
        <BulkActions table={tableInstance} entityName="applicant" />
      )}

      {/* CORE DATA TABLE MODULE */}
      <DataTable
        columns={columns}
        data={applicantData}
        isLoading={isLoading}
        searchKey="name" // Changes search fallback mapping from 'title' to match applicant 'name'
        pagination={{
          page,
          totalPages,
          onPageChange: setPage,
          pageSize: limit,
          onPageSizeChange: setLimit,
        }}
        onDelete={handleDelete}
        deleteItemNameKey="name" // Targets candidate profile name inside safety dialog prompt overlays
        onTableReady={setTableInstance}
      />
    </div>
  );
}
