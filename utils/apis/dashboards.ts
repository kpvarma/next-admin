// utils/model_crud.ts

// Context Imports
import { WidgetData, ErrorResponse, CRUDifyServer } from "@/utils/models/definitions";

/**
 * Fetch time series data for a given model from the visualizations API.
 * @param {CRUDifyServer} server - The active CRUDify server configuration.
 * @param {string} modelName - The model name for which to fetch the time series data.
 * @returns {Promise<TimeSeriesDataResponse | ErrorResponse>} The API response or an error object.
 */

// Fetch dashboard metadata
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