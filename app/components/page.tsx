"use client";

import React, { useState, useMemo } from "react";
import { 
  ALL_COMPONENTS 
} from "@/features/components/registry-manifest";
import { ComponentVariant } from "@/features/components/types";
import { 
  Search, ShieldAlert, CheckCircle, Keyboard, Cpu, AlertTriangle, 
  ArrowLeft, BookOpen, Layers, Play
} from "lucide-react";
import { Card, Badge, Separator } from "@/components/ui";
import Link from "next/link";

export default function ComponentsGalleryPage() {
  const [selectedId, setSelectedId] = useState<string>(ALL_COMPONENTS[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Variant playground state
  const [activeVariantIndex, setActiveVariantIndex] = useState<number>(0);
  const [sizeProp, setSizeProp] = useState<"sm" | "md" | "lg">("md");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // List categories
  const categories = ["All", "core", "forms", "navigation", "feedback", "overlay", "data-display", "layout", "marketing", "charts"];

  const filteredComponents = useMemo(() => {
    return ALL_COMPONENTS.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const activeComponent = useMemo(() => {
    return ALL_COMPONENTS.find((c) => c.id === selectedId) || ALL_COMPONENTS[0];
  }, [selectedId]);

  const activeVariant: ComponentVariant | undefined = activeComponent?.variants[activeVariantIndex];

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full p-6 flex flex-col md:flex-row gap-8 items-start">
      
      {/* 1. Left Side: Sidebar Filter & List */}
      <div className="w-full md:w-64 space-y-6 shrink-0 md:sticky md:top-20">
        <div className="space-y-2">
          <Link href="/" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Playground
          </Link>
          <h2 className="text-lg font-bold tracking-tight text-[var(--foreground)]">Component Gallery</h2>
          <p className="text-[11px] text-[var(--muted-foreground)]">Design System telemetries & documentation.</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search component API..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] focus:ring-1 focus:ring-[var(--ring)] focus:outline-none"
          />
        </div>

        {/* Categories */}
        <div className="space-y-1">
          <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] block px-1">Categories</span>
          <div className="flex flex-wrap md:flex-col gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1.5 rounded-lg text-xs text-left transition-colors cursor-pointer capitalize ${
                  selectedCategory === cat
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                }`}
              >
                {cat === "All" ? "All Categories" : cat.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* List of items */}
        <div className="space-y-1">
          <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] block px-1">Showcase Lists ({filteredComponents.length})</span>
          <div className="space-y-0.5">
            {filteredComponents.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedId(c.id);
                  setActiveVariantIndex(0);
                }}
                className={`w-full px-2.5 py-2 rounded-lg text-xs text-left transition-all flex items-center justify-between cursor-pointer ${
                  selectedId === c.id
                    ? "border border-[var(--primary)] bg-[var(--accent)] text-[var(--primary)] font-semibold"
                    : "border border-transparent hover:bg-[var(--surface)] text-[var(--foreground)]"
                }`}
              >
                <span>{c.name}</span>
                <Badge variant={c.qualityBadge === "production" ? "success" : "secondary"} className="text-[8px] px-1 py-0 scale-90">
                  {c.qualityBadge}
                </Badge>
              </button>
            ))}
            {filteredComponents.length === 0 && (
              <span className="text-xs text-[var(--muted-foreground)] block text-center py-4">No matching components.</span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Right Side: Showcase Workspace */}
      {activeComponent ? (
        <div className="flex-1 w-full space-y-8">
          
          {/* Header metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] flex items-center gap-2">
                {activeComponent.name}
                <Badge variant={activeComponent.qualityBadge === "production" ? "success" : "secondary"}>
                  {activeComponent.qualityBadge === "production" ? "Production Ready" : "Experimental"}
                </Badge>
              </h1>
              <p className="text-xs text-[var(--muted-foreground)]">{activeComponent.description}</p>
            </div>

            {/* Accessibility score Badge */}
            <Card className="px-4 py-2 border-[var(--primary)]/20 bg-[var(--primary)]/5 flex items-center gap-2 shrink-0">
              <Cpu className="h-4 w-4 text-[var(--primary)]" />
              <div className="text-left">
                <span className="text-[9px] uppercase font-bold text-[var(--muted-foreground)] block">Accessibility</span>
                <span className="text-sm font-black text-[var(--foreground)]">{activeComponent.accessibilityScore}/100</span>
              </div>
            </Card>
          </div>

          {/* Interactive Playground Panel */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] flex items-center gap-1.5">
              <Play className="h-3 w-3" /> Live Variant Sandbox
            </h3>

            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              {/* Variant rendering panel (8 cols) */}
              <div className="lg:col-span-8 border border-[var(--border)] rounded-xl bg-[var(--background)] overflow-hidden flex flex-col justify-between min-h-[250px]">
                <div className="bg-[var(--surface)] px-4 py-2 border-b border-[var(--border)] flex justify-between items-center text-xs text-[var(--muted-foreground)]">
                  <span>Rendering: <strong>{activeVariant?.name || "Default"}</strong></span>
                  <span className="font-mono text-[10px]">Viewport: responsive</span>
                </div>
                <div className="p-8 flex items-center justify-center flex-1 bg-[var(--background)] text-[var(--foreground)]">
                  {activeVariant ? (
                    activeVariant.render({
                      size: sizeProp,
                      disabled: isDisabled,
                      loading: isLoading,
                      ...activeVariant.props
                    })
                  ) : (
                    <span className="text-xs text-[var(--muted-foreground)]">No variant chosen.</span>
                  )}
                </div>
              </div>

              {/* Controls switcher panel (4 cols) */}
              <Card className="lg:col-span-4 p-4 bg-[var(--surface)] border-[var(--border)] flex flex-col gap-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Playground Settings</span>
                
                {/* Variant choice */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[var(--muted-foreground)] font-semibold block">Select Variant</label>
                  <select
                    value={activeVariantIndex}
                    onChange={(e) => setActiveVariantIndex(Number(e.target.value))}
                    className="w-full text-xs rounded-lg border border-[var(--border)] bg-[var(--background)] p-2 text-[var(--foreground)]"
                  >
                    {activeComponent.variants.map((v, i) => (
                      <option key={i} value={i}>{v.name}</option>
                    ))}
                  </select>
                </div>

                {/* Sizing scale multiplier */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[var(--muted-foreground)] font-semibold block">Sizing Scale</label>
                  <div className="grid grid-cols-3 gap-1 bg-[var(--background)] p-1 rounded-lg border border-[var(--border)]">
                    {(["sm", "md", "lg"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setSizeProp(s)}
                        className={`py-1 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                          sizeProp === s
                            ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                            : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                        }`}
                      >
                        {s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* State toggles */}
                <div className="space-y-2 pt-2 border-t border-[var(--border)]">
                  <label className="flex items-center gap-2 cursor-pointer text-[11px] select-none text-[var(--foreground)]">
                    <input
                      type="checkbox"
                      checked={isDisabled}
                      onChange={(e) => setIsDisabled(e.target.checked)}
                      className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--ring)] h-3.5 w-3.5"
                    />
                    <span>Force Disabled State</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[11px] select-none text-[var(--foreground)]">
                    <input
                      type="checkbox"
                      checked={isLoading}
                      onChange={(e) => setIsLoading(e.target.checked)}
                      className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--ring)] h-3.5 w-3.5"
                    />
                    <span>Force Loading State</span>
                  </label>
                </div>
              </Card>
            </div>
          </div>

          {/* Properties Documentation Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] flex items-center gap-1.5">
              <BookOpen className="h-3 w-3" /> Property API Telemetry
            </h3>
            <div className="border border-[var(--border)] rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--surface)] text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                    <th className="p-3 border-b border-[var(--border)]">Prop Name</th>
                    <th className="p-3 border-b border(--border)">Type</th>
                    <th className="p-3 border-b border-[var(--border)]">Default</th>
                    <th className="p-3 border-b border-[var(--border)]">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {activeComponent.props.map((prop, i) => (
                    <tr key={i} className="border-b border-[var(--border)]/40 hover:bg-[var(--surface)]/20 bg-[var(--background)]">
                      <td className="p-3 font-mono text-[10px] text-[var(--primary)] font-bold">{prop.name}</td>
                      <td className="p-3 font-mono text-[10px] text-amber-500">{prop.type}</td>
                      <td className="p-3 font-mono text-[10px] text-[var(--muted-foreground)]">{prop.default}</td>
                      <td className="p-3 text-[var(--foreground)] leading-relaxed">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Code Integration reservation blocks */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] flex items-center gap-1.5">
              <Layers className="h-3 w-3" /> Code & Integration Blueprints
            </h3>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/50 p-4 space-y-3">
              <div>
                <span className="text-[10px] font-mono text-[var(--muted-foreground)] block mb-1">Import statement</span>
                <pre className="text-[10px] font-mono bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] text-[var(--primary)] overflow-x-auto">
                  {`import { ${activeComponent.name} } from "@/components/ui/${activeComponent.id}";`}
                </pre>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[var(--muted-foreground)] block mb-1">Instantiation blueprint</span>
                <pre className="text-[10px] font-mono bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] overflow-x-auto">
                  {`<${activeComponent.name} variant="${activeVariant?.props.variant || "default"}"${sizeProp !== "md" ? ` size="${sizeProp}"` : ""}>${activeVariant?.name || "Action"}</${activeComponent.name}>`}
                </pre>
              </div>
            </div>
          </div>

          <Separator />

          {/* Keyboard & ARIA Specifications */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-5 border-[var(--border)] bg-[var(--background)] space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--muted-foreground)] flex items-center gap-1.5">
                <Keyboard className="h-3.5 w-3.5" /> Keyboard Accessibility
              </h4>
              <ul className="text-xs space-y-2 text-[var(--foreground)]">
                {activeComponent.keyboardNav.map((k, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-5 border-[var(--border)] bg-[var(--background)] space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--muted-foreground)] flex items-center gap-1.5">
                <ShieldAlert className="h-3.5 w-3.5" /> Screen Reader ARIA Roles
              </h4>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed bg-[var(--surface)]/40 p-3 rounded-lg border border-[var(--border)]/40">
                {activeComponent.ariaInfo}
              </p>
            </Card>
          </div>

          {/* Design Guidelines checklist */}
          <div className="rounded-xl border border-[var(--border)] overflow-hidden divide-y divide-[var(--border)]">
            <div className="p-4 bg-[var(--surface)]/50">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] block mb-1">Design telemetry roots</span>
              <p className="text-xs text-[var(--foreground)] leading-relaxed">{activeComponent.designNotes}</p>
            </div>
            <div className="p-5 grid sm:grid-cols-2 gap-6 bg-[var(--background)]">
              <div className="space-y-2">
                <h5 className="font-bold text-xs text-emerald-500 flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5" /> Recommended Best Practices
                </h5>
                <ul className="text-xs space-y-2 text-[var(--muted-foreground)]">
                  {activeComponent.bestPractices.map((bp, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="mt-1 font-bold text-[var(--success)]">✓</span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-bold text-xs text-rose-500 flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" /> Discouraged Anti-patterns
                </h5>
                <ul className="text-xs space-y-2 text-[var(--muted-foreground)]">
                  {activeComponent.antiPatterns.map((ap, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="mt-1 font-bold text-[var(--destructive)]">✗</span>
                      <span>{ap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full text-center py-12 text-xs text-[var(--muted-foreground)]">
          Select a component from the library to view details.
        </div>
      )}
    </main>
  );
}
