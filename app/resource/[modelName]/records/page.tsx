"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Page Layout
import GridLayout from "react-grid-layout";
import MainLayout from "@/components/layout/main-layout";
import Pagination from "@/components/general/crud-pagination";
import CollectionWidget from "@/components/widgets/CollectionWidget";
import CrudifyAlert from "@/components/general/alert";
import CRUDTable from "@/components/general/crud-table";
import CRUDTabs from "@/components/general/crud-tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Styles Imports
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

// Context
import { ModelConfig } from "@/utils/models/definitions";
import { useServer } from "@/context/server_context";

// APIs
import { fetchAllRecords } from "@/utils/apis/cruds";

export default function RecordList() {
  const { modelName: rawModelName } = useParams();
  const modelName = Array.isArray(rawModelName) ? rawModelName[0] : rawModelName;
  
  const { activeServer } = useServer();

  const [alert, setAlert] = useState<{type: "error" | "info" | "success" | null, heading: string; description: string}>({type: null, heading: '', description: ''});

  const [modelData, setModelData] = useState<any[]>([]);
  const [modelConfig, setModelConfig] = useState<ModelConfig | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!activeServer || !modelName) return;

      setLoading(true);
      setError(null);
      try {
        const response = await fetchAllRecords(activeServer, modelName, currentPage, perPage);
        if (response.error) setError(response.error);
        else {
          if(response.data) setModelData(response.data);
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
      const mConfig = activeServer.metaData.models.find((mdata) => mdata.name === modelName);
      if (mConfig) {
        setModelConfig(mConfig);
      }
    }
  }, [activeServer, modelName, currentPage, perPage]);

  return (
    <MainLayout>
      
      <div className="px-2">
        {modelName && (
          <CRUDTabs modelName={modelName} recordId={null} />
        )}
      </div>

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

            {/* Show Loading */}
            {loading ? (
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Loading ...</h1>
              </div>
            ) : (
              <>
                {alert && alert.type && <CrudifyAlert alertData={alert} />} {/* Alert Box */}
              </>
            )}
            
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