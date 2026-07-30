import { Palette } from "@/registry/types";

/**
 * CUSTOM PALETTE CONFIGURATION
 * 
 * Edit this file to add or modify your own custom design palette!
 * The system automatically integrates this custom palette into the Design Lab.
 */
export const CUSTOM_PALETTE_CONFIG: Palette = {
  id: "custom-testing-palette",
  slug: "custom-testing-palette",
  name: "My Custom Palette",
  category: "creative",
  description: "User-configured custom playground theme preset",
  inspiration: "Custom Tweak",
  recommendedUsage: ["Experimentation", "Portfolio", "Personal Style"],
  isTopPick: false,
  version: "1.0.0",
  author: "User",
  createdAt: "2026-07-30",
  updatedAt: "2026-07-30",
  accessibilityNotes: "Contrast ratio adapts based on custom sliders.",
  preview: {
    background: "#ffffff",
    card: "rgba(255, 255, 255, 0.8)",
    button: "#6366f1",
    accent: "#e2e8f0",
    codeBlock: "#f1f5f9",
    chart: "#6366f1",
    typography: "#0f172a"
  },
  
  // LIGHT MODE VALUES
  light: {
    background: "#ffffff",
    foreground: "#0f172a",
    surface: "#f8fafc",
    card: "rgba(255, 255, 255, 0.8)",
    border: "rgba(99, 102, 241, 0.1)",
    primary: "#6366f1",
    primaryForeground: "#ffffff",
    secondary: "#f1f5f9",
    secondaryForeground: "#6366f1",
    accent: "#e2e8f0",
    accentForeground: "#6366f1",
    muted: "#f1f5f9",
    mutedForeground: "rgba(15, 23, 42, 0.6)",
    success: "#10b981",
    warning: "#f59e0b",
    destructive: "#ef4444",
    ring: "#6366f1",
    selection: "rgba(99, 102, 241, 0.2)",
    hover: "#f1f5f9",
    active: "#e2e8f0",
    disabled: "rgba(15, 23, 42, 0.4)",
    shadow: "0 2px 4px rgba(0,0,0,0.05)",
    overlay: "rgba(0,0,0,0.4)",
    scrollbar: "#e2e8f0",
    codeBlock: "#f1f5f9",
    chartColors: ["#6366f1", "#3b82f6", "#10b981"],
    tableColors: {
      headerBg: "#f1f5f9",
      rowBg: "#ffffff",
      rowBgHover: "rgba(0,0,0,0.02)"
    }
  },

  // DARK MODE VALUES
  dark: {
    background: "#090d16",
    foreground: "#f8fafc",
    surface: "#0f172a",
    card: "rgba(15, 23, 42, 0.6)",
    border: "rgba(255, 255, 255, 0.05)",
    primary: "#818cf8",
    primaryForeground: "#ffffff",
    secondary: "#1e293b",
    secondaryForeground: "#f8fafc",
    accent: "#334155",
    accentForeground: "#818cf8",
    muted: "#1e293b",
    mutedForeground: "rgba(248, 250, 252, 0.5)",
    success: "#10b981",
    warning: "#f59e0b",
    destructive: "#ef4444",
    ring: "#818cf8",
    selection: "rgba(255, 255, 255, 0.1)",
    hover: "#1e293b",
    active: "#334155",
    disabled: "rgba(255, 255, 255, 0.5)",
    shadow: "0 4px 6px rgba(0,0,0,0.5)",
    overlay: "rgba(0,0,0,0.6)",
    scrollbar: "#1e2937",
    codeBlock: "#0f172a",
    chartColors: ["#818cf8", "#60a5fa", "#34d399"],
    tableColors: {
      headerBg: "#1e2937",
      rowBg: "#090d16",
      rowBgHover: "rgba(255,255,255,0.02)"
    }
  }
};
