"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { CheckSquare, Circle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Task {
  id: number;
  text: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  project?: string;
}

const columns = [
  { key: "todo", label: "To Do", color: "bg-muted-foreground" },
  { key: "progress", label: "In Progress", color: "bg-amber-400" },
  { key: "done", label: "Done", color: "bg-emerald-400" },
];

const allTasks: Record<string, Task[]> = {
  todo: [
    { id: 1, text: "Review Figma mockups", priority: "high", completed: false, project: "Portfolio" },
    { id: 2, text: "Write API documentation", priority: "medium", completed: false, project: "SaaS" },
    { id: 3, text: "Set up CI/CD pipeline", priority: "low", completed: false },
  ],
  progress: [
    { id: 4, text: "Implement auth flow", priority: "high", completed: false, project: "SaaS" },
    { id: 5, text: "Design landing hero", priority: "medium", completed: false, project: "Portfolio" },
  ],
  done: [
    { id: 6, text: "Deploy staging build", priority: "high", completed: true },
    { id: 7, text: "Fix auth redirect bug", priority: "high", completed: true, project: "SaaS" },
    { id: 8, text: "Update dependencies", priority: "low", completed: true },
  ],
};

const priorityStyles: Record<string, string> = {
  high: "bg-red-500/15 text-red-400 border-red-500/20",
  medium: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
};

export default function TasksPage() {
  const [tasks] = useState(allTasks);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto w-full">
        <PageHeader title="Tasks" description="Organize and track your work" icon={CheckSquare} iconColor="text-emerald-400" iconBg="bg-emerald-400/10" actionLabel="New Task" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((col) => (
            <div key={col.key} className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <div className={`w-2 h-2 rounded-full ${col.color}`} />
                <span className="text-sm font-medium">{col.label}</span>
                <span className="text-xs text-muted-foreground">({tasks[col.key]?.length || 0})</span>
              </div>
              <div className="space-y-2">
                {tasks[col.key]?.map((task, i) => (
                  <div key={task.id} className="widget-card p-3.5 animate-slide-up" style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}>
                    <div className="flex items-start gap-2.5">
                      {task.completed ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" /> : <Circle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-sm", task.completed && "line-through text-muted-foreground/50")}>{task.text}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className={`text-[10px] ${priorityStyles[task.priority]}`}>{task.priority}</Badge>
                          {task.project && <span className="text-[10px] text-muted-foreground">{task.project}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
