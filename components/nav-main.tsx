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
import { ModelMetaData } from "@/utils/models/definitions"; // Import serverContext

export function NavMain() {
  const { activeServer, setActiveServer, servers, setServers } = useServer(); // Access server context

  // Get the model_names from the active server
  const modelMetaData = activeServer?.modelMetaData || [];

  // Group models by their `menu.parent`
  const groupedData = modelMetaData.reduce((acc, model) => {
    const parent = model.menu.parent || "Uncategorized"; // Default to "Uncategorized" if parent is missing
    if (!acc[parent]) {
      acc[parent] = [];
    }
    acc[parent].push(model);
    return acc;
  }, {} as Record<string, ModelMetaData[]>);

  return (
    <SidebarGroup>
      
      {Object.keys(groupedData).map((parent) => (
        <div key={parent} className="sidebar-group">
          <SidebarGroupLabel className="mt-4">{parent}</SidebarGroupLabel>
          <SidebarMenu>
            {groupedData[parent].map((modelData) => (
              <Collapsible
                key={modelData.menu.label}
                asChild
                defaultOpen={false}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={`${modelData.title} - ${modelData.description}`}>
                      <span>{modelData.menu.label}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <a href={`/${activeServer?.name}/${modelData.name}/summary`}>
                            <span>Summary</span>
                          </a>
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton asChild>
                          <a href={`/${activeServer?.name}/${modelData.name}`}>
                            <span>List {modelData.name}</span>
                          </a>
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton asChild>
                          <a href={`/${activeServer?.name}/${modelData.name}/new`}>
                            <span>Create New {modelData.name}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </div>
      ))}
    </SidebarGroup>
  );
}