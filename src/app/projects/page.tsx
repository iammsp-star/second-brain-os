"use client";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { FolderKanban } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const projects = [
  { id: 1, name: "Portfolio Redesign", desc: "Complete portfolio overhaul with new tech stack", progress: 72, tasks: { done: 18, total: 25 }, status: "active", deadline: "Jun 15" },
  { id: 2, name: "SaaS Landing Page", desc: "Marketing site for the new product launch", progress: 45, tasks: { done: 9, total: 20 }, status: "active", deadline: "Jul 1" },
  { id: 3, name: "Newsletter Automation", desc: "Set up automated email sequences", progress: 20, tasks: { done: 3, total: 15 }, status: "planning", deadline: "Jul 20" },
  { id: 4, name: "Mobile App MVP", desc: "Cross-platform mobile app with React Native", progress: 10, tasks: { done: 2, total: 30 }, status: "planning", deadline: "Aug 1" },
  { id: 5, name: "Blog Platform", desc: "Personal blog with MDX and search", progress: 95, tasks: { done: 19, total: 20 }, status: "active", deadline: "May 30" },
];

const statusStyles: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  planning: "bg-amber-500/15 text-amber-400 border-amber-500/20",
};

export default function ProjectsPage() {
  return (
    <AppShell>
      <div className="max-w-6xl mx-auto w-full">
        <PageHeader title="Projects" description="Track and manage all your projects" icon={FolderKanban} iconColor="text-blue-400" iconBg="bg-blue-400/10" actionLabel="New Project" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <div key={p.id} className="widget-card p-5 animate-slide-up cursor-pointer" style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold">{p.name}</h3>
                <Badge variant="outline" className={`text-[10px] ${statusStyles[p.status]}`}>{p.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-4">{p.desc}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>{p.tasks.done}/{p.tasks.total} tasks</span>
                  <span className="font-mono">{p.progress}%</span>
                </div>
                <Progress value={p.progress} className="h-1.5 bg-white/5" />
              </div>
              <div className="mt-3 pt-3 border-t border-white/5 text-[11px] text-muted-foreground">
                Deadline: {p.deadline}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
