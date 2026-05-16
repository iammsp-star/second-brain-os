"use client";

import Link from "next/link";
import { FolderKanban, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    id: 1,
    name: "Portfolio Redesign",
    progress: 72,
    tasks: { done: 18, total: 25 },
    status: "active",
  },
  {
    id: 2,
    name: "SaaS Landing Page",
    progress: 45,
    tasks: { done: 9, total: 20 },
    status: "active",
  },
  {
    id: 3,
    name: "Newsletter Automation",
    progress: 20,
    tasks: { done: 3, total: 15 },
    status: "planning",
  },
];

const statusStyles: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  planning: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  archived: "bg-muted text-muted-foreground border-muted",
};

export function ProjectsWidget() {
  return (
    <div className="widget-card p-5 animate-slide-up" style={{ animationDelay: "240ms", animationFillMode: "both" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-blue-400/10">
            <FolderKanban className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-sm font-semibold">Active Projects</h3>
        </div>
        <Link
          href="/projects"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.05] transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium group-hover:text-white transition-colors">
                {project.name}
              </span>
              <Badge
                variant="outline"
                className={`text-[10px] ${statusStyles[project.status]}`}
              >
                {project.status}
              </Badge>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>
                  {project.tasks.done}/{project.tasks.total} tasks
                </span>
                <span className="font-mono">{project.progress}%</span>
              </div>
              <Progress
                value={project.progress}
                className="h-1.5 bg-white/5"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
