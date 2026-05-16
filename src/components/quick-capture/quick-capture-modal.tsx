"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUIStore } from "@/store/ui-store";
import { CheckSquare, StickyNote, Link2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type CaptureType = "task" | "note" | "resource";
type Priority = "low" | "medium" | "high";

const typeOptions = [
  { value: "task" as CaptureType, label: "Task", icon: CheckSquare },
  { value: "note" as CaptureType, label: "Note", icon: StickyNote },
  { value: "resource" as CaptureType, label: "Resource", icon: Link2 },
];

const priorityOptions: { value: Priority; label: string; color: string }[] = [
  { value: "low", label: "Low", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  { value: "medium", label: "Medium", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  { value: "high", label: "High", color: "bg-red-500/20 text-red-400 border-red-500/30" },
];

export function QuickCaptureModal() {
  const open = useUIStore((s) => s.quickCaptureOpen);
  const setOpen = useUIStore((s) => s.setQuickCaptureOpen);
  const [text, setText] = useState("");
  const [type, setType] = useState<CaptureType>("task");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSave = () => {
    if (!text.trim()) return;

    // In Phase 2, this will save to Supabase
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} captured!`, {
      description: text.length > 50 ? text.slice(0, 50) + "..." : text,
    });

    setText("");
    setType("task");
    setPriority("medium");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[480px] bg-[#16161F] border-white/10 p-0 gap-0 animate-scale-in">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            Quick Capture
            <kbd className="ml-auto text-[10px] text-muted-foreground bg-white/5 px-1.5 py-0.5 rounded border border-white/10 font-mono">
              C
            </kbd>
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-4">
          {/* Text Input */}
          <div>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              className="bg-white/5 border-white/10 h-12 text-sm focus:border-primary/40 focus:ring-primary/20"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSave();
                }
              }}
            />
          </div>

          {/* Type Selector */}
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Type
            </span>
            <div className="flex gap-2">
              {typeOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setType(opt.value)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
                    type === opt.value
                      ? "bg-primary/15 text-primary border-primary/30 glow-red-sm"
                      : "bg-white/5 text-muted-foreground border-white/5 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <opt.icon className="w-3.5 h-3.5" />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Selector (for tasks) */}
          {type === "task" && (
            <div className="space-y-2 animate-fade-in">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Priority
              </span>
              <div className="flex gap-2">
                {priorityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setPriority(opt.value)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
                      priority === opt.value
                        ? opt.color
                        : "bg-white/5 text-muted-foreground border-white/5 hover:bg-white/10"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={!text.trim()}
            className="w-full bg-primary hover:bg-primary/90 text-white h-10 transition-all duration-300 disabled:opacity-30"
          >
            Capture
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
