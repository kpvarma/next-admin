"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface BarChartBoxProps {
  data: { date: string; count: number }[];
  title?: string;
}

export const BarChartBox = ({ data, title = "Chart" }: BarChartBoxProps) => {
  return (
    <div className="bg-gray-100 p-2 shadow-md rounded-lg">
      <h2 className="text-sm font-semibold mb-2 text-gray-800">{title}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#666" }} />
          <YAxis tick={{ fontSize: 10, fill: "#666" }} />
          <Tooltip />
          <Bar dataKey="count" fill="#000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};