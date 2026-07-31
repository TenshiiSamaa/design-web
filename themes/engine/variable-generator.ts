import { ColorTheme } from "@/registry/types";
import { suggestAccessibleColor } from "../utils/contrast";

/**
 * CSS VARIABLE ENGINE
 * 
 * Maps ColorTheme tokens to CSS custom properties.
 */
export function generateCssVariables(theme: ColorTheme): Record<string, string> {
  const bg = theme.background;
  
  // Dynamically boost foreground/text layer contrast while keeping colors subtle where appropriate
  const fg = suggestAccessibleColor(theme.foreground, bg, 4.5);
  const mutedFg = suggestAccessibleColor(theme.mutedForeground, bg, 4.0);
  
  // Boost primary color to guarantee interactive text (links, hover states) is readable against background
  const primary = suggestAccessibleColor(theme.primary, bg, 4.5);
  
  // Correct foreground variables relative to their background boundaries
  const primaryFg = suggestAccessibleColor(theme.primaryForeground, primary, 4.5);
  const secondaryFg = suggestAccessibleColor(theme.secondaryForeground, theme.secondary, 4.5);
  const accentFg = suggestAccessibleColor(theme.accentForeground, theme.accent, 4.5);
  
  // Guarantee readable status indicators
  const successText = suggestAccessibleColor(theme.success, bg, 4.5);
  const warningText = suggestAccessibleColor(theme.warning, bg, 4.5);
  const destructiveText = suggestAccessibleColor(theme.destructive, bg, 4.5);

  // Keep borders subtle but distinguishable (target 1.35 ratio against background)
  const border = suggestAccessibleColor(theme.border, bg, 1.35);

  return {
    "--background": theme.background,
    "--foreground": fg,
    "--surface": theme.surface,
    "--card": theme.card,
    "--border": border,
    "--primary": primary,
    "--primary-foreground": primaryFg,
    "--secondary": theme.secondary,
    "--secondary-foreground": secondaryFg,
    "--accent": theme.accent,
    "--accent-foreground": accentFg,
    "--muted": theme.muted,
    "--muted-foreground": mutedFg,
    "--success": successText,
    "--warning": warningText,
    "--destructive": destructiveText,
    "--ring": theme.ring,
    "--selection": theme.selection,
    "--hover": theme.hover,
    "--active": theme.active,
    "--disabled": theme.disabled,
    "--shadow": theme.shadow,
    "--overlay": theme.overlay,
    "--scrollbar": theme.scrollbar,
    "--code-block": theme.codeBlock,
    // Charts colors mapping
    "--chart-1": theme.chartColors[0] || theme.primary,
    "--chart-2": theme.chartColors[1] || theme.secondary,
    "--chart-3": theme.chartColors[2] || theme.success,
    // Table colors mapping
    "--table-header": theme.tableColors.headerBg,
    "--table-row": theme.tableColors.rowBg,
    "--table-row-hover": theme.tableColors.rowBgHover,
  };
}


/**
 * Compiles a ColorTheme into a raw CSS stylesheet rule block
 */
export function compileThemeToCssRule(theme: ColorTheme, selector: string): string {
  const variables = generateCssVariables(theme);
  const ruleBody = Object.entries(variables)
    .map(([prop, val]) => `  ${prop}: ${val} !important;`)
    .join("\n");
  
  return `${selector} {\n${ruleBody}\n}`;
}
