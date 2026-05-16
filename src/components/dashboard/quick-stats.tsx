"use client";

import { CheckCircle2, Flame, FolderKanban, StickyNote } from "lucide-react";

const stats = [
  {
    label: "Tasks Done",
    value: "12",
    change: "+3 today",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    label: "Streak",
    value: "7",
    change: "days 🔥",
    icon: Flame,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Projects",
    value: "5",
    change: "2 active",
    icon: FolderKanban,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    label: "Notes",
    value: "34",
    change: "+2 this week",
    icon: StickyNote,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
];

export function QuickStats() {
  return (
    <>
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="widget-card p-5 animate-slide-up"
          style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              {stat.label}
            </span>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-lg ${stat.bg}`}
            >
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold tracking-tight">
              {stat.value}
            </span>
            <span className="text-xs text-muted-foreground mb-1">
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
