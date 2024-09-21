"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import client from "@/lib/api/client";
import { Goal } from "@/types";

export const useGoal = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [goal, setGoal] = useState<Goal | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      setIsLoading(true);
      try {
        const response = await client.get("/goals");
        setGoals(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, []);

  useEffect(() => {
    const fetchGoal = async () => {
      setIsLoading(true);
      try {
        const router = useRouter();
        const goalId = Number(router.query.id);
        if (goalId) {
          const response = await client.get(`/goals/${goalId}`);
          setGoal(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoal();
  }, []);

  const createGoal = async (goalData: {
    type: string;
    target: number;
    deadline: Date;
  }) => {
    try {
      await client.post("/goals", goalData);
    } catch (error) {
      console.error(error);
    }
  };

  const updateGoal = async (id: number, goalData: {
    type: string;
    target: number;
    deadline: Date;
  }) => {
    try {
      await client.patch(`/goals/${id}`, goalData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGoal = async (id: number) => {
    try {
      await client.delete(`/goals/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isLoading,
    goals,
    goal,
    createGoal,
    updateGoal,
    deleteGoal,
  };
};