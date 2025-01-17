"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import MainLayout from "../../../components/layout/main-layout";
import { useServer } from "../../../context/server_context"; // Adjust path as needed

export default function Dashboard() {
  const { server } = useParams(); // Get server from the URL
  const { activeServer, setActiveServer, servers } = useServer(); // Access server context

  useEffect(() => {
    // Find the server object from the servers list using the server param
    const matchedServer = servers.find((s: any) => s.apiName === server);

    if (matchedServer) {
      setActiveServer(matchedServer); // Set the active server in context
    } else {
      console.warn(`Server "${server}" not found in context.`);
    }
  }, [server, servers, setActiveServer]);

  return (
    <MainLayout>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p>Welcome to the dashboard. Manage your data here.</p>
            <h1 className="text-2xl font-bold mb-4">User Types</h1>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </MainLayout>
  );
}