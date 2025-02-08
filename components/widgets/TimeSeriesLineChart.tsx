import React from "react";
import { LineChart, Line, CartesianGrid, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartTooltipContent } from "@/components/ui/chart";
import { formatXVal, formatYVal } from '@/utils/chartUtils';

export function TimeSeriesLineChart({ chartData, metadata }: { chartData: any[]; metadata: any }) {
  
  // Extract Configurations from `chartConfig` with Defaults
  const config = metadata.chart_config || {};

  // Get colors from metadata.chart_config (fallback to default colors if missing)
  const colors = config.colors || ["#4B4B4B", "#FF6B6B", "#007BFF", "#FFBF00", "#6A0DAD", "#708090"];
  
  return (
    <ResponsiveContainer width="100%" height={(config.height || 200)}>
      <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
        
        {/* Conditionally Render Grid */}
        {metadata.chart_config?.grid && <CartesianGrid vertical={false} strokeDasharray="3 3" />}

        {/* Conditionally render X-Axis */}
        {!metadata.chart_config?.hide_x_axis && (
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            // tickFormatter={formatDate} // 👈 Ensures "YYYY-MM-DD" → "01 Dec 24"
            tickFormatter={(value) => formatXVal(config.date_format, value)} // Ensures "YYYY-MM-DD" → "01 Dec 24"
          />
        )}

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

        {/* Draw Line Chart with Colors & Hover Effects */}
        {metadata.measures.map((item, index) => (
          <Line
            key={item.value}
            type="monotone"
            dataKey={item.value}
            stroke={colors[index % colors.length]} // Apply colors correctly
            strokeWidth={2}
            dot={false} // Ensure dots are always visible
            activeDot={{ r: 6 }} // Hover effect
            animationDuration={config.animation ? 500 : 0} // Applies animation if enabled
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}