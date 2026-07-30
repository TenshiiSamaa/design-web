"use client";

import React from "react";
import { ThemeInspector } from "@/themes";
import { useTestingTheme } from "@/providers/theme-provider";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DesignInspectorPage() {
  useTestingTheme();

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-8 text-[var(--foreground)] text-left">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1">
          <Link href="/" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Design Inspector & Visual Debugger</h1>
          <p className="text-xs text-[var(--muted-foreground)]">
            Analyze computed luminance values, semantic variable values, and WCAG accessibility contracts.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Telemetry view (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <ThemeInspector />
        </div>

        {/* Dynamic tips (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]/30 space-y-3">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--primary)] font-mono block">Debugging Advice</span>
          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
            Ensure color ratios exceed **4.5:1** on normal text blocks, and **3:1** on decorative inputs. When reduced motion is active, transitions are scaled to zero automatically.
          </p>
        </div>
      </div>
    </main>
  );
}
