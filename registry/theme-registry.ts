import { ALL_PALETTES } from "./registry-manifest";
import { CUSTOM_PALETTE_CONFIG } from "@/themes/custom-palette";
import { Palette } from "./types";

export type ThemePreset = string;

// Combine standard system palettes with the user's custom-palette config
export const THEMES: Palette[] = [
  ...ALL_PALETTES,
  CUSTOM_PALETTE_CONFIG
];

export const DEFAULT_THEME: string = "obsidian-violet";
export type { Palette };
