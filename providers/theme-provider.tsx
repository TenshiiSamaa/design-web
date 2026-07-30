"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { Palette, ColorTheme } from "@/registry/types";
import { ALL_PALETTES } from "@/registry/registry-manifest";
import { compileThemeToCssRule } from "@/themes";
import { CUSTOM_PALETTE_CONFIG } from "@/themes/custom-palette";

const DEFAULT_THEME = "obsidian-violet";

export type ThemeMode = "light" | "dark" | "system";
export type RadiusScale = "sm" | "md" | "lg" | "xl";
export type SpacingScale = "sm" | "md" | "lg";
export type FontScale = "sm" | "md" | "lg";

interface ThemeContextType {
  preset: string;
  setPreset: (preset: string) => void;
  comparePreset: string;
  setComparePreset: (preset: string) => void;
  compareMode: boolean;
  setCompareMode: (enabled: boolean) => void;
  customPalette: Palette | null;
  updateCustomPalette: (light: Partial<ColorTheme>, dark: Partial<ColorTheme>) => void;
  resetCustomPalette: () => void;
  
  // Theme Engine Variables
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (enabled: boolean) => void;
  radiusScale: RadiusScale;
  setRadiusScale: (scale: RadiusScale) => void;
  spacingScale: SpacingScale;
  setSpacingScale: (scale: SpacingScale) => void;
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
  
  // Favorites & Recents
  favoritePalettes: string[];
  toggleFavoritePalette: (id: string) => void;
  recentPalettes: string[];
  addRecentPalette: (id: string) => void;
}

const ThemePresetContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "design-web-theme-preset-v2";
const COMPARE_KEY = "design-web-compare-preset";
const COMPARE_MODE_KEY = "design-web-compare-mode";
const CUSTOM_PALETTE_KEY = "design-web-custom-palette-data";
const THEME_MODE_KEY = "design-web-theme-mode";
const ANIMATIONS_KEY = "design-web-animations-enabled";
const REDUCED_MOTION_KEY = "design-web-reduced-motion";
const RADIUS_SCALE_KEY = "design-web-radius-scale";
const SPACING_SCALE_KEY = "design-web-spacing-scale";
const FONT_SCALE_KEY = "design-web-font-scale";
const FAVORITES_KEY = "design-web-favorites";
const RECENTS_KEY = "design-web-recents";

export function TestingThemeProvider({ children }: { children: React.ReactNode }) {
  const [preset, setPresetState] = useState<string>(DEFAULT_THEME);
  const [comparePreset, setComparePresetState] = useState<string>("violet");
  const [compareMode, setCompareModeState] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [isInitializingSplash, setIsInitializingSplash] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(15);

  // Theme Engine Controls
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
  const [animationsEnabled, setAnimationsEnabledState] = useState<boolean>(true);
  const [reducedMotion, setReducedMotionState] = useState<boolean>(false);
  const [radiusScale, setRadiusScaleState] = useState<RadiusScale>("md");
  const [spacingScale, setSpacingScaleState] = useState<SpacingScale>("md");
  const [fontScale, setFontScaleState] = useState<FontScale>("md");

  // Favorites & Recents
  const [favoritePalettes, setFavoritePalettes] = useState<string[]>([]);
  const [recentPalettes, setRecentPalettes] = useState<string[]>([]);

  // Initialize custom palette state from localStorage or fallback
  const fallbackCustom = useMemo(() => {
    return ALL_PALETTES.find((t) => t.id === "custom-testing-palette") || CUSTOM_PALETTE_CONFIG;
  }, []);
  
  const [customPalette, setCustomPalette] = useState<Palette>(fallbackCustom);

  useEffect(() => {
    const timer = setTimeout(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const storedCompare = window.localStorage.getItem(COMPARE_KEY);
      const storedCompareMode = window.localStorage.getItem(COMPARE_MODE_KEY);
      const storedCustom = window.localStorage.getItem(CUSTOM_PALETTE_KEY);
      
      const storedThemeMode = window.localStorage.getItem(THEME_MODE_KEY) as ThemeMode | null;
      const storedAnimations = window.localStorage.getItem(ANIMATIONS_KEY);
      const storedReducedMotion = window.localStorage.getItem(REDUCED_MOTION_KEY);
      const storedRadius = window.localStorage.getItem(RADIUS_SCALE_KEY) as RadiusScale | null;
      const storedSpacing = window.localStorage.getItem(SPACING_SCALE_KEY) as SpacingScale | null;
      const storedFont = window.localStorage.getItem(FONT_SCALE_KEY) as FontScale | null;
      const storedFavorites = window.localStorage.getItem(FAVORITES_KEY);
      const storedRecents = window.localStorage.getItem(RECENTS_KEY);

      if (stored) setPresetState(stored);
      if (storedCompare) setComparePresetState(storedCompare);
      if (storedCompareMode === "true") setCompareModeState(true);
      
      if (storedThemeMode) setThemeModeState(storedThemeMode);
      if (storedAnimations === "false") setAnimationsEnabledState(false);
      if (storedReducedMotion === "true") setReducedMotionState(true);
      if (storedRadius) setRadiusScaleState(storedRadius);
      if (storedSpacing) setSpacingScaleState(storedSpacing);
      if (storedFont) setFontScaleState(storedFont);
      
      if (storedFavorites) {
        try { setFavoritePalettes(JSON.parse(storedFavorites)); } catch {}
      }
      if (storedRecents) {
        try { setRecentPalettes(JSON.parse(storedRecents)); } catch {}
      }
      
      if (storedCustom) {
        try {
          const parsed = JSON.parse(storedCustom);
          setCustomPalette((prev) => ({
            ...prev,
            light: { ...prev.light, ...parsed.light },
            dark: { ...prev.dark, ...parsed.dark },
          }));
        } catch {
          // ignore
        }
      }
    }, 0);

    const p1 = setTimeout(() => setLoadingProgress(38), 200);
    const p2 = setTimeout(() => setLoadingProgress(68), 500);
    const p3 = setTimeout(() => setLoadingProgress(92), 900);
    const finish = setTimeout(() => {
      setLoadingProgress(100);
      setTimeout(() => {
        setIsInitializingSplash(false);
        setMounted(true);
      }, 150);
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
      clearTimeout(finish);
    };
  }, []);

  // System theme match listener
  useEffect(() => {
    if (!mounted) return;
    const isDark = themeMode === "system" 
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : themeMode === "dark";
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode, mounted]);

  useEffect(() => {
    if (themeMode !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [themeMode]);

  const addRecentPalette = useCallback((id: string) => {
    setRecentPalettes((prev) => {
      const filtered = prev.filter((i) => i !== id);
      const next = [id, ...filtered].slice(0, 5); // Keep last 5
      try {
        window.localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const setPreset = useCallback((next: string) => {
    setPresetState(next);
    addRecentPalette(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, [addRecentPalette]);

  const setComparePreset = useCallback((next: string) => {
    setComparePresetState(next);
    try {
      window.localStorage.setItem(COMPARE_KEY, next);
    } catch {}
  }, []);

  const setCompareMode = useCallback((enabled: boolean) => {
    setCompareModeState(enabled);
    try {
      window.localStorage.setItem(COMPARE_MODE_KEY, String(enabled));
    } catch {}
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      window.localStorage.setItem(THEME_MODE_KEY, mode);
    } catch {}
  }, []);

  const setAnimationsEnabled = useCallback((enabled: boolean) => {
    setAnimationsEnabledState(enabled);
    try {
      window.localStorage.setItem(ANIMATIONS_KEY, String(enabled));
    } catch {}
  }, []);

  const setReducedMotion = useCallback((enabled: boolean) => {
    setReducedMotionState(enabled);
    try {
      window.localStorage.setItem(REDUCED_MOTION_KEY, String(enabled));
    } catch {}
  }, []);

  const setRadiusScale = useCallback((scale: RadiusScale) => {
    setRadiusScaleState(scale);
    try {
      window.localStorage.setItem(RADIUS_SCALE_KEY, scale);
    } catch {}
  }, []);

  const setSpacingScale = useCallback((scale: SpacingScale) => {
    setSpacingScaleState(scale);
    try {
      window.localStorage.setItem(SPACING_SCALE_KEY, scale);
    } catch {}
  }, []);

  const setFontScale = useCallback((scale: FontScale) => {
    setFontScaleState(scale);
    try {
      window.localStorage.setItem(FONT_SCALE_KEY, scale);
    } catch {}
  }, []);

  const toggleFavoritePalette = useCallback((id: string) => {
    setFavoritePalettes((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      try {
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const updateCustomPalette = useCallback((light: Partial<ColorTheme>, dark: Partial<ColorTheme>) => {
    setCustomPalette((prev) => {
      const updated = {
        ...prev,
        light: { ...prev.light, ...light },
        dark: { ...prev.dark, ...dark },
      };
      try {
        window.localStorage.setItem(CUSTOM_PALETTE_KEY, JSON.stringify({
          light: updated.light,
          dark: updated.dark
        }));
      } catch {}
      return updated;
    });
  }, []);

  const resetCustomPalette = useCallback(() => {
    setCustomPalette(fallbackCustom);
    try {
      window.localStorage.removeItem(CUSTOM_PALETTE_KEY);
    } catch {}
  }, [fallbackCustom]);

  const activeTheme = useMemo(() => {
    if (preset === "custom-testing-palette") return customPalette;
    return ALL_PALETTES.find((t) => t.id === preset) || ALL_PALETTES[0];
  }, [preset, customPalette]);

  const activeCompareTheme = useMemo(() => {
    if (comparePreset === "custom-testing-palette") return customPalette;
    return ALL_PALETTES.find((t) => t.id === comparePreset) || ALL_PALETTES[0];
  }, [comparePreset, customPalette]);

  // Translate scale identifiers to numeric multipliers
  const radiusMultiplier = { sm: "0.5", md: "1.0", lg: "1.5", xl: "2.0" }[radiusScale];
  const spacingMultiplier = { sm: "0.75", md: "1.0", lg: "1.3" }[spacingScale];
  const fontMultiplier = { sm: "0.9", md: "1.0", lg: "1.15" }[fontScale];

  return (
    <ThemePresetContext.Provider
      value={{
        preset,
        setPreset,
        comparePreset,
        setComparePreset,
        compareMode,
        setCompareMode,
        customPalette,
        updateCustomPalette,
        resetCustomPalette,
        
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
        
        favoritePalettes,
        toggleFavoritePalette,
        recentPalettes,
        addRecentPalette
      }}
    >
      {isInitializingSplash ? (
        <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center p-4 font-sans select-none bg-black text-white">
          <div className="flex flex-col items-center text-center space-y-8 max-w-sm w-full">
            {/* Logo circular with soft white glow */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-white/10 blur-xl scale-110" />
              <Image
                src="https://raw.githubusercontent.com/TenshiiSamaa/My-Media/refs/heads/main/media/bot/pp%20mahiru%20shiina.jpg"
                alt="Design Web"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover relative z-10 border border-white/5 shadow-[0_0_32px_rgba(255,255,255,0.15)]"
                unoptimized
              />
            </div>
            
            {/* Brand */}
            <div className="text-[18px] font-black tracking-[4px] text-white uppercase font-mono pt-2">
              DESIGN <span className="text-[#2563eb]">WEB</span>
            </div>

            {/* Sub */}
            <div className="text-[10px] font-bold tracking-[2px] text-white/90 uppercase font-mono">
              INITIALIZING PLATFORM
            </div>

            {/* Progress Bar Container */}
            <div className="w-[200px] h-[4px] rounded-full bg-neutral-900 overflow-hidden relative mt-4">
              <div 
                className="h-full rounded-full bg-[#2563eb] shadow-[0_0_8px_rgba(37,99,235,0.8)] transition-all duration-300 ease-out" 
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen w-full flex flex-col">
          {mounted && (
            <style dangerouslySetInnerHTML={{
              __html: `
                /* Dynamic theme compiler rule injections */
                ${compileThemeToCssRule(activeTheme.light, '[data-theme-pane="primary"]')}
                ${compileThemeToCssRule(activeCompareTheme.light, '[data-theme-pane="compare"]')}
                
                /* Dark mode compiled overrides */
                ${compileThemeToCssRule(activeTheme.dark, '.dark [data-theme-pane="primary"]')}
                ${compileThemeToCssRule(activeCompareTheme.dark, '.dark [data-theme-pane="compare"]')}
                
                /* Render spacing, fonts, and animation scales reactively */
                [data-testing-root] {
                  font-size: calc(1rem * var(--font-multiplier, 1));
                  --radius: calc(0.5rem * var(--radius-multiplier, 1));
                }
                
                /* Selection color customization scoped to theme panes */
                [data-theme-pane="primary"] ::selection {
                  background: var(--primary) !important;
                  color: var(--primary-foreground) !important;
                }
                [data-theme-pane="compare"] ::selection {
                  background: var(--primary) !important;
                  color: var(--primary-foreground) !important;
                }
                
                /* Custom scrollbar styling */
                ::-webkit-scrollbar {
                  width: 8px;
                  height: 8px;
                }
                ::-webkit-scrollbar-track {
                  background: var(--background);
                }
                ::-webkit-scrollbar-thumb {
                  background: var(--border);
                  border-radius: var(--radius);
                }
                ::-webkit-scrollbar-thumb:hover {
                  background: var(--primary);
                }
                
                /* Handle reduced motion */
                ${reducedMotion ? `
                  *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                  }
                ` : ""}
              `
            }} />
          )}

          {/* Primary pane variables override container */}
          <div 
            data-theme-pane="primary"
            style={{
              "--radius-multiplier": radiusMultiplier,
              "--spacing-multiplier": spacingMultiplier,
              "--font-multiplier": fontMultiplier,
            } as React.CSSProperties}
            className="min-h-screen w-full flex bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300"
            data-testing-root
          >
            {children}
          </div>
        </div>
      )}
    </ThemePresetContext.Provider>
  );
}

export function useTestingTheme() {
  const context = useContext(ThemePresetContext);
  if (!context) {
    throw new Error("useTestingTheme must be used within a TestingThemeProvider");
  }
  return context;
}
