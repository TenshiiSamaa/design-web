import { getContrastRatio } from "../utils/contrast";
import { ColorTheme, Palette } from "@/registry/types";

export interface ContrastScore {
  name: string;
  element1: string;
  element2: string;
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
}

export interface ValidationReport {
  paletteId: string;
  paletteName: string;
  lightMode: {
    isValid: boolean;
    scores: ContrastScore[];
  };
  darkMode: {
    isValid: boolean;
    scores: ContrastScore[];
  };
  overallPass: boolean;
}

/**
 * Validates a single theme's color pairings for contrast compliance
 */
export function validateThemeModeContrast(theme: ColorTheme): { isValid: boolean; scores: ContrastScore[] } {
  const checks = [
    { name: "Canvas Contrast (Foreground on Background)", text: theme.foreground, bg: theme.background, target: 4.5 },
    { name: "Surface Content (Foreground on Surface)", text: theme.foreground, bg: theme.surface, target: 4.5 },
    { name: "Card Readability (Foreground on Card Panel)", text: theme.foreground, bg: theme.card, target: 4.5 },
    { name: "Primary Button (Foreground on Brand Action)", text: theme.primaryForeground, bg: theme.primary, target: 4.5 },
    { name: "Secondary Action (Secondary Foreground on Secondary Bg)", text: theme.secondaryForeground, bg: theme.secondary, target: 3.0 },
    { name: "Status Indicator - Destructive (Text on Background)", text: theme.destructive, bg: theme.background, target: 3.0 },
    { name: "Status Indicator - Success (Text on Background)", text: theme.success, bg: theme.background, target: 3.0 }
  ];

  let isValid = true;
  const scores: ContrastScore[] = [];

  for (const check of checks) {
    const ratio = getContrastRatio(check.text, check.bg);
    const passesAA = ratio >= check.target;
    const passesAAA = ratio >= 7.0;

    if (!passesAA) {
      isValid = false;
    }

    scores.push({
      name: check.name,
      element1: check.text,
      element2: check.bg,
      ratio,
      passesAA,
      passesAAA
    });
  }

  return { isValid, scores };
}

/**
 * Validates a complete Palette (both light and dark modes)
 */
export function validatePalette(palette: Palette): ValidationReport {
  const lightReport = validateThemeModeContrast(palette.light);
  const darkReport = validateThemeModeContrast(palette.dark);

  return {
    paletteId: palette.id,
    paletteName: palette.name,
    lightMode: lightReport,
    darkMode: darkReport,
    overallPass: lightReport.isValid && darkReport.isValid
  };
}
