import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface InfoTableProps {
  data: { label: string; value: any }[];
  heading?: string; // Optional heading
}

// Determines if we should use 4-column (2 attributes per row) or 6-column (3 attributes per row) layout
const determineColumns = (length: number) => (length > 6 ? 6 : 4);

const InfoTable: React.FC<InfoTableProps> = ({ data, heading }) => {
  const columns = determineColumns(data.length);
  const rows = [];

  // Creating row chunks based on the number of columns
  for (let i = 0; i < data.length; i += columns / 2) {
    rows.push(data.slice(i, i + columns / 2));
  }

  return (
    <Table className="mt-2 border border-gray-200 rounded-lg shadow-sm">
      {/* Display heading only if provided */}
      {heading && (
        <TableHeader>
          <TableRow>
            <TableHead colSpan={columns} className="text-lg font-semibold text-gray-700 text-center">
              {heading}
            </TableHead>
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((item, colIndex) => (
              <React.Fragment key={colIndex}>
                <TableHead className="font-semibold text-gray-700">{item.label}</TableHead>
                <TableCell className="text-gray-900">{item.value}</TableCell>
              </React.Fragment>
            ))}
            {/* If using 6-column mode and odd number of fields, add empty columns */}
            {columns === 6 && row.length < 3 && (
              <>
                <TableHead></TableHead>
                <TableCell></TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InfoTable;