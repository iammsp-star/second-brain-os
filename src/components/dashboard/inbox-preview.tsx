"use client";

import Link from "next/link";
import { Inbox, ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const inboxItems = [
  {
    id: 1,
    text: "Check out this article on AI workflows",
    type: "resource",
    time: "2m ago",
  },
  {
    id: 2,
    text: "Update portfolio with new projects",
    type: "task",
    time: "15m ago",
  },
  {
    id: 3,
    text: "Ideas for the newsletter launch",
    type: "note",
    time: "1h ago",
  },
];

const typeBadgeStyles: Record<string, string> = {
  task: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  note: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  resource: "bg-blue-500/15 text-blue-400 border-blue-500/20",
};

export function InboxPreview() {
  return (
    <div className="widget-card p-5 animate-slide-up" style={{ animationDelay: "160ms", animationFillMode: "both" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10">
            <Inbox className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-sm font-semibold">Inbox</h3>
          <Badge
            variant="secondary"
            className="text-[10px] bg-primary/15 text-primary border-primary/20 px-1.5"
          >
            3
          </Badge>
        </div>
        <Link
          href="/inbox"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-2">
        {inboxItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.03] transition-all duration-200 cursor-pointer group"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground/90 truncate group-hover:text-white transition-colors">
                {item.text}
              </p>
            </div>
            <Badge
              variant="outline"
              className={`text-[10px] shrink-0 ${typeBadgeStyles[item.type]}`}
            >
              {item.type}
            </Badge>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground shrink-0">
              <Clock className="w-2.5 h-2.5" />
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
