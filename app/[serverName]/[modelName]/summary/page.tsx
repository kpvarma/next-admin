"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Page Layout
import MainLayout from "@/components/layout/main-layout";
import { RecordCreationTrends } from "@/components/ui-charts/record-creation-trends";

// Context
import { CRUDifyServer, ModelMetaData, TimeSeriesDataResponse, ErrorResponse } from "@/utils/models/definitions";
import { useServer } from "../../../../context/server_context";

// APIs
import { recordCreationTrendsData } from "@/utils/apis/model_visualisations";

export default function ListRecords() {
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesDataResponse | null>(null);
  const { serverName, modelName: rawModelName } = useParams();
  const modelName = Array.isArray(rawModelName) ? rawModelName[0] : rawModelName;

  const { activeServer, setActiveServer, servers } = useServer();
  const [modelConfig, setModelConfig] = useState<ModelMetaData | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const matchedServer = servers.find((server) => server.name === serverName);
    if (matchedServer) setActiveServer(matchedServer);
  }, [serverName, servers, setActiveServer]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      
      if(activeServer == null || modelName == undefined){ return;}

      const response = await recordCreationTrendsData(activeServer, modelName);

      function isTimeSeriesDataResponse(
        response: TimeSeriesDataResponse | ErrorResponse
      ): response is TimeSeriesDataResponse {
        return (response as TimeSeriesDataResponse).timeSeriesData !== undefined;
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
          <h1 className="text-2xl font-bold mb-4">Loading {modelConfig?.title}...</h1>
        </div>
      )}

      {error && (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-500">{error}</p>
        </div>
      )}

      <div className="grid p-6">
        {timeSeriesData && (
          <RecordCreationTrends timeSeriesDataResponse={timeSeriesData} />
        )}
      </div>
      
    </MainLayout>
  );
}