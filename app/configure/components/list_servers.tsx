"use client";

import React, { useEffect, useState } from "react";

// UI Imports
import { Button } from "@/components/ui/button";

// Page Component Imports
import SkeletonLoader from "@/components/skeleton-loader";
import RandomImageWithQuote from "@/components/general/random-quotes";

// Utils Import
import { fetchAllFromIndexedDB } from "@/utils/indexdb";

export default function ListServers() {
  const [servers, setServers] = useState<any[]>([]);
  const [selectedServer, setSelectedServer] = useState<any | null>(null);

  useEffect(() => {
    const fetchServers = async () => {
      const data = await fetchAllFromIndexedDB();
      setServers(data);
    };
    fetchServers();
  }, []);

  const handleDelete = (apiName: string) => {
    const updatedServers = servers.filter((server) => server.apiName !== apiName);
    setServers(updatedServers);
    setSelectedServer(null);
  };

  const handleLaunch = (server: any) => {
    console.log("Launch server:", server);
    // Implement Launch functionality here
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen bg-background">
      {/* Table Section */}
      <div className="flex flex-col justify-center p-8">
        <h1 className="text-2xl font-bold mb-4">Configured Servers</h1>
        {servers.length === 0 ? (
          <p>No servers configured. Add one using the Add Server option.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">URL</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {servers.map((server) => (
                <tr
                  key={server.apiName}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedServer(server)}
                >
                  <td className="border border-gray-300 px-4 py-2">{server.apiName}</td>
                  <td className="border border-gray-300 px-4 py-2">{server.apiUrl}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLaunch(server);
                      }}
                    >
                      Launch
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(server.apiName);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Section */}
      <div className="flex items-center justify-center bg-muted relative p-8">
        {selectedServer ? (
          <div className="text-left p-4 bg-white rounded-md shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Server Details</h2>
            <p>
              <strong>Name:</strong> {selectedServer.apiName}
            </p>
            <p>
              <strong>URL:</strong> {selectedServer.apiUrl}
            </p>
            <p>
              <strong>API Key:</strong> {selectedServer.apiKey}
            </p>
            <h3 className="text-lg font-bold mt-4">JSON Data:</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
              {JSON.stringify(selectedServer, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="text-center">
            <RandomImageWithQuote />
            {/* <SkeletonLoader />
            <p className="text-gray-500 mt-4">Click on a server to view its details.</p> */}
          </div>
        )}
      </div>
    </div>
  );
}