"use client";

import { useTestingTheme } from "@/providers/theme-provider";
import { ThemeMode, RadiusScale, SpacingScale, FontScale } from "@/providers/theme-provider";
import { Sun, Moon, Monitor, RotateCcw, Type, Maximize2, Circle, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeControlsToolbar() {
  const {
    setPreset,
    themeMode,
    setThemeMode,
    animationsEnabled,
    setAnimationsEnabled,
    reducedMotion,
    setReducedMotion,
    radiusScale,
    setRadiusScale,
    spacingScale,
    setSpacingScale,
    fontScale,
    setFontScale,
    resetCustomPalette
  } = useTestingTheme();

  const handleResetAll = () => {
    setThemeMode("system");
    setAnimationsEnabled(true);
    setReducedMotion(false);
    setRadiusScale("md");
    setSpacingScale("md");
    setFontScale("md");
    resetCustomPalette();
    setPreset("obsidian-violet");
  };

  return (
    <div className="sticky top-0 z-30 w-full bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border)] px-4 py-3 flex flex-wrap items-center justify-between gap-4">
      {/* Dynamic Controls Grid */}
      <div className="flex flex-wrap items-center gap-3.5">
        {/* Theme Mode Segmented Picker */}
        <div className="flex rounded-xl bg-[var(--background)] p-1 border border-[var(--border)] text-xs">
          {([
            { id: "light", label: "Light", icon: Sun },
            { id: "dark", label: "Dark", icon: Moon },
            { id: "system", label: "System", icon: Monitor }
          ] as { id: ThemeMode; label: string; icon: React.ComponentType<{ className?: string }> }[]).map((mode) => {
            const Icon = mode.icon;
            const isActive = themeMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setThemeMode(mode.id)}
                title={`${mode.label} Mode`}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all duration-150 cursor-pointer",
                  isActive
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Font Scale Selector */}
        <div className="flex items-center gap-1.5 bg-[var(--background)] px-2.5 py-1 rounded-xl border border-[var(--border)] text-xs">
          <Type className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          <span className="text-[10px] text-[var(--muted-foreground)] font-semibold uppercase">Text</span>
          <select
            value={fontScale}
            onChange={(e) => setFontScale(e.target.value as FontScale)}
            className="bg-transparent border-0 font-medium focus:ring-0 focus:outline-none p-0 cursor-pointer text-[var(--foreground)]"
          >
            <option value="sm">Small</option>
            <option value="md">Normal</option>
            <option value="lg">Large</option>
          </select>
        </div>

        {/* Radius Scale Selector */}
        <div className="flex items-center gap-1.5 bg-[var(--background)] px-2.5 py-1 rounded-xl border border-[var(--border)] text-xs">
          <Circle className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          <span className="text-[10px] text-[var(--muted-foreground)] font-semibold uppercase">Corner</span>
          <select
            value={radiusScale}
            onChange={(e) => setRadiusScale(e.target.value as RadiusScale)}
            className="bg-transparent border-0 font-medium focus:ring-0 focus:outline-none p-0 cursor-pointer text-[var(--foreground)]"
          >
            <option value="sm">Sharp</option>
            <option value="md">Medium</option>
            <option value="lg">Soft</option>
            <option value="xl">Rounded</option>
          </select>
        </div>

        {/* Spacing Scale Selector */}
        <div className="flex items-center gap-1.5 bg-[var(--background)] px-2.5 py-1 rounded-xl border border-[var(--border)] text-xs">
          <Maximize2 className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          <span className="text-[10px] text-[var(--muted-foreground)] font-semibold uppercase">Gap</span>
          <select
            value={spacingScale}
            onChange={(e) => setSpacingScale(e.target.value as SpacingScale)}
            className="bg-transparent border-0 font-medium focus:ring-0 focus:outline-none p-0 cursor-pointer text-[var(--foreground)]"
          >
            <option value="sm">Tight</option>
            <option value="md">Default</option>
            <option value="lg">Loose</option>
          </select>
        </div>

        {/* Animation Toggle */}
        <button
          onClick={() => setAnimationsEnabled(!animationsEnabled)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
            animationsEnabled
              ? "border-[var(--primary)]/30 bg-[var(--accent)] text-[var(--primary)]"
              : "border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)]"
          )}
        >
          {animationsEnabled ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
          <span>Anims</span>
        </button>

        {/* Reduced Motion Toggle */}
        <button
          onClick={() => setReducedMotion(!reducedMotion)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer",
            reducedMotion
              ? "border-[var(--destructive)]/30 bg-[var(--destructive)]/10 text-[var(--destructive)]"
              : "border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)]"
          )}
        >
          <span>Motion Reduced</span>
        </button>
      </div>

      {/* Global Reset Button */}
      <button
        onClick={handleResetAll}
        title="Reset design engine config to default"
        className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-xl transition-all cursor-pointer"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset
      </button>
    </div>
  );
}
