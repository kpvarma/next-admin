import { CRUDifyServer } from "@/utils/models/definitions";

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