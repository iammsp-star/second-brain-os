"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Inbox,
  FolderKanban,
  CheckSquare,
  StickyNote,
  Repeat,
  Wallet,
  Dumbbell,
  Zap,
  Menu,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { useUIStore } from "@/store/ui-store";
import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import { QuickCaptureModal } from "@/components/quick-capture/quick-capture-modal";
import { AboutModal } from "./about-modal";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { TooltipProvider } from "@/components/ui/tooltip";

const mobileNavItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Inbox", href: "/inbox", icon: Inbox },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Notes", href: "/notes", icon: StickyNote },
  { label: "Habits", href: "/habits", icon: Repeat },
  { label: "Finances", href: "/finances", icon: Wallet },
  { label: "Fitness", href: "/fitness", icon: Dumbbell },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  useKeyboardShortcuts();
  const pathname = usePathname();
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);
  const toggleAbout = useUIStore((s) => s.toggleAbout);

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Mobile Sidebar (Sheet) */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent
            side="left"
            className="w-[280px] p-0 bg-[#0F0F14] border-r border-border"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            {/* Mobile Nav Logo */}
            <div className="flex items-center gap-3 px-4 h-16 border-b border-border">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 glow-red-sm">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight">
                  Second Brain
                </span>
                <span className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">
                  OS
                </span>
              </div>
            </div>
            <nav className="py-4 px-2 space-y-1">
              {mobileNavItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                      isActive
                        ? "nav-active text-white"
                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "w-[18px] h-[18px] flex-shrink-0 transition-colors",
                        isActive
                          ? "text-primary"
                          : "group-hover:text-primary/70"
                      )}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              {/* About Button for Mobile */}
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  toggleAbout();
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full text-muted-foreground hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <Info className="w-[18px] h-[18px] flex-shrink-0 text-muted-foreground" />
                <span>About OS</span>
              </button>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Main Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Nav with mobile hamburger */}
          <div className="relative">
            <div className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 z-40">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-white"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
            <TopNav />
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>

        {/* Quick Capture Modal (global) */}
        <QuickCaptureModal />

        {/* About Modal (global) */}
        <AboutModal />
      </div>
    </TooltipProvider>
  );
}
