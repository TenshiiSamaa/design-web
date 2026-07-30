import { ColorTheme } from "@/registry/types";

/**
 * CSS VARIABLE ENGINE
 * 
 * Maps ColorTheme tokens to CSS custom properties.
 */
export function generateCssVariables(theme: ColorTheme): Record<string, string> {
  return {
    "--background": theme.background,
    "--foreground": theme.foreground,
    "--surface": theme.surface,
    "--card": theme.card,
    "--border": theme.border,
    "--primary": theme.primary,
    "--primary-foreground": theme.primaryForeground,
    "--secondary": theme.secondary,
    "--secondary-foreground": theme.secondaryForeground,
    "--accent": theme.accent,
    "--accent-foreground": theme.accentForeground,
    "--muted": theme.muted,
    "--muted-foreground": theme.mutedForeground,
    "--success": theme.success,
    "--warning": theme.warning,
    "--destructive": theme.destructive,
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
