"use client";

import React, { useState, useMemo } from "react";
import { MARKETPLACE_ASSETS } from "@/features/assets/registry";
import { Search, ArrowLeft, Image as ImageIcon, Copy, Check } from "lucide-react";
import { Card, Badge, Separator } from "@/components/ui";
import Link from "next/link";

interface AssetsPageProps {
  defaultCategory?: "icon" | "illustration" | "gradient" | "pattern" | "all";
}

export default function AssetsPage({ defaultCategory = "all" }: AssetsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  
  // Custom Gradient sandbox state
  const [gradAngle, setGradAngle] = useState(135);
  const [gradColor1, setGradColor1] = useState("#4f46e5");
  const [gradColor2, setGradColor2] = useState("#06b6d4");

  // Copy success feedback states
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const filteredAssets = useMemo(() => {
    return MARKETPLACE_ASSETS.filter((a) => {
      const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            a.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || a.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyCode = (slug: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  // Compile active gradient CSS
  const compiledGradientCss = `linear-gradient(${gradAngle}deg, ${gradColor1} 0%, ${gradColor2} 100%)`;

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-8 text-[var(--foreground)]">
      
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1 text-left">
          <Link href="/" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Workspace
          </Link>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-[var(--primary)]" />
            Asset Studio & Media Library
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">
            Explore scalable vector graphics, mesh gradients, background textures, and copy theme configurations.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search assets registry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] focus:ring-1 focus:ring-[var(--ring)] focus:outline-none"
          />
        </div>
      </div>

      {/* 2. Category Navigation buttons */}
      <div className="flex flex-wrap gap-2 text-xs font-semibold select-none">
        {[
          { key: "all", label: "All Assets" },
          { key: "icon", label: "Icons" },
          { key: "illustration", label: "Illustrations" },
          { key: "gradient", label: "Gradients" },
          { key: "pattern", label: "Patterns" }
        ].map((c) => (
          <button
            key={c.key}
            onClick={() => setSelectedCategory(c.key)}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer capitalize ${
              selectedCategory === c.key
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : "bg-[var(--surface)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: General Assets Browser (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredAssets.map((asset) => (
              <Card key={asset.id} className="p-5 border-[var(--border)] bg-[var(--surface)]/30 hover:bg-[var(--surface)]/60 transition-all flex flex-col justify-between h-56 text-left relative group">
                
                {/* Top preview frame */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="text-[9px] uppercase tracking-wide font-mono">{asset.category}</Badge>
                    <Link href={`/asset/${asset.slug}`} className="text-[10px] text-[var(--primary)] hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                      Inspect details →
                    </Link>
                  </div>
                  
                  <h3 className="font-bold text-base text-[var(--foreground)]">{asset.name}</h3>
                  <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">{asset.description}</p>
                </div>

                {/* Inline SVG rendering or preview indicator */}
                <div className="py-2 flex items-center justify-center flex-1">
                  {asset.category === "icon" || asset.category === "illustration" ? (
                    <div className="text-[var(--primary)]" dangerouslySetInnerHTML={{ __html: asset.codeContent }} />
                  ) : asset.category === "gradient" ? (
                    <div className="h-8 w-24 rounded border border-[var(--border)]" style={{ background: asset.codeContent }} />
                  ) : (
                    <div 
                      className="h-8 w-24 rounded border border-[var(--border)]" 
                      style={{ 
                        backgroundImage: asset.codeContent,
                        backgroundSize: "8px 8px"
                      }} 
                    />
                  )}
                </div>

                {/* Bottom Trigger controls */}
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]/40 text-[10px]">
                  <span className="text-[var(--muted-foreground)] font-mono">Format: {asset.fileType.toUpperCase()}</span>
                  <button
                    onClick={() => handleCopyCode(asset.slug, asset.codeContent)}
                    className="text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  >
                    {copiedSlug === asset.slug ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedSlug === asset.slug ? "Copied!" : "Copy Code"}
                  </button>
                </div>
              </Card>
            ))}
            {filteredAssets.length === 0 && (
              <div className="col-span-full text-center py-24 text-xs text-[var(--muted-foreground)] border border-[var(--border)] border-dashed rounded-xl">
                No matching assets found in registry.
              </div>
            )}
          </div>
        </div>

        {/* Right: Gradient & Background Texture sandbox builder (4 cols) */}
        {selectedCategory === "gradient" && (
          <Card className="lg:col-span-4 p-5 border-[var(--border)] bg-[var(--surface)]/50 space-y-4 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">Gradient Sandbox Builder</span>

            {/* Live preview */}
            <div className="h-36 rounded-xl border border-[var(--border)] shadow-inner" style={{ background: compiledGradientCss }} />

            {/* Colors picker */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] text-[var(--muted-foreground)] font-semibold block">Angle Degrees ({gradAngle}°)</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={gradAngle}
                  onChange={(e) => setGradAngle(Number(e.target.value))}
                  className="w-full h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-[var(--muted-foreground)] font-semibold block">Color Start</label>
                  <input
                    type="color"
                    value={gradColor1}
                    onChange={(e) => setGradColor1(e.target.value)}
                    className="w-full h-8 rounded border border-[var(--border)] cursor-pointer bg-transparent"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[var(--muted-foreground)] font-semibold block">Color Stop</label>
                  <input
                    type="color"
                    value={gradColor2}
                    onChange={(e) => setGradColor2(e.target.value)}
                    className="w-full h-8 rounded border border-[var(--border)] cursor-pointer bg-transparent"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Exporter copy CSS variables */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-mono text-[var(--muted-foreground)]">Compiled Gradient CSS</span>
                <button
                  onClick={() => handleCopyCode("sandbox-grad", `background: ${compiledGradientCss};`)}
                  className="text-[var(--primary)] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                >
                  {copiedSlug === "sandbox-grad" ? <Check className="h-3 w-3" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedSlug === "sandbox-grad" ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="text-[9px] font-mono bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] overflow-x-auto select-all leading-normal whitespace-pre-wrap">
                {`background: ${compiledGradientCss};`}
              </pre>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
