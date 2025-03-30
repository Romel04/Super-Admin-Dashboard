// components/dashboard/SchoolSubscriptionsTable.jsx
"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Eye,
  Pencil,
  Trash2,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
} from "lucide-react";
import { toast } from "sonner";

export default function SchoolSubscriptionsTable({ data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);

  // Define column sizes
  const columns = [
    {
      accessorKey: "id",
      header: "Sl",
      size: 60,
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "schoolName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="whitespace-nowrap"
          >
            School Name
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      size: 180,
    },
    {
      accessorKey: "planName",
      header: "Plan Name",
      size: 120,
      cell: ({ row }) => <div className="whitespace-nowrap">{row.getValue("planName")}</div>,
    },
    {
      accessorKey: "price",
      header: "Price",
      size: 80,
      cell: ({ row }) => <div className="whitespace-nowrap">${row.getValue("price")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 180,
      cell: ({ row }) => <div className="whitespace-nowrap">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "mobileNo",
      header: "Mobile No",
      size: 120,
      cell: ({ row }) => <div className="whitespace-nowrap">{row.getValue("mobileNo")}</div>,
    },
    {
      accessorKey: "dates",
      header: "Dates",
      size: 140,
      cell: ({ row }) => {
        const dates = row.getValue("dates");
        return (
          <div className="text-xs whitespace-nowrap">
            <div>Start: {dates.startDate}</div>
            <div>Expiry: {dates.expiryDate}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "lastUpgrade",
      header: "Last Upgrade",
      size: 120,
      cell: ({ row }) => <div className="whitespace-nowrap">{row.getValue("lastUpgrade")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 100,
      cell: ({ row }) => {
        const status = row.getValue("status");
        let badgeClass = "bg-gray-500";
        
        if (status === "Active") {
          badgeClass = "bg-green-500";
        } else if (status === "Expired") {
          badgeClass = "bg-red-500";
        } else if (status === "Pending") {
          badgeClass = "bg-yellow-500";
        }
        
        return (
          <Badge variant="outline" className={`${badgeClass} text-white whitespace-nowrap`}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      size: 80,
      cell: ({ row }) => {
        const school = row.original;
        
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleView(school)}
                className="cursor-pointer"
              >
                <Eye className="mr-2 h-4 w-4" />
                <span>View</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleEdit(school)}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDeleteClick(school)}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Set up table with column sizes
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    defaultColumn: {
      minSize: 50,
      size: 100,
    },
  });

  const handleView = (school) => {
    toast.info(`Viewing ${school.schoolName}`);
    // Implementation for view action
  };

  const handleEdit = (school) => {
    toast.info(`Editing ${school.schoolName}`);
    // Implementation for edit action
  };

  const handleDeleteClick = (school) => {
    setSelectedSchool(school);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedSchool) {
      toast.success(`Deleted ${selectedSchool.schoolName}`);
      // Implementation for delete action
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter schools..."
          value={table.getColumn("schoolName")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("schoolName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button>Add New School</Button>
      </div>

      {/* Add an outer container with overflow auto to create scrollbar */}
      <div className="rounded-md border">
        <div className="overflow-x-auto" style={{ width: '100%' }}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead 
                        key={header.id} 
                        style={{ width: header.getSize(), minWidth: header.getSize() }}
                        className="whitespace-nowrap"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id}
                        style={{ width: cell.column.getSize(), minWidth: cell.column.getSize() }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          <strong>
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}
          </strong>{" "}
          of <strong>{table.getFilteredRowModel().rows.length}</strong> schools
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-semibold">{selectedSchool?.schoolName}</span>'s
              subscription and remove all related data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}