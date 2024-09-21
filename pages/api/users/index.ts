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

  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany({
        where: {
          id: session.user.id,
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
        },
      });

      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "POST") {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const user = await prisma.user.create({
        data: {
          email: email,
          name: name,
          password: password,
        },
      });

      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      if (error.code === "P2002") {
        return res.status(409).json({ message: "Email already exists" });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}