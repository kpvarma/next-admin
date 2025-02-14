"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Styles Imports
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

// Page Layout
import GridLayout from "react-grid-layout";
import MainLayout from "@/components/layout/main-layout";
import CollectionWidget from "@/components/widgets/CollectionWidget";
import CrudifyAlert from "@/components/general/alert";

// Context
import { Widget } from "@/utils/models/definitions";
import { useServer } from "@/context/server_context";

export default function DashboardPage() {
  const { activeServer } = useServer();
  const [dashboardMetaData, setDashboardMetaData] = useState<Record<string, any> | null>(null);
  
  const { name: rawDashboardName } = useParams();
  const dashboardName = Array.isArray(rawDashboardName) ? rawDashboardName[0] : rawDashboardName;

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{type: "error" | "info" | "success" | null, heading: string; description: string}>({type: null, heading: '', description: ''});
  
  useEffect(() => {
    if (!activeServer || !dashboardName || dashboardMetaData) return;

    const dashboards = activeServer?.metaData?.dashboards;
    if(dashboards){
      const dMetaData = dashboards[dashboardName];
      console.log(dMetaData);
      if (dMetaData) {
        setDashboardMetaData(dMetaData);
      } else {
        setLoading(false);
        setAlert({type: "error", heading: "Error!", description: `Dashboard '${dashboardName}' not found. Please review the configuration` });
      }
    }
  }, [dashboardName, activeServer]);

  // Ensure loading is updated after `dashboardMetaData` is set
  useEffect(() => {
    if (dashboardMetaData) {
      setLoading(false);
      if(dashboardMetaData.widgets.length === 0) {
        setAlert({type: "error", heading: "Error!", description: `No Widgets configured for the dashboard '${dashboardName}'. Please review the configuration` });
      }
    }
  }, [dashboardMetaData]);

  return (
    <MainLayout>

      {/* Show Loading */}
      {loading ? (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Loading ...</h1>
        </div>
      ) : (
        <>
          {alert && alert.type && <CrudifyAlert alertData={alert} />} {/* Alert Box */}
        </>
      )}

      <div className="p-2">
        <GridLayout className="layout" cols={12} rowHeight={20} width={1200}>
          {
            dashboardMetaData?.widgets?.map((widget: Widget, index: number) => (
              <div key={index} data-grid={widget.position}>
                <CollectionWidget 
                  collection={widget.collection}
                  activeServer={activeServer} 
                  modelName={widget.model} 
                />
              </div>
            ))
          }
        </GridLayout>
      </div>
      
    </MainLayout>
  );
}