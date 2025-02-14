"use client";

// app/layout.tsx (Server Component)
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { ThemeProvider } from "../components/theme-provider"; // Adjust the path as necessary
import { ServerProvider } from "../context/server_context"; // Adjust the path as necessary

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ServerProvider>
            <QueryClientProvider client={queryClient}>
              <div className="flex flex-col h-screen">{children}</div>
            </QueryClientProvider>
          </ServerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}