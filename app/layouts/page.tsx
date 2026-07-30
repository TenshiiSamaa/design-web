"use client";

import React, { useState, useMemo } from "react";
import { 
  STARTER_TEMPLATES, BLOCK_CATALOG, compileToJsx
} from "@/features/layout-builder/registry";
import { LayoutBlock, BlockStyling } from "@/features/layout-builder/types";
import { 
  LayoutGrid, ArrowLeft, ArrowUp, ArrowDown, Eye, EyeOff, Trash2, 
  Plus, Copy, Check
} from "lucide-react";
import { Card, Badge, Separator } from "@/components/ui";
import Link from "next/link";

type ViewportWidth = 360 | 414 | 768 | 1024 | 1440 | 1920;

let blockIdCounter = 0;
const generateBlockId = (type: string) => {
  blockIdCounter += 1;
  return `${type}-${blockIdCounter}`;
};

export default function LayoutBuilderPage() {
  const [activeBlocks, setActiveBlocks] = useState<LayoutBlock[]>(STARTER_TEMPLATES[0].blocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(STARTER_TEMPLATES[0].blocks[0]?.id || null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(STARTER_TEMPLATES[0].id);

  // Playground state
  const [viewportWidth, setViewportWidth] = useState<ViewportWidth>(1024);
  const [activeTab, setActiveTab] = useState<"visual" | "code">("visual");

  // Feedback status
  const [copiedCode, setCopiedCode] = useState(false);

  const selectedBlock = useMemo(() => {
    return activeBlocks.find((b) => b.id === selectedBlockId) || null;
  }, [activeBlocks, selectedBlockId]);

  // Load starter templates
  const handleLoadTemplate = (id: string) => {
    setSelectedTemplateId(id);
    const template = STARTER_TEMPLATES.find((t) => t.id === id);
    if (template) {
      const clonedBlocks = JSON.parse(JSON.stringify(template.blocks));
      setActiveBlocks(clonedBlocks);
      setSelectedBlockId(clonedBlocks[0]?.id || null);
    }
  };

  // Append new catalog block to layout list
  const handleAddBlock = (catalogBlock: LayoutBlock) => {
    const newBlock: LayoutBlock = {
      ...JSON.parse(JSON.stringify(catalogBlock)),
      id: generateBlockId(catalogBlock.type)
    };
    setActiveBlocks((prev) => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  // Duplicate block
  const handleDuplicateBlock = (id: string) => {
    const blockIndex = activeBlocks.findIndex((b) => b.id === id);
    if (blockIndex === -1) return;
    const original = activeBlocks[blockIndex];
    const copy: LayoutBlock = {
      ...JSON.parse(JSON.stringify(original)),
      id: generateBlockId(original.type)
    };
    const updated = [...activeBlocks];
    updated.splice(blockIndex + 1, 0, copy);
    setActiveBlocks(updated);
    setSelectedBlockId(copy.id);
  };

  // Delete block
  const handleDeleteBlock = (id: string) => {
    setActiveBlocks((prev) => prev.filter((b) => b.id !== id));
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
  };

  // Reorder layouts up / down
  const handleMoveBlock = (index: number, dir: "up" | "down") => {
    const targetIdx = dir === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= activeBlocks.length) return;
    
    const updated = [...activeBlocks];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setActiveBlocks(updated);
  };

  // Toggle visible override
  const handleToggleVisibility = (id: string) => {
    setActiveBlocks((prev) => 
      prev.map((b) => (b.id === id ? { ...b, visible: !b.visible } : b))
    );
  };

  // Handle updates on block values
  const handleUpdateBlockMeta = (key: "title" | "subtitle", value: string) => {
    if (!selectedBlockId) return;
    setActiveBlocks((prev) => 
      prev.map((b) => (b.id === selectedBlockId ? { ...b, [key]: value } : b))
    );
  };

  const handleUpdateBlockStyling = (key: keyof BlockStyling, value: string | boolean) => {
    if (!selectedBlockId) return;
    setActiveBlocks((prev) => 
      prev.map((b) => {
        if (b.id === selectedBlockId) {
          return {
            ...b,
            styling: {
              ...b.styling,
              [key]: value
            }
          };
        }
        return b;
      })
    );
  };

  // Export copy
  const handleCopyCode = () => {
    const jsx = compileToJsx(activeBlocks);
    navigator.clipboard.writeText(jsx);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
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
            <LayoutGrid className="h-5 w-5 text-[var(--primary)]" />
            Responsive Layout Builder & Page Composer
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">
            Assemble interface sections, inspect viewport density layout grids, and compile export TSX component codes.
          </p>
        </div>

        {/* Viewport resizing simulator */}
        <div className="flex items-center gap-1.5 bg-[var(--surface)] p-1 rounded-xl border border-[var(--border)] self-start text-xs font-semibold select-none">
          <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] px-2">Viewport Width</span>
          {([360, 768, 1024, 1440, 1920] as ViewportWidth[]).map((w) => (
            <button
              key={w}
              onClick={() => setViewportWidth(w)}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                viewportWidth === w
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Workspace Grid Layout */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Outline block stack & Catalog Append selectors (3 cols) */}
        <div className="lg:col-span-3 space-y-6 md:sticky md:top-20">
          
          {/* Template presets picker */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-[var(--muted-foreground)] px-1 block">SaaS starter presets</label>
            <select
              value={selectedTemplateId}
              onChange={(e) => handleLoadTemplate(e.target.value)}
              className="w-full text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--foreground)]"
            >
              {STARTER_TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <Separator />

          {/* Active section stack outlines */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] block px-1">Layout Outlines</span>
            <div className="space-y-1 bg-[var(--surface)]/30 border border-[var(--border)] rounded-xl p-2.5 max-h-[220px] overflow-y-auto">
              {activeBlocks.map((b, idx) => (
                <div 
                  key={b.id}
                  onClick={() => setSelectedBlockId(b.id)}
                  className={`px-2 py-2 rounded-lg text-xs flex items-center justify-between cursor-pointer border transition-all ${
                    selectedBlockId === b.id
                      ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--primary)] font-semibold"
                      : "border-transparent hover:bg-[var(--surface)] text-[var(--foreground)]"
                  }`}
                >
                  <span className="truncate">{b.name}</span>
                  <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => handleMoveBlock(idx, "up")} disabled={idx === 0} className="hover:text-[var(--foreground)] disabled:opacity-30">
                      <ArrowUp className="h-3 w-3" />
                    </button>
                    <button onClick={() => handleMoveBlock(idx, "down")} disabled={idx === activeBlocks.length - 1} className="hover:text-[var(--foreground)] disabled:opacity-30">
                      <ArrowDown className="h-3 w-3" />
                    </button>
                    <button onClick={() => handleToggleVisibility(b.id)} className="hover:text-[var(--foreground)]">
                      {b.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    </button>
                    <button onClick={() => handleDeleteBlock(b.id)} className="text-[var(--destructive)] hover:text-red-600">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
              {activeBlocks.length === 0 && (
                <div className="text-center py-6 text-[var(--muted-foreground)] text-xs">No blocks added. Compose your page.</div>
              )}
            </div>
          </div>

          {/* Add block catalog */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] block px-1">Block Catalog</span>
            <div className="grid grid-cols-2 gap-1.5">
              {BLOCK_CATALOG.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleAddBlock(cat)}
                  className="px-2 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[10px] font-bold text-center hover:bg-[var(--surface)] transition-all flex items-center justify-center gap-1 cursor-pointer select-none"
                >
                  <Plus className="h-3 w-3 text-[var(--primary)]" /> {cat.type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Live composition renderer & Viewport container (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 shrink-0">
            <div className="flex gap-4 text-xs font-semibold select-none">
              <button
                onClick={() => setActiveTab("visual")}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === "visual" ? "border-primary text-primary font-bold" : "border-transparent text-[var(--muted-foreground)]"
                }`}
              >
                Visual Composer
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === "code" ? "border-primary text-primary font-bold" : "border-transparent text-[var(--muted-foreground)]"
                }`}
              >
                Export JSX Code
              </button>
            </div>
            <span className="text-[10px] font-mono text-[var(--muted-foreground)] uppercase">Preview Grid</span>
          </div>

          {/* 1. Visual composition frame */}
          {activeTab === "visual" && (
            <div className="w-full flex justify-center bg-[var(--background)]/30 rounded-xl border border-[var(--border)] border-dashed p-4 min-h-[480px]">
              <div 
                className="w-full space-y-6 bg-[var(--background)] p-6 rounded-xl border border-[var(--border)] shadow-sm text-left transition-all duration-300"
                style={{ maxWidth: `${viewportWidth}px` }}
              >
                {activeBlocks
                  .filter((b) => b.visible)
                  .map((b) => {
                    // Map styling parameters
                    const paddingClass = b.styling.paddingY === "lg" ? "py-16" : b.styling.paddingY === "md" ? "py-8" : "py-3";
                    const borderClass = b.styling.border ? "border border-[var(--border)]" : "";
                    const shadowClass = b.styling.shadow === "lg" ? "shadow-lg" : b.styling.shadow === "md" ? "shadow-md" : b.styling.shadow === "sm" ? "shadow-sm" : "";
                    const radiusClass = b.styling.radius === "lg" ? "rounded-2xl" : b.styling.radius === "md" ? "rounded-xl" : b.styling.radius === "sm" ? "rounded-lg" : "";

                    const isSelected = selectedBlockId === b.id;

                    return (
                      <div
                        key={b.id}
                        onClick={() => setSelectedBlockId(b.id)}
                        className={`transition-all duration-200 cursor-pointer ${paddingClass} ${borderClass} ${shadowClass} ${radiusClass} relative px-6 ${
                          isSelected ? "ring-2 ring-[var(--primary)] bg-[var(--accent)]/5" : "bg-[var(--surface)]/40 hover:bg-[var(--surface)]/60"
                        }`}
                      >
                        <div className="space-y-2">
                          <Badge variant="secondary" className="text-[9px] uppercase tracking-wide font-mono scale-90">{b.type}</Badge>
                          <h3 className="text-lg font-black text-[var(--foreground)] tracking-tight">{b.title}</h3>
                          {b.subtitle && <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{b.subtitle}</p>}
                        </div>
                      </div>
                    );
                  })}
                {activeBlocks.filter((b) => b.visible).length === 0 && (
                  <div className="text-center py-24 text-xs text-[var(--muted-foreground)]">Empty Canvas. Add layout sections.</div>
                )}
              </div>
            </div>
          )}

          {/* 2. Code export view */}
          {activeTab === "code" && (
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] font-mono">React Component snippet</span>
                <button
                  onClick={handleCopyCode}
                  className="text-[var(--primary)] hover:underline flex items-center gap-1.5 cursor-pointer font-bold"
                >
                  {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedCode ? "Copied!" : "Copy JSX Component"}
                </button>
              </div>
              <pre className="text-[10px] font-mono bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)] text-[var(--foreground)] overflow-x-auto max-h-[400px] overflow-y-auto leading-relaxed">
                {compileToJsx(activeBlocks)}
              </pre>
            </div>
          )}
        </div>

        {/* Right: Block Inspector panel (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border-b border-[var(--border)] pb-2 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] block">Block Inspector</span>
          </div>

          {selectedBlock ? (
            <Card className="p-4 bg-[var(--surface)] border-[var(--border)] space-y-4 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">Styling Parameters</span>

              {/* Text content tweak */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-[var(--muted-foreground)] font-semibold block">Section Header Title</label>
                <input
                  type="text"
                  value={selectedBlock.title}
                  onChange={(e) => handleUpdateBlockMeta("title", e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-1 focus:ring-[var(--ring)] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-[var(--muted-foreground)] font-semibold block">Section Subtitle Copy</label>
                <textarea
                  value={selectedBlock.subtitle || ""}
                  onChange={(e) => handleUpdateBlockMeta("subtitle", e.target.value)}
                  rows={2}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:ring-1 focus:ring-[var(--ring)] focus:outline-none resize-none"
                />
              </div>

              <Separator />

              {/* Padding slider */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-[var(--muted-foreground)] font-semibold block">Vertical Padding</label>
                <div className="grid grid-cols-4 gap-1 bg-[var(--background)] p-1 rounded-lg border border-[var(--border)]">
                  {(["none", "sm", "md", "lg"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => handleUpdateBlockStyling("paddingY", p)}
                      className={`py-1 rounded text-[9px] font-semibold transition-all cursor-pointer capitalize ${
                        selectedBlock.styling.paddingY === p
                          ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                          : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Border radius */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-[var(--muted-foreground)] font-semibold block">Corner Radius</label>
                <div className="grid grid-cols-5 gap-1 bg-[var(--background)] p-1 rounded-lg border border-[var(--border)]">
                  {(["none", "sm", "md", "lg", "full"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleUpdateBlockStyling("radius", r)}
                      className={`py-1 rounded text-[9px] font-semibold transition-all cursor-pointer capitalize ${
                        selectedBlock.styling.radius === r
                          ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                          : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shadow multipliers */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-[var(--muted-foreground)] font-semibold block">Shadow Level</label>
                <div className="grid grid-cols-4 gap-1 bg-[var(--background)] p-1 rounded-lg border border-[var(--border)]">
                  {(["none", "sm", "md", "lg"] as const).map((sh) => (
                    <button
                      key={sh}
                      onClick={() => handleUpdateBlockStyling("shadow", sh)}
                      className={`py-1 rounded text-[9px] font-semibold transition-all cursor-pointer capitalize ${
                        selectedBlock.styling.shadow === sh
                          ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                          : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {sh}
                    </button>
                  ))}
                </div>
              </div>

              {/* Border toggle */}
              <div className="space-y-2 pt-2 border-t border-[var(--border)]">
                <label className="flex items-center gap-2 cursor-pointer text-[11px] select-none text-[var(--foreground)]">
                  <input
                    type="checkbox"
                    checked={selectedBlock.styling.border}
                    onChange={(e) => handleUpdateBlockStyling("border", e.target.checked)}
                    className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--ring)] h-3.5 w-3.5"
                  />
                  <span>Render Card Outline Border</span>
                </label>
              </div>

              <Separator />

              {/* Duplicate Action */}
              <button
                onClick={() => handleDuplicateBlock(selectedBlock.id)}
                className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] py-1.5 rounded-lg text-xs font-bold shadow hover:scale-102 transition-transform cursor-pointer block text-center"
              >
                Duplicate active section block
              </button>
            </Card>
          ) : (
            <div className="text-center py-12 text-xs text-[var(--muted-foreground)]">Select a composition section in the preview to audit parameters.</div>
          )}
        </div>
      </div>
    </main>
  );
}
