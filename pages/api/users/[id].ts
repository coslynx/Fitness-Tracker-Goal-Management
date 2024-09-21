"use client";

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.query.id as string;

  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(userId),
        },
        select: {
          id: true,
          email: true,
          name: true,
          goals: {
            select: {
              id: true,
              type: true,
              target: true,
              deadline: true,
            },
          },
          progress: {
            select: {
              id: true,
              date: true,
              value: true,
              goalId: true,
            },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PATCH") {
    try {
      const { email, name } = req.body;

      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: {
          email,
          name,
        },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: parseInt(userId),
        },
      });

      return res.status(200).json(deletedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}