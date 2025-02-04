"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface AreaChartBoxProps {
  data: { date: string; count: number }[];
  title?: string;
}

export const AreaChartBox = ({ data, title = "Chart" }: AreaChartBoxProps) => {
  return (
    <div className="bg-gray-100 p-2 shadow-md rounded-lg">
      <h2 className="text-sm font-semibold mb-2 text-gray-800">{title}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#666" }} />
          <YAxis tick={{ fontSize: 10, fill: "#666" }} />
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#666" fill="#ddd" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};