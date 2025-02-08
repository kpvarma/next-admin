"use client";

import React from "react";

// UI Imports
import { ChartContainer } from "@/components/ui/chart";
import { TimeSeriesLineChart } from "@/components/widgets/TimeSeriesLineChart";
import { TimeSeriesAreaChart } from "@/components/widgets/TimeSeriesAreaChart";
import { TimeSeriesBarChart } from "@/components/widgets/TimeSeriesBarChart";
import { TimeSeriesStackedBarChart } from "@/components/widgets/TimeSeriesStackedBarChart";
import ChartHighlight from "@/components/widgets/ChartHighlight";

// Defenitions
import { Metric } from "@/utils/models/definitions";

export function TimeSeriesChart({ data, metadata }: {data: any, metadata: Metric}) {
  // Extract keys from metadata.measures[]
  const metaKeys = metadata.measures.map((item) => item.value);
  const chartData = data.data;
  const dataKeys = Object.keys(chartData[0] || {}).filter((key) => key !== "date");

  // Validate that metadata keys exist in chartData
  const missingKeys = metaKeys.filter((key) => !dataKeys.includes(key));

  // Extract all highlights
  const highlights = metadata.highlights.map((highlight) => ({
    title: highlight.title,
    caption: highlight.caption,
    value: data[highlight.value] || 0,
  }));

  if (missingKeys.length > 0) {
    return (
      <div className="w-full p-4 border border-red-500 bg-red-100 text-red-600 rounded-md text-center">
        <p className="font-bold">Error: Invalid Data</p>
        <p>Missing keys in chart data: {missingKeys.join(", ")}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Title & Highlights Container */}
      {(metadata.title || metadata.caption || highlights.length > 0) && (
        <div className="flex justify-between items-center mb-4 w-full">
          
          {/* ✅ Left-Aligned Title & Caption */}
          <div className="text-left">
            {metadata.title && <h2 className="text-lg font-bold">{metadata.title}</h2>}
            {metadata.caption && <p className="text-sm text-muted-foreground mt-1">{metadata.caption}</p>}
          </div>

          {/* ✅ Right-Aligned Highlights */}
          {highlights.length > 0 && (
            <div className={`grid w-full gap-4 ${
              highlights.length <= 6 
                ? `grid-cols-${highlights.length}` 
                : `grid-cols-${Math.min(6, Math.max(2, Math.ceil(highlights.length / 2)))}`
            }`}>
              {highlights.map((item, index) => (
                <ChartHighlight key={index} title={item.title} value={item.value} caption={item.caption} />
              ))}
            </div>
          )}

        </div>
      )}

      

      {/* Chart Container */}
      <ChartContainer config={metadata.chart_config} className="aspect-auto w-full mt-4">
        {metadata.chart === "bar" && <TimeSeriesBarChart chartData={chartData} metadata={metadata} />}
        {metadata.chart === "line" && <TimeSeriesLineChart chartData={chartData} metadata={metadata} />}
        {metadata.chart === "area" && <TimeSeriesAreaChart chartData={chartData} metadata={metadata} />}
        {metadata.chart === "stackedbar" && <TimeSeriesStackedBarChart chartData={chartData} metadata={metadata} />}
      </ChartContainer>
    </div>
  );
}