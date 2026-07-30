"use client";

import React, { use, useState, useMemo } from "react";
import { MARKETPLACE_TEMPLATES, MARKETPLACE_BLOCKS } from "@/features/template-marketplace/registry";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function TemplateDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [viewportWidth, setViewportWidth] = useState<number>(1024);

  const activeTemplate = useMemo(() => {
    return MARKETPLACE_TEMPLATES.find((t) => t.slug === resolvedParams.slug);
  }, [resolvedParams.slug]);

  const templateBlocks = useMemo(() => {
    if (!activeTemplate) return [];
    return activeTemplate.blocks
      .map((slug) => MARKETPLACE_BLOCKS.find((b) => b.slug === slug))
      .filter((b): b is typeof MARKETPLACE_BLOCKS[0] => !!b);
  }, [activeTemplate]);

  if (!activeTemplate) {
    return (
      <main className="flex-1 max-w-xl mx-auto py-24 px-6 text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-[var(--destructive)] mx-auto" />
        <h2 className="text-xl font-bold">Template Not Found</h2>
        <Link href="/templates" className="text-[var(--primary)] hover:underline block text-xs">Back to Templates</Link>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-8 text-[var(--foreground)]">
      
      {/* Header banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1 text-left">
          <Link href="/templates" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Templates
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">{activeTemplate.name}</h1>
          <p className="text-xs text-[var(--muted-foreground)]">{activeTemplate.description}</p>
        </div>

        {/* Viewport controls */}
        <div className="flex items-center gap-1.5 bg-[var(--surface)] p-1 rounded-xl border border-[var(--border)] text-xs font-semibold select-none">
          <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] px-2">Viewport Width</span>
          {([360, 768, 1024, 1440] as const).map((w) => (
            <button
              key={w}
              onClick={() => setViewportWidth(w)}
              className={`px-2 py-1 rounded-lg cursor-pointer ${
                viewportWidth === w
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "text-[var(--muted-foreground)]"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Assembly Canvas frame */}
      <div className="w-full flex justify-center bg-[var(--background)]/30 rounded-xl border border-[var(--border)] border-dashed p-4 min-h-[480px]">
        <div 
          className="w-full bg-[var(--background)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden text-left divide-y divide-[var(--border)] transition-all duration-300"
          style={{ maxWidth: `${viewportWidth}px` }}
        >
          {templateBlocks.map((b) => (
            <div key={b.id} className="p-8 bg-[var(--surface)]/20 relative group hover:bg-[var(--surface)]/40 transition-colors">
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Badge variant="secondary" className="text-[8px] font-mono select-none">{b.category}</Badge>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[var(--foreground)]">{b.name}</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{b.description}</p>
                <div className="pt-2">
                  <Link href={`/block/${b.slug}`} className="text-[var(--primary)] font-bold text-xs hover:underline">
                    View Block Snippet →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
