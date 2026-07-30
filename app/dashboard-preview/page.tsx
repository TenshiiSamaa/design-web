"use client";

import React, { useState } from "react";
import { MARKETPLACE_DATASETS } from "@/features/data-visualization/registry";
import { ArrowLeft, BarChart2 } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import Link from "next/link";

export default function DashboardPreviewPage() {
  const [activeTab, setActiveTab] = useState<"finance" | "developer">("finance");

  // Load active mock datasets
  const revenueData = MARKETPLACE_DATASETS.revenue;

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-8 text-[var(--foreground)]">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1 text-left">
          <Link href="/" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Workspace
          </Link>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-[var(--primary)]" />
            Dashboard Preview Layouts
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">
            Preview multiple analytics and developer telemetry layouts.
          </p>
        </div>

        {/* Dashboard type selectors */}
        <div className="flex items-center gap-1.5 bg-[var(--surface)] p-1 rounded-xl border border-[var(--border)] text-xs font-semibold select-none">
          {(["finance", "developer"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-3 py-1.5 rounded-lg cursor-pointer capitalize transition-colors ${
                activeTab === t
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Dashboard */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Side: 2 Columns of Chart/Stats */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 border-[var(--border)] bg-[var(--background)] space-y-4 text-left">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-[var(--foreground)]">
                {activeTab === "finance" ? "Asset Allocation Growth" : "Database Latency (ms)"}
              </h3>
              <Badge variant="secondary" className="text-[9px] font-mono">Live Telemetry</Badge>
            </div>
            
            <div className="relative flex items-end gap-3 h-48 pt-6 border-b border-[var(--border)] bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:16px_16px]">
              {revenueData.values.map((val, idx) => {
                const max = Math.max(...revenueData.values);
                const pct = (val / max) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div 
                      className="w-full bg-[var(--primary)]/90 hover:bg-[var(--primary)] transition-all rounded-t-sm"
                      style={{ height: `${pct}%` }}
                    />
                    <span className="text-[9px] text-[var(--muted-foreground)] font-mono">{revenueData.labels[idx]}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Side: 1 Column of summary details */}
        <div className="space-y-6">
          <Card className="p-5 border-[var(--border)] bg-[var(--surface)]/30 space-y-4 text-left">
            <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] tracking-wider block">Overview Summary</span>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">System Health</span>
                <Badge variant="success">Compliant</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Query Load</span>
                <span className="font-mono font-bold">142 req/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Average Ping</span>
                <span className="font-mono font-bold text-emerald-500">12ms</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
