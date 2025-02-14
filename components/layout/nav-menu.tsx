"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Get current route

// Icons & UI Components
import { Folder, ChevronRight, LayoutDashboard, Logs, TableProperties, House } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

// Context & Definition Imports
import { useServer } from "@/context/server_context"; // Import serverContext
import { NavMenu as NavMenuType } from "@/utils/models/definitions";

export function NavMenu() {
  const { activeServer } = useServer();
  const { isMobile } = useSidebar();
  const pathname = usePathname();

  const [navMenuMetaData, setNavMenuMetaData] = useState<NavMenuType[]>([]);

  useEffect(() => {
    if (activeServer && activeServer.metaData) {
      setNavMenuMetaData(activeServer.metaData.nav_menu || []);
    }
  }, [activeServer]);

  // **Grouping menu items by `group` first, then by `parent`**
  const groupedMenu = navMenuMetaData.reduce((acc, item) => {
    if (!acc[item.group || "Ungrouped"]) {
      acc[item.group || "Ungrouped"] = { parents: {}, noParent: [] };
    }
    
    if (item.parent) {
      if (!acc[item.group || "Ungrouped"].parents[item.parent]) {
        acc[item.group || "Ungrouped"].parents[item.parent] = [];
      }
      acc[item.group || "Ungrouped"].parents[item.parent].push(item);
    } else {
      acc[item.group || "Ungrouped"].noParent.push(item);
    }
    
    return acc;
  }, {} as Record<string, { parents: Record<string, NavMenuType[]>; noParent: NavMenuType[] }>);

  // **Function to determine Icon & URL based on type**
  const getMenuItemData = (item: NavMenuType) => {
    const modelMetaData = activeServer?.metaData?.models.find((m) => m.name === item.name);

    switch (item.type) {
      case "home":
        return { icon: <House className="h-4 w-4" />, url: `/home` };
      case "dashboard":
        return { icon: <LayoutDashboard className="h-4 w-4" />, url: `/dashboard/${item.name}` };
      case "report":
        return { icon: <TableProperties className="h-4 w-4" />, url: `/reports/${item.name}` };
      case "page":
        return { icon: <LayoutDashboard className="h-4 w-4" />, url: `/page/${item.name}` };
      case "resource":
        if(modelMetaData && modelMetaData.summary_page){
          return { icon: <Logs className="h-4 w-4" />, url: `/resource/${item.name}/summary` };
        } else {
          return { icon: <Logs className="h-4 w-4" />, url: `/resource/${item.name}/records` };
        }
        
      default:
        return { icon: <Folder className="h-4 w-4" />, url: item.name }; // Default case (external links)
    }
  };

  return (
    <>
      {/* Groups and Collapsible Menu Items */}
      {Object.entries(groupedMenu).map(([group, { parents, noParent }]) => (
        <SidebarGroup key={`group-${group}`} className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>{group}</SidebarGroupLabel>
          <SidebarMenu>
            {/* Items without a parent (appear directly under group) */}
            {noParent.map((item) => {
              const { icon, url } = getMenuItemData(item);
              const isActive = pathname === url;

              return (
                <SidebarMenuItem key={`subitem-${group}-${item.name}`} className={isActive ? "bg-gray-200 text-gray-900 rounded-md" : ""}>
                  <SidebarMenuButton asChild>
                    <a href={url} rel="noopener noreferrer" className="flex items-center gap-2 p-2">
                      {icon}
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}

            {/* Parent-based collapsible menus */}
            {Object.entries(parents).map(([parent, items]) => (
              <Collapsible key={`parent-${parent}`} asChild defaultOpen={true} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <span>{parent}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {items.map((item) => {
                        const { icon, url } = getMenuItemData(item);
                        return (
                          <SidebarMenuSubItem key={`subitem-${group}-${parent}-${item.name}`}>
                            <SidebarMenuSubButton asChild>
                              <a href={url} rel="noopener noreferrer">
                                {icon}
                                <span>{item.label}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}