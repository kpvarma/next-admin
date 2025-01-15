"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchAllFromIndexedDB } from "@/utils/indexdb";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const checkServers = async () => {
      const servers = await fetchAllFromIndexedDB();
      if (servers.length > 0) {
        router.push("/configure"); // Redirect to configure if servers exist
      } else {
        router.push("/configure/new"); // Redirect to new server form if no servers
      }
    };
    checkServers();
  }, [router]);

  return null; // No UI needed since it redirects
}