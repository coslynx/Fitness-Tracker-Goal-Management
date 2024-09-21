"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Footer() {
  const { data: session } = useSession();

  return (
    <footer className="bg-gray-100 py-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} Fitness Tracker. All rights reserved.
        </p>
        {session && (
          <p className="text-gray-500">
            Logged in as{" "}
            <Link
              href={`/users/${session.user.id}`}
              className="font-medium text-blue-500 hover:underline"
            >
              {session.user.name}
            </Link>
          </p>
        )}
      </div>
    </footer>
  );
}