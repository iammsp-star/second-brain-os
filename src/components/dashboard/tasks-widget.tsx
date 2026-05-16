"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckSquare, ArrowRight, Circle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Task {
  id: number;
  text: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

const initialTasks: Task[] = [
  { id: 1, text: "Review Figma mockups", priority: "high", completed: false },
  { id: 2, text: "Write API documentation", priority: "medium", completed: false },
  { id: 3, text: "Deploy staging build", priority: "high", completed: true },
  { id: 4, text: "Update dependencies", priority: "low", completed: false },
  { id: 5, text: "Fix auth redirect bug", priority: "high", completed: true },
];

const priorityStyles: Record<string, string> = {
  high: "bg-red-500/15 text-red-400 border-red-500/20",
  medium: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
};

export function TasksWidget() {
  const [tasks, setTasks] = useState(initialTasks);
  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="widget-card p-5 animate-slide-up" style={{ animationDelay: "320ms", animationFillMode: "both" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-emerald-400/10">
            <CheckSquare className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-sm font-semibold">Today&apos;s Tasks</h3>
          <span className="text-xs text-muted-foreground">{completedCount}/{tasks.length}</span>
        </div>
        <Link href="/tasks" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-1.5">
        {tasks.map((task) => (
          <button key={task.id} onClick={() => toggleTask(task.id)} className={cn("flex items-center gap-3 w-full p-2.5 rounded-lg text-left transition-all duration-200 group", task.completed ? "bg-white/[0.01]" : "bg-white/[0.02] hover:bg-white/[0.05]")}>
            {task.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <Circle className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />}
            <span className={cn("text-sm flex-1 transition-all", task.completed ? "line-through text-muted-foreground/50" : "text-foreground/90")}>{task.text}</span>
            <Badge variant="outline" className={`text-[10px] shrink-0 ${priorityStyles[task.priority]}`}>{task.priority}</Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
