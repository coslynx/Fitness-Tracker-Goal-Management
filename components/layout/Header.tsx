"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold">
          Fitness Tracker
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/goals" className="hover:underline">
                Goals
              </Link>
            </li>
            <li>
              <Link href="/progress" className="hover:underline">
                Progress
              </Link>
            </li>
            {session && (
              <>
                <li>
                  <Link href="/settings" className="hover:underline">
                    Settings
                  </Link>
                </li>
                <li>
                  <Button
                    onClick={() => {
                      // Sign out the user
                    }}
                    variant="outline"
                    className="bg-gray-700 hover:bg-gray-600"
                  >
                    Sign Out
                  </Button>
                </li>
              </>
            )}
            {!session && (
              <li>
                <Link href="/signup" className="hover:underline">
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}