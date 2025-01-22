// apis/models_metadata.ts

import { ModelMetaData, CRUDifyServer } from "@/utils/models/definitions";

// Fetch user types
export async function fetchModelsMetaData(activeServer: CRUDifyServer): Promise<{ data: ModelMetaData[] | null; error: string }> {
  try {
    console.log("activeServer.apiURL: ", activeServer.apiURL);
    const response = await fetch(`${activeServer.apiURL}/crudify/api/v1/metadata`, {
      method: "GET",
      headers: { Authorization: `Bearer ${activeServer.apiKey}` },
    });

    if (!response.ok) {
      return { data: null, error: "Failed to fetch user types. Please check your API URL and key." };
    }

    const data: ModelMetaData[] = await response.json();
    return { data, error: "" };
  } catch (error) {
    return { data: null, error: "Server is not reachable. Please check your API URL and key." };
  }
}