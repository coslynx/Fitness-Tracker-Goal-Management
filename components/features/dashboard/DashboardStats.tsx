"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useDashboard } from "@/lib/hooks/useDashboard";
import { Card, Button, Input, List, ListItem } from "@/components/ui";
import { toast } from "react-hot-toast";
import { ProgressChart, ProgressLog } from "@/components/features/progress";
import { GoalForm, GoalList } from "@/components/features/goal";
import { Chart } from "chart.js";

export default function DashboardStats({ data }: { data: any }) {
  const { data: session } = useSession();
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    if (data && !chart) {
      const canvas = document.getElementById("dashboardChart") as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const newChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: data.labels,
            datasets: [
              {
                label: "Progress",
                data: data.datasets[0].data,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        setChart(newChart);
      }
    }
  }, [data, chart]);

  return (
    <Card className="h-full">
      <h2 className="text-xl font-bold mb-4">Overall Progress</h2>
      <canvas id="dashboardChart" />
      <div className="mt-4">
        <p>Total Goals: {data.totalGoals}</p>
        <p>Completed Goals: {data.completedGoals}</p>
        <p>Active Goals: {data.activeGoals}</p>
        <p>Average Progress: {data.averageProgress}%</p>
      </div>
    </Card>
  );
}