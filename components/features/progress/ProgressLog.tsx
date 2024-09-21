"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useProgress } from "@/lib/hooks/useProgress";
import { useRouter } from "next/navigation";
import { Card, Button, Input, List, ListItem } from "@/components/ui";
import { toast } from "react-hot-toast";

export default function ProgressPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { progress, createProgress, updateProgress, deleteProgress } = useProgress();
  const [isLoading, setIsLoading] = useState(true);
  const [newProgressValue, setNewProgressValue] = useState(0);
  const [newProgressDate, setNewProgressDate] = useState(new Date());
  const [editingProgress, setEditingProgress] = useState<
    {
      id: number;
      goalId: number;
      date: Date;
      value: number;
    } | null
  >(null);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleSubmitNewProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProgress({
      goalId: Number(router.segments[1]),
      value: newProgressValue,
      date: newProgressDate,
    });
    setNewProgressValue(0);
    setNewProgressDate(new Date());
  };

  const handleEditProgress = (progress: {
    id: number;
    goalId: number;
    date: Date;
    value: number;
  }) => {
    setEditingProgress(progress);
  };

  const handleSubmitEditProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProgress) {
      await updateProgress(editingProgress.id, {
        value: editingProgress.value,
        date: editingProgress.date,
      });
    }
    setEditingProgress(null);
  };

  const handleDeleteProgress = async (id: number) => {
    await deleteProgress(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Progress for Goal</h1>
      <form onSubmit={handleSubmitNewProgress} className="mb-4">
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label htmlFor="progressValue" className="mb-2">
              Value:
            </label>
            <Input
              type="number"
              id="progressValue"
              value={newProgressValue}
              onChange={(e) => setNewProgressValue(Number(e.target.value))}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="progressDate" className="mb-2">
              Date:
            </label>
            <Input
              type="date"
              id="progressDate"
              value={newProgressDate.toISOString().slice(0, 10)}
              onChange={(e) => setNewProgressDate(new Date(e.target.value))}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Progress
          </Button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {progress.map((progressItem) => (
          <div key={progressItem.id} className="border border-gray-300 rounded p-4">
            <h2 className="text-xl font-bold mb-2">Progress</h2>
            <p>Value: {progressItem.value}</p>
            <p>Date: {progressItem.date.toLocaleDateString()}</p>
            {editingProgress && editingProgress.id === progressItem.id ? (
              <form onSubmit={handleSubmitEditProgress} className="mt-4">
                <div className="flex space-x-4">
                  <div className="flex flex-col">
                    <label htmlFor="editProgressValue" className="mb-2">
                      Value:
                    </label>
                    <Input
                      type="number"
                      id="editProgressValue"
                      value={editingProgress.value}
                      onChange={(e) =>
                        setEditingProgress({
                          ...editingProgress,
                          value: Number(e.target.value),
                        })
                      }
                      className="border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="editProgressDate" className="mb-2">
                      Date:
                    </label>
                    <Input
                      type="date"
                      id="editProgressDate"
                      value={editingProgress.date.toISOString().slice(0, 10)}
                      onChange={(e) =>
                        setEditingProgress({
                          ...editingProgress,
                          date: new Date(e.target.value),
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
                  onClick={() => handleEditProgress(progressItem)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteProgress(progressItem.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}