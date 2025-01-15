"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchAllFromIndexedDB } from "@/utils/indexdb"; // Adjust the path as needed

// Create the context
const ServerContext = createContext<any>(null);

// Provider Component
export const ServerProvider = ({ children }: { children: React.ReactNode }) => {
  const [servers, setServers] = useState<any[]>([]);
  const [activeServer, setActiveServer] = useState<string | null>(null);

  // Fetch servers from IndexedDB
  useEffect(() => {
    const fetchServers = async () => {
      try {
        const servers_data = await fetchAllFromIndexedDB();
        setServers(servers_data);

        // Set the first server as the default if activeServer is not set
        if (servers_data.length > 0 && !activeServer) {
          setActiveServer(servers_data[0].apiName);
        }
      } catch (error) {
        console.error("Error fetching servers:", error);
      }
    };

    fetchServers();
  }, [activeServer]);

  return (
    <ServerContext.Provider value={{ servers, setServers, activeServer, setActiveServer }}>
      {children}
    </ServerContext.Provider>
  );
};

// Custom Hook for consuming context
export const useServer = () => useContext(ServerContext);