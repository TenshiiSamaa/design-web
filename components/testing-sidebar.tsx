"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Palette, Type, MousePointer, Tag, Square, AlignLeft,
  User, MessageSquare, ChevronDown, Zap, Sun, Circle,
  Maximize2, Home, FlaskConical, X, Columns, Settings,
  RotateCcw, Copy, Check, Upload, Search, Star, History, Bookmark
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTestingTheme } from "@/providers/theme-provider";
import { ALL_PALETTES } from "@/registry/registry-manifest";

const NAV_GROUPS = [
  {
    title: "Basic & Layout",
    items: [
      { id: "previews", label: "UI Previews", icon: FlaskConical },
      { id: "typography", label: "Typography", icon: Type },
      { id: "buttons", label: "Buttons", icon: MousePointer },
      { id: "inputs", label: "Inputs", icon: AlignLeft },
      { id: "cards", label: "Cards", icon: Square },
    ]
  },
  {
    title: "Feedback & Controls",
    items: [
      { id: "badges", label: "Badges", icon: Tag },
      { id: "avatar", label: "Avatar", icon: User },
      { id: "alerts", label: "Alerts", icon: MessageSquare },
      { id: "tabs", label: "Tabs", icon: Columns },
    ]
  },
  {
    title: "Overlays & Menus",
    items: [
      { id: "dialog", label: "Dialog", icon: MessageSquare },
      { id: "dropdown", label: "Dropdown", icon: ChevronDown },
    ]
  },
  {
    title: "Design Tokens",
    items: [
      { id: "colors", label: "Colors", icon: Palette },
      { id: "shadows", label: "Shadows", icon: Sun },
      { id: "radius", label: "Radius", icon: Circle },
      { id: "spacing", label: "Spacing", icon: Maximize2 },
      { id: "motion", label: "Motion", icon: Zap },
      { id: "docs", label: "Docs", icon: Settings },
    ]
  }
];

type Category = "All" | "Popular" | "Professional" | "Minimal" | "Purple" | "Blue" | "Green" | "Warm" | "Dark" | "Custom";

const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: "All", label: "All Palettes", icon: "🎨" },
  { id: "Popular", label: "Popular", icon: "🔥" },
  { id: "Professional", label: "Professional", icon: "💼" },
  { id: "Minimal", label: "Minimal", icon: "🍎" },
  { id: "Purple", label: "Purple", icon: "💜" },
  { id: "Blue", label: "Blue", icon: "🌊" },
  { id: "Green", label: "Green", icon: "🌿" },
  { id: "Warm", label: "Warm", icon: "🌅" },
  { id: "Dark", label: "Dark", icon: "🌙" },
  { id: "Custom", label: "Custom", icon: "🧪" }
];

export function TestingSidebar() {
  const {
    preset,
    setPreset,
    comparePreset,
    setComparePreset,
    compareMode,
    setCompareMode,
    customPalette,
    updateCustomPalette,
    resetCustomPalette,
    favoritePalettes,
    toggleFavoritePalette,
    recentPalettes
  } = useTestingTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [activeTab, setActiveTab] = useState<"nav" | "themes" | "custom" | "import">("themes");
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");
  
  // Search state for component filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [isRecentOpen, setIsRecentOpen] = useState(true);

  const filteredThemes = useMemo(() => {
    if (selectedCategory === "All") return ALL_PALETTES;
    if (selectedCategory === "Popular") return ALL_PALETTES.filter((t) => t.isTopPick);
    if (selectedCategory === "Custom") return customPalette ? [customPalette] : [];
    
    const catLower = selectedCategory.toLowerCase();
    return ALL_PALETTES.filter((t) => t.category === catLower);
  }, [selectedCategory, customPalette]);

  const handleCopyPalette = () => {
    const active = ALL_PALETTES.find((t) => t.id === preset) || customPalette || ALL_PALETTES[0];
    navigator.clipboard.writeText(JSON.stringify(active, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText);
      const light = parsed.light || parsed;
      const dark = parsed.dark || parsed;
      
      if (!light.primary || !light.background) {
        throw new Error("Missing primary or background keys.");
      }
      
      updateCustomPalette(light, dark);
      setPreset("custom-testing-palette");
      setImportError("");
      setImportText("");
      setActiveTab("themes");
    } catch {
      setImportError("Invalid palette format. Ensure it's valid JSON with light/dark keys.");
    }
  };

  const filteredNavGroups = useMemo(() => {
    if (!searchQuery) return NAV_GROUPS;
    const query = searchQuery.toLowerCase();
    return NAV_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter((item) => item.label.toLowerCase().includes(query))
    })).filter((group) => group.items.length > 0);
  }, [searchQuery]);

  const currentTheme = ALL_PALETTES.find((t) => t.id === preset) || customPalette || ALL_PALETTES[0];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[var(--surface)] text-[var(--foreground)] border-r border-[var(--border)] overflow-hidden">
      {/* Title Header */}
      <div className="px-4 py-4 border-b border-[var(--border)] bg-[var(--background)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-[var(--primary)] shrink-0" />
          <div className="min-w-0">
            <span className="font-bold text-sm leading-tight block truncate">Testing Lab</span>
            <span className="text-[10px] text-[var(--muted-foreground)] block">Design System Lab v2</span>
          </div>
        </div>
        <Link
          href="/"
          title="Back to portfolio"
          className="p-1.5 rounded-lg hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors shrink-0"
        >
          <Home className="h-4 w-4" />
        </Link>
      </div>

      {/* Tabs list */}
      <div className="grid grid-cols-4 border-b border-[var(--border)] text-[10px] sm:text-xs bg-[var(--background)] shrink-0 select-none">
        {(["themes", "nav", "custom", "import"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "py-3 font-semibold border-b-2 capitalize transition-colors text-center shrink-0",
              activeTab === tab
                ? "border-[var(--primary)] text-[var(--primary)] bg-[var(--surface)]"
                : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content panes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {activeTab === "nav" && (
          <div className="space-y-4">
            {/* Search Input block */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="Filter components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)] text-[var(--foreground)]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Render grouped nav items */}
            <nav className="space-y-4">
              {filteredNavGroups.map((group) => (
                <div key={group.title} className="space-y-1">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] px-2.5 py-0.5">
                    {group.title}
                  </p>
                  <ul className="space-y-0.5">
                    {group.items.map(({ id, label, icon: Icon }) => (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs transition-colors font-medium",
                            "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                          )}
                        >
                          <Icon className="h-3.5 w-3.5 shrink-0" />
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {filteredNavGroups.length === 0 && (
                <p className="text-xs text-[var(--muted-foreground)] text-center py-4">No matching components found.</p>
              )}
            </nav>
          </div>
        )}

        {activeTab === "themes" && (
          <div className="space-y-5">
            {/* Split Comparison Mode Toggle */}
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold flex items-center gap-1.5">
                  <Columns className="h-3.5 w-3.5" /> Comparison View
                </span>
                <input
                  type="checkbox"
                  checked={compareMode}
                  onChange={(e) => setCompareMode(e.target.checked)}
                  className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--ring)] h-4 w-4 cursor-pointer"
                />
              </div>
              {compareMode && (
                <div className="space-y-2 pt-2.5 border-t border-[var(--border)]">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-[var(--muted-foreground)]">Primary Theme (Left)</label>
                    <select
                      value={preset}
                      onChange={(e) => setPreset(e.target.value)}
                      className="text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 w-full text-[var(--foreground)]"
                    >
                      {ALL_PALETTES.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-[var(--muted-foreground)]">Compare Theme (Right)</label>
                    <select
                      value={comparePreset}
                      onChange={(e) => setComparePreset(e.target.value)}
                      className="text-xs rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 w-full text-[var(--foreground)]"
                    >
                      {ALL_PALETTES.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Recents list */}
            {recentPalettes.length > 0 && (
              <div className="space-y-1.5">
                <button
                  onClick={() => setIsRecentOpen(!isRecentOpen)}
                  className="text-[9px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] w-full px-1 flex items-center justify-between hover:text-[var(--foreground)] transition-colors group"
                >
                  <span className="flex items-center gap-1">
                    <History className="h-3 w-3" /> Recent Palettes
                  </span>
                  <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", !isRecentOpen && "-rotate-90")} />
                </button>
                {isRecentOpen && (
                  <div className="flex flex-col gap-1 px-0.5">
                    {recentPalettes.map((id) => {
                      const theme = ALL_PALETTES.find((t) => t.id === id) || (customPalette?.id === id ? customPalette : null);
                      if (!theme) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => setPreset(id)}
                          title={theme.name}
                          className={cn(
                            "w-full text-left truncate font-medium text-xs p-2 rounded-lg border transition-all block",
                            preset === id 
                              ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--foreground)]" 
                              : "border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--border-hover)]"
                          )}
                        >
                          {theme.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Favorites list */}
            {favoritePalettes.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] block px-1 flex items-center gap-1">
                  <Bookmark className="h-3 w-3 text-[var(--warning)]" /> Bookmarked Themes
                </span>
                <div className="space-y-1">
                  {favoritePalettes.map((id) => {
                    const theme = ALL_PALETTES.find((t) => t.id === id) || (customPalette?.id === id ? customPalette : null);
                    if (!theme) return null;
                    return (
                      <div 
                        key={id} 
                        className={cn(
                          "flex items-center justify-between p-1.5 rounded-lg border text-xs",
                          preset === id ? "border-[var(--primary)] bg-[var(--accent)]" : "border-[var(--border)] bg-[var(--background)]"
                        )}
                      >
                        <button
                          onClick={() => setPreset(id)}
                          className="flex-1 text-left truncate font-medium text-[var(--foreground)]"
                        >
                          {theme.name}
                        </button>
                        <button 
                          onClick={() => toggleFavoritePalette(id)}
                          className="text-[var(--warning)] p-0.5 hover:scale-105 transition-transform"
                        >
                          <Star className="h-3.5 w-3.5 fill-current" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Category selection */}
            <div>
              <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] block mb-2 px-1">
                Categories
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border text-left transition-colors",
                      selectedCategory === cat.id
                        ? "border-[var(--primary)] bg-[var(--accent)] text-[var(--primary)] font-medium"
                        : "border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    )}
                  >
                    <span>{cat.icon}</span>
                    <span className="truncate">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Categorized Palette list */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] block px-1">
                Themes ({filteredThemes.length})
              </label>
              <div className="space-y-1">
                {filteredThemes.map((theme) => {
                  const isSelected = preset === theme.id;
                  const isFav = favoritePalettes.includes(theme.id);
                  return (
                    <div
                      key={theme.id}
                      className={cn(
                        "w-full flex items-center justify-between p-2 rounded-xl border text-left transition-colors group",
                        isSelected
                          ? "border-[var(--primary)] bg-[var(--accent)]"
                          : "border-[var(--border)] bg-[var(--background)] hover:bg-[var(--muted)]"
                      )}
                    >
                      <button
                        onClick={() => setPreset(theme.id)}
                        className="flex-1 flex items-center gap-2.5 min-w-0"
                      >
                        <div
                          className="h-5 w-5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: theme.preview?.button || theme.light.primary }}
                        />
                        <div className="min-w-0">
                          <span className="text-xs font-semibold block truncate text-[var(--foreground)]">{theme.name}</span>
                          <span className="text-[9px] text-[var(--muted-foreground)] truncate block">{theme.description}</span>
                        </div>
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleFavoritePalette(theme.id)}
                          className={cn(
                            "opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-all",
                            isFav && "opacity-100 text-[var(--warning)]"
                          )}
                        >
                          <Star className={cn("h-3.5 w-3.5", isFav && "fill-current")} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "custom" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">Customizer</span>
              <button
                onClick={resetCustomPalette}
                className="text-[10px] flex items-center gap-1 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>
            
            <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">
              Tweak properties for the active custom testing theme. Updates apply instantly.
            </p>

            <div className="space-y-3">
              {customPalette && ([
                { key: "primary", label: "Primary Accent Color" },
                { key: "background", label: "Page Background" },
                { key: "surface", label: "Surface Cards" },
                { key: "border", label: "Borders" },
                { key: "foreground", label: "Text Color" }
              ] as { key: "primary" | "background" | "surface" | "border" | "foreground"; label: string }[]).map((item) => (
                <div key={item.key} className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-[var(--foreground)] block capitalize">
                    {item.label}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={(customPalette.light[item.key] || "#ffffff")}
                      onChange={(e) => {
                        updateCustomPalette(
                          { [item.key]: e.target.value },
                          { [item.key]: e.target.value } // sync both
                        );
                      }}
                      className="h-7 w-7 rounded border border-[var(--border)] cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={(customPalette.light[item.key] || "")}
                      onChange={(e) => {
                        updateCustomPalette(
                          { [item.key]: e.target.value },
                          { [item.key]: e.target.value }
                        );
                      }}
                      className="flex-1 text-xs px-2 py-1 rounded border border-[var(--border)] bg-[var(--background)] font-mono text-[var(--foreground)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "import" && (
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] block">Import/Export</span>
            <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">
              Paste color scheme JSON configurations directly from another AI model or copy the active palette configuration.
            </p>

            <textarea
              placeholder={`{\n  "primary": "#4f46e5",\n  "background": "#f8fafc",\n  ...\n}`}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              rows={8}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] p-3 font-mono text-[10px] text-[var(--foreground)]"
            />
            {importError && (
              <p className="text-[10px] text-[var(--destructive)] font-semibold">{importError}</p>
            )}

            <div className="flex gap-2">
              <Button onClick={handleImport} size="sm" className="flex-1 gap-1">
                <Upload className="h-3.5 w-3.5" /> Import
              </Button>
              <Button onClick={handleCopyPalette} variant="outline" size="sm" className="gap-1">
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                Copy JSON
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Footer info */}
      <div className="px-4 py-3 border-t border-[var(--border)] bg-[var(--background)] flex items-center justify-between text-[10px] text-[var(--muted-foreground)] select-none">
        <span className="font-mono">Category: {currentTheme.category}</span>
        <span className="font-semibold text-[var(--primary)]">{currentTheme.name}</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile control FAB */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50 select-none">
        <Button
          variant="primary"
          onClick={() => setMobileOpen((v) => !v)}
          className="h-12 w-12 rounded-full shadow-xl flex items-center justify-center p-0"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Settings className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden fixed left-0 top-0 z-50 h-full w-72 flex flex-col shadow-2xl">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
