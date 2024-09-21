"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useGoal } from "@/lib/hooks/useGoal";
import { useProgress } from "@/lib/hooks/useProgress";
import { useUser } from "@/lib/hooks/useUser";
import client from "@/lib/api/client";

export const useDashboard = () => {
  const { data: session } = useSession();
  const { goals } = useGoal();
  const { progress } = useProgress();
  const { user } = useUser(session);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<{
    stats: {
      totalGoals: number;
      completedGoals: number;
      activeGoals: number;
      averageProgress: number;
    };
    recentActivity: {
      action: string;
      date: Date;
      details?: string;
    }[];
  }>({
    stats: {
      totalGoals: 0,
      completedGoals: 0,
      activeGoals: 0,
      averageProgress: 0,
    },
    recentActivity: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        if (!user) {
          return;
        }

        const [goalsResponse, progressResponse] = await Promise.all([
          client.get(`/goals`),
          client.get(`/progress`),
        ]);

        const totalGoals = goalsResponse.data.length;
        const completedGoals = goalsResponse.data.filter(
          (goal: any) =>
            new Date(goal.deadline) < new Date() &&
            goal.progress.length > 0 &&
            goal.progress.every(
              (progressItem: any) => progressItem.value >= goal.target
            )
        ).length;
        const activeGoals = totalGoals - completedGoals;

        const progressEntries = progressResponse.data;
        const averageProgress =
          progressEntries.length > 0
            ? (progressEntries.reduce(
                (total: number, progressItem: any) =>
                  total + (progressItem.value / progressItem.goal.target) * 100,
                0
              ) /
                progressEntries.length).toFixed(2)
            : 0;

        const recentActivity = [
          {
            action: "Created a new goal",
            date: new Date(),
            details: "Goal: Weight Loss",
          },
          {
            action: "Logged progress",
            date: new Date(),
            details: "Progress: 5 pounds lost",
          },
          {
            action: "Updated goal",
            date: new Date(),
            details: "Goal: Run a 5k",
          },
        ];

        setDashboardData({
          stats: {
            totalGoals,
            completedGoals,
            activeGoals,
            averageProgress: parseFloat(averageProgress),
          },
          recentActivity,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  return {
    dashboardData,
    isLoading,
  };
};