import { COLOR_SCALES } from "./primitives";

/**
 * BORDER & OUTLINE TOKENS
 * 
 * Flow: Primitives -> Semantic -> Component
 */
export const border = {
  // ── PRIMITIVE LAYER ──────────────────────────────────────────────────────
  primitive: {
    light: COLOR_SCALES.gray[200],
    dark: COLOR_SCALES.gray[800],
  },

  // ── SEMANTIC LAYER ───────────────────────────────────────────────────────
  semantic: {
    base: {
      description: "Default subtle border style",
      light: COLOR_SCALES.gray[200],
      dark: COLOR_SCALES.gray[800],
    },
    muted: {
      description: "Extremely soft dividers",
      light: COLOR_SCALES.gray[100],
      dark: COLOR_SCALES.gray[900],
    },
    interactive: {
      description: "Interactive hover and state changes",
      light: COLOR_SCALES.gray[300],
      dark: COLOR_SCALES.gray[700],
    },
    focus: {
      description: "Keyboard accessibility focus outline",
      light: COLOR_SCALES.violet[500],
      dark: COLOR_SCALES.violet[500],
    }
  },

  // ── COMPONENT LAYER ──────────────────────────────────────────────────────
  component: {
    card: {
      light: "rgba(15, 23, 42, 0.08)",
      dark: "rgba(255, 255, 255, 0.06)",
    },
    dialog: {
      light: COLOR_SCALES.gray[200],
      dark: COLOR_SCALES.gray[800],
    },
    input: {
      light: COLOR_SCALES.gray[200],
      dark: COLOR_SCALES.gray[800],
    },
    button: {
      outline: {
        light: COLOR_SCALES.gray[200],
        dark: COLOR_SCALES.gray[800],
      }
    }
  }
};
export type BorderTokens = typeof border;
