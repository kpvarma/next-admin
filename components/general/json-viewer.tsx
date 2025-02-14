"use client";

import React, { useState } from "react";
import { JsonEditor } from "json-edit-react";
import { ScrollArea } from "@/components/ui/scroll-area"; // ShadCN ScrollArea

interface JsonViewerProps {
  jsonData: Record<string, any>;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ jsonData }) => {
  const [error, setError] = useState<string | null>(null);

  try {
    return (
      <ScrollArea className="w-full border rounded-lg max-h-[500px] overflow-auto">
        <div className="p-4 bg-gray-50 min-h-[600px]">
          <JsonEditor
            data={jsonData}
            collapsible={true} // Enables expand/collapse
            expanded={2}       // Expands only the first 2 levels
            editable={false}   // Read-only mode
          />
        </div>
      </ScrollArea>
    );
  } catch (err: any) {
    setError(err.message);
  }

  return (
    <ScrollArea className="max-h-[500px] w-full border rounded-lg p-4 bg-red-100 text-red-700 overflow-auto">
      <p><strong>Error displaying JSON:</strong></p>
      <pre className="whitespace-pre-wrap text-sm">{error}</pre>
    </ScrollArea>
  );
};

export default JsonViewer;