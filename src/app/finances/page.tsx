"use client";

import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";

const summary = [
  { label: "Balance", value: "$12,450", change: "+$2,340", positive: true, icon: Wallet },
  { label: "Income", value: "$8,500", change: "+12%", positive: true, icon: TrendingUp },
  { label: "Expenses", value: "$3,200", change: "-8%", positive: true, icon: TrendingDown },
];

const transactions = [
  { id: 1, desc: "Freelance Payment", amount: "+$2,500", positive: true, category: "Income", date: "Today" },
  { id: 2, desc: "AWS Hosting", amount: "-$45.99", positive: false, category: "Subscriptions", date: "Today" },
  { id: 3, desc: "Figma Pro", amount: "-$12.00", positive: false, category: "Subscriptions", date: "Yesterday" },
  { id: 4, desc: "Client Project", amount: "+$1,800", positive: true, category: "Income", date: "May 14" },
  { id: 5, desc: "Coffee & Lunch", amount: "-$28.50", positive: false, category: "Food", date: "May 14" },
  { id: 6, desc: "Online Course", amount: "-$49.99", positive: false, category: "Education", date: "May 13" },
];

export default function FinancesPage() {
  return (
    <AppShell>
      <div className="max-w-5xl mx-auto w-full">
        <PageHeader title="Finances" description="Track your income, expenses, and savings" icon={Wallet} iconColor="text-emerald-400" iconBg="bg-emerald-400/10" actionLabel="Add Transaction" />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {summary.map((item, i) => (
            <div key={item.label} className="widget-card p-5 animate-slide-up" style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</span>
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-400/10">
                  <item.icon className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight">{item.value}</p>
              <span className={`text-xs flex items-center gap-1 mt-1 ${item.positive ? "text-emerald-400" : "text-red-400"}`}>
                {item.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {item.change} this month
              </span>
            </div>
          ))}
        </div>

        {/* Chart Placeholder */}
        <div className="widget-card p-5 mb-6 animate-slide-up" style={{ animationDelay: "240ms", animationFillMode: "both" }}>
          <h3 className="text-sm font-semibold mb-4">Monthly Overview</h3>
          <div className="h-48 flex items-end gap-2">
            {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-sm bg-primary/20 hover:bg-primary/40 transition-colors" style={{ height: `${h}%` }} />
                <span className="text-[9px] text-muted-foreground/50">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold mb-3">Recent Transactions</h3>
          {transactions.map((tx, i) => (
            <div key={tx.id} className="widget-card p-4 flex items-center gap-4 animate-slide-up" style={{ animationDelay: `${320 + i * 40}ms`, animationFillMode: "both" }}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${tx.positive ? "bg-emerald-400/10" : "bg-red-400/10"}`}>
                {tx.positive ? <ArrowUpRight className="w-4 h-4 text-emerald-400" /> : <ArrowDownRight className="w-4 h-4 text-red-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">{tx.desc}</p>
                <span className="text-[11px] text-muted-foreground">{tx.category}</span>
              </div>
              <span className={`text-sm font-mono font-medium ${tx.positive ? "text-emerald-400" : "text-red-400"}`}>{tx.amount}</span>
              <span className="text-[11px] text-muted-foreground">{tx.date}</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
