"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface LineChartBoxProps {
  data: { date: string; count: number }[];
  title?: string;
}

export const LineChartBox = ({ data, title = "Chart" }: LineChartBoxProps) => {
  return (
    <div className="bg-gray-100 p-2 shadow-md rounded-lg">
      <h2 className="text-sm font-semibold mb-2 text-gray-800">{title}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#666" }} />
          <YAxis tick={{ fontSize: 10, fill: "#666" }} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#000" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};