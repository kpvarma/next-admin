"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Page Layout
import MainLayout from "@/components/layout/main-layout";
import Pagination from "@/components/general/crud-pagination";
import CRUDTable from "@/components/general/crud-table";

// Context
import { ModelMetaData, TimeSeriesDataResponse, ErrorResponse } from "@/utils/models/definitions";
import { useServer } from "../../../context/server_context";

// APIs
import { recordCreationTrendsData } from "@/utils/apis/model_visualisations";
import { fetchAllRecords } from "../../../utils/apis/model_cruds";

export default function ListRecords() {
  const { serverName, modelName: rawModelName } = useParams();
  const modelName = Array.isArray(rawModelName) ? rawModelName[0] : rawModelName;

  const { activeServer, setActiveServer, servers } = useServer();

  const [modelData, setModelData] = useState<any[]>([]);
  const [modelConfig, setModelConfig] = useState<ModelMetaData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const matchedServer = servers.find((server) => server.name === serverName);
    if (matchedServer) setActiveServer(matchedServer);
  }, [serverName, servers, setActiveServer]);

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
    if (activeServer?.modelMetaData && activeServer?.modelMetaData.length > 0) {
      const metaData = activeServer?.modelMetaData.find((mdata) => mdata.name === modelName);
      if (metaData) {
        setModelConfig(metaData);
      }
    }
  }, [activeServer, modelName, currentPage, perPage]);

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
      
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{modelConfig?.title}</h1>
        <p className="text-red-5001">{modelConfig?.description}</p>

        {/* Display CRUD Table */}
        <CRUDTable data={modelData} currentPage={currentPage} perPage={perPage} totalCount={totalCount} />

        {/* Displaay CRUD Pagination Controls */}
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
    </MainLayout>
  );
}