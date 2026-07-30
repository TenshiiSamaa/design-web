"use client";

import React, { useState, useMemo } from "react";
import { 
  COMPONENT_AUDITS, compileToMarkdown, compileToCsv
} from "@/features/accessibility/registry";
import { 
  ShieldAlert, CheckCircle, ArrowLeft, Download, AlertTriangle, 
  FileSpreadsheet, ListCollapse
} from "lucide-react";
import { Card, Badge, Button, Separator } from "@/components/ui";
import Link from "next/link";

export default function AccessibilityLabPage() {
  const [selectedReportId, setSelectedReportId] = useState<string>("button");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "fail" | "warning" | "pass">("all");

  const [simulatedViewportWidth, setSimulatedViewportWidth] = useState<number>(1024);

  // Copy/Download feedback
  const [reportDownloadFormat, setReportDownloadFormat] = useState<string | null>(null);

  const activeReport = useMemo(() => {
    return COMPONENT_AUDITS.find((r) => r.id === selectedReportId) || COMPONENT_AUDITS[0];
  }, [selectedReportId]);

  const filteredReports = useMemo(() => {
    return COMPONENT_AUDITS.filter((r) => 
      r.targetName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredChecks = useMemo(() => {
    return activeReport.checks.filter((c) => {
      if (selectedFilter === "all") return true;
      return c.status === selectedFilter;
    });
  }, [activeReport, selectedFilter]);

  // Export handlers
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeReport, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `accessibility_report_${activeReport.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setReportDownloadFormat("json");
    setTimeout(() => setReportDownloadFormat(null), 2000);
  };

  const handleExportMarkdown = () => {
    const mdContent = compileToMarkdown(activeReport);
    const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(mdContent);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `accessibility_report_${activeReport.id}.md`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setReportDownloadFormat("md");
    setTimeout(() => setReportDownloadFormat(null), 2000);
  };

  const handleExportCSV = () => {
    const csvContent = compileToCsv(activeReport);
    const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `accessibility_report_${activeReport.id}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setReportDownloadFormat("csv");
    setTimeout(() => setReportDownloadFormat(null), 2000);
  };

  return (
    <main className="flex-1 p-6 space-y-8 max-w-7xl mx-auto w-full text-[var(--foreground)]">
      
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4 shrink-0">
        <div className="space-y-1">
          <Link href="/" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Playground
          </Link>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-[var(--primary)]" />
            Accessibility & Quality Laboratory
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">
            Auto-scan contrast ratios, tab indices focus flow, minimum touch boundaries, and compile developer reports.
          </p>
        </div>

        {/* Export options */}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={handleExportJSON} className="text-xs flex items-center gap-1.5 cursor-pointer">
            <Download className="h-3.5 w-3.5" /> Export JSON
          </Button>
          <Button variant="outline" onClick={handleExportMarkdown} className="text-xs flex items-center gap-1.5 cursor-pointer">
            <Download className="h-3.5 w-3.5" /> Export MD
          </Button>
          <Button variant="outline" onClick={handleExportCSV} className="text-xs flex items-center gap-1.5 cursor-pointer">
            <FileSpreadsheet className="h-3.5 w-3.5" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Export feedback toast notifications */}
      {reportDownloadFormat && (
        <div className="fixed bottom-4 right-4 z-50 bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold px-4 py-2 rounded-lg shadow-lg">
          Successfully generated and downloaded accessibility_{activeReport.id}.{reportDownloadFormat}!
        </div>
      )}

      {/* 2. Workspace Layout Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Component targets browser (3 cols) */}
        <div className="lg:col-span-3 space-y-6 md:sticky md:top-20">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] block px-1">Inspection Targets</span>
            <input
              type="text"
              placeholder="Filter audited parts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] focus:ring-1 focus:ring-[var(--ring)] focus:outline-none"
            />
            
            <div className="space-y-1 max-h-[220px] overflow-y-auto border border-[var(--border)] rounded-xl p-2 bg-[var(--background)]">
              {filteredReports.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedReportId(r.id)}
                  className={`w-full px-2.5 py-2 rounded-lg text-xs text-left transition-all flex items-center justify-between cursor-pointer ${
                    selectedReportId === r.id
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold"
                      : "hover:bg-[var(--surface)] text-[var(--foreground)]"
                  }`}
                >
                  <span>{r.targetName}</span>
                  <Badge variant={r.scores.overall >= 90 ? "success" : "warning"} className="text-[9px] font-mono scale-90">
                    {r.scores.overall}%
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Quick instructions info */}
          <Card className="p-4 bg-[var(--surface)]/20 text-xs space-y-2 border-[var(--border)]">
            <h5 className="font-bold flex items-center gap-1.5 text-[var(--foreground)]">
              <ListCollapse className="h-3.5 w-3.5 text-[var(--primary)]" /> Testing Parameters
            </h5>
            <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">
              Audits are aligned with WCAG 2.2 Level AA requirements. Mobile touch targets must keep 8px spacing margins between interactive items.
            </p>
          </Card>
        </div>

        {/* Center: Quality Scores & detailed checklists (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] block px-1">Audited Quality Scores</span>
            
            <div className="grid grid-cols-2 gap-3.5 bg-[var(--surface)]/30 border border-[var(--border)] rounded-xl p-4">
              {[
                { name: "Contrast Compliance", val: activeReport.scores.contrast },
                { name: "Keyboard Focus Order", val: activeReport.scores.keyboard },
                { name: "ARIA Screen Reader", val: activeReport.scores.screenReader },
                { name: "Touch Pointer target", val: activeReport.scores.touchTarget },
                { name: "Responsive Scaling", val: activeReport.scores.responsive },
                { name: "CLS Layout Shift", val: activeReport.scores.performance }
              ].map((s, idx) => (
                <div key={idx} className="space-y-1 text-left">
                  <span className="text-[10px] text-[var(--muted-foreground)] block font-semibold">{s.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full bg-[var(--border)] rounded overflow-hidden">
                      <div className="h-full bg-[var(--primary)]" style={{ width: `${s.val}%` }} />
                    </div>
                    <span className="font-mono text-xs font-bold text-[var(--foreground)]">{s.val}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Audit checks filters */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Verification Checklists</span>
              <div className="flex gap-1 rounded bg-[var(--surface)] p-0.5 border border-[var(--border)] text-[9px] font-bold select-none">
                {(["all", "pass", "warning", "fail"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFilter(f)}
                    className={`px-2 py-0.5 rounded cursor-pointer capitalize ${
                      selectedFilter === f ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Checks list */}
            <div className="space-y-3.5 max-h-[350px] overflow-y-auto p-1">
              {filteredChecks.map((c) => (
                <div 
                  key={c.id} 
                  className={`p-3.5 rounded-xl border flex gap-3 text-left items-start ${
                    c.status === "pass" 
                      ? "border-emerald-500/10 bg-emerald-500/[0.02]" 
                      : c.status === "warning"
                      ? "border-amber-500/10 bg-amber-500/[0.02]"
                      : "border-rose-500/10 bg-rose-500/[0.02]"
                  }`}
                >
                  {c.status === "pass" && <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />}
                  {c.status === "warning" && <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />}
                  {c.status === "fail" && <ShieldAlert className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />}

                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between items-center text-xs">
                      <strong className="text-[var(--foreground)] font-bold">{c.name}</strong>
                      <Badge variant={c.status === "pass" ? "success" : c.status === "warning" ? "secondary" : "error"} className="text-[8px] px-1 py-0 select-none">
                        {c.status}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">{c.description}</p>
                    {c.suggestion && (
                      <div className="text-[10px] text-[var(--primary)] bg-[var(--primary)]/5 p-2 rounded-lg border border-[var(--primary)]/10 font-medium">
                        <strong>Fix Recommendation:</strong> {c.suggestion}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {filteredChecks.length === 0 && (
                <div className="text-center py-12 text-xs text-[var(--muted-foreground)]">No checks matching filters found.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Simulated Resizing frame (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Mobile simulator viewport</span>
            <div className="flex gap-1.5 bg-[var(--surface)] p-1 rounded-lg border border-[var(--border)] text-[9px] font-bold select-none">
              {([360, 414, 768, 1024] as const).map((w) => (
                <button
                  key={w}
                  onClick={() => setSimulatedViewportWidth(w)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                    simulatedViewportWidth === w ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "text-[var(--muted-foreground)]"
                  }`}
                >
                  {w}px
                </button>
              ))}
            </div>
          </div>

          <div className="w-full flex justify-center bg-[var(--background)]/30 rounded-xl border border-[var(--border)] border-dashed p-4 min-h-[300px]">
            <div 
              className="bg-[var(--background)] border border-[var(--border)] rounded-xl shadow p-6 w-full space-y-4 text-left transition-all duration-300 overflow-hidden"
              style={{ maxWidth: `${simulatedViewportWidth}px` }}
            >
              <div className="flex items-center justify-between text-[10px] text-[var(--muted-foreground)] border-b border-[var(--border)] pb-2">
                <span>Viewport Width: <strong>{simulatedViewportWidth}px</strong></span>
                <span className="uppercase text-[9px] font-mono">Live Audit Frame</span>
              </div>

              {/* Simulated test contents */}
              <div className="space-y-4">
                <h5 className="font-bold text-xs text-[var(--foreground)]">Interactive primitive testing content</h5>
                <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">
                  This mock grid adapts layout density automatically. Reduce sizing limits below 414px to check for text overflows.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <button className="bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-bold px-3 py-1.5 rounded-lg">
                    Primary action
                  </button>
                  <button className="bg-transparent border border-[var(--border)] text-[var(--foreground)] text-[10px] font-semibold px-3 py-1.5 rounded-lg">
                    Secondary
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
