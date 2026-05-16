"use client";

import { Sparkles } from "lucide-react";

export function GreetingCard() {
  const hour = new Date().getHours();
  let greeting = "Good evening";
  let emoji = "🌙";
  if (hour < 12) {
    greeting = "Good morning";
    emoji = "☀️";
  } else if (hour < 17) {
    greeting = "Good afternoon";
    emoji = "🌤️";
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const quotes = [
    "Your future is created by what you do today.",
    "Small daily improvements lead to stunning results.",
    "Focus on being productive instead of busy.",
    "The secret of getting ahead is getting started.",
    "Every accomplishment starts with the decision to try.",
  ];
  const quote = quotes[new Date().getDate() % quotes.length];

  return (
    <div className="widget-card p-6 col-span-full lg:col-span-2 animate-slide-up">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">
            {greeting} {emoji}
          </h2>
          <p className="text-sm text-muted-foreground">{today}</p>
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 glow-red-sm">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
      </div>
      <div className="mt-4 p-3 rounded-lg bg-white/[0.03] border border-white/[0.04]">
        <p className="text-sm text-muted-foreground italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
    </div>
  );
}
