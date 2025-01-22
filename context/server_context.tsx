"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CRUDifyServer } from "@/utils/models/definitions";
import { fetchAllFromIndexedDB } from "@/utils/indexdb"; // Import the IndexedDB fetch utility

// Create the context
const ServerContext = createContext<{
  servers: CRUDifyServer[];
  setServers: React.Dispatch<React.SetStateAction<CRUDifyServer[]>>;
  activeServer: CRUDifyServer | null;
  setActiveServer: React.Dispatch<React.SetStateAction<CRUDifyServer | null>>;
} | null>(null);

// Provider Component
export const ServerProvider = ({ children }: { children: React.ReactNode }) => {
  const [servers, setServers] = useState<CRUDifyServer[]>([]); // Array of servers
  const [activeServer, setActiveServer] = useState<CRUDifyServer | null>(null); // Active server

  useEffect(() => {
    // Load servers from IndexedDB on component mount
    const loadServers = async () => {
      const storedServers = await fetchAllFromIndexedDB(); // Fetch servers from IndexedDB
      if (storedServers && storedServers.length > 0) {
        setServers(storedServers);
        setActiveServer(storedServers[0]); // Optionally set the first server as active
      }
    };

    loadServers();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <ServerContext.Provider value={{ servers, setServers, activeServer, setActiveServer }}>
      {children}
    </ServerContext.Provider>
  );
};

// Custom Hook for consuming context
export const useServer = () => {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error("useServer must be used within a ServerProvider");
  }
  return context;
};