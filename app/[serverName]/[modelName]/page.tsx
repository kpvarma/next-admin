"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Page Layout
import MainLayout from "@/components/layout/main-layout";
import { RecordCreationTrends } from "@/components/ui-charts/record-creation-trends";

const modelCreationData = [
  { date: "01", count: 12 }, // 12 students created
  { date: "02", count: 15 }, // 15 students created
  { date: "03", count: 10 }, // 10 students created
  { date: "04", count: 18 }, // 18 students created
  { date: "05", count: 20 }, // 20 students created
  { date: "06", count: 22 }, // 22 students created
  { date: "07", count: 25 }, // 25 students created
  { date: "08", count: 18 }, // 18 students created
  { date: "09", count: 15 }, // 15 students created
  { date: "10", count: 20 }, // 20 students created
  { date: "11", count: 22 }, // 22 students created
  { date: "12", count: 19 }, // 19 students created
  { date: "13", count: 23 }, // 23 students created
  { date: "14", count: 17 }, // 17 students created
];

// Context and Utils
import { CRUDifyServer, ModelMetaData } from "@/utils/models/definitions";
import { useServer } from "../../../context/server_context";
import { toTitleCase } from "../../../utils/general";
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
        const response = await fetchAllRecords(activeServer as CRUDifyServer, modelName, currentPage, perPage);
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

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
  };

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
        <RecordCreationTrends />
      </div>

      {modelData.length > 0 && (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">{modelConfig?.title}</h1>
          <p className="text-red-5001">{modelConfig?.description}</p>
          <Table className="mt-10">
            <TableCaption>
              Showing {currentPage}-{perPage} of {totalCount}.
            </TableCaption>
            <TableHeader>
              <TableRow>
                {Object.keys(modelData[0]).map((key) => (
                  <TableHead key={key}>{toTitleCase(key)}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {modelData.map((item, index) => (
                <TableRow key={index}>
                  {Object.keys(item).map((key) => (
                    <TableCell key={key}>{item[key]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Items per Page */}
            <div className="flex items-center space-x-2">
              <label htmlFor="perPage" className="text-sm font-medium">Rows per page:</label>
              <Select
                value={String(perPage)}
                onValueChange={(value) => setPerPage(Number(value))}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder={String(perPage)} />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 20, 50].map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Pagination */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}