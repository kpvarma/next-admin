import { Metric } from "@/utils/models/definitions";

const DualMetric = ({ metric, data }: { metric: Metric; data: any }) => {
  // Extract first two highlights (if available)
  const [highlight1, highlight2] = metric.highlights.slice(0, 2);

  // Extract corresponding values from data
  const item1 = highlight1 ? { 
    label: highlight1.title, 
    value: data[highlight1.value] || 0 
  } : null;

  const item2 = highlight2 ? { 
    label: highlight2.title, 
    value: data[highlight2.value] || 0 
  } : null;

  return (
    <div className="p-4 w-full flex flex-col">
      {/* Title & Caption (Both are Optional) */}
      {metric.title && (
        <div className="mb-4 text-center">
          <h2 className="text-lg">{metric.title}</h2>
          {metric.caption && (
            <p className="text-sm text-muted-foreground mt-1">{metric.caption}</p>
          )}
        </div>
      )}
      
      {/* Grid for Highlights */}
      <div className="grid gap-3 w-full">
        {item1 && (
          <div key={highlight1.value} className="flex flex-col items-center">
            <div className="text-2xl font-bold">{item1.value.toLocaleString()}</div>
            <span className="text-xs text-muted-foreground">{item1.label}</span>
          </div>
        )}

        {item2 && (
          <div key={highlight2.value} className="flex flex-col items-center">
            <div className="text-2xl font-bold">{item2.value.toLocaleString()}</div>
            <span className="text-xs text-muted-foreground">{item2.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DualMetric;