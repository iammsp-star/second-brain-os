import { AppShell } from "@/components/layout/app-shell";
import { GreetingCard } from "@/components/dashboard/greeting-card";
import { QuickStats } from "@/components/dashboard/quick-stats";
import { InboxPreview } from "@/components/dashboard/inbox-preview";
import { ProjectsWidget } from "@/components/dashboard/projects-widget";
import { TasksWidget } from "@/components/dashboard/tasks-widget";
import { HabitsWidget } from "@/components/dashboard/habits-widget";
import { NotesWidget } from "@/components/dashboard/notes-widget";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Your command center at a glance
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Row 1: Greeting (2 cols) + Stats (2 cols) */}
          <GreetingCard />
          <QuickStats />

          {/* Row 2: Inbox + Projects */}
          <div className="sm:col-span-1 lg:col-span-2">
            <InboxPreview />
          </div>
          <div className="sm:col-span-1 lg:col-span-2">
            <ProjectsWidget />
          </div>

          {/* Row 3: Tasks + Habits + Notes */}
          <div className="lg:col-span-2">
            <TasksWidget />
          </div>
          <div className="lg:col-span-1">
            <HabitsWidget />
          </div>
          <div className="lg:col-span-1">
            <NotesWidget />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
