"use client";

import { useState } from "react";
import { Input, Button, Card } from "@/components/ui";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useUser } from "@/lib/hooks/useUser";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { signIn } = useUser(session);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  if (session) {
    return router.push("/dashboard");
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <Card className="mb-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="email" className="mb-2">
                Email:
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2">
                Password:
              </label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" isLoading={isLoading}>
              Login
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}