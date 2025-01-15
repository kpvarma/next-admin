"use client";

import React, { useState } from "react";
import { openDatabase } from "../../utils/database";

interface ApiSetupProps {
  onNext: () => void; // Callback to move to the next step
}

const ApiSetup: React.FC<ApiSetupProps> = ({ onNext }) => {
  const [apiUrl, setApiUrl] = useState<string>("");
  const [status, setStatus] = useState<"pending" | "valid" | "invalid">("pending");
  const [error, setError] = useState<string>("");

  const validateApiUrl = async () => {
    try {
      const response = await fetch(apiUrl, { method: "HEAD" }); // Ping server
      if (response.ok) {
        const db = await openDatabase();
        const tx = db.transaction("api_url", "readwrite");
        await tx.objectStore("api_url").put({ id: "api_url", value: apiUrl });
        setStatus("valid");
        setError("");
        onNext(); // Move to the next step
      } else {
        throw new Error("API URL is not reachable");
      }
    } catch (err) {
      setStatus("invalid");
      setError((err as Error).message || "Invalid URL");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Step 1: Enter API URL</h1>
      <input
        type="text"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        className="border p-2 rounded mb-2 w-80"
        placeholder="Enter Rails API URL"
      />
      <button
        onClick={validateApiUrl}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Validate
      </button>
      {status === "valid" && <p className="text-green-500 mt-2">✔ API URL is valid</p>}
      {status === "invalid" && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ApiSetup;