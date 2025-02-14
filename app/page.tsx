"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// Context
import { useServer } from "@/context/server_context";

export default function LandingPage() {
  const { activeServer, servers } = useServer();
  const router = useRouter();

  useEffect(() => {
    const checkServers = async () => {
      console.log("activeServer: ", activeServer);
      if(activeServer) {
        router.push("/home"); // Redirect to home page if a server is set as activeServer
      } else {
        if (servers.length == 0) {
          router.push("/configure/new"); // Redirect to new server form if no servers
        } else {
          router.push("/configure"); // Redirect to configure if servers exist
        }
      }
    };
    checkServers();
  }, [activeServer, router]);

  return null; // No UI needed since it redirects
}