
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { toTitleCase } from "@/utils/stringUtils";

interface CRUDTableProps {
  data: Record<string, any>[]; // Array of objects representing table rows
  metadata: Record<string, any>; // Hash of objects representing table rows
  currentPage: number;
  perPage: number;
  totalCount: number;
  loading: Boolean;
}

const CRUDTable: React.FC<CRUDTableProps> = ({ metadata, data, currentPage, perPage, totalCount, loading }) => {
  if(loading == true) {
    return <p className="text-center mt-4 text-gray-500">Loading</p>;
  } else {
    if (!data || data.length === 0) {
      return <p className="text-center mt-4 text-gray-500">No data available</p>;
    }
  }

  return (
    <ScrollArea className="w-full border rounded-md p-2">
      <div className="w-full min-w-max">
        <Table className="mt-2">
          <TableCaption>
            Showing {currentPage}-{perPage} of {totalCount}.
          </TableCaption>
          <TableHeader>
            <TableRow>
              {data.length > 0 && Object.keys(data[0]).map((key) => {
                const columnConfig = metadata.columns.find((col: any) => col.name === key) || null;

                return (
                  <TableHead key={key}>
                    {toTitleCase(columnConfig ? columnConfig.options.label : key)}
                  </TableHead>
                );
              })}
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
      </div>
    </ScrollArea>
  );
};

export default CRUDTable;