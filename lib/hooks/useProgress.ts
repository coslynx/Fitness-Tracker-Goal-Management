"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import client from "@/lib/api/client";
import { useGoal } from "@/lib/hooks/useGoal";

export const useProgress = () => {
  const { data: session } = useSession();
  const { goals } = useGoal();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<
    {
      id: number;
      goalId: number;
      date: Date;
      value: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchProgress = async () => {
      setIsLoading(true);
      try {
        const response = await client.get("/progress");
        setProgress(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const createProgress = async (progressData: {
    goalId: number;
    value: number;
    date: Date;
  }) => {
    try {
      await client.post("/progress", progressData);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProgress = async (
    id: number,
    progressData: { value: number; date: Date }
  ) => {
    try {
      await client.patch(`/progress/${id}`, progressData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProgress = async (id: number) => {
    try {
      await client.delete(`/progress/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isLoading,
    progress,
    createProgress,
    updateProgress,
    deleteProgress,
  };
};