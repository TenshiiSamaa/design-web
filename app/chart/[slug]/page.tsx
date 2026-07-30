"use client";

import React, { use, useState, useMemo } from "react";
import { MARKETPLACE_CHARTS, MARKETPLACE_DATASETS, compileChartToJsx } from "@/features/data-visualization/registry";
import { ArrowLeft, Check, Copy, AlertCircle, Cpu, BookOpen } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ChartDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  
  // Customizer States
  const [columnRadius, setColumnRadius] = useState<number>(4);
  const [showGridLines, setShowGridLines] = useState<boolean>(true);
  const [lineWidth, setLineWidth] = useState<number>(2);

  // Copy code feedback
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<"react" | "json">("react");

  const activeChart = useMemo(() => {
    return MARKETPLACE_CHARTS.find((c) => c.slug === resolvedParams.slug);
  }, [resolvedParams.slug]);

  const activeDataset = useMemo(() => {
    if (!activeChart) return null;
    return MARKETPLACE_DATASETS[activeChart.datasetName] || MARKETPLACE_DATASETS.revenue;
  }, [activeChart]);

  const handleCopyCode = () => {
    if (!activeChart || !activeDataset) return;
    const content = activeCodeTab === "react" 
      ? compileChartToJsx(activeChart, activeDataset) 
      : JSON.stringify(activeChart, null, 2);
    
    navigator.clipboard.writeText(content);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!activeChart || !activeDataset) {
    return (
      <main className="flex-1 max-w-xl mx-auto py-24 px-6 text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-[var(--destructive)] mx-auto" />
        <h2 className="text-xl font-bold">Chart Not Found</h2>
        <Link href="/charts" className="text-[var(--primary)] hover:underline block text-xs">Back to Charts</Link>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-8 text-[var(--foreground)]">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1 text-left">
          <Link href="/charts" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Charts
          </Link>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            {activeChart.name}
            <Badge variant="secondary">{activeChart.category}</Badge>
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">{activeChart.description}</p>
        </div>

        {/* Telemetry info */}
        <Card className="px-4 py-2 border-[var(--primary)]/20 bg-[var(--primary)]/5 flex items-center gap-2 shrink-0">
          <Cpu className="h-4 w-4 text-[var(--primary)]" />
          <div className="text-left">
            <span className="text-[9px] uppercase font-bold text-[var(--muted-foreground)] block">Performance Score</span>
            <span className="text-sm font-black text-[var(--foreground)]">{activeChart.performanceScore}%</span>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Customizer & Visual Preview Frame (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Visual Sandbox rendering */}
          <div className="w-full border border-[var(--border)] border-dashed rounded-xl bg-[var(--background)]/30 p-8 flex flex-col justify-between min-h-[300px]">
            <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] border-b border-[var(--border)] pb-2 mb-6">
              <span>Preview: <strong className="text-[var(--foreground)]">{activeChart.name}</strong></span>
              <span className="uppercase text-[9px] font-mono">Theme Integrated</span>
            </div>

            {/* Custom columns rendering */}
            <div className={`relative flex items-end gap-3 h-48 pt-6 border-b border-[var(--border)] ${showGridLines ? "bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:16px_16px]" : ""}`}>
              {activeDataset.values.map((val, idx) => {
                const max = Math.max(...activeDataset.values);
                const pct = (val / max) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    {/* Column bar */}
                    <div 
                      className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/80 transition-all shadow-sm"
                      style={{ 
                        height: `${pct}%`,
                        borderRadius: `${columnRadius}px ${columnRadius}px 0 0`,
                        borderWidth: `${lineWidth}px`,
                        borderColor: "var(--border)"
                      }}
                    />
                    <span className="text-[9px] text-[var(--muted-foreground)] font-mono select-none">{activeDataset.labels[idx]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls customizers */}
          <Card className="p-4 bg-[var(--surface)] border-[var(--border)] grid grid-cols-2 gap-4 text-left">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[var(--foreground)]">Corner Radius</span>
                <span className="font-mono text-[var(--muted-foreground)]">{columnRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="16"
                value={columnRadius}
                onChange={(e) => setColumnRadius(Number(e.target.value))}
                className="w-full h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[var(--foreground)]">Border Line Width</span>
                <span className="font-mono text-[var(--muted-foreground)]">{lineWidth}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
                className="w-full h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
            </div>

            <div className="col-span-2 pt-2 border-t border-[var(--border)]/60 flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs select-none text-[var(--foreground)]">
                <input
                  type="checkbox"
                  checked={showGridLines}
                  onChange={(e) => setShowGridLines(e.target.checked)}
                  className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--ring)] h-3.5 w-3.5"
                />
                <span>Render background matrix grid lines</span>
              </label>
            </div>
          </Card>
        </div>

        {/* Right: Code Exporter tabs & details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 shrink-0">
            <div className="flex gap-4 text-xs font-semibold select-none">
              {(["react", "json"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCodeTab(tab)}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer capitalize ${
                    activeCodeTab === tab ? "border-[var(--primary)] text-[var(--primary)] font-bold" : "border-transparent text-[var(--muted-foreground)]"
                  }`}
                >
                  {tab === "react" ? "React Component" : "Registry Schema"}
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

          <pre className="text-[10px] font-mono bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)] text-[var(--foreground)] overflow-x-auto max-h-[300px] overflow-y-auto leading-relaxed text-left">
            {activeCodeTab === "react" && compileChartToJsx(activeChart, activeDataset)}
            {activeCodeTab === "json" && JSON.stringify(activeChart, null, 2)}
          </pre>

          {/* Guidelines */}
          <Card className="p-5 border-[var(--border)] bg-[var(--background)] space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--muted-foreground)] flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" /> Visualization Guidelines
            </h4>
            <ul className="text-xs space-y-2 text-[var(--foreground)] text-left">
              {activeChart.recommendedUsage.map((u, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </main>
  );
}
