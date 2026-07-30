"use client";

import React, { use, useState, useMemo } from "react";
import { MARKETPLACE_ASSETS } from "@/features/assets/registry";
import { ArrowLeft, Check, Copy, AlertCircle } from "lucide-react";
import { Card, Badge, Separator } from "@/components/ui";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function AssetDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"code" | "base64" | "json">("code");

  const activeAsset = useMemo(() => {
    return MARKETPLACE_ASSETS.find((a) => a.slug === resolvedParams.slug);
  }, [resolvedParams.slug]);

  const handleCopyCode = () => {
    if (!activeAsset) return;
    let content = activeAsset.codeContent;
    if (activeCodeTab === "base64") {
      content = `data:image/svg+xml;base64,${btoa(activeAsset.codeContent)}`;
    } else if (activeCodeTab === "json") {
      content = JSON.stringify(activeAsset, null, 2);
    }
    
    navigator.clipboard.writeText(content);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!activeAsset) {
    return (
      <main className="flex-1 max-w-xl mx-auto py-24 px-6 text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-[var(--destructive)] mx-auto" />
        <h2 className="text-xl font-bold">Asset Not Found</h2>
        <Link href="/assets" className="text-[var(--primary)] hover:underline block text-xs">Back to Assets</Link>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-8 text-[var(--foreground)]">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1 text-left">
          <Link href="/assets" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Assets
          </Link>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            {activeAsset.name}
            <Badge variant="secondary">{activeAsset.category}</Badge>
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">{activeAsset.description}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Metadata & documentation (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Visual preview card */}
          <Card className="p-8 bg-[var(--surface)]/20 border-[var(--border)] flex items-center justify-center min-h-[160px]">
            {activeAsset.category === "icon" || activeAsset.category === "illustration" ? (
              <div className="text-[var(--primary)] scale-150" dangerouslySetInnerHTML={{ __html: activeAsset.codeContent }} />
            ) : activeAsset.category === "gradient" ? (
              <div className="h-16 w-48 rounded border border-[var(--border)]" style={{ background: activeAsset.codeContent }} />
            ) : (
              <div 
                className="h-16 w-48 rounded border border-[var(--border)]" 
                style={{ 
                  backgroundImage: activeAsset.codeContent,
                  backgroundSize: "8px 8px"
                }} 
              />
            )}
          </Card>

          <Card className="p-5 border-[var(--border)] bg-[var(--surface)]/30 space-y-4">
            <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] tracking-wider block">Asset Registry Metadata</span>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] text-[var(--muted-foreground)] block">Author</span>
                <span className="font-semibold">{activeAsset.author}</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted-foreground)] block">License</span>
                <span className="font-mono">{activeAsset.license}</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted-foreground)] block">Created</span>
                <span>{activeAsset.createdAt}</span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--muted-foreground)] block">Format</span>
                <span className="uppercase font-semibold text-[var(--primary)]">{activeAsset.fileType}</span>
              </div>
            </div>

            <Separator />

            {/* Tags */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-[var(--muted-foreground)] block">Tags & Keywords</span>
              <div className="flex flex-wrap gap-1">
                {activeAsset.tags.map((t) => (
                  <Badge key={t} variant="outline" className="text-[9px]">{t}</Badge>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right column: Exporter & Sandbox (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 shrink-0">
            <div className="flex gap-4 text-xs font-semibold select-none">
              {(["code", "base64", "json"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCodeTab(tab)}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer capitalize ${
                    activeCodeTab === tab ? "border-[var(--primary)] text-[var(--primary)] font-bold" : "border-transparent text-[var(--muted-foreground)]"
                  }`}
                >
                  {tab === "code" ? "Raw Code Content" : tab === "base64" ? "Base64 URI String" : "Registry JSON"}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleCopyCode}
              className="text-[var(--primary)] hover:underline flex items-center gap-1.5 cursor-pointer font-bold text-xs"
            >
              {copiedCode ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copiedCode ? "Copied!" : "Copy Code"}
            </button>
          </div>

          <pre className="text-[10px] font-mono bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)] text-[var(--foreground)] overflow-x-auto max-h-[400px] overflow-y-auto leading-relaxed text-left">
            {activeCodeTab === "code" && activeAsset.codeContent}
            {activeCodeTab === "base64" && `data:image/svg+xml;base64,${btoa(activeAsset.codeContent)}`}
            {activeCodeTab === "json" && JSON.stringify(activeAsset, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}
