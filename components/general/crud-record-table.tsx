"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { toTitleCase } from "@/utils/stringUtils";

// Props for CRUDRecordTable
interface CRUDRecordTableProps {
  record: Record<string, any>; // Single record object
  metadata: { columns: { name: string; options: { label: string } }[] } | null; // Column metadata
}

// Main Component
const CRUDRecordTable: React.FC<CRUDRecordTableProps> = ({ record, metadata }) => {
  if (!record || !metadata || !metadata.columns || metadata.columns.length === 0) {
    return <p className="text-center mt-4 text-gray-500">No record available</p>;
  }

  // Filter record attributes based on metadata columns
  const filteredData = metadata.columns
    .filter((col) => col.name in record)
    .map((col) => ({
      label: col.options.label, // Display label from metadata
      value: record[col.name] ?? "N/A", // Get value from record (handle null values)
    }));

  return <CRUDInfoTable data={filteredData} />;
};

export default CRUDRecordTable;