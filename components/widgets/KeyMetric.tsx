import { Metric } from "@/utils/models/definitions";
import ChartHighlight from "@/components/widgets/ChartHighlight";

const KeyMetric = ({ metric, data }: { metric: Metric; data: any }) => {
  // Extract all highlights
  const highlights = metric.highlights.map((highlight) => ({
    title: highlight.title,
    caption: highlight.caption,
    value: data[highlight.value] || 0,
  }));

  return (
    <div className="w-full flex flex-col">
      {/* Title & Caption (Optional) */}
      {(metric.title || metric.caption) && (
        <div className="mb-4 text-center">
          {metric.title && (
            <h2 className="text-lg font-bold mb-4">{metric.title}</h2>
          )}
          {metric.caption && (
            <p className="text-sm text-muted-foreground">{metric.caption}</p>
          )}
        </div>
      )}

      {/* Grid for Highlights */}
      {highlights.length > 0 ? (
        <div className="flex flex-col w-full gap-4">
          {highlights.map((item, index) => (
            <ChartHighlight key={index} title={item.title} value={item.value} caption={item.caption} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center">No data available</p>
      )}
    </div>
  );
};

export default KeyMetric;