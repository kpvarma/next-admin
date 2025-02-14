"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// UI Imports
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Plus, Trash } from "lucide-react";

// Page Component Imports
import RandomImageWithQuote from "@/components/general/random-quotes";
import CrudifyAlert from "@/components/general/alert";
import InfoTable from "@/components/general/info-table";
import JsonViewer from "@/components/general/json-viewer";


// Utils Import
import { saveToIndexedDB, fetchAllFromIndexedDB, deleteByApiName } from "@/utils/indexdb";
import { fetchMetaData } from "@/utils/apis/metadata";
import { useServer } from "../../context/server_context";

export default function ListServers() {
  const { activeServer, setActiveServer, servers, setServers } = useServer(); // Access server context
  const [errors, setErrors] = useState<{ apiName?: string; apiURL?: string; apiKey?: string }>({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{type: "error" | "info" | "success" | null, heading: string; description: string}>({type: null, heading: '', description: ''});
  
  const router = useRouter();

  const handleDelete = async (name: string) => {
    try {
      // Remove the server from IndexedDB
      await deleteByApiName(name);

      // Update the local server context to reflect the deletion
      const servers = await fetchAllFromIndexedDB();
      setServers(servers);

      // Clear the selected server if it matches the deleted one
      if (servers.length > 0) {
        setActiveServer(servers[0])
      } else {
        setActiveServer(null)
      }
      const message = `Server with name "${name}" has been deleted.` 
      setAlert({type: "success", heading: "Success!", description: message });
    } catch (error) {
      const message = `Failed to delete server with name "${name}": ${error}` 
      setAlert({type: "error", heading: "Error!", description: message });
    }
  };

  const handleLaunch = (server: any) => {
    // console.log("Launch server:", server);
    router.push(`/${server.name}/home`); // Navigate to the home page
  };
  
  const handleRefresh = async (server: any) => {
    // console.log("Refreshing server metadata:", server);

    if(!server){
      return
    }

    // Fetch user types from the API
    const { data: metaData, error: metaDataError } = await fetchMetaData(server);

    if (metaDataError) {
      setErrors({ apiKey: metaDataError });
      return;
    }
    
    // Update metaData in server
    const updatedActiveServer = { ...server, metaData };

    // Update servers list by replacing the modified server
    const updatedServers = servers.map((s) =>
      s.name === server.name ? updatedActiveServer : s
    );

    // Update state
    setServers(updatedServers);
    await saveToIndexedDB(updatedServers);

    const message = `Server MetaData has been refreshed successfully "${server.name}"` 
    setAlert({type: "success", heading: "Success!", description: message });

    // console.log("New metadata:", metaData);
    
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen bg-background">
      {/* Left Section */}
      <div className="flex flex-col justify-center p-8">

        {/* Show Loading */}
        {loading ? (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Loading ...</h1>
          </div>
        ) : (
          <>
            {/* Alert Box */}
            {alert && alert.type && <CrudifyAlert alertData={alert} />}
            {servers && servers.length === 0 && (
              <CrudifyAlert 
                alertData={{
                  type: "info",
                  heading: "Info!",
                  description: 'No servers configured. Add one using the "Add Server" button.'
                }} 
              />
            )}
          </>
        )}
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-center my-8">Configure Servers</h1>

        {/* Add Server Button */}
        <div className="flex justify-center mb-8">
          <Button variant="outline" onClick={() => router.push("/configure/new")} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Server
          </Button>
        </div>

        {/* Table Section */}
        {servers.length >= 0 && (
          <div className="p-4">
            <Table>
              <TableCaption>A list of configured servers.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {servers.map((server) => (
                  <TableRow
                    key={server.name}
                    className="cursor-pointer"
                    onClick={() => setActiveServer(server)}
                  >
                    <TableCell className="font-medium">{server.name}</TableCell>
                    <TableCell>{server.apiURL}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        className="mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRefresh(server);
                        }}
                      >
                        Refresh
                      </Button>
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
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            className="p-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogTitle>Delete Server</AlertDialogTitle> {/* 🔹 Required for accessibility */}
                          <p>Are you sure you want to delete this server?</p>
                          <div className="flex justify-end gap-2 mt-4">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(server.name)}>
                              Delete
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Detail Section */}
      <div className="flex items-center justify-center bg-muted relative p-8">
        
        {activeServer ? (
          <div className="text-left p-4 bg-white rounded-md shadow-md w-full">
            <InfoTable data={[
                {label: "Name", value: activeServer.name},
                {label: "API URL", value: activeServer.apiURL},
                {label: "API Key", value: activeServer.apiKey}, ]} heading="Server Details" />

            {/* Meta Data Display */}
            <h2 className="text-lg font-semibold text-gray-700 text-center my-4">Server MetaData</h2>
            <JsonViewer jsonData={activeServer} />
          </div>
        ) : (
          <div className="text-center">
            <RandomImageWithQuote />
          </div>
        )}
      </div>
    </div>
  );
}