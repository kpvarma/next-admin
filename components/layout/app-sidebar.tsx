"use client"

import * as React from "react"

// UI Imports
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader} from "@/components/ui/sidebar"

// Page Imports
import { NavMenu } from "@/components/layout/nav-menu"
import { AboutCRUDify } from "@/components/layout/about-crudify"
import { ServerSwitcher } from "@/components/layout/server-switcher"

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
      <ServerSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMenu />
      </SidebarContent>
      <SidebarFooter>
        <AboutCRUDify/>
      </SidebarFooter>
    </Sidebar>
  )
}