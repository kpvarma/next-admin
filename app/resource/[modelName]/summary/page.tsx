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
import CRUDTabs from "@/components/general/crud-tabs";

// Context
import { Widget } from "@/utils/models/definitions";
import { useServer } from "@/context/server_context";

export default function SummaryPage() {
  const { activeServer } = useServer();
  const [summaryMetaData, setSummaryMetaData] = useState<Record<string, any> | null>(null);

  const { modelName: rawModelName } = useParams();
  const modelName = Array.isArray(rawModelName) ? rawModelName[0] : rawModelName;
  
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{type: "error" | "info" | "success" | null, heading: string; description: string}>({type: null, heading: '', description: ''});

  useEffect(() => {
    if (!activeServer || !modelName || summaryMetaData) return;

    const summaryPages = activeServer?.metaData?.summary_pages;
    const modelMetaData = activeServer?.metaData?.models.find((m) => m.name === modelName);
    
    if(summaryPages && modelMetaData){

      if(!modelMetaData.summary_page){
        setAlert({type: "error", heading: "Error!", description: `Summary Page for the model '${modelName}' not found. Please review the configuration` });
        setLoading(false);
        return;
      }

      const sMetaData = summaryPages[modelMetaData.summary_page];
      console.log("sMetaData: ", sMetaData);

      if (sMetaData) {
        setSummaryMetaData(sMetaData);
      } else {
        setLoading(false);
        setAlert({type: "error", heading: "Error!", description: `Summary Page is not configured for the model '${modelName}'. Please review the configuration` });
      }
    }
  }, [activeServer, modelName]);

  // Ensure loading is updated after `summaryMetaData` is set
  useEffect(() => {
    if (summaryMetaData) {
      setLoading(false);
      if(summaryMetaData.widgets.length === 0) {
        setAlert({type: "error", heading: "Error!", description: `No Widgets configured for the summary page for the model '${modelName}'. Please review the configuration` });
      }
    }
  }, [summaryMetaData]);

  return (
    <MainLayout>
      <div className="px-2">
        {modelName && (
          <CRUDTabs modelName={modelName} recordId={null} />
        )}
        
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
      </div>
    
      <div className="px-2">
        <GridLayout className="layout" cols={12} rowHeight={20} width={1200}>
            {
              summaryMetaData?.widgets?.map((widget: Widget, index: number) => (
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