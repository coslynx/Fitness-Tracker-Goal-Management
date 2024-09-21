"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useGoal } from "@/lib/hooks/useGoal";
import { useRouter } from "next/navigation";

export default function GoalPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { goal, updateGoal, deleteGoal } = useGoal();
  const [isLoading, setIsLoading] = useState(true);
  const [editingGoal, setEditingGoal] = useState<{
    id: number;
    type: string;
    target: number;
    deadline: Date;
  } | null>(null);

  useEffect(() => {
    if (goal) {
      setEditingGoal(goal);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [goal]);

  const handleSubmitEditGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGoal) {
      await updateGoal(editingGoal.id, {
        type: editingGoal.type,
        target: editingGoal.target,
        deadline: editingGoal.deadline,
      });
      router.push("/goals");
    }
  };

  const handleDeleteGoal = async () => {
    if (editingGoal) {
      await deleteGoal(editingGoal.id);
      router.push("/goals");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!editingGoal) {
    return <div>Goal not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Edit Goal</h1>
      <form onSubmit={handleSubmitEditGoal} className="mb-4">
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label htmlFor="editGoalType" className="mb-2">
              Type:
            </label>
            <input
              type="text"
              id="editGoalType"
              value={editingGoal.type}
              onChange={(e) =>
                setEditingGoal({
                  ...editingGoal,
                  type: e.target.value,
                })
              }
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="editGoalTarget" className="mb-2">
              Target:
            </label>
            <input
              type="number"
              id="editGoalTarget"
              value={editingGoal.target}
              onChange={(e) =>
                setEditingGoal({
                  ...editingGoal,
                  target: Number(e.target.value),
                })
              }
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="editGoalDeadline" className="mb-2">
              Deadline:
            </label>
            <input
              type="date"
              id="editGoalDeadline"
              value={editingGoal.deadline.toISOString().slice(0, 10)}
              onChange={(e) =>
                setEditingGoal({
                  ...editingGoal,
                  deadline: new Date(e.target.value),
                })
              }
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </form>
      <button
        onClick={handleDeleteGoal}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete Goal
      </button>
    </div>
  );
}