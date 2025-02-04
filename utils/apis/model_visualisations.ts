// utils/model_crud.ts

// Context Imports
import { CRUDifyServer, ErrorResponse, TimeSeriesDataResponse } from "@/utils/models/definitions";

/**
 * Fetch time series data for a given model from the visualizations API.
 * @param {CRUDifyServer} server - The active CRUDify server configuration.
 * @param {string} modelName - The model name for which to fetch the time series data.
 * @returns {Promise<TimeSeriesDataResponse | ErrorResponse>} The API response or an error object.
 */

export async function recordCreationTrendsData(
  server: CRUDifyServer,
  modelName: string
): Promise<TimeSeriesDataResponse | ErrorResponse> {
  const { apiURL, apiKey } = server;

  if (!apiURL) {
    return { data: [], error: "API URL is missing. Please configure the server with a valid URL." };
  }

  if (!apiKey) {
    return { data: [], error: "API key is missing. Please configure the server with a valid API key." };
  }

  try {
    const response = await fetch(
      `${apiURL}/crudify/api/v1/visualisations/${modelName}/get_record_creation_trends_data`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${apiKey}` },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || `Failed to fetch time series data for ${modelName}`);
    }

    try {
      const json = await response.json();
      return {
        timeSeriesData: json.time_series_data || [],
        createdThisMonth: json.created_this_month || 0,
        updatedThisMonth: json.updated_this_month || 0,
        createdThisWeek: json.created_this_week || 0,
        updatedThisWeek: json.updated_this_week || 0,
        createdLastMonth: json.created_last_month || 0,
        updatedLastMonth: json.updated_last_month || 0,
        createdLastWeek: json.created_last_week || 0,
        updatedLastWeek: json.updated_last_week || 0,
        error: null,
      };
    } catch (e) {
      return { timeSeriesData: [], error: "Failed to parse server response." };
    }
  } catch (error: any) {
    return {
      data: [],
      error: error.message || "An error occurred while fetching time series data.",
    };
  }
}