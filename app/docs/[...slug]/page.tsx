"use client";

import React, { use, useMemo } from "react";
import { DOCUMENTATION_REGISTRY } from "@/features/documentation/registry";
import { ArrowLeft, Clock, AlertCircle, BookOpen, Layers, Cpu, Shield } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default function DocDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);

  // Safely extract query slug from URL array parameters
  const querySlug = useMemo(() => {
    return resolvedParams.slug?.[0] || "";
  }, [resolvedParams.slug]);

  const activeDoc = useMemo(() => {
    return DOCUMENTATION_REGISTRY.find((d) => d.slug === querySlug);
  }, [querySlug]);

  if (!activeDoc) {
    return (
      <main className="flex-1 max-w-xl mx-auto py-24 px-6 text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-[var(--destructive)] mx-auto" />
        <h2 className="text-xl font-bold">Documentation Spec Not Found</h2>
        <Link href="/docs" className="text-[var(--primary)] hover:underline block text-xs">Back to Documentation Hub</Link>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-8 text-[var(--foreground)] text-left">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1">
          <Link href="/docs" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Docs Hub
          </Link>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            {activeDoc.title}
            <Badge variant="secondary">{activeDoc.category}</Badge>
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">Technical specification and implementation guide.</p>
        </div>

        {/* Telemetry info */}
        <Card className="px-4 py-2 border-[var(--primary)]/20 bg-[var(--primary)]/5 flex items-center gap-2 shrink-0">
          <Clock className="h-4 w-4 text-[var(--primary)]" />
          <div className="text-left">
            <span className="text-[9px] uppercase font-bold text-[var(--muted-foreground)] block">Last Updated</span>
            <span className="text-xs font-semibold text-[var(--foreground)]">{activeDoc.lastUpdated}</span>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Content layout blocks (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Overview */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--primary)] flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" /> Overview & Purpose
            </h3>
            <p className="text-xs text-[var(--foreground)] leading-relaxed bg-[var(--surface)]/20 p-4 rounded-xl border border-[var(--border)]">
              {activeDoc.overview}
            </p>
          </section>

          {/* Architecture */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--primary)] flex items-center gap-1.5">
              <Layers className="h-4 w-4" /> Software Architecture
            </h3>
            <p className="text-xs text-[var(--foreground)] leading-relaxed bg-[var(--surface)]/20 p-4 rounded-xl border border-[var(--border)]">
              {activeDoc.architecture}
            </p>
          </section>

          {/* Code Usage */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--primary)] flex items-center gap-1.5">
              <Cpu className="h-4 w-4" /> Usage & Code Integration
            </h3>
            <pre className="text-[10px] font-mono bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)] text-[var(--foreground)] overflow-x-auto leading-relaxed">
              {activeDoc.usage}
            </pre>
          </section>
        </div>

        {/* Right: Metadata & Accessibility audits (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-5 border-[var(--border)] bg-[var(--surface)]/30 space-y-4">
            <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] tracking-wider block">Metadata Specifications</span>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">System Version</span>
                <span className="font-mono">v{activeDoc.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Compliance Rating</span>
                <Badge variant="success">WCAG AA PASS</Badge>
              </div>
            </div>
          </Card>

          {/* Accessibility Notes */}
          <Card className="p-5 border-[var(--border)] bg-[var(--background)] space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--muted-foreground)] flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" /> Accessibility & WCAG Notes
            </h4>
            <p className="text-xs text-[var(--foreground)] leading-relaxed">
              {activeDoc.accessibilityNotes}
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}
