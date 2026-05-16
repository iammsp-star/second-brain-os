"use client";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Dumbbell, Flame, TrendingUp, Clock, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const metrics = [
  { label: "Workouts", value: "18", sub: "this month", icon: Dumbbell, color: "text-primary", bg: "bg-primary/10" },
  { label: "Calories", value: "12,450", sub: "burned", icon: Flame, color: "text-amber-400", bg: "bg-amber-400/10" },
  { label: "Streak", value: "12", sub: "days", icon: Zap, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { label: "Avg Duration", value: "45", sub: "minutes", icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10" },
];

const workouts = [
  { id: 1, name: "Upper Body Strength", duration: "52 min", calories: 420, date: "Today", intensity: "High" },
  { id: 2, name: "Morning Run — 5K", duration: "28 min", calories: 340, date: "Yesterday", intensity: "Medium" },
  { id: 3, name: "HIIT Circuit", duration: "35 min", calories: 510, date: "May 14", intensity: "High" },
  { id: 4, name: "Yoga & Stretching", duration: "40 min", calories: 180, date: "May 13", intensity: "Low" },
  { id: 5, name: "Leg Day", duration: "55 min", calories: 480, date: "May 12", intensity: "High" },
];

const intensityStyles: Record<string, string> = {
  High: "bg-red-500/15 text-red-400",
  Medium: "bg-amber-500/15 text-amber-400",
  Low: "bg-emerald-500/15 text-emerald-400",
};

const weeklyGoal = { current: 5, target: 6 };

export default function FitnessPage() {
  return (
    <AppShell>
      <div className="max-w-5xl mx-auto w-full">
        <PageHeader title="Fitness" description="Track workouts and stay on target" icon={Dumbbell} iconColor="text-primary" iconBg="bg-primary/10" actionLabel="Log Workout" />

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((m, i) => (
            <div key={m.label} className="widget-card p-5 animate-slide-up" style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{m.label}</span>
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${m.bg}`}>
                  <m.icon className={`w-4 h-4 ${m.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight">{m.value}</p>
              <span className="text-xs text-muted-foreground">{m.sub}</span>
            </div>
          ))}
        </div>

        {/* Weekly Goal */}
        <div className="widget-card p-5 mb-6 animate-slide-up" style={{ animationDelay: "320ms", animationFillMode: "both" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Weekly Goal</span>
            </div>
            <span className="text-sm text-muted-foreground">{weeklyGoal.current}/{weeklyGoal.target} workouts</span>
          </div>
          <Progress value={(weeklyGoal.current / weeklyGoal.target) * 100} className="h-2 bg-white/5" />
        </div>

        {/* Workout Log */}
        <h3 className="text-sm font-semibold mb-3">Recent Workouts</h3>
        <div className="space-y-2">
          {workouts.map((w, i) => (
            <div key={w.id} className="widget-card p-4 flex items-center gap-4 animate-slide-up" style={{ animationDelay: `${400 + i * 50}ms`, animationFillMode: "both" }}>
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
                <Dumbbell className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{w.name}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{w.duration}</span>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Flame className="w-3 h-3" />{w.calories} cal</span>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded ${intensityStyles[w.intensity]}`}>{w.intensity}</span>
              <span className="text-[11px] text-muted-foreground">{w.date}</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
