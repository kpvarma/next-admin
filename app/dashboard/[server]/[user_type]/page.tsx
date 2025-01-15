"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import MainLayout from "../../../../components/layout/main-layout";
import { useServer } from "../../../../context/server_context"; // Adjust path as needed

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UserTypeList() {
  const { server, user_type } = useParams();
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

  // Sample user data
  const userData = [
    { id: 1, name: "User One", email: "user1@example.com" },
    { id: 2, name: "User Two", email: "user2@example.com" },
    { id: 3, name: "User Three", email: "user3@example.com" },
  ];

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          {user_type} List (Server: {server})
        </h1>
        <Table>
          <TableCaption>A list of {user_type} users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  );
}