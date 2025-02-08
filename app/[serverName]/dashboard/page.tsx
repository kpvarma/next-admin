"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Styles Imports
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

// Page Layout
import GridLayout from "react-grid-layout";
import MainLayout from "../../../components/layout/main-layout";
import CollectionWidget from "../../../components/widgets/CollectionWidget";

// Context
import { WidgetData } from "@/utils/models/definitions";
import { useServer } from "../../../context/server_context";

// APIs
import { fetchDashboardMetadata } from "../../../utils/apis/models_metadata";

export default function DashboardPage() {
  const { serverName } = useParams();
  const { activeServer, setActiveServer, servers } = useServer();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [widgetsData, setWidgetsData] = useState<WidgetData[]|[]>([]);
  
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
          const response = await fetchDashboardMetadata(activeServer);
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
    }, [activeServer]);

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
          {widgetsData.map((model) =>
            model.visualisations
              ? Object.entries(model.visualisations).map(([key, collection]) => (
                  <div key={key} data-grid={collection.display}>
                    <CollectionWidget collection={collection} activeServer={activeServer} modelName={model.name} />
                  </div>
                ))
              : null
          )}
        </GridLayout>
      </div>
      
      {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p>Welcome to the dashboard. Manage your data here.</p>
            <h1 className="text-2xl font-bold mb-4">Models</h1>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div> */}
    </MainLayout>
  );
}