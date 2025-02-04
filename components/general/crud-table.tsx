
"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { toTitleCase } from "@/utils/stringUtils";

interface CRUDTableProps {
  data: Record<string, any>[]; // Array of objects representing table rows
  currentPage: number;
  perPage: number;
  totalCount: number;
}

const CRUDTable: React.FC<CRUDTableProps> = ({ data, currentPage, perPage, totalCount }) => {
  if (!data || data.length === 0) {
    return <p className="text-center mt-4 text-gray-500">No data available</p>;
  }

  return (
    <Table className="mt-10">
      <TableCaption>
        Showing {currentPage}-{perPage} of {totalCount}.
      </TableCaption>
      <TableHeader>
        <TableRow>
          {Object.keys(data[0]).map((key) => (
            <TableHead key={key}>{toTitleCase(key)}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            {Object.keys(item).map((key) => (
              <TableCell key={key}>{item[key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CRUDTable;