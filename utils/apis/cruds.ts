// utils/model_crud.ts

// Context Imports
import { ModelListData, CRUDifyServer } from "@/utils/models/definitions";

export async function fetchAllRecords(
  server: CRUDifyServer,
  modelName: string,
  page: number = 1,
  perPage: number = 10
): Promise<ModelListData> {
  const { apiURL, apiKey } = server;

  // Validate inputs
  const validatedPage = Math.max(page, 1);
  const validatedPerPage = Math.max(perPage, 1);

  if (!apiURL) {
    return { data: null, error: "API URL is missing. Please configure the server with a valid URL." };
  }

  if (!apiKey) {
    return { data: null, error: "API key is missing. Please configure the server with a valid API key." };
  }

  try {
    const response = await fetch(
      `${apiURL}/crudify/api/v1/dynamic_crud/${modelName}?page=${validatedPage}&per_page=${validatedPerPage}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${apiKey}` },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || `Failed to fetch records for ${modelName}`);
    }

    try {
      const json = await response.json();
      return {
        data: json.data || [],
        currentPage: json.current_page,
        perPage: json.per_page,
        totalPages: json.total_pages,
        totalCount: json.total_count,
        error: null,
      };
    } catch (e) {
      return { data: null, error: "Failed to parse server response." };
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.message || "An error occurred while fetching data.",
    };
  }
}

export async function fetchRecordById(baseUrl: string, key: string, modelName: string, id: string): Promise<{ data: any | null; error: string }> {
  try {
    const response = await fetch(`${baseUrl}/crudify/api/v1/dynamic_crud/${modelName}/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${key}` },
    });

    if (!response.ok) {
      return { data: null, error: `Failed to fetch the record for ${modelName} with ID: ${id}.` };
    }

    const data = await response.json();
    return { data, error: "" };
  } catch (error) {
    return { data: null, error: "Server is not reachable. Please check your API URL and key." };
  }
}

export async function createRecord(baseUrl: string, key: string, modelName: string, payload: Record<string, any>): Promise<{ data: any | null; error: string }> {
  try {
    const response = await fetch(`${baseUrl}/crudify/api/v1/dynamic_crud/${modelName}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { data: null, error: `Failed to create a record for ${modelName}.` };
    }

    const data = await response.json();
    return { data, error: "" };
  } catch (error) {
    return { data: null, error: "Server is not reachable. Please check your API URL and key." };
  }
}

export async function updateRecord(baseUrl: string, key: string, modelName: string, id: string, payload: Record<string, any>): Promise<{ data: any | null; error: string }> {
  try {
    const response = await fetch(`${baseUrl}/crudify/api/v1/dynamic_crud/${modelName}/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { data: null, error: `Failed to update the record for ${modelName} with ID: ${id}.` };
    }

    const data = await response.json();
    return { data, error: "" };
  } catch (error) {
    return { data: null, error: "Server is not reachable. Please check your API URL and key." };
  }
}

export async function deleteRecord(baseUrl: string, key: string, modelName: string, id: string): Promise<{ success: boolean; error: string }> {
  try {
    const response = await fetch(`${baseUrl}/crudify/api/v1/dynamic_crud/${modelName}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${key}` },
    });

    if (!response.ok) {
      return { success: false, error: `Failed to delete the record for ${modelName} with ID: ${id}.` };
    }

    return { success: true, error: "" };
  } catch (error) {
    return { success: false, error: "Server is not reachable. Please check your API URL and key." };
  }
}