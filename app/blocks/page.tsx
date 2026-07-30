"use client";

import React, { useState, useMemo } from "react";
import { MARKETPLACE_BLOCKS } from "@/features/template-marketplace/registry";
import { Search, ArrowLeft, Grid, Cpu } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import Link from "next/link";

export default function BlocksPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlocks = useMemo(() => {
    return MARKETPLACE_BLOCKS.filter((b) => 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-8 text-[var(--foreground)]">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1 text-left">
          <Link href="/" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Workspace
          </Link>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Grid className="h-5 w-5 text-[var(--primary)]" />
            Block Registry
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">
            Atomic components and reusable segments configured with design tokens.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search blocks catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] focus:ring-1 focus:ring-[var(--ring)] focus:outline-none"
          />
        </div>
      </div>

      {/* Grid List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlocks.map((b) => (
          <Link key={b.id} href={`/block/${b.slug}`}>
            <Card className="p-5 border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-all flex flex-col justify-between h-48 text-left group">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="text-[9px] uppercase tracking-wide font-mono">{b.category}</Badge>
                  <Badge variant="success" className="text-[8px] font-mono select-none">Score: {b.accessibilityScore}%</Badge>
                </div>
                <h3 className="font-bold text-base text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">{b.name}</h3>
                <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">{b.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]/40 text-[10px] text-[var(--muted-foreground)]">
                <span className="flex items-center gap-1 capitalize"><Cpu className="h-3.5 w-3.5 text-[var(--primary)]" /> {b.difficulty}</span>
                <span className="hover:underline text-[var(--primary)] font-bold">Inspect Code →</span>
              </div>
            </Card>
          </Link>
        ))}
        {filteredBlocks.length === 0 && (
          <div className="col-span-full text-center py-12 text-xs text-[var(--muted-foreground)]">No matching blocks found.</div>
        )}
      </div>
    </main>
  );
}
