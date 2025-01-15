"use client";

import React, { useState } from "react";
import { openDatabase } from "../../utils/database";

interface ApiKeySetupProps {
  onFinish: () => void; // Callback to complete setup
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onFinish }) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [status, setStatus] = useState<"pending" | "valid" | "invalid">("pending");
  const [error, setError] = useState<string>("");

  const validateApiKey = async () => {
    try {
      const db = await openDatabase();
      const tx = db.transaction("api_url", "readonly");
      const apiUrlObj = await tx.objectStore("api_url").get("api_url");
      const apiUrl = apiUrlObj?.value;

      if (!apiUrl) {
        throw new Error("API URL is not configured");
      }

      const response = await fetch(`${apiUrl}/validate_key`, {
        method: "GET",
        headers: { Authorization: `Bearer ${apiKey}` },
      });

      if (response.ok) {
        const keyTx = db.transaction("api_key", "readwrite");
        await keyTx.objectStore("api_key").put({ id: "api_key", value: apiKey });
        setStatus("valid");
        setError("");
        onFinish(); // Complete the setup
      } else {
        throw new Error("Invalid API Key");
      }
    } catch (err) {
      setStatus("invalid");
      setError((err as Error).message || "Error validating API Key");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Step 2: Enter API Key</h1>
      <input
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="border p-2 rounded mb-2 w-80"
        placeholder="Enter API Key"
      />
      <button
        onClick={validateApiKey}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Validate
      </button>
      {status === "valid" && <p className="text-green-500 mt-2">✔ API Key is valid</p>}
      {status === "invalid" && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ApiKeySetup;