"use client"

import * as React from "react"
import { useState, useEffect } from "react"

import {
  Bot,
  Command,
  Frame,
  Map,
  PieChart,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/new-projects"
import { NavUser } from "@/components/new-user"
import { ServerSwitcher } from "@/components/layout/server-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

import { fetchAllFromIndexedDB } from "@/utils/indexdb"
import { useServer } from "../../context/server_context" // Adjust path as needed

// Centralized data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        { title: "Genesis", url: "#" },
        { title: "Explorer", url: "#" },
        { title: "Quantum", url: "#" },
      ],
    },
  ],
  projects: [
    { name: "Design Engineering", url: "#", icon: Frame },
    { name: "Sales & Marketing", url: "#", icon: PieChart },
    { name: "Travel", url: "#", icon: Map },
  ],
}

export function AppSidebar() {
  const { activeServer, setActiveServer, servers, setServers } = useServer() // Access serverContext

  // Fetch servers at the layout level
  useEffect(() => {
    const fetchServers = async () => {
      try {
        const serversData = await fetchAllFromIndexedDB() // Fetch from IndexedDB
        setServers(serversData)

        // Set default server if no activeServer exists
        if (serversData.length > 0 && !activeServer) {
          setActiveServer(serversData[0]) // Default to the first server
        }
      } catch (error) {
        console.error("Error fetching servers:", error)
      }
    }

    fetchServers()
  }, [activeServer, setActiveServer, setServers])

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
      <ServerSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}