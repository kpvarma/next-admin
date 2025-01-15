"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, Server } from "lucide-react"
import { Command } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useServer } from "@/context/server_context" // Adjust path as necessary

export function ServerSwitcher() {
  const { servers, activeServer, setActiveServer } = useServer() // Use serverContext here
  const { isMobile } = useSidebar()
  const router = useRouter()

  const handleServerSelect = (server: typeof servers[0]) => {
    setActiveServer(server) // Update the active server in context
    router.push(`/dashboard/${server.apiName}`) // Navigate to the new route
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Command className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeServer?.apiName || "Select a server"}
                </span>
                <span className="truncate text-xs">{activeServer?.apiUrl || "No server selected"}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Servers
            </DropdownMenuLabel>
            {servers.map((server, index) => (
              <DropdownMenuItem
                key={server.apiName}
                onClick={() => handleServerSelect(server)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Command className="size-4 shrink-0" />
                </div>
                {server.apiName}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <Link href="/configure/new">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
              </Link>
              <Link href="/configure/new">
                <div className="font-medium text-muted-foreground">Add Server</div>
              </Link>  
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 p-2">
              <Link href="/configure/new">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Server className="size-4" />
                </div>
              </Link>
              <Link href="/configure/">
                <div className="font-medium text-muted-foreground">Manage Servers</div>
              </Link>  
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}