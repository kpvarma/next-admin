// utils/apis.tsx

// Validate API URL
export async function validateAPIUrl(url: string): Promise<{ valid: boolean; error: string }> {
  const urlRegex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;

  if (!urlRegex.test(url)) {
    return { valid: false, error: "Invalid URL format." };
  }

  try {
    const response = await fetch(`${url}/devise_crud/api/v1/health`, { method: "GET" });
    if (!response.ok) {
      return { valid: false, error: "This URL does not seem to be a valid API endpoint for a Rails application with Devise configured." };
    }
    return { valid: true, error: "" };
  } catch {
    return { valid: false, error: "Server is not reachable." };
  }
}

// Validate API Key
export async function validateAPIKey(url: string, key: string): Promise<{ valid: boolean; error: string }> {
  const keyRegex = /^DEVISE-CRUD-KEY-[A-Z0-9]{16}$/;

  if (!keyRegex.test(key)) {
    return { valid: false, error: "Invalid API Key'" };
  }

  try {
    const response = await fetch(`${url}/devise_crud/api/v1/validate_api_key`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!response.ok) {
      return { valid: false, error: "Invalid API Key" };
    }
    return { valid: true, error: "" };
  } catch {
    return { valid: false, error: "Server is not reachable." };
  }
}