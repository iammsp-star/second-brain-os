"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Repeat, Flame } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Habit {
  id: number;
  name: string;
  emoji: string;
  streak: number;
  frequency: string;
  completed: boolean;
  weekLog: boolean[];
}

const initialHabits: Habit[] = [
  { id: 1, name: "Morning Workout", emoji: "💪", streak: 12, frequency: "Daily", completed: false, weekLog: [true, true, true, false, true, true, false] },
  { id: 2, name: "Read 30 mins", emoji: "📖", streak: 7, frequency: "Daily", completed: true, weekLog: [true, true, true, true, true, true, true] },
  { id: 3, name: "Meditate", emoji: "🧘", streak: 5, frequency: "Daily", completed: false, weekLog: [true, false, true, true, true, false, true] },
  { id: 4, name: "Code 2 hours", emoji: "💻", streak: 21, frequency: "Daily", completed: true, weekLog: [true, true, true, true, true, true, true] },
  { id: 5, name: "Journal", emoji: "✍️", streak: 3, frequency: "Daily", completed: false, weekLog: [false, false, true, true, true, false, false] },
  { id: 6, name: "Drink 2L Water", emoji: "💧", streak: 14, frequency: "Daily", completed: false, weekLog: [true, true, true, true, true, true, true] },
];

const days = ["M", "T", "W", "T", "F", "S", "S"];

export default function HabitsPage() {
  const [habits, setHabits] = useState(initialHabits);
  const toggleHabit = (id: number) => {
    setHabits(habits.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h)));
  };
  const completedCount = habits.filter((h) => h.completed).length;
  const completionRate = Math.round((completedCount / habits.length) * 100);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto w-full">
        <PageHeader title="Habits" description="Build consistency, one day at a time" icon={Repeat} actionLabel="New Habit" />

        {/* Summary */}
        <div className="widget-card p-5 mb-6 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Today&apos;s Progress</span>
            <span className="text-sm text-muted-foreground">{completedCount}/{habits.length} completed</span>
          </div>
          <Progress value={completionRate} className="h-2 bg-white/5" />
        </div>

        {/* Habit List */}
        <div className="space-y-3">
          {habits.map((habit, i) => (
            <div key={habit.id} className="widget-card p-4 animate-slide-up" style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}>
              <div className="flex items-center gap-4">
                <Checkbox checked={habit.completed} onCheckedChange={() => toggleHabit(habit.id)} className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                <span className="text-xl">{habit.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-medium", habit.completed && "line-through text-muted-foreground/50")}>{habit.name}</p>
                  <span className="text-[11px] text-muted-foreground">{habit.frequency}</span>
                </div>

                {/* Week Log */}
                <div className="hidden sm:flex items-center gap-1">
                  {days.map((day, di) => (
                    <div key={di} className="flex flex-col items-center gap-0.5">
                      <span className="text-[9px] text-muted-foreground/50">{day}</span>
                      <div className={cn("w-5 h-5 rounded-sm flex items-center justify-center text-[10px]", habit.weekLog[di] ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground/30")}>
                        {habit.weekLog[di] ? "✓" : "·"}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Streak */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5">
                  <Flame className={cn("w-3.5 h-3.5", habit.streak >= 7 ? "text-primary" : "text-muted-foreground")} />
                  <span className="text-xs font-mono font-medium">{habit.streak}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
