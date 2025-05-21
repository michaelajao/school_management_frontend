/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useMemo } from "react";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

type Column<T> = {
  accessor: keyof T;
  header: string;
};

type GenericTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  totalCount: number;
  pageSize?: number;
  onAddNew?: (data: T) => void;
  onBulkUpload?: () => void;
  addNewTrigger?: React.ReactNode; // <-- This is new
};

export function GenericTable<T extends Record<string, any>>({
  columns,
  rows,
  totalCount,
  pageSize = 12,

  onBulkUpload,
  addNewTrigger, // <-- This is new
}: GenericTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const totalPages = Math.ceil(totalCount / pageSize);

  const filteredRows = useMemo(() => {
    return rows.filter((row) =>
      columns.some((col) => {
        const val = row[col.accessor];
        return (
          typeof val === "string" &&
          val.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    );
  }, [rows, searchQuery, columns]);

  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredRows.slice(startIndex, startIndex + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-between">
        <Input
          placeholder="Search by any column"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Button variant="outline">Filter</Button>
          {addNewTrigger ?? <Button disabled>Add New</Button>}{" "}
          {/* <-- Flexible */}
          <Button variant="secondary" onClick={onBulkUpload}>
            Bulk Upload (CSV)
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={String(col.accessor)}>{col.header}</TableHead>
              ))}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRows.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((col) => (
                  <TableCell key={String(col.accessor)}>
                    {String(row[col.accessor] ?? "")}
                  </TableCell>
                ))}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm">
          Showing {paginatedRows.length} from {totalCount} data
        </span>

        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              size="sm"
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            size="sm"
            variant="ghost"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
