"use client";

import {
  ChevronsUpDown,
  FileText,
  Github,
  Globe,
  Info,
  Package,
  Sparkles,
  Terminal,
  User,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function AboutCRUDify() {
  const { isMobile } = useSidebar();

  // Centralized data
  const crudifyData = {
    name: "CRUDify - Next Admin",
    author: "Krishna Prasad Varma",
    avatar: "/avatars/01.jpg",
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
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={crudifyData.avatar} alt={crudifyData.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{crudifyData.name}</span>
                <span className="truncate text-xs">{crudifyData.author}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={crudifyData.avatar} alt={crudifyData.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{crudifyData.name}</span>
                  <span className="truncate text-xs">{crudifyData.author}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => window.open("https://github.com/kpvarma/next-admin", "_blank")}>
                <Github />
                GitHub (NextJS Admin)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.open("https://github.com/kpvarma/next-admin/wiki", "_blank")}>
                <FileText />
                Documentation
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.open("https://github.com/kpvarma/next-admin/issues", "_blank")}>
                <Info />
                Report Issue
              </DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => window.open("https://github.com/kpvarma/next-admin", "_blank")}>
                <Sparkles />
                Changelog
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => window.open("https://github.com/kpvarma/crudify", "_blank")}>
                <Github />
                GitHub (CRUDify-rails)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.open("https://github.com/kpvarma/crudify/wiki", "_blank")}>
                <FileText />
                Documentation
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.open("https://github.com/kpvarma/crudify/issues", "_blank")}>
                <Info />
                Report Issue
              </DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => window.open("https://github.com/kpvarma/crudify/blob/main/CHANGELOG.md", "_blank")}>
                <Sparkles />
                Changelog
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => window.open("https://www.kpvarma.com", "_blank")}>
                <User />
                About Author
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}