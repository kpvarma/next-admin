"use client";

import React from "react";

interface Endpoint {
  method: string;
  path: string;
  description: string;
}

interface EndpointsListProps {
  endpoints: Endpoint[];
}

const EndpointsList: React.FC<EndpointsListProps> = ({ endpoints }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Endpoints</h2>
      <ul className="space-y-2">
        {endpoints.map((endpoint, index) => (
          <li key={index} className="border rounded p-2">
            <div>
              <span className="font-semibold">{endpoint.method}</span>: {endpoint.path}
            </div>
            <div className="text-sm text-gray-600">{endpoint.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EndpointsList;