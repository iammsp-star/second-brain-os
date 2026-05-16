"use client";

import { useState } from "react";
import Link from "next/link";
import { Repeat, ArrowRight, Flame } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Habit {
  id: number;
  name: string;
  streak: number;
  completed: boolean;
  emoji: string;
}

const initialHabits: Habit[] = [
  { id: 1, name: "Morning Workout", streak: 12, completed: false, emoji: "💪" },
  { id: 2, name: "Read 30 mins", streak: 7, completed: true, emoji: "📖" },
  { id: 3, name: "Meditate", streak: 5, completed: false, emoji: "🧘" },
  { id: 4, name: "Code 2 hours", streak: 21, completed: true, emoji: "💻" },
  { id: 5, name: "Journal", streak: 3, completed: false, emoji: "✍️" },
];

export function HabitsWidget() {
  const [habits, setHabits] = useState(initialHabits);
  const toggleHabit = (id: number) => {
    setHabits(habits.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h)));
  };
  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <div className="widget-card p-5 animate-slide-up" style={{ animationDelay: "400ms", animationFillMode: "both" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10">
            <Repeat className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-sm font-semibold">Daily Habits</h3>
          <span className="text-xs text-muted-foreground">{completedCount}/{habits.length}</span>
        </div>
        <Link href="/habits" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-1.5">
        {habits.map((habit) => (
          <div key={habit.id} className={cn("flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 cursor-pointer group", habit.completed ? "bg-white/[0.01]" : "bg-white/[0.02] hover:bg-white/[0.05]")} onClick={() => toggleHabit(habit.id)}>
            <Checkbox checked={habit.completed} className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
            <span className="text-base">{habit.emoji}</span>
            <span className={cn("text-sm flex-1 transition-all", habit.completed ? "line-through text-muted-foreground/50" : "text-foreground/90")}>{habit.name}</span>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Flame className={cn("w-3 h-3", habit.streak >= 7 ? "text-primary" : "text-muted-foreground")} />
              <span className="font-mono">{habit.streak}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
