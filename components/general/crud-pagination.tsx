"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  perPage,
  onPageChange,
  onPerPageChange,
}) => {
  const pageRange = 2; // Number of pages to show before and after the current page
  const pageNumbers = [];

  if (totalPages <= 6) {
    // Show all pages if total pages are 6 or less
    pageNumbers.push(...Array.from({ length: totalPages }, (_, i) => i + 1));
  } else {
    pageNumbers.push(1); // Always show the first page

    if (currentPage > pageRange + 2) {
      pageNumbers.push("..."); // Add ellipsis if necessary
    }

    const startPage = Math.max(2, currentPage - pageRange);
    const endPage = Math.min(totalPages - 1, currentPage + pageRange);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - pageRange - 1) {
      pageNumbers.push("...");
    }

    pageNumbers.push(totalPages); // Always show the last page
  }

  return (
    <div className="flex items-center justify-between mt-6">
      {/* Items per Page */}
      <div className="flex items-center space-x-2">
        <label htmlFor="perPage" className="text-sm font-medium">
          Rows per page:
        </label>
        <Select value={String(perPage)} onValueChange={(value) => onPerPageChange(Number(value))}>
          <SelectTrigger className="w-24">
            <SelectValue placeholder={String(perPage)} />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {pageNumbers.map((page, index) =>
          typeof page === "number" ? (
            <Button
              key={index}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ) : (
            <span key={index} className="px-2 text-gray-500">
              {page}
            </span>
          )
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;