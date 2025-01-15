// apis/user_types.ts

export interface DeviseRoute {
    name: string;
    path: string;
    verb: string;
  }
  
  export interface UserType {
    name: string;
    model: string;
    attributes: string[];
    devise_features: string[];
    devise_routes: DeviseRoute[];
  }
  
  // Fetch user types
  export async function fetchUserTypes(url: string, key: string): Promise<{ data: UserType[] | null; error: string }> {
    try {
      const response = await fetch(`${url}/devise_crud/api/v1/user_types`, {
        method: "GET",
        headers: { Authorization: `Bearer ${key}` },
      });
  
      if (!response.ok) {
        return { data: null, error: "Failed to fetch user types. Please check your API URL and key." };
      }
  
      const data: UserType[] = await response.json();
      return { data, error: "" };
    } catch (error) {
      return { data: null, error: "Server is not reachable. Please check your API URL and key." };
    }
  }