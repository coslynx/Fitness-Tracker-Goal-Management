"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useDashboard } from "@/lib/hooks/useDashboard";
import { Card, Button, Input, List, ListItem } from "@/components/ui";
import { toast } from "react-hot-toast";
import { ProgressChart, ProgressLog } from "@/components/features/progress";
import { GoalForm, GoalList } from "@/components/features/goal";

export default function RecentActivity({ data }: { data: any }) {
  const { data: session } = useSession();

  return (
    <Card className="h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      <ul className="list-disc pl-4">
        {data.map((activityItem: any, index: number) => (
          <li key={index} className="mb-2">
            <p>
              {activityItem.action} on {activityItem.date.toLocaleDateString()}
            </p>
            {activityItem.details && (
              <p className="ml-4 text-gray-500">{activityItem.details}</p>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}