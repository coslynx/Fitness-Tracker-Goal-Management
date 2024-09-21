"use client";

import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ThemeProvider } from "@/styles/theme";
import { useUser } from "@/lib/hooks/useUser";
import { Layout } from "@/components/layout";

export default function RootLayout({ children }) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser(session);

  useEffect(() => {
    const checkSession = async () => {
      if (status === "authenticated" || status === "unauthenticated") {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [status]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <ThemeProvider>
            <Layout user={user}>
              {children}
            </Layout>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}