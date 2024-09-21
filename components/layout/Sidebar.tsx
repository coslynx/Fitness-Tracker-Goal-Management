"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useUser } from "@/lib/hooks/useUser";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Input,
  Link,
  ListItem,
  List,
} from "@/components/ui";
import { toast } from "react-hot-toast";
import { useDashboard } from "@/lib/hooks/useDashboard";
import { useGoal } from "@/lib/hooks/useGoal";
import { useProgress } from "@/lib/hooks/useProgress";
import {
  DashboardStats,
  RecentActivity,
} from "@/components/features/dashboard";
import { ProgressChart, ProgressLog } from "@/components/features/progress";
import { GoalForm, GoalList } from "@/components/features/goal";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "HomeIcon",
  },
  {
    name: "Goals",
    href: "/goals",
    icon: "StarIcon",
  },
  {
    name: "Progress",
    href: "/progress",
    icon: "ChartBarIcon",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "CogIcon",
  },
];

export default function Sidebar({ user }: { user: any }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { goals, createGoal, updateGoal, deleteGoal } = useGoal();
  const { progress, createProgress, updateProgress, deleteProgress } = useProgress();
  const { dashboardData, isLoading } = useDashboard();

  const [newGoalType, setNewGoalType] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState(0);
  const [newGoalDeadline, setNewGoalDeadline] = useState(new Date());
  const [editingGoal, setEditingGoal] = useState<
    { id: number; type: string; target: number; deadline: Date } | null
  >(null);

  const [newProgressValue, setNewProgressValue] = useState(0);
  const [newProgressDate, setNewProgressDate] = useState(new Date());
  const [editingProgress, setEditingProgress] = useState<
    { id: number; goalId: number; date: Date; value: number } | null
  >(null);

  const [isLoadingGoals, setIsLoadingGoals] = useState(true);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(true);

  useEffect(() => {
    if (session) {
      setIsLoadingGoals(false);
      setIsLoadingProgress(false);
      setIsLoadingDashboard(false);
    }
  }, [session]);

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

  if (isLoadingGoals || isLoadingProgress || isLoadingDashboard) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 w-64 shadow-lg">
      <div className="flex items-center px-4 py-5 text-gray-200">
        <img
          className="rounded-full w-10 h-10"
          src={
            user?.image ||
            "https://images.unsplash.com/photo-1506794778203-fb29979e5d13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          }
          alt={user?.name || "User Profile Picture"}
        />
        <div className="ml-3">
          <h1 className="font-bold text-xl">{user?.name || "User"}</h1>
        </div>
      </div>
      <List className="divide-y divide-gray-700">
        {navigation.map((item) => (
          <ListItem key={item.name}>
            <Link
              href={item.href}
              className="flex items-center px-4 py-3 text-gray-200 hover:bg-gray-700 rounded-md"
            >
              <item.icon className="w-5 h-5 text-gray-500" />
              <span className="ml-3">{item.name}</span>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
}