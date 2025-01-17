// apis/crud.ts

export async function fetchAllRecords(url: string, key: string, userType: string): Promise<{ data: any[] | null; error: string }> {
    try {
      const response = await fetch(`${url}/crudify/api/v1/user_type_crud/${userType}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${key}` },
      });
  
      if (!response.ok) {
        return { data: null, error: `Failed to fetch records for ${userType}.` };
      }
  
      const data = await response.json();
      return { data, error: "" };
    } catch (error) {
      return { data: null, error: "Server is not reachable. Please check your API URL and key." };
    }
  }
  
  export async function fetchRecordById(url: string, key: string, userType: string, id: string): Promise<{ data: any | null; error: string }> {
    try {
      const response = await fetch(`${url}/crudify/api/v1/user_type_crud/${userType}/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${key}` },
      });
  
      if (!response.ok) {
        return { data: null, error: `Failed to fetch the record for ${userType} with ID: ${id}.` };
      }
  
      const data = await response.json();
      return { data, error: "" };
    } catch (error) {
      return { data: null, error: "Server is not reachable. Please check your API URL and key." };
    }
  }
  
  export async function createRecord(url: string, key: string, userType: string, payload: Record<string, any>): Promise<{ data: any | null; error: string }> {
    try {
      const response = await fetch(`${url}/crudify/api/v1/user_type_crud/${userType}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        return { data: null, error: `Failed to create a record for ${userType}.` };
      }
  
      const data = await response.json();
      return { data, error: "" };
    } catch (error) {
      return { data: null, error: "Server is not reachable. Please check your API URL and key." };
    }
  }
  
  export async function updateRecord(url: string, key: string, userType: string, id: string, payload: Record<string, any>): Promise<{ data: any | null; error: string }> {
    try {
      const response = await fetch(`${url}/crudify/api/v1/user_type_crud/${userType}/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        return { data: null, error: `Failed to update the record for ${userType} with ID: ${id}.` };
      }
  
      const data = await response.json();
      return { data, error: "" };
    } catch (error) {
      return { data: null, error: "Server is not reachable. Please check your API URL and key." };
    }
  }
  
  export async function deleteRecord(url: string, key: string, userType: string, id: string): Promise<{ success: boolean; error: string }> {
    try {
      const response = await fetch(`${url}/crudify/api/v1/user_type_crud/${userType}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${key}` },
      });
  
      if (!response.ok) {
        return { success: false, error: `Failed to delete the record for ${userType} with ID: ${id}.` };
      }
  
      return { success: true, error: "" };
    } catch (error) {
      return { success: false, error: "Server is not reachable. Please check your API URL and key." };
    }
  }