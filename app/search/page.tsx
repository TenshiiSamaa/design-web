"use client";

import React, { useState, useMemo } from "react";
import { DOCUMENTATION_REGISTRY } from "@/features/documentation/registry";
import { MARKETPLACE_CHARTS } from "@/features/data-visualization/registry";
import { MARKETPLACE_FORMS } from "@/features/forms/registry";
import { MARKETPLACE_ASSETS } from "@/features/assets/registry";
import { Search, ArrowLeft, ArrowRight } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import Link from "next/link";

interface SearchResult {
  title: string;
  category: string;
  desc: string;
  link: string;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo<SearchResult[]>(() => {
    if (!searchQuery.trim()) return [];
    
    const results: SearchResult[] = [];
    const query = searchQuery.toLowerCase();

    // 1. Scan Docs
    DOCUMENTATION_REGISTRY.forEach((d) => {
      if (d.title.toLowerCase().includes(query) || d.overview.toLowerCase().includes(query)) {
        results.push({ title: d.title, category: "Documentation", desc: d.overview, link: `/docs/${d.slug}` });
      }
    });

    // 2. Scan Charts
    MARKETPLACE_CHARTS.forEach((c) => {
      if (c.name.toLowerCase().includes(query) || c.description.toLowerCase().includes(query)) {
        results.push({ title: c.name, category: "Data Graphics", desc: c.description, link: `/chart/${c.slug}` });
      }
    });

    // 3. Scan Forms
    MARKETPLACE_FORMS.forEach((f) => {
      if (f.name.toLowerCase().includes(query) || f.description.toLowerCase().includes(query)) {
        results.push({ title: f.name, category: "Forms Registry", desc: f.description, link: `/form/${f.slug}` });
      }
    });

    // 4. Scan Assets
    MARKETPLACE_ASSETS.forEach((a) => {
      if (a.name.toLowerCase().includes(query) || a.description.toLowerCase().includes(query)) {
        results.push({ title: a.name, category: "Assets Library", desc: a.description, link: `/asset/${a.slug}` });
      }
    });

    return results;
  }, [searchQuery]);

  return (
    <main className="flex-1 max-w-4xl mx-auto w-full p-6 space-y-8 text-[var(--foreground)] text-left">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1">
          <Link href="/" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Global Platform Search</h1>
          <p className="text-xs text-[var(--muted-foreground)]">Find modules, primitives, assets, guides, and tokens.</p>
        </div>
      </div>

      {/* Input */}
      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
        <input
          type="text"
          placeholder="Type query to filter templates, blocks, icons, or visual charts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] focus:ring-1 focus:ring-[var(--ring)] focus:outline-none shadow-sm"
        />
      </div>

      {/* Results grid */}
      <div className="space-y-4">
        {searchResults.map((res, idx) => (
          <Link key={idx} href={res.link} className="block group">
            <Card className="p-4 border-[var(--border)] bg-[var(--surface)]/30 hover:bg-[var(--surface)]/60 transition-all flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">{res.title}</span>
                  <Badge variant="secondary" className="text-[8px] uppercase font-mono tracking-wide">{res.category}</Badge>
                </div>
                <p className="text-xs text-[var(--muted-foreground)]">{res.desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-transform translate-x-0 group-hover:translate-x-1" />
            </Card>
          </Link>
        ))}

        {searchQuery.trim() && searchResults.length === 0 && (
          <div className="text-center py-24 text-xs text-[var(--muted-foreground)]">No platform matches found. Try entering keywords like &quot;theme&quot;, &quot;revenue&quot;, &quot;shield&quot;, or &quot;login&quot;.</div>
        )}
        {!searchQuery.trim() && (
          <div className="text-center py-24 text-xs text-[var(--muted-foreground)]">Enter a search query above to inspect components, assets, documents, or variables.</div>
        )}
      </div>
    </main>
  );
}
