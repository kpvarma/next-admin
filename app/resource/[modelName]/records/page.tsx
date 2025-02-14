"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Page Layout
import GridLayout from "react-grid-layout";
import MainLayout from "@/components/layout/main-layout";
import Pagination from "@/components/general/crud-pagination";
import CollectionWidget from "@/components/widgets/CollectionWidget";
import CRUDTable from "@/components/general/crud-table";
import CRUDTabs from "@/components/general/crud-tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Styles Imports
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

// Context
import { ModelMetaData, WidgetData } from "@/utils/models/definitions";
import { useServer } from "@/context/server_context";

// APIs
import { fetchIndexMetadata } from "@/utils/apis/metadata";
import { fetchAllRecords } from "@/utils/apis/cruds";

export default function RecordList() {
  const { modelName: rawModelName } = useParams();
  const modelName = Array.isArray(rawModelName) ? rawModelName[0] : rawModelName;

  const { activeServer, setActiveServer, servers } = useServer();

  const [widgetsData, setWidgetsData] = useState<WidgetData|{}>([]);

  const [modelData, setModelData] = useState<any[]>([]);
  const [modelConfig, setModelConfig] = useState<ModelMetaData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!activeServer) return;
      if (!modelName) return;

      setLoading(true);
      setError(null);
      try {
        const response = await fetchIndexMetadata(activeServer, modelName);
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
    const fetchData = async () => {
      if (!activeServer || !modelName) return;

      setLoading(true);
      setError(null);
      try {
        const response = await fetchAllRecords(activeServer, modelName, currentPage, perPage);
        if (response.error) setError(response.error);
        else {
          setModelData(response.data || []);
          setCurrentPage(response.currentPage);
          setPerPage(response.perPage);
          setTotalCount(response.totalCount);
          setTotalPages(response.totalPages);
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set modelConfig
    if (activeServer?.metaData && activeServer.metaData.models && activeServer?.metaData.models.length > 0) {
      const metaData = activeServer.metaData.models.find((mdata) => mdata.name === modelName);
      if (metaData) {
        setModelConfig(metaData);
      }
    }
  }, [activeServer, modelName, currentPage, perPage]);

  return (
    <MainLayout>
      
      <div className="px-2">
        {modelName && (
          <CRUDTabs modelName={modelName} recordId={null} />
        )}
        
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
      </div>

      {widgetsData?.visualisations && Object.keys(widgetsData.visualisations).length > 0 && (
        <div className="px-2">
          <GridLayout className="layout bg-gray-200" cols={12} rowHeight={20} width={1200}>
            {widgetsData && widgetsData.visualisations ? (
              Object.entries(widgetsData.visualisations).map(([key, collection]) => (
                <div key={key} data-grid={collection.display}>
                  <CollectionWidget collection={collection} activeServer={activeServer} modelName={modelName} />
                </div>
              ))
            ) : null}
          </GridLayout>
        </div>
      )}

      <div className="px-2 py-2">
        <Card className="shadow-md">
          {/* Card Header: Title & Description */}
          <CardHeader>
            <CardTitle>{modelConfig?.title}</CardTitle>
            {modelConfig?.description && (
              <CardDescription>{modelConfig?.description}</CardDescription>
            )}
          </CardHeader>

          {/* Card Content */}
          <CardContent>
            {/* CRUD Table with Top Margin */}
            <div className="mt-6">
              <CRUDTable 
                metadata={modelConfig} 
                data={modelData} 
                currentPage={currentPage} 
                perPage={perPage} 
                totalCount={totalCount} 
                loading={loading} 
              />
            </div>

            {/* Pagination with Top Margin */}
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                perPage={perPage}
                onPageChange={(page) => setCurrentPage(page)}
                onPerPageChange={(size) => {
                  setPerPage(size);
                  setCurrentPage(1); // Reset to first page when changing perPage
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
    </MainLayout>
  );
}