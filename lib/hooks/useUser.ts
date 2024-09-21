"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import client from "@/lib/api/client";
import { User } from "@/types";

export const useUser = (session: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        if (!session?.user) {
          return;
        }
        const response = await client.get(`/users/${session.user.id}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [session]);

  const createUser = async (userData: {
    email: string;
    name: string;
    password: string;
  }) => {
    try {
      await client.post("/users", userData);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (
    id: number,
    userData: { email: string; name: string }
  ) => {
    try {
      await client.patch(`/users/${id}`, userData);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isLoading,
    user,
    createUser,
    updateUser,
  };
};