"use client";

import React from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";

import { toTitleCase, toPluralTitleCase } from "@/utils/stringUtils";

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

// Context & Definition Imports
import { useServer } from "@/context/server_context"; // Import serverContext
import { MetaData } from "@/utils/models/definitions";

export function NavMain() {
  const { activeServer } = useServer(); // Access server context

  // Get the model_names from the active server
  const metaData = activeServer?.metaData || [];

  const groupedData = metaData.models.reduce((acc, model) => {
    const parent = model.menu.parent || "Uncategorized"; // Default to "Uncategorized" if parent is missing
    if (!acc[parent]) {
      acc[parent] = [];
    }
    acc[parent].push(model);
    return acc;
  }, {} as Record<string, MetaData[]>);

  console.log(groupedData);

  return (
    <SidebarGroup>
      
      <a href={`/${activeServer?.name}/home`} className="mt-4">
        <span>Dashboard</span>
      </a>
      
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
                            <span>List {toPluralTitleCase(modelData.name)}</span>
                          </a>
                        </SidebarMenuSubButton>
                        <SidebarMenuSubButton asChild>
                          <a href={`/${activeServer?.name}/${modelData.name}/new`}>
                            <span>Create New {toTitleCase(modelData.name)}</span>
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