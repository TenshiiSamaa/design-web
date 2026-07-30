import { COLOR_SCALES } from "./primitives";

/**
 * ACCENT HIGHLIGHT TOKENS
 * 
 * Flow: Primitives -> Semantic -> Component
 */
export const accent = {
  // ── PRIMITIVE LAYER ──────────────────────────────────────────────────────
  primitive: {
    light: COLOR_SCALES.violet[100],
    dark: COLOR_SCALES.violet[900],
  },

  // ── SEMANTIC LAYER ───────────────────────────────────────────────────────
  semantic: {
    base: {
      description: "Low-contrast highlight area backdrop",
      light: COLOR_SCALES.violet[50],
      dark: COLOR_SCALES.violet[950] || "#1e1b4b",
    },
    hover: {
      description: "Interactive selections",
      light: COLOR_SCALES.violet[100],
      dark: COLOR_SCALES.violet[900],
    },
    glow: {
      description: "Glassmorphic backdrop glows",
      light: "rgba(139, 92, 246, 0.15)",
      dark: "rgba(139, 92, 246, 0.25)",
    }
  },

  // ── COMPONENT LAYER ──────────────────────────────────────────────────────
  component: {
    selection: {
      bg: {
        light: "rgba(139, 92, 246, 0.2)",
        dark: "rgba(139, 92, 246, 0.3)",
      },
      text: {
        light: "inherit",
        dark: "inherit",
      }
    },
    sidebar: {
      activeItemBg: {
        light: COLOR_SCALES.violet[50],
        dark: COLOR_SCALES.violet[950] || "#1e1b4b",
      },
      activeItemText: {
        light: COLOR_SCALES.violet[700],
        dark: COLOR_SCALES.violet[300],
      }
    }
  }
};
export type AccentTokens = typeof accent;
