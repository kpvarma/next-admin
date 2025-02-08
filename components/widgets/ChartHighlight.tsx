import React from "react";

const ChartHighlight: React.FC<{ title: string; value: number | string; caption?: string }> = ({ title, value, caption }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="tracking-tight text-sm font-normal">{title}</span>
      <div className="text-2xl font-bold">{typeof value === "number" ? value.toLocaleString() : value}</div>
      {caption && <span className="text-xs text-muted-foreground">{caption}</span>}
    </div>
  );
};

export default ChartHighlight;