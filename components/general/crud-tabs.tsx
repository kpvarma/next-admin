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
      const modelMetaData = activeServer?.metaData?.models.find((m) => m.name === modelName);
      const tabs = [];
      if(modelMetaData && modelMetaData.summary_page){
        tabs.push({ name: "Summary", href: `/resource/${modelName}/summary` })
      }
      tabs.push({ name: "Records", href: `/resource/${modelName}/records` })
      tabs.push({ name: "New", href: `/resource/${modelName}/new` })
      // Add Edit page if recordId is provided
      // if (recordId) {
      //   tabs.push({ name: "Edit", href: `/${activeServer.name}//${modelName}/${recordId}` });
      // }
      setTabsData(tabs)
    }
  }, [activeServer, pathname]);

  return (
    <div className="px-3 bg-grey-200 flex space-x-1">
      {tabsData.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 border border-t border-l border-r border-b rounded-md ${
                isActive
                  ? "font-semibold text-gray-900 bg-white  "
                  : "text-gray-600 hover:border-gray-400 rounded-md hover:text-gray-800"
              }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}