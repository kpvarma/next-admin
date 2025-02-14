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
import { WidgetData } from "@/utils/models/definitions";
import { useServer } from "@/context/server_context";

export default function HomePage() {
  const { activeServer, setActiveServer, servers } = useServer();

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{type: "error" | "info" | "success" | null, heading: string; description: string}>({type: null, heading: '', description: ''});

  const [widgetsData, setWidgetsData] = useState<Record<string, any> | null>(null);
  
  useEffect(() => {
    if(!activeServer) return;
    const homeWidgets = activeServer?.metaData?.dashboards?.home;
    if (homeWidgets) {
      setWidgetsData(homeWidgets);
    } else {
      setLoading(false);
      setAlert({type: "error", heading: "Error!", description: `The default dashboard for home either overridden or not initialized properly. Please review the configuration` });
    }
  }, [activeServer]);

  // Ensure loading is updated after `widgetsData` is set
  useEffect(() => {
    if (widgetsData) {
      setLoading(false);
      if(widgetsData.widgets.length === 0) {
        setAlert({type: "error", heading: "Error!", description: `No Widgets configured for the home dashboard. Please review the configuration` });
      }
    }
  }, [widgetsData]);

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
            widgetsData?.widgets?.map((widget, index) => (
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