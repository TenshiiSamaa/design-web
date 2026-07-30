"use client";

import React, { useState } from "react";
import { MARKETPLACE_DATASETS } from "@/features/data-visualization/registry";
import { ArrowLeft, BarChart2, TrendingUp, Users, DollarSign } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import Link from "next/link";

export default function AnalyticsPage() {
  const [dashboardType, setDashboardType] = useState<"saas" | "finance" | "crm">("saas");

  // Load active mock datasets
  const revenueData = MARKETPLACE_DATASETS.revenue;
  const trafficData = MARKETPLACE_DATASETS.traffic;

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
            Live Analytics Dashboard
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">
            Assembled dashboard template preview mapping active data metrics.
          </p>
        </div>

        {/* Dashboard type selectors */}
        <div className="flex items-center gap-1.5 bg-[var(--surface)] p-1 rounded-xl border border-[var(--border)] text-xs font-semibold select-none">
          {(["saas", "finance", "crm"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setDashboardType(t)}
              className={`px-3 py-1.5 rounded-lg cursor-pointer capitalize transition-colors ${
                dashboardType === t
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 3 KPI Counter Cards */}
      <div className="grid sm:grid-cols-3 gap-6">
        <Card className="p-5 border-[var(--border)] bg-[var(--surface)]/30 flex items-center gap-4 text-left">
          <div className="p-3 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] block">Monthly Revenue</span>
            <span className="text-lg font-black font-mono">$14,250.00</span>
          </div>
        </Card>

        <Card className="p-5 border-[var(--border)] bg-[var(--surface)]/30 flex items-center gap-4 text-left">
          <div className="p-3 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] block">Active Users</span>
            <span className="text-lg font-black font-mono">1,840</span>
          </div>
        </Card>

        <Card className="p-5 border-[var(--border)] bg-[var(--surface)]/30 flex items-center gap-4 text-left">
          <div className="p-3 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] block">Conversion Rate</span>
            <span className="text-lg font-black font-mono">3.42%</span>
          </div>
        </Card>
      </div>

      {/* Grid Charts */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Monthly Revenue Area Chart preview */}
        <Card className="p-6 border-[var(--border)] bg-[var(--background)] space-y-4 text-left">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-[var(--foreground)]">{revenueData.name}</h3>
            <Badge variant="secondary" className="text-[9px] font-mono">Area Chart</Badge>
          </div>
          
          <div className="relative flex items-end gap-3 h-48 pt-6 border-b border-[var(--border)] bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:16px_16px]">
            {revenueData.values.map((val, idx) => {
              const max = Math.max(...revenueData.values);
              const pct = (val / max) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div 
                    className="w-full bg-[var(--primary)]/90 hover:bg-[var(--primary)] transition-all rounded-t"
                    style={{ height: `${pct}%` }}
                  />
                  <span className="text-[9px] text-[var(--muted-foreground)] font-mono">{revenueData.labels[idx]}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Weekly Traffic Bar Chart preview */}
        <Card className="p-6 border-[var(--border)] bg-[var(--background)] space-y-4 text-left">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-[var(--foreground)]">{trafficData.name}</h3>
            <Badge variant="secondary" className="text-[9px] font-mono">Bar Chart</Badge>
          </div>
          
          <div className="relative flex items-end gap-3 h-48 pt-6 border-b border-[var(--border)] bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:16px_16px]">
            {trafficData.values.map((val, idx) => {
              const max = Math.max(...trafficData.values);
              const pct = (val / max) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div 
                    className="w-full bg-[var(--primary)]/90 hover:bg-[var(--primary)] transition-all rounded-t-sm"
                    style={{ height: `${pct}%` }}
                  />
                  <span className="text-[9px] text-[var(--muted-foreground)] font-mono">{trafficData.labels[idx]}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </main>
  );
}
