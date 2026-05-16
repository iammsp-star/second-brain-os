"use client";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StickyNote, FileText } from "lucide-react";

const notes = [
  { id: 1, title: "API Architecture Notes", preview: "RESTful vs GraphQL comparison for the new backend...", tags: ["tech", "architecture"], time: "Today" },
  { id: 2, title: "Meeting with Design Team", preview: "Discussed the new onboarding flow and user testing schedule...", tags: ["meeting"], time: "Yesterday" },
  { id: 3, title: "React Performance Tips", preview: "useMemo, useCallback patterns and when to apply them...", tags: ["tech", "react"], time: "2 days ago" },
  { id: 4, title: "Content Strategy Q3", preview: "Blog post ideas, SEO targets, social media calendar...", tags: ["marketing"], time: "3 days ago" },
  { id: 5, title: "Book Notes: Atomic Habits", preview: "Key takeaways on habit stacking and environment design...", tags: ["books", "productivity"], time: "1 week ago" },
  { id: 6, title: "Startup Pitch Deck Outline", preview: "Problem, solution, market size, traction, team...", tags: ["business"], time: "1 week ago" },
];

const tagColors: Record<string, string> = {
  tech: "bg-blue-500/15 text-blue-400",
  architecture: "bg-purple-500/15 text-purple-400",
  meeting: "bg-amber-500/15 text-amber-400",
  react: "bg-cyan-500/15 text-cyan-400",
  marketing: "bg-pink-500/15 text-pink-400",
  books: "bg-emerald-500/15 text-emerald-400",
  productivity: "bg-primary/15 text-primary",
  business: "bg-orange-500/15 text-orange-400",
};

export default function NotesPage() {
  return (
    <AppShell>
      <div className="max-w-6xl mx-auto w-full">
        <PageHeader title="Notes" description="Your knowledge base and ideas" icon={StickyNote} iconColor="text-amber-400" iconBg="bg-amber-400/10" actionLabel="New Note" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note, i) => (
            <div key={note.id} className="widget-card p-5 cursor-pointer animate-slide-up" style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}>
              <div className="flex items-start gap-2.5 mb-2">
                <FileText className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <h3 className="text-sm font-semibold">{note.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground/70 mb-3 line-clamp-2">{note.preview}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5 flex-wrap">
                  {note.tags.map((tag) => (
                    <span key={tag} className={`text-[10px] px-1.5 py-0.5 rounded ${tagColors[tag] || "bg-white/5 text-muted-foreground"}`}>{tag}</span>
                  ))}
                </div>
                <span className="text-[10px] text-muted-foreground">{note.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
