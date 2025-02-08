import React from "react";
import { BarChart, Bar, CartesianGrid, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartTooltipContent } from "@/components/ui/chart";
import { formatXVal, formatYVal } from '@/utils/chartUtils';

export function TimeSeriesBarChart({ chartData, metadata }: { chartData: any[]; metadata: any }) {
  
  // Extract Configurations from `chartConfig` with Defaults
  const config = metadata.chart_config || {};

  // Get colors from metadata.chart_config (fallback to default colors if missing)
  const colors = config.colors || ["#4B4B4B", "#FF6B6B", "#007BFF", "#FFBF00", "#6A0DAD", "#708090"];

  return (
    <ResponsiveContainer width="100%" height={(config.height || 200)}>
      <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
        
        {/* Conditionally Render Grid */}
        {metadata.chart_config?.grid && <CartesianGrid vertical={false} strokeDasharray="3 3" />}

        {/* Ensure X-Axis Uses Consistent Formatting */}
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => formatXVal(config.date_format, value)} // Ensures "YYYY-MM-DD" → "01 Dec 24"
        />

        {/* Conditionally render Y-Axis */}
        {!metadata.chart_config?.hide_y_axis && (
          <YAxis tickFormatter={(value) => formatYVal(config.value_format, config.decimal_places, value)} />
        )}

        {/* Conditionally Render Tooltip */}
        {config.tooltip && (
          <Tooltip 
            content={<ChartTooltipContent className="w-[150px]" nameKey="hover_label" />}
            labelFormatter={(value) => formatXVal(config.date_format, value, true)} // Formats tooltip date with year
          />
        )}

        {/* Conditionally Render Legend */}
        {config.legend && <Legend verticalAlign="top" align="right" />}

        {/* Apply Colors Dynamically */}
        {metadata.measures.map((item, index) => (
          <Bar 
            key={item.value} 
            dataKey={item.value} 
            fill={colors[index % colors.length]} 
            radius={[4, 4, 0, 0]} 
            animationDuration={config.animation ? 500 : 0} // Applies animation if enabled
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}