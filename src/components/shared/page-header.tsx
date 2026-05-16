"use client";

import { type LucideIcon, Plus, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PageHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  actionLabel?: string;
  onAction?: () => void;
  showSearch?: boolean;
  showFilter?: boolean;
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  actionLabel = "Add New",
  onAction,
  showSearch = true,
  showFilter = true,
}: PageHeaderProps) {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${iconBg}`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <Button onClick={onAction} size="sm" className="bg-primary hover:bg-primary/90 text-white gap-1.5 glow-red-sm hover:glow-red transition-all">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">{actionLabel}</span>
        </Button>
      </div>
      {(showSearch || showFilter) && (
        <div className="flex items-center gap-2">
          {showSearch && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input placeholder={`Search ${title.toLowerCase()}...`} className="pl-10 bg-white/5 border-white/5 h-9 text-sm" />
            </div>
          )}
          {showFilter && (
            <Button variant="outline" size="sm" className="border-white/10 text-muted-foreground hover:text-white gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              Filter
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
