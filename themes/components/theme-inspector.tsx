"use client";

import React, { useState, useMemo } from "react";
import { useTestingTheme } from "@/providers/theme-provider";
import { THEMES } from "@/registry/theme-registry";
import { validatePalette } from "../validators/theme-validator";
import { Card, Badge, Separator } from "@/components/ui";
import { CheckCircle, Cpu, ShieldAlert } from "lucide-react";

export function ThemeInspector() {
  const { preset, themeMode, fontScale, radiusScale, spacingScale } = useTestingTheme();
  const [activeTab, setActiveTab] = useState<"variables" | "contrast" | "metadata">("contrast");
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const activePalette = useMemo(() => {
    return THEMES.find((t) => t.id === preset) || THEMES[0];
  }, [preset]);

  const validationReport = useMemo(() => {
    return validatePalette(activePalette);
  }, [activePalette]);

  const activeModeTheme = themeMode === "dark" || (themeMode === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ? activePalette.dark
    : activePalette.light;

  if (!mounted) {
    return (
      <Card className="w-full border-[var(--border)] bg-[var(--card)] h-[350px] animate-pulse flex items-center justify-center text-[var(--muted-foreground)] text-xs">
        Loading Inspector...
      </Card>
    );
  }

  return (
    <Card className="w-full border-[var(--border)] bg-[var(--card)] backdrop-blur-md overflow-hidden text-[var(--foreground)]">
      {/* Header Info */}
      <div className="p-5 border-b border-[var(--border)] bg-[var(--background)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
              Theme Inspector
              {validationReport.overallPass ? (
                <Badge variant="success" className="h-4 px-1.5 py-0 text-[9px] flex items-center gap-1">
                  <CheckCircle className="h-2.5 w-2.5" /> AA PASS
                </Badge>
              ) : (
                <Badge variant="warning" className="h-4 px-1.5 py-0 text-[9px] flex items-center gap-1">
                  <ShieldAlert className="h-2.5 w-2.5" /> WCAG FAIL
                </Badge>
              )}
            </h4>
            <span className="text-[10px] text-[var(--muted-foreground)]">
              Inspector Engine · dev-only
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-[10px]">
          <Badge variant="secondary" className="font-mono">ID: {activePalette.id}</Badge>
          <Badge variant="secondary" className="font-mono">Category: {activePalette.category}</Badge>
          <Badge variant="secondary" className="font-mono">Mode: {themeMode}</Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--border)] bg-[var(--background)]/50 text-xs shrink-0 select-none overflow-x-auto whitespace-nowrap scrollbar-none">
        {([
          { id: "contrast", label: "Contrast Analytics" },
          { id: "variables", label: "Token Inspector" },
          { id: "metadata", label: "Metadata & Details" }
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 px-4 font-semibold border-b-2 text-center transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === tab.id
                ? "border-[var(--primary)] text-[var(--primary)] bg-[var(--surface)]"
                : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="p-5 max-h-[350px] overflow-y-auto">
        {activeTab === "contrast" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[11px] text-[var(--muted-foreground)]">
              <span>Checking contrast parameters for <strong>{themeMode} mode</strong>:</span>
              <span className="font-mono">Target WCAG AA: 4.5:1 (Normal) / 3.0:1 (Large/UI)</span>
            </div>

            <div className="space-y-2">
              {(themeMode === "dark" || (themeMode === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches)
                ? validationReport.darkMode.scores
                : validationReport.lightMode.scores
              ).map((score, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)]/30 text-xs hover:bg-[var(--background)]/50 transition-colors"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-[var(--foreground)]">{score.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-[var(--muted-foreground)]">Hex:</span>
                      <div className="h-3 w-3 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: score.element1 }} />
                      <span className="text-[9px] font-mono text-[var(--muted-foreground)]">{score.element1}</span>
                      <span className="text-[10px] text-[var(--muted-foreground)]">on</span>
                      <div className="h-3 w-3 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: score.element2 }} />
                      <span className="text-[9px] font-mono text-[var(--muted-foreground)]">{score.element2}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className={`font-mono font-bold text-xs ${score.passesAA ? "text-emerald-500" : "text-amber-500"}`}>
                      {score.ratio.toFixed(1)}:1
                    </span>
                    {score.passesAA ? (
                      <Badge variant="success" className="px-1.5 py-0 text-[8px] font-bold">PASS</Badge>
                    ) : (
                      <Badge variant="warning" className="px-1.5 py-0 text-[8px] font-bold">FAIL</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "variables" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] text-[var(--muted-foreground)] mb-1">
              <span>Token Variables</span>
              <span>Theme Engine Scales: <code className="text-[10px] bg-[var(--muted)] px-1 rounded">Text: {fontScale}</code> <code className="text-[10px] bg-[var(--muted)] px-1 rounded">Corner: {radiusScale}</code> <code className="text-[10px] bg-[var(--muted)] px-1 rounded">Gap: {spacingScale}</code></span>
            </div>

            <div className="rounded-lg border border-[var(--border)] overflow-hidden">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--muted)]/50 text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                    <th className="p-2 border-b border-[var(--border)]">CSS Variable</th>
                    <th className="p-2 border-b border-[var(--border)]">Color Preview</th>
                    <th className="p-2 border-b border-[var(--border)]">Hex Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(activeModeTheme)
                    .filter(([key]) => typeof activeModeTheme[key as keyof typeof activeModeTheme] === "string" && key !== "shadow" && key !== "scrollbar" && key !== "codeBlock")
                    .map(([key, val]) => (
                      <tr key={key} className="border-b border-[var(--border)]/40 hover:bg-[var(--background)]/20">
                        <td className="p-2 font-mono text-[10px] text-[var(--primary)]">--{key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}</td>
                        <td className="p-2">
                          <div
                            className="h-4 w-12 rounded border border-black/10"
                            style={{ backgroundColor: val as string }}
                          />
                        </td>
                        <td className="p-2 font-mono text-[10px] text-[var(--muted-foreground)]">{val as string}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "metadata" && (
          <div className="space-y-4 text-xs">
            <div className="space-y-2">
              <h5 className="font-bold text-xs uppercase tracking-wider text-[var(--muted-foreground)]">Inspiration & Design Roots</h5>
              <p className="text-[11px] text-[var(--foreground)] bg-[var(--muted)]/30 p-2.5 rounded-lg leading-relaxed">
                {activePalette.inspiration ? (
                  <span>Inspired by <strong>{activePalette.inspiration}</strong>.</span>
                ) : (
                  <span>General design system spec.</span>
                )}
                {" "}{activePalette.description}
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <h5 className="font-bold text-xs uppercase tracking-wider text-[var(--muted-foreground)]">Recommended Usages</h5>
              <div className="flex flex-wrap gap-1.5">
                {activePalette.recommendedUsage.map((usage, i) => (
                  <Badge key={i} variant="outline" className="px-2 py-0.5 text-[10px]">
                    {usage}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-[10px] text-[var(--muted-foreground)]">
              <div>
                <span className="block font-semibold">Author</span>
                <span className="block font-mono text-[var(--foreground)]">{activePalette.author}</span>
              </div>
              <div>
                <span className="block font-semibold">Registry Version</span>
                <span className="block font-mono text-[var(--foreground)]">{activePalette.version}</span>
              </div>
              <div>
                <span className="block font-semibold">Added At</span>
                <span className="block font-mono text-[var(--foreground)]">{activePalette.createdAt}</span>
              </div>
              <div>
                <span className="block font-semibold">Modified At</span>
                <span className="block font-mono text-[var(--foreground)]">{activePalette.updatedAt}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
