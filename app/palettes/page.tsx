"use client";

import React, { useState, useMemo } from "react";
import { THEMES } from "@/registry/theme-registry";
import { Palette, ColorTheme } from "@/registry/types";
import { validatePalette, compileThemeToCssRule } from "@/themes";
import { suggestAccessibleColor } from "@/features/palette-studio/utils/color-suggest";
import { 
  Sliders, CheckCircle, ArrowLeft, Copy, Check, 
  Trash2, Sparkles, AlertTriangle
} from "lucide-react";
import { Card, Badge, Button, Separator } from "@/components/ui";
import Link from "next/link";

type ViewportWidth = 320 | 360 | 390 | 414 | 768 | 1024 | 1280 | 1440 | 1920;

export default function PaletteStudioPage() {
  // Palette states
  const [presets, setPresets] = useState<Palette[]>(THEMES);
  const [selectedId, setSelectedId] = useState<string>("obsidian-violet");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Studio Workspace active state
  const [activePalette, setActivePalette] = useState<Palette>(THEMES[0]);
  const [editorMode, setEditorMode] = useState<"light" | "dark">("dark");
  const [viewportWidth, setViewportWidth] = useState<ViewportWidth>(1440);
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<"ui" | "code">("ui");

  // Copy success feedback states
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Edit history tracking
  const [history, setHistory] = useState<string[]>([]);

  // Synchronized active state initializer on preset switch
  const handleSelectPreset = (p: Palette) => {
    setSelectedId(p.id);
    setActivePalette(JSON.parse(JSON.stringify(p)));
    logHistory(`Loaded preset ${p.name}`);
  };

  // Log active palette updates to history
  const logHistory = (desc: string) => {
    const time = new Date().toLocaleTimeString();
    setHistory((prev) => [`[${time}] ${desc}`, ...prev.slice(0, 9)]);
  };

  // Categories list
  const categories = ["All", "professional", "minimal", "corporate", "purple", "blue", "green", "warm", "neutral", "monochrome", "creative"];

  const filteredPresets = useMemo(() => {
    return presets.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [presets, searchQuery, selectedCategory]);

  // Accessibility Audit Validation
  const auditReport = useMemo(() => {
    return validatePalette(activePalette);
  }, [activePalette]);

  // Adjust specific color property
  const handleColorChange = (mode: "light" | "dark", key: keyof ColorTheme, value: string) => {
    setActivePalette((prev) => {
      const updated = { ...prev };
      if (key === "tableColors") return prev; // tableColors is handled separately or casted
      if (key === "chartColors") return prev; // chartColors is handled separately
      
      updated[mode] = {
        ...updated[mode],
        [key]: value
      };
      return updated;
    });
    logHistory(`Updated ${mode} mode ${key} to ${value}`);
  };

  // Dynamic contrast suggestion application
  const applySuggestedColor = (mode: "light" | "dark", key: keyof ColorTheme, suggestedHex: string) => {
    handleColorChange(mode, key, suggestedHex);
    logHistory(`Auto-corrected ${mode} ${key} for contrast compliance.`);
  };

  // Duplicate / Clone palette
  const handleClonePalette = () => {
    const clone: Palette = {
      ...JSON.parse(JSON.stringify(activePalette)),
      id: `${activePalette.id}-clone`,
      slug: `${activePalette.slug}-clone`,
      name: `${activePalette.name} (Copy)`,
      author: "Local Studio User",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0]
    };
    setPresets((prev) => [...prev, clone]);
    setSelectedId(clone.id);
    setActivePalette(clone);
    logHistory(`Cloned palette to create ${clone.name}`);
  };

  // Delete local palette
  const handleDeletePalette = () => {
    if (presets.length <= 1) return;
    const nextList = presets.filter((p) => p.id !== activePalette.id);
    setPresets(nextList);
    setSelectedId(nextList[0].id);
    setActivePalette(JSON.parse(JSON.stringify(nextList[0])));
    logHistory(`Deleted palette ${activePalette.name}`);
  };

  // Copy formatting compilers
  const triggerCopyFeedback = (key: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getCssVariablesString = () => {
    const theme = editorMode === "light" ? activePalette.light : activePalette.dark;
    const rules = Object.entries(theme)
      .filter(([key]) => typeof theme[key as keyof typeof theme] === "string" && key !== "shadow" && key !== "scrollbar" && key !== "codeBlock")
      .map(([key, val]) => `  --${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}: ${val};`)
      .join("\n");
    return `:root {\n${rules}\n}`;
  };

  const getTailwindConfigString = () => {
    const theme = editorMode === "light" ? activePalette.light : activePalette.dark;
    const configs = Object.entries(theme)
      .filter(([key]) => typeof theme[key as keyof typeof theme] === "string" && key !== "shadow" && key !== "scrollbar" && key !== "codeBlock")
      .map(([key]) => `        ${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}: "var(--${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)})",`)
      .join("\n");
    return `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n${configs}\n      }\n    }\n  }\n};`;
  };

  // Dynamic CSS stylesheet generator output for playground frame
  const compiledStylesheetRule = useMemo(() => {
    // Generate classes for light and dark frames
    const lightRule = compileThemeToCssRule(activePalette.light, "#playground-showcase-frame");
    const darkRule = compileThemeToCssRule(activePalette.dark, "#playground-showcase-frame.dark");
    return `${lightRule}\n${darkRule}`;
  }, [activePalette]);

  return (
    <main className="flex-1 p-6 space-y-8 max-w-7xl mx-auto w-full text-[var(--foreground)]">
      
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4 shrink-0">
        <div className="space-y-1">
          <Link href="/" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Workspace
          </Link>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Sliders className="h-5 w-5 text-[var(--primary)]" />
            Palette Studio & Color Intelligence
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">
            Create, audit, and auto-correct professional palette files for high-contrast accessibility.
          </p>
        </div>

        {/* Viewport resizing simulator */}
        <div className="flex items-center gap-1.5 bg-[var(--surface)] p-1 rounded-xl border border-[var(--border)] self-start text-xs font-semibold select-none">
          <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] px-2">Preview Width</span>
          {([320, 390, 768, 1024, 1440, 1920] as ViewportWidth[]).map((w) => {
            const isActive = viewportWidth === w;
            return (
              <button
                key={w}
                onClick={() => setViewportWidth(w)}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {w}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Studio Workspace Layout */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Palette Browser & Metadata (3 cols) */}
        <div className="lg:col-span-3 space-y-6 md:sticky md:top-20">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] px-1">Palette Browser</span>
            <input
              type="text"
              placeholder="Search palette database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] focus:ring-1 focus:ring-[var(--ring)] focus:outline-none"
            />
            
            {/* Category tags */}
            <div className="flex flex-wrap gap-1">
              {categories.slice(0, 6).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer capitalize ${
                    selectedCategory === cat ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-1 max-h-[220px] overflow-y-auto border border-[var(--border)] rounded-xl p-2 bg-[var(--background)]">
              {filteredPresets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p)}
                  className={`w-full px-2.5 py-2 rounded-lg text-xs text-left transition-all flex items-center justify-between cursor-pointer ${
                    selectedId === p.id
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold"
                      : "hover:bg-[var(--surface)] text-[var(--foreground)]"
                  }`}
                >
                  <span className="truncate">{p.name}</span>
                  {p.isTopPick && <span className="text-[9px] scale-90 text-amber-500 font-bold uppercase">TOP</span>}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* History revisions logs */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] block px-1">Session Logs</span>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/30 p-3 min-h-[100px] max-h-[140px] overflow-y-auto space-y-1.5 text-[9px] font-mono text-[var(--muted-foreground)]">
              {history.map((log, i) => (
                <div key={i} className="truncate">{log}</div>
              ))}
              {history.length === 0 && (
                <div className="text-center py-6 text-[var(--muted-foreground)]">No edits recorded in session.</div>
              )}
            </div>
          </div>
        </div>

        {/* Center: Editor Inputs & WCAG Color Intelligence suggestions (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Color Tweaker</span>
            <div className="flex rounded-lg bg-[var(--surface)] p-0.5 border border-[var(--border)] text-[10px] font-bold">
              {(["light", "dark"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setEditorMode(m)}
                  className={`px-3 py-1 rounded transition-colors cursor-pointer capitalize ${
                    editorMode === m ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Color inputs list */}
          <div className="space-y-3.5 max-h-[420px] overflow-y-auto border border-[var(--border)] rounded-xl p-4 bg-[var(--background)]">
            {([
              { key: "primary", label: "Primary Accent" },
              { key: "primaryForeground", label: "Primary Text Contrast" },
              { key: "background", label: "Page Canvas Background" },
              { key: "foreground", label: "Page Text Foreground" },
              { key: "surface", label: "Raised Surfaces" },
              { key: "card", label: "Cards Panel Back" },
              { key: "border", label: "Dividers & Borders" },
              { key: "secondary", label: "Secondary Action" },
              { key: "secondaryForeground", label: "Secondary Text" }
            ] as { key: keyof ColorTheme; label: string }[]).map((item) => {
              const hexVal = activePalette[editorMode][item.key] as string;
              return (
                <div key={item.key} className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-[var(--foreground)] block">{item.label}</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={hexVal.startsWith("#") ? hexVal.slice(0, 7) : "#ffffff"}
                      onChange={(e) => handleColorChange(editorMode, item.key, e.target.value)}
                      className="h-7 w-7 rounded border border-[var(--border)] cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={hexVal}
                      onChange={(e) => handleColorChange(editorMode, item.key, e.target.value)}
                      className="flex-1 text-xs px-2 py-1 rounded border border-[var(--border)] bg-[var(--background)] font-mono text-[var(--foreground)]"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="primary" onClick={handleClonePalette} className="flex-1 text-xs">Duplicate</Button>
            {presets.length > 1 && (
              <Button variant="danger" onClick={handleDeletePalette} className="flex-1 text-xs">
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </Button>
            )}
          </div>

          <Separator />

          {/* WCAG Color Intelligence & Suggested Fixes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Color Intelligence Suggestions
            </h4>
            
            <div className="space-y-2">
              {(editorMode === "light" ? auditReport.lightMode.scores : auditReport.darkMode.scores)
                .filter((score) => !score.passesAA)
                .map((score, idx) => {
                  // Resolve key of ColorTheme that corresponds to the score element
                  let keyToFix: keyof ColorTheme = "foreground";
                  if (score.name.includes("Primary")) keyToFix = "primaryForeground";
                  if (score.name.includes("Secondary")) keyToFix = "secondaryForeground";

                  const suggestedHex = suggestAccessibleColor(score.element1, score.element2, 4.5);
                  
                  return (
                    <div key={idx} className="p-3 rounded-xl border border-[var(--destructive)]/20 bg-[var(--destructive)]/5 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[var(--destructive)] flex items-center gap-1">
                          <AlertTriangle className="h-3.5 w-3.5 shrink-0" /> Low Contrast Warning
                        </span>
                        <Badge variant="error" className="text-[8px] font-mono">{score.ratio.toFixed(1)}:1</Badge>
                      </div>
                      <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">
                        {score.name} fails WCAG AA guidelines. Text color <code className="bg-[var(--background)] px-1 rounded">{score.element1}</code> is hard to read on <code className="bg-[var(--background)] px-1 rounded">{score.element2}</code>.
                      </p>
                      <div className="flex items-center justify-between pt-1 border-t border-[var(--destructive)]/10 text-[10px]">
                        <span>Suggested replacement: <strong className="font-mono text-[var(--foreground)]">{suggestedHex}</strong></span>
                        <button
                          onClick={() => applySuggestedColor(editorMode, keyToFix, suggestedHex)}
                          className="bg-[var(--primary)] text-[var(--primary-foreground)] px-2 py-0.5 rounded font-bold cursor-pointer hover:scale-102 transition-transform"
                        >
                          Auto-Fix
                        </button>
                      </div>
                    </div>
                  );
                })}
              {(editorMode === "light" ? auditReport.lightMode.scores : auditReport.darkMode.scores).filter((s) => !s.passesAA).length === 0 && (
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 flex items-center gap-2 text-xs">
                  <CheckCircle className="h-4 w-4 shrink-0" /> All color pairings meet WCAG AA requirements!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Showcase Preview Viewport & Export options (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 shrink-0">
            <div className="flex gap-4 text-xs font-semibold select-none">
              <button
                onClick={() => setActiveShowcaseTab("ui")}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeShowcaseTab === "ui" ? "border-[var(--primary)] text-[var(--primary)] font-bold" : "border-transparent text-[var(--muted-foreground)]"
                }`}
              >
                Component Preview
              </button>
              <button
                onClick={() => setActiveShowcaseTab("code")}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeShowcaseTab === "code" ? "border-[var(--primary)] text-[var(--primary)] font-bold" : "border-transparent text-[var(--muted-foreground)]"
                }`}
              >
                Code Exports
              </button>
            </div>
            <span className="text-[10px] font-mono text-[var(--muted-foreground)] uppercase">Studio Showroom</span>
          </div>

          {/* 1. Component Showroom tab */}
          {activeShowcaseTab === "ui" && (
            <div className="w-full flex justify-center bg-[var(--background)]/30 rounded-xl border border-[var(--border)] border-dashed p-4 min-h-[450px]">
              {/* Compiled stylesheet dynamically injected to override frame styling variables */}
              <style dangerouslySetInnerHTML={{ __html: compiledStylesheetRule }} />

              <div 
                id="playground-showcase-frame"
                className={`transition-all duration-300 ease-in-out w-full space-y-6 bg-[var(--background)] p-6 rounded-xl border border-[var(--border)] shadow-sm ${editorMode === "dark" ? "dark" : ""}`}
                style={{ maxWidth: `${viewportWidth}px` }}
              >
                <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] border-b border-[var(--border)] pb-2">
                  <span>Testing: <strong className="text-[var(--foreground)]">{activePalette.name}</strong></span>
                  <span className="uppercase text-[9px] font-mono">{editorMode} mode</span>
                </div>

                {/* Buttons showcase */}
                <div className="space-y-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] block">Buttons</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <button className="bg-[var(--primary)] text-[var(--primary-foreground)] text-xs px-3 py-1.5 rounded-lg font-bold border border-transparent shadow-sm">
                      Primary CTA
                    </button>
                    <button className="bg-[var(--secondary)] text-[var(--secondary-foreground)] text-xs px-3 py-1.5 rounded-lg font-semibold border border-[var(--border)]">
                      Secondary Button
                    </button>
                    <button className="bg-transparent text-[var(--foreground)] text-xs px-3 py-1.5 rounded-lg border border-[var(--border)] font-semibold">
                      Outline
                    </button>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] block">Forms Input</span>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-[var(--foreground)] block">Live Email Field</label>
                    <input
                      type="text"
                      value="developer@design-web.my.id"
                      readOnly
                      className="w-full text-xs px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Card pricing panels */}
                <div className="space-y-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] block">Interactive Cards</span>
                  <Card className="p-4 border-[var(--primary)]/30 bg-[var(--primary)]/[0.02] space-y-3 text-left">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-[var(--primary)]">Interactive Tier</span>
                      <Badge variant="success" className="text-[9px] font-mono">Audited</Badge>
                    </div>
                    <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">
                      This block utilizes live CSS properties that render the active editor colors dynamically.
                    </p>
                  </Card>
                </div>

                {/* Warning box */}
                <div className="p-3.5 rounded-lg border border-[var(--destructive)]/20 bg-[var(--destructive)]/5 text-[var(--destructive)] flex items-start gap-2.5 text-[11px] leading-relaxed">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs">Alert Box</h5>
                    <span>This block maps to the active success, warning, and destructive parameters.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Code Exports tab */}
          {activeShowcaseTab === "code" && (
            <div className="space-y-5">
              <span className="text-xs text-[var(--muted-foreground)]">Generate and copy integration code blueprints:</span>

              {/* CSS Variables */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold font-mono text-[var(--muted-foreground)]">1. CSS variables stylesheet</span>
                  <button
                    onClick={() => triggerCopyFeedback("css", getCssVariablesString())}
                    className="text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    {copiedKey === "css" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedKey === "css" ? "Copied!" : "Copy code"}
                  </button>
                </div>
                <pre className="text-[10px] font-mono bg-[var(--surface)] p-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] max-h-[140px] overflow-y-auto">
                  {getCssVariablesString()}
                </pre>
              </div>

              {/* Tailwind colors config */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold font-mono text-[var(--muted-foreground)]">2. Tailwind configuration extends</span>
                  <button
                    onClick={() => triggerCopyFeedback("tw", getTailwindConfigString())}
                    className="text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    {copiedKey === "tw" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedKey === "tw" ? "Copied!" : "Copy code"}
                  </button>
                </div>
                <pre className="text-[10px] font-mono bg-[var(--surface)] p-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] max-h-[140px] overflow-y-auto">
                  {getTailwindConfigString()}
                </pre>
              </div>

              {/* JSON export blueprint */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold font-mono text-[var(--muted-foreground)]">3. Full palette JSON schema model</span>
                  <button
                    onClick={() => triggerCopyFeedback("json", JSON.stringify(activePalette, null, 2))}
                    className="text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    {copiedKey === "json" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedKey === "json" ? "Copied!" : "Copy code"}
                  </button>
                </div>
                <pre className="text-[10px] font-mono bg-[var(--surface)] p-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] max-h-[140px] overflow-y-auto">
                  {JSON.stringify(activePalette, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
