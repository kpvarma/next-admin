// apis/models_metadata.ts

import { WidgetData, CRUDifyServer } from "@/utils/models/definitions";

// Fetch user types
export async function fetchModelsMetaData(activeServer: CRUDifyServer): Promise<{ data: WidgetData[] | null; error: string }> {
  try {
    console.log("Fetching Models Metadata from: ", `${activeServer.apiURL}/crudify/api/v1/metadata`);

    const response = await fetch(`${activeServer.apiURL}/crudify/api/v1/metadata`, {
      method: "GET",
      headers: { Authorization: `Bearer ${activeServer.apiKey}` },
    });

    if (!response.ok) {
      return { data: null, error: "Failed to fetch user types. Please check your API URL and key." };
    }

    const data: WidgetData[] = await response.json();
    return { data, error: "" };
  } catch (error) {
    return { data: null, error: "Server is not reachable. Please check your API URL and key." };
  }
}

// Fetch dashboard metadata (multiple models)
export async function fetchDashboardMetadata(activeServer: CRUDifyServer): Promise<{ data: WidgetData[] | null; error: string }> {
  try {
    console.log("Fetching Dashboard Metadata from: ", `${activeServer.apiURL}/crudify/api/v1/metadata/dashboard_visualisations`);
    
    const response = await fetch(`${activeServer.apiURL}/crudify/api/v1/metadata/dashboard_visualisations`, {
      method: "GET",
      headers: { Authorization: `Bearer ${activeServer.apiKey}` },
    });

    if (!response.ok) {
      return { data: null, error: "Failed to fetch dashboard metadata. Please check API URL and key." };
    }

    const data: WidgetData[] = await response.json();
    return { data, error: "" };
  } catch (error) {
    return { data: null, error: "Server is not reachable. Please check API URL and key." };
  }
}

// Fetch summary metadata (single model)
export async function fetchSummaryMetadata(activeServer: CRUDifyServer, modelName: string): Promise<{ data: WidgetData | null; error: string }> {
  try {
    console.log("Fetching Summary Metadata for:", modelName);
    
    const response = await fetch(`${activeServer.apiURL}/crudify/api/v1/metadata/summary_visualisations/${modelName}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${activeServer.apiKey}` },
    });

    if (!response.ok) {
      return { data: null, error: "Failed to fetch summary metadata. Please check API URL and key." };
    }

    const data: WidgetData = await response.json();
    return { data, error: "" };
  } catch (error) {
    return { data: null, error: "Server is not reachable. Please check API URL and key." };
  }
}

// Fetch index metadata (KPI row for a single model)
export async function fetchIndexMetadata(activeServer: CRUDifyServer, modelName: string): Promise<{ data: WidgetData | null; error: string }> {
  try {
    console.log("Fetching Index Metadata for:", modelName);
    
    const response = await fetch(`${activeServer.apiURL}/crudify/api/v1/metadata/index_visualisations/${modelName}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${activeServer.apiKey}` },
    });

    if (!response.ok) {
      return { data: null, error: "Failed to fetch index metadata. Please check API URL and key." };
    }

    const data: WidgetData = await response.json();
    return { data, error: "" };
  } catch (error) {
    return { data: null, error: "Server is not reachable. Please check API URL and key." };
  }
}

// Fetch data for a collection widget
export async function fetchCollectionData(activeServer: CRUDifyServer, modelName: string | null, apiEndPoint: string): Promise<{ data: any | null; error: string }> {
  try {
    const url = modelName
      ? `${activeServer.apiURL}/crudify/api/v1/visualisations/${modelName}/${apiEndPoint}`
      : `${activeServer.apiURL}/crudify/api/v1/visualisations/${apiEndPoint}`;

    console.log(`[${new Date().toISOString()}] Fetching Collection Data from:`, url);

    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${activeServer.apiKey}` },
    });

    if (!response.ok) {
      return { data: null, error: "Failed to fetch collection data. Please check API URL and key." };
    }

    const data = await response.json();
    return { data, error: "" };
  } catch (error) {
    return { data: null, error: "Server is not reachable. Please check API URL and key." };
  }
}