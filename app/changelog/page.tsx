"use client";

import React from "react";
import { ArrowLeft, GitCommit } from "lucide-react";
import { Badge } from "@/components/ui";
import Link from "next/link";

export default function ChangelogPage() {
  const changelogs = [
    {
      version: "2.0.0",
      date: "2026-07-30",
      title: "Global Platform Branding Refactor",
      description: "Overhauled old design configurations to establish the unified Design Web platform. Deployed secondary visual route workspaces for forms studio, nested guides documentations, design debugger dashboards, and export systems.",
      category: "Major Update"
    },
    {
      version: "1.0.0",
      date: "2026-07-30",
      title: "Core Foundation Launch",
      description: "Initialized professional palette registries containing 50 preset configs, dynamic viewport resizer frames, accessibility checkers, layout drag compositors, and custom duration sliders.",
      category: "Feature Launch"
    }
  ];

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-8 text-[var(--foreground)] text-left">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1">
          <Link href="/" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Platform Changelog</h1>
          <p className="text-xs text-[var(--muted-foreground)]">Explore latest releases, refactor outlines, and updates guidelines.</p>
        </div>
      </div>

      {/* Timeline list */}
      <div className="relative border-l border-[var(--border)] ml-3 pl-6 space-y-8 py-2">
        {changelogs.map((c) => (
          <div key={c.version} className="relative">
            <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-[var(--primary)] border-2 border-[var(--background)] flex items-center justify-center text-[var(--primary-foreground)]">
              <GitCommit className="h-2 w-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black font-mono">v{c.version}</span>
                <Badge variant="secondary" className="text-[9px]">{c.category}</Badge>
                <span className="text-[10px] text-[var(--muted-foreground)] font-mono">{c.date}</span>
              </div>
              <h3 className="font-bold text-base text-[var(--foreground)]">{c.title}</h3>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed max-w-2xl">{c.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
