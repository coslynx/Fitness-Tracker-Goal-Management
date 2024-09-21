"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useUser } from "@/lib/hooks/useUser";
import { useRouter } from "next/navigation";
import { Input, Button, Card } from "@/components/ui";
import { toast } from "react-hot-toast";

export default function SettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { user, updateUser } = useUser(session);
  const [isLoading, setIsLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<
    { id: number; email: string; name: string } | null
  >(null);

  useEffect(() => {
    if (user) {
      setEditingUser(user);
    }
  }, [user]);

  const handleSubmitEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (editingUser) {
      try {
        await updateUser(editingUser.id, {
          email: editingUser.email,
          name: editingUser.name,
        });
        toast.success("User updated successfully!");
        router.push("/dashboard");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update user. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!editingUser) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <Card className="mb-4">
        <form onSubmit={handleSubmitEditUser}>
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="email" className="mb-2">
                Email:
              </label>
              <Input
                type="email"
                id="email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                disabled
              />
            </div>
            <div>
              <label htmlFor="name" className="mb-2">
                Name:
              </label>
              <Input
                type="text"
                id="name"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
              />
            </div>
            <Button type="submit" isLoading={isLoading}>
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}