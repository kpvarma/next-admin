"use client";

import React from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { useServer } from "@/context/server_context"; // Import serverContext

export function NavMain() {
  const { activeServer, servers } = useServer(); // Use serverContext

  // Get the user_types from the active server
  const userTypes = activeServer?.user_types || [];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Users</SidebarGroupLabel>
      <SidebarMenu>
        {userTypes.map((userType) => (
          <Collapsible
            key={userType.name}
            asChild
            defaultOpen={false} // By default, collapsible is closed
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={userType.name}>
                  {/* Optional: Add an icon dynamically */}
                  <span>{userType.name}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <a href={`/${activeServer.apiName}/${userType.model}`}>
                        <span>List {userType.name}</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                    <a href={`/${activeServer.apiName}/${userType.model}/new`}>
                      <span>Add New {userType.name}</span>
                    </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}