/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useCallback } from "react";
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

import { DeleteModal } from "../StaffDashboard/DeleteModal"; // adjust path as needed

type Column<T> = {
  accessor: keyof T;
  header: string;
};

type ActionHandlers<T> = {
  onEdit?: (row: T) => void;
  onView?: (row: T) => void;
  onDelete?: (row: T) => Promise<void>;
};

type GenericTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  totalCount: number;
  pageSize?: number;
  onBulkUpload?: () => void;
  addNewTrigger?: () => void; 
  actionHandlers?: ActionHandlers<T>;
};

export function GenericTable<T extends Record<string, any>>({
  columns,
  rows,
  totalCount,
  pageSize = 12,
  actionHandlers = {},
  onBulkUpload,
  addNewTrigger,
}: GenericTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { onEdit, onView, onDelete } = actionHandlers;

  // State for delete modal
   // Delete modal handling
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);

  const handleOpenDeleteModal = useCallback((row: T) => {
    setItemToDelete(row);
    setDeleteModalOpen(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
    setItemToDelete(null);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!itemToDelete || !onDelete) return Promise.reject("No item to delete");
    return onDelete(itemToDelete);
  }, [itemToDelete, onDelete]);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  // Filter rows based on search query
  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return rows;
    
    return rows.filter((row) =>
      columns.some((col) => {
        const value = row[col.accessor];
        return (
          value !== null &&
          value !== undefined &&
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    );
  }, [rows, searchQuery, columns]);

  // Get current page data
  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredRows.slice(startIndex, startIndex + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  // Handle page change
  const changePage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  return (
    <div className="space-y-4">
      {/* Delete Modal */}
      {deleteModalOpen && itemToDelete && (
        <DeleteModal
        title="user"
        deleteaction={handleDelete}
        onCancel={handleCloseDeleteModal}
        
        // isOpen={deleteModalOpen && !!itemToDelete}
        // onClose={handleCloseDeleteModal}
      />
      )}

      <div className="flex flex-wrap gap-2 justify-between">
        <Input
          placeholder="Search by any column"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Button variant="outline">Filter</Button>
           <Button onClick={addNewTrigger} disabled={!addNewTrigger}>
          Add New
        </Button>
          {onBulkUpload && (
            <Button variant="secondary" onClick={onBulkUpload}>
              Bulk Upload (CSV)
            </Button>
          )}
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
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row, idx) => (
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
                      <DropdownMenuContent align="end">
                        {onEdit && (
                          <DropdownMenuItem onClick={() => onEdit(row)}>
                            Edit
                          </DropdownMenuItem>
                        )}
                        {onView && (
                          <DropdownMenuItem onClick={() => onView(row)}>
                            View
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <DropdownMenuItem onClick={() => handleOpenDeleteModal(row)}>
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center py-4">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm">
          Showing {paginatedRows.length} from {totalCount} data
        </span>

        {totalPages > 1 && (
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>

            {totalPages <= 5 ? (
              // Show all pages if 5 or fewer
              Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  size="sm"
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => changePage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))
            ) : (
              // Show limited pages with ellipsis for large page counts
              <>
                {currentPage > 2 && (
                  <Button size="sm" variant="outline" onClick={() => changePage(1)}>
                    1
                  </Button>
                )}
                
                {currentPage > 3 && <span className="flex items-center px-2">...</span>}
                
                {currentPage > 1 && (
                  <Button size="sm" variant="outline" onClick={() => changePage(currentPage - 1)}>
                    {currentPage - 1}
                  </Button>
                )}
                
                <Button size="sm" variant="default">
                  {currentPage}
                </Button>
                
                {currentPage < totalPages && (
                  <Button size="sm" variant="outline" onClick={() => changePage(currentPage + 1)}>
                    {currentPage + 1}
                  </Button>
                )}
                
                {currentPage < totalPages - 2 && <span className="flex items-center px-2">...</span>}
                
                {currentPage < totalPages - 1 && (
                  <Button size="sm" variant="outline" onClick={() => changePage(totalPages)}>
                    {totalPages}
                  </Button>
                )}
              </>
            )}

            <Button
              size="sm"
              variant="ghost"
              disabled={currentPage === totalPages}
              onClick={() => changePage(currentPage + 1)}
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}