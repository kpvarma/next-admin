"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Context
import { useServer } from "@/context/server_context";

interface CRUDTabsProps {
  modelName: string;
  recordId?: string | null; // Optional for edit page
}

export default function CRUDTabs({ modelName, recordId = null }: CRUDTabsProps) {
  const { activeServer } = useServer();
  const pathname = usePathname(); // Get the current page URL
  const [tabsData, setTabsData] = useState<any[]>([]);

  useEffect(() => {
    if (activeServer) {
      const tabs = [
        { name: "Summary", href: `/${activeServer.name}/${modelName}` },
        { name: "List", href: `/${activeServer.name}/${modelName}/list` },
        { name: "New", href: `/${activeServer.name}/${modelName}/new` },
      ];
      // Add Edit page if recordId is provided
      // if (recordId) {
      //   tabs.push({ name: "Edit", href: `/${activeServer.name}//${modelName}/${recordId}` });
      // }
      setTabsData(tabs)
    }
  }, [activeServer, pathname]);

  return (
    <div className="bg-white flex space-x-1">
      {tabsData.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 
              border border-b-2 ${
                isActive
                  ? "border-b-transparent border-t border-l border-r rounded-t-md bg-gray-200 text-gray-900 font-semibold"
                  : "border-transparent text-gray-600 hover:border-gray-200 rounded-t-md hover:text-gray-800"
              }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}