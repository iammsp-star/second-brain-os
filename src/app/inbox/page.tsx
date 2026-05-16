"use client";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Inbox, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const inboxItems = [
  { id: 1, text: "Check out this article on AI workflows", type: "resource", time: "2m ago" },
  { id: 2, text: "Update portfolio with new projects", type: "task", time: "15m ago" },
  { id: 3, text: "Ideas for the newsletter launch", type: "note", time: "1h ago" },
  { id: 4, text: "Research Supabase real-time features", type: "resource", time: "3h ago" },
  { id: 5, text: "Schedule meeting with design team", type: "task", time: "5h ago" },
  { id: 6, text: "Book recommendations from podcast", type: "note", time: "Yesterday" },
];

const typeBadge: Record<string, string> = {
  task: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  note: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  resource: "bg-blue-500/15 text-blue-400 border-blue-500/20",
};

export default function InboxPage() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto w-full">
        <PageHeader title="Inbox" description="Capture everything, organize later" icon={Inbox} actionLabel="Quick Capture" />
        <div className="space-y-2">
          {inboxItems.map((item, i) => (
            <div key={item.id} className="widget-card p-4 flex items-center gap-4 animate-slide-up" style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}>
              <div className="flex-1 min-w-0">
                <p className="text-sm">{item.text}</p>
              </div>
              <Badge variant="outline" className={`text-[10px] shrink-0 ${typeBadge[item.type]}`}>{item.type}</Badge>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
                <Clock className="w-3 h-3" />{item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
