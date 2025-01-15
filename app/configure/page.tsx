"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// UI Imports
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Plus, Trash } from "lucide-react";

// Page Component Imports
import RandomImageWithQuote from "@/components/general/random-quotes";

// Utils Import
import { fetchAllFromIndexedDB, deleteFromIndexedDB } from "@/utils/indexdb";

export default function ListServers() {
  const [servers, setServers] = useState<any[]>([]);
  const [selectedServer, setSelectedServer] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchServers = async () => {
      const data = await fetchAllFromIndexedDB();
      setServers(data);
    };
    fetchServers();
  }, []);

  const handleDelete = async (apiName: string) => {
    try {
      // Remove the server from IndexedDB
      await deleteFromIndexedDB(apiName);

      // Update the local state to reflect the deletion
      const updatedServers = servers.filter((server) => server.apiName !== apiName);
      setServers(updatedServers);

      // Clear the selected server if it matches the deleted one
      if (selectedServer?.apiName === apiName) {
        setSelectedServer(null);
      }

      console.log(`Server with apiName "${apiName}" has been deleted.`);
    } catch (error) {
      console.error(`Failed to delete server with apiName "${apiName}":`, error);
    }
  };

  const handleLaunch = (server: any) => {
    console.log("Launch server:", server);
    router.push(`/dashboard/${server.apiName}`); // Navigate to the dashboard page
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen bg-background">
      {/* Left Section */}
      <div className="flex flex-col justify-center p-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8">Configure Servers</h1>

        {/* Add Server Button */}
        <div className="flex justify-center mb-8">
          <Button
            variant="outline"
            onClick={() => router.push("/configure/new")}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Server
          </Button>
        </div>

        {/* Alert Box */}
        <div className="mb-8">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the CLI.
            </AlertDescription>
          </Alert>
        </div>

        {/* Table Section */}
        {servers.length === 0 ? (
          <p>No servers configured. Add one using the "Add Server" button.</p>
        ) : (
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
                    key={server.apiName}
                    className="cursor-pointer"
                    onClick={() => setSelectedServer(server)}
                  >
                    <TableCell className="font-medium">{server.apiName}</TableCell>
                    <TableCell>{server.apiUrl}</TableCell>
                    <TableCell className="text-right">
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
                          <p>Are you sure you want to delete this server?</p>
                          <div className="flex justify-end gap-2 mt-4">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(server.apiName)}
                            >
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

            {/* JSON Display Card */}
            {selectedServer && (
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {JSON.stringify(selectedServer, null, 2)}
              </pre>
            )}
            
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