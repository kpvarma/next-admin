import { Metric } from "@/utils/models/definitions";

const SingleMetric = ({ metric, data }: { metric: Metric; data: any }) => {
  // Extract the first highlight
  const highlight = metric.highlights.length > 0 ? metric.highlights[0] : null;

  // Extract corresponding value from data
  const item = highlight ? {
    label: highlight.title,
    value: data[highlight.value] || 0,
  } : null;

  return (
    <div className="w-full flex flex-col">
      {/* Title & Caption (Optional) */}
      {metric.title && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">{metric.title}</h2>
          {metric.caption && <p className="text-sm text-muted-foreground mt-1">{metric.caption}</p>}
        </div>
      )}

      {/* Highlight Display */}
      {item ? (
        <div>
          <span className="tracking-tight text-sm font-normal">{item.label}</span>
          <div className="text-2xl font-bold">{item.value.toLocaleString()}</div>
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No data available</p>
      )}
    </div>
  );
};

export default SingleMetric;