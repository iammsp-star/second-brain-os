"use client";

import { Search, Plus, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui-store";

export function TopNav() {
  const toggleQuickCapture = useUIStore((s) => s.toggleQuickCapture);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-[#0B0B0F]/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-6">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            id="global-search"
            placeholder="Search everything... ( / )"
            className="pl-10 bg-white/5 border-white/5 h-10 text-sm placeholder:text-muted-foreground/60 focus:border-primary/40 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-4">
          {/* Quick Add Button */}
          <Button
            onClick={toggleQuickCapture}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white gap-1.5 glow-red-sm hover:glow-red transition-all duration-300 rounded-lg"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Quick Add</span>
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-white hover:bg-white/5"
          >
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
          </Button>
        </div>
      </div>
    </header>
  );
}
