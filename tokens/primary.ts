import { COLOR_SCALES } from "./primitives";

/**
 * PRIMARY ACCENT COLOR TOKENS
 * 
 * Flow: Primitives -> Semantic -> Component
 */
export const primary = {
  // ── PRIMITIVE LAYER ──────────────────────────────────────────────────────
  primitive: {
    light: COLOR_SCALES.violet[500],
    dark: COLOR_SCALES.violet[500],
  },

  // ── SEMANTIC LAYER ───────────────────────────────────────────────────────
  semantic: {
    base: {
      description: "Primary accent highlight value",
      light: COLOR_SCALES.violet[500],
      dark: COLOR_SCALES.violet[500],
    },
    hover: {
      description: "Hover state for primary action tags",
      light: COLOR_SCALES.violet[600],
      dark: COLOR_SCALES.violet[400],
    },
    active: {
      description: "Pressed/active states",
      light: COLOR_SCALES.violet[700],
      dark: COLOR_SCALES.violet[600],
    },
    contrastText: {
      description: "Readable text color on top of primary colors",
      light: COLOR_SCALES.neutral.white,
      dark: COLOR_SCALES.neutral.white,
    }
  },

  // ── COMPONENT LAYER ──────────────────────────────────────────────────────
  component: {
    button: {
      bg: {
        light: COLOR_SCALES.violet[500],
        dark: COLOR_SCALES.violet[500],
      },
      hover: {
        light: COLOR_SCALES.violet[600],
        dark: COLOR_SCALES.violet[400],
      },
      text: {
        light: COLOR_SCALES.neutral.white,
        dark: COLOR_SCALES.neutral.white,
      }
    },
    badge: {
      bg: {
        light: COLOR_SCALES.violet[50],
        dark: COLOR_SCALES.violet[950] || "#1e1b4b",
      },
      text: {
        light: COLOR_SCALES.violet[700],
        dark: COLOR_SCALES.violet[300],
      }
    },
    tab: {
      activeLine: {
        light: COLOR_SCALES.violet[500],
        dark: COLOR_SCALES.violet[500],
      }
    }
  }
};
export type PrimaryTokens = typeof primary;
