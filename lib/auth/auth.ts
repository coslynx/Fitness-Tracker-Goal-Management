"use client";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getSession() {
  return getServerSession(authOptions);
}

export async function getUser(id: string) {
  const session = await getSession();
  if (!session?.user) {
    return null;
  }
  return session.user;
}

export async function createUser(
  email: string,
  name: string,
  password: string
) {
  const session = await getSession();
  if (session?.user) {
    return null;
  }
  try {
    await client.post("/users", { email, name, password });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function signIn(email: string, password: string) {
  const session = await getSession();
  if (session?.user) {
    return null;
  }
  try {
    await client.post("/auth/signin", { email, password });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function signOut() {
  const session = await getSession();
  if (!session?.user) {
    return null;
  }
  try {
    await client.post("/auth/signout");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}