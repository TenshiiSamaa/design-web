"use client";

import React, { useState, useMemo } from "react";
import { MARKETPLACE_TEMPLATES } from "@/features/template-marketplace/registry";
import { Search, ArrowLeft, Layers, Sparkles } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import Link from "next/link";

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = useMemo(() => {
    return MARKETPLACE_TEMPLATES.filter((t) => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
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
            <Layers className="h-5 w-5 text-[var(--primary)]" />
            Template Marketplace
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">
            Official page composition templates mapped from reusable blocks.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] focus:ring-1 focus:ring-[var(--ring)] focus:outline-none"
          />
        </div>
      </div>

      {/* Grid List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((t) => (
          <Link key={t.id} href={`/template/${t.slug}`}>
            <Card className="p-5 border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-all flex flex-col justify-between h-48 text-left group">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="text-[9px] uppercase tracking-wide font-mono">{t.category}</Badge>
                  <span className="text-[9px] font-mono text-[var(--muted-foreground)]">v{t.version}</span>
                </div>
                <h3 className="font-bold text-base text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">{t.name}</h3>
                <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">{t.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]/40 text-[10px] text-[var(--muted-foreground)]">
                <span className="flex items-center gap-1"><Sparkles className="h-3 w-3 text-amber-500" /> {t.blocks.length} Sections</span>
                <span className="hover:underline text-[var(--primary)] font-bold">Compose Preview →</span>
              </div>
            </Card>
          </Link>
        ))}
        {filteredTemplates.length === 0 && (
          <div className="col-span-full text-center py-12 text-xs text-[var(--muted-foreground)]">No matching templates found.</div>
        )}
      </div>
    </main>
  );
}
