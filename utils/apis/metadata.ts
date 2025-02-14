// apis/models_metadata.ts

import { MetaData, CRUDifyServer } from "@/utils/models/definitions";

// Fetch metadata
export async function fetchMetaData(activeServer: CRUDifyServer): Promise<{ data: MetaData | null; error: string }> {
  try {
    console.log("Fetching Metadata from: ", `${activeServer.apiURL}/crudify/api/v1/metadata`);

    const response = await fetch(`${activeServer.apiURL}/crudify/api/v1/metadata`, {
      method: "GET",
      headers: { Authorization: `Bearer ${activeServer.apiKey}` },
    });

    if (!response.ok) {
      return { data: null, error: "Failed to fetch user types. Please check your API URL and key." };
    }

    const data: MetaData = await response.json();
    return { data, error: "" };
  } catch (error) {
    return { data: null, error: "Server is not reachable. Please check your API URL and key." };
  }
}