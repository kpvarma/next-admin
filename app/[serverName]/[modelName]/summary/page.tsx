"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Page Layout
import GridLayout from "react-grid-layout";
import MainLayout from "@/components/layout/main-layout";
import CollectionWidget from "@/components/widgets/CollectionWidget";
import { RecordCreationTrends } from "@/components/ui-charts/record-creation-trends";

// Context
import { ModelMetaData, TimeSeriesDataResponse, ErrorResponse, WidgetData } from "@/utils/models/definitions";
import { useServer } from "../../../../context/server_context";

// APIs
import { fetchSummaryMetadata } from "@/utils/apis/models_metadata";
import { recordCreationTrendsData } from "@/utils/apis/model_visualisations";

export default function SummaryPage() {
  const { serverName, modelName: rawModelName } = useParams();
  const modelName = Array.isArray(rawModelName) ? rawModelName[0] : rawModelName;

  const { activeServer, setActiveServer, servers } = useServer();

  const [widgetsData, setWidgetsData] = useState<WidgetData|{}>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesDataResponse | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const matchedServer = servers.find((server) => server.name === serverName);
    if (matchedServer) setActiveServer(matchedServer);
  }, [serverName, servers, setActiveServer]);

  useEffect(() => {
    const fetchData = async () => {
      if (!activeServer) return;

      setLoading(true);
      setError(null);
      try {
        const response = await fetchSummaryMetadata(activeServer, modelName);
        if (response.error) setError(response.error);
        else {
          setWidgetsData(response.data || []);
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeServer, modelName]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      
      if(activeServer == null || modelName == undefined){ return;}

      const response = await recordCreationTrendsData(activeServer, modelName);

      console.log("response: ", response);

      function isTimeSeriesDataResponse(
        response: TimeSeriesDataResponse | ErrorResponse
      ): response is TimeSeriesDataResponse {
        return (response as TimeSeriesDataResponse).data !== undefined;
      }

      if (isTimeSeriesDataResponse(response)) {
        setTimeSeriesData(response);
      } else {
        setError(response.error);
      }

      setLoading(false);
    }

    loadData();
  }, [activeServer, modelName]);

  return (
    <MainLayout>

      {loading && (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Loading ...</h1>
        </div>
      )}

      {error && (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-500">{error}</p>
        </div>
      )}

      <div className="p-2">
        <GridLayout className="layout" cols={12} rowHeight={20} width={1200}>
          {widgetsData && widgetsData.visualisations ? (
            Object.entries(widgetsData.visualisations).map(([key, collection]) => (
              <div key={key} data-grid={collection.display}>
                <CollectionWidget collection={collection} activeServer={activeServer} modelName={modelName} />
              </div>
            ))
          ) : null}
        </GridLayout>
      </div>

      <div className="grid p-6">
        {timeSeriesData && (
          <RecordCreationTrends timeSeriesDataResponse={timeSeriesData} />
        )}
      </div>
      
    </MainLayout>
  );
}