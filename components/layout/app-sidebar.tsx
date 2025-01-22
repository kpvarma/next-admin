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
import { AboutCRUDify } from "@/components/about-crudify"
import { ServerSwitcher } from "@/components/layout/server-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

// Centralized data
const data = {
  crudifyData: {
    name: "CRUDify - Next Admin",
    author: "Krishna Prasad Varma",
    avatar: "/avatars/01.jpg",
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
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
      <ServerSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <AboutCRUDify crudifyData={data.crudifyData} />
      </SidebarFooter>
    </Sidebar>
  )
}