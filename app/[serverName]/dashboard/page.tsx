"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import MainLayout from "../../../components/layout/main-layout";

export default function DashboardPage() {
  const { serverName } = useParams();
  return (
    <MainLayout>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p>Welcome to the dashboard. Manage your data here.</p>
            <h1 className="text-2xl font-bold mb-4">Models</h1>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </MainLayout>
  );
}