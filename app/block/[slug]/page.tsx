"use client";

import React, { use, useState, useMemo } from "react";
import { MARKETPLACE_BLOCKS } from "@/features/template-marketplace/registry";
import { ArrowLeft, Check, Copy, AlertCircle, Cpu, BookOpen } from "lucide-react";
import { Card, Badge, Separator } from "@/components/ui";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlockDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"react" | "tailwind" | "json">("react");

  const activeBlock = useMemo(() => {
    return MARKETPLACE_BLOCKS.find((b) => b.slug === resolvedParams.slug);
  }, [resolvedParams.slug]);

  const handleCopyCode = () => {
    if (!activeBlock) return;
    const content = activeCodeTab === "react" 
      ? activeBlock.codeSnippet 
      : activeCodeTab === "tailwind"
      ? `// Tailwind color overrides:\n// Add these semantic colors to your tailwind.config.js\n`
      : JSON.stringify(activeBlock, null, 2);
    
    navigator.clipboard.writeText(content);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!activeBlock) {
    return (
      <main className="flex-1 max-w-xl mx-auto py-24 px-6 text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-[var(--destructive)] mx-auto" />
        <h2 className="text-xl font-bold">Block Not Found</h2>
        <Link href="/blocks" className="text-[var(--primary)] hover:underline block text-xs">Back to Blocks</Link>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-8 text-[var(--foreground)]">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1 text-left">
          <Link href="/blocks" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Blocks
          </Link>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            {activeBlock.name}
            <Badge variant="secondary">{activeBlock.category}</Badge>
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">{activeBlock.description}</p>
        </div>

        {/* Accessibility score rating */}
        <Card className="px-4 py-2 border-[var(--primary)]/20 bg-[var(--primary)]/5 flex items-center gap-2 shrink-0">
          <Cpu className="h-4 w-4 text-[var(--primary)]" />
          <div className="text-left">
            <span className="text-[9px] uppercase font-bold text-[var(--muted-foreground)] block">Accessibility</span>
            <span className="text-sm font-black text-[var(--foreground)]">{activeBlock.accessibilityScore}/100</span>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Metadata & documentation (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-5 border-[var(--border)] bg-[var(--surface)]/30 space-y-4">
            <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] tracking-wider block">Block Metadata</span>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] text-[var(--muted-foreground)] block">Author</span>
                <span className="font-semibold">{activeBlock.author}</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted-foreground)] block">Version</span>
                <span className="font-mono">{activeBlock.version}</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted-foreground)] block">Created</span>
                <span>{activeBlock.createdAt}</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted-foreground)] block">Difficulty</span>
                <span className="capitalize font-semibold text-[var(--primary)]">{activeBlock.difficulty}</span>
              </div>
            </div>

            <Separator />

            {/* Tags */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-[var(--muted-foreground)] block">Tags & Keywords</span>
              <div className="flex flex-wrap gap-1">
                {activeBlock.tags.map((t) => (
                  <Badge key={t} variant="outline" className="text-[9px]">{t}</Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Dependencies */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-[var(--muted-foreground)] block">Npm Dependencies</span>
              <div className="flex flex-wrap gap-1">
                {activeBlock.dependencies.map((d) => (
                  <code key={d} className="bg-[var(--background)] px-2 py-0.5 rounded text-[10px] border border-[var(--border)] text-[var(--primary)] font-mono">{d}</code>
                ))}
              </div>
            </div>
          </Card>

          {/* Recommended usages */}
          <Card className="p-5 border-[var(--border)] bg-[var(--background)] space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--muted-foreground)] flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" /> Best Practices & Recommended Usage
            </h4>
            <ul className="text-xs space-y-2 text-[var(--foreground)] text-left">
              {activeBlock.recommendedUsage.map((u, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Right column: Exporter & Sandbox (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 shrink-0">
            <div className="flex gap-4 text-xs font-semibold select-none">
              {(["react", "tailwind", "json"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCodeTab(tab)}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer capitalize ${
                    activeCodeTab === tab ? "border-[var(--primary)] text-[var(--primary)] font-bold" : "border-transparent text-[var(--muted-foreground)]"
                  }`}
                >
                  {tab === "react" ? "React / Next.js" : tab === "tailwind" ? "Tailwind Setup" : "Registry Schema"}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleCopyCode}
              className="text-[var(--primary)] hover:underline flex items-center gap-1.5 cursor-pointer font-bold text-xs"
            >
              {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedCode ? "Copied!" : "Copy Code"}
            </button>
          </div>

          <pre className="text-[10px] font-mono bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)] text-[var(--foreground)] overflow-x-auto max-h-[400px] overflow-y-auto leading-relaxed text-left">
            {activeCodeTab === "react" && activeBlock.codeSnippet}
            {activeCodeTab === "tailwind" && `// Add these custom theme variables inside tailwind.config.js:\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        primary: "var(--primary)",\n        background: "var(--background)",\n        border: "var(--border)",\n      }\n    }\n  }\n};`}
            {activeCodeTab === "json" && JSON.stringify(activeBlock, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}
