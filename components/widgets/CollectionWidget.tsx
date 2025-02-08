import React, { useEffect, useState } from "react";
import { fetchCollectionData } from "@/utils/apis/models_metadata";
import { Collection } from "@/utils/models/definitions";
import MetricWidget from "./MetricWidget";

const CollectionWidget = ({ collection, activeServer, modelName }: { collection: Collection; activeServer: any, modelName: any|null }) => {
  const [data, setData] = useState<any | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    if (!activeServer || !collection.api_end_point) return;
  
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchCollectionData(activeServer, modelName, collection.api_end_point);
        // console.log("Response: ", response);
        
        if (response.error) {
          setError(response.error);
        } else {
          setData(response.data || []);
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  
    if (collection.refresh_interval && collection.refresh_interval > 0) {
      const interval = setInterval(fetchData, collection.refresh_interval * 1000);
      return () => clearInterval(interval);
    }
  }, [activeServer, modelName, collection.api_end_point, collection.refresh_interval]);

  return (
    <div className="p-4 rounded-xl border bg-card text-card-foreground shadow w-full">
      {/* Title & Caption (Both are Optional) */}
      {(collection.title || collection.caption) && (
        <div className="mb-6 text-center">
          {collection.title && (
            <h2 className="text-xl font-bold">{collection.title}</h2>
          )}
          {collection.caption && (
            <p className="text-sm text-muted-foreground">{collection.caption}</p>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <h1 className="text-xl font-bold">Loading...</h1>
        </div>
      ) : error ? (
        // Error State
        <div className="flex flex-col items-center justify-center h-32 text-center">
          <h1 className="text-xl font-bold text-red-600">Error</h1>
          <p className="text-sm text-red-500">{error}</p>
        </div>
      ) : (
        // Render Metrics using Grid
        data && collection.metrics.length > 0 && (
          <div 
            className={`grid gap-4 w-full`}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(4, collection.metrics.length)}, minmax(120px, 1fr))`
            }}
          >
            {collection.metrics.map((metric) => (
              <MetricWidget key={metric.name} metric={metric} data={data} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default CollectionWidget;