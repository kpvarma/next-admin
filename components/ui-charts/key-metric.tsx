"use client";

import React from "react";

interface KeyMetricProps {
  title: string;
  caption: string;
  count: string | number;
}

export function KeyMetric({ title, caption, count }: KeyMetricProps) {
  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="text-xs text-gray-400">{caption}</div>
      <div className="text-3xl font-bold text-gray-900 mt-2">{count}</div>
    </div>
  );
}