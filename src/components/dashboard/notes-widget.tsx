"use client";

import Link from "next/link";
import { StickyNote, ArrowRight, FileText } from "lucide-react";

const notes = [
  { id: 1, title: "API Architecture Notes", preview: "RESTful vs GraphQL comparison for the new...", time: "Today" },
  { id: 2, title: "Meeting with Design Team", preview: "Discussed the new onboarding flow and...", time: "Yesterday" },
  { id: 3, title: "React Performance Tips", preview: "useMemo, useCallback patterns and when to...", time: "2 days ago" },
];

export function NotesWidget() {
  return (
    <div className="widget-card p-5 animate-slide-up" style={{ animationDelay: "480ms", animationFillMode: "both" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-amber-400/10">
            <StickyNote className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-sm font-semibold">Recent Notes</h3>
        </div>
        <Link href="/notes" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-2">
        {notes.map((note) => (
          <div key={note.id} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.05] transition-all duration-200 cursor-pointer group">
            <div className="flex items-start gap-2.5">
              <FileText className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0 group-hover:text-amber-400 transition-colors" />
              <div className="min-w-0">
                <p className="text-sm font-medium group-hover:text-white transition-colors">{note.title}</p>
                <p className="text-xs text-muted-foreground/70 mt-0.5 truncate">{note.preview}</p>
                <span className="text-[10px] text-muted-foreground/50 mt-1 block">{note.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
