"use client";

import { useState, useEffect } from "react";
import { useGoal } from "@/lib/hooks/useGoal";
import { useRouter } from "next/navigation";
import { Card, Button, Input, List, ListItem } from "@/components/ui";
import { toast } from "react-hot-toast";

export default function GoalList() {
  const router = useRouter();
  const { goals, createGoal, updateGoal, deleteGoal } = useGoal();
  const [isLoading, setIsLoading] = useState(true);
  const [newGoalType, setNewGoalType] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState(0);
  const [newGoalDeadline, setNewGoalDeadline] = useState(new Date());
  const [editingGoal, setEditingGoal] = useState<{
    id: number;
    type: string;
    target: number;
    deadline: Date;
  } | null>(null);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleSubmitNewGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    await createGoal({
      type: newGoalType,
      target: newGoalTarget,
      deadline: newGoalDeadline,
    });
    setNewGoalType("");
    setNewGoalTarget(0);
    setNewGoalDeadline(new Date());
  };

  const handleEditGoal = (goal: {
    id: number;
    type: string;
    target: number;
    deadline: Date;
  }) => {
    setEditingGoal(goal);
  };

  const handleSubmitEditGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGoal) {
      await updateGoal(editingGoal.id, {
        type: editingGoal.type,
        target: editingGoal.target,
        deadline: editingGoal.deadline,
      });
    }
    setEditingGoal(null);
  };

  const handleDeleteGoal = async (id: number) => {
    await deleteGoal(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">My Goals</h1>
      <form onSubmit={handleSubmitNewGoal} className="mb-4">
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label htmlFor="goalType" className="mb-2">
              Type:
            </label>
            <Input
              type="text"
              id="goalType"
              value={newGoalType}
              onChange={(e) => setNewGoalType(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="goalTarget" className="mb-2">
              Target:
            </label>
            <Input
              type="number"
              id="goalTarget"
              value={newGoalTarget}
              onChange={(e) => setNewGoalTarget(Number(e.target.value))}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="goalDeadline" className="mb-2">
              Deadline:
            </label>
            <Input
              type="date"
              id="goalDeadline"
              value={newGoalDeadline.toISOString().slice(0, 10)}
              onChange={(e) => setNewGoalDeadline(new Date(e.target.value))}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Goal
          </Button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal) => (
          <Card key={goal.id} className="border border-gray-300 rounded p-4">
            <h2 className="text-xl font-bold mb-2">{goal.type}</h2>
            <p>Target: {goal.target}</p>
            <p>Deadline: {goal.deadline.toLocaleDateString()}</p>
            {editingGoal && editingGoal.id === goal.id ? (
              <form onSubmit={handleSubmitEditGoal} className="mt-4">
                <div className="flex space-x-4">
                  <div className="flex flex-col">
                    <label htmlFor="editGoalType" className="mb-2">
                      Type:
                    </label>
                    <Input
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
                    <Input
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
                    <Input
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
                  <Button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Save
                  </Button>
                </div>
              </form>
            ) : (
              <div className="mt-4">
                <Button
                  onClick={() => handleEditGoal(goal)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}