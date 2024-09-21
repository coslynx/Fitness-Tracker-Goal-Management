"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useDashboard } from "@/lib/hooks/useDashboard";
import { DashboardStats } from "@/components/features/dashboard/DashboardStats";
import { RecentActivity } from "@/components/features/dashboard/RecentActivity";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { dashboardData, isLoading } = useDashboard();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardStats data={dashboardData.stats} />
        <RecentActivity data={dashboardData.recentActivity} />
      </div>
    </div>
  );
}