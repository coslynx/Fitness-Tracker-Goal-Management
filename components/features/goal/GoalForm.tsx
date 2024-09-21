"use client";

import { useState, useEffect } from "react";
import { useGoal } from "@/lib/hooks/useGoal";
import { useRouter } from "next/navigation";
import { Input, Button, Card } from "@/components/ui";
import { toast } from "react-hot-toast";

export default function GoalForm() {
  const router = useRouter();
  const { createGoal, updateGoal } = useGoal();
  const [isLoading, setIsLoading] = useState(false);
  const [goalType, setGoalType] = useState("");
  const [goalTarget, setGoalTarget] = useState(0);
  const [goalDeadline, setGoalDeadline] = useState(new Date());
  const [editingGoal, setEditingGoal] = useState<
    { id: number; type: string; target: number; deadline: Date } | null
  >(null);

  useEffect(() => {
    if (router.query.id) {
      const goalId = Number(router.query.id);
      // Fetch goal data for editing
    }
  }, [router.query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingGoal) {
        // Update existing goal
        await updateGoal(editingGoal.id, {
          type: goalType,
          target: goalTarget,
          deadline: goalDeadline,
        });
        toast.success("Goal updated successfully!");
        router.push("/goals");
      } else {
        // Create new goal
        await createGoal({
          type: goalType,
          target: goalTarget,
          deadline: goalDeadline,
        });
        toast.success("Goal created successfully!");
        router.push("/goals");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create/update goal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">
        {editingGoal ? "Edit Goal" : "Create Goal"}
      </h1>
      <Card className="mb-4">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="goalType" className="mb-2">
                Type:
              </label>
              <Input
                type="text"
                id="goalType"
                value={goalType}
                onChange={(e) => setGoalType(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="goalTarget" className="mb-2">
                Target:
              </label>
              <Input
                type="number"
                id="goalTarget"
                value={goalTarget}
                onChange={(e) => setGoalTarget(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="goalDeadline" className="mb-2">
                Deadline:
              </label>
              <Input
                type="date"
                id="goalDeadline"
                value={goalDeadline.toISOString().slice(0, 10)}
                onChange={(e) => setGoalDeadline(new Date(e.target.value))}
              />
            </div>
            <Button type="submit" isLoading={isLoading}>
              {editingGoal ? "Save Changes" : "Create Goal"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}