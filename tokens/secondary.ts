import { COLOR_SCALES } from "./primitives";

/**
 * SECONDARY ACCENT COLOR TOKENS
 * 
 * Flow: Primitives -> Semantic -> Component
 */
export const secondary = {
  // ── PRIMITIVE LAYER ──────────────────────────────────────────────────────
  primitive: {
    light: COLOR_SCALES.gray[100],
    dark: COLOR_SCALES.gray[800],
  },

  // ── SEMANTIC LAYER ───────────────────────────────────────────────────────
  semantic: {
    base: {
      description: "Secondary supporting background action tags",
      light: COLOR_SCALES.gray[100],
      dark: COLOR_SCALES.gray[800],
    },
    hover: {
      description: "Hover state for secondary elements",
      light: COLOR_SCALES.gray[200],
      dark: COLOR_SCALES.gray[700],
    },
    active: {
      description: "Pressed state for secondary elements",
      light: COLOR_SCALES.gray[300],
      dark: COLOR_SCALES.gray[600],
    },
    contrastText: {
      description: "Readable text color on top of secondary elements",
      light: COLOR_SCALES.gray[900],
      dark: COLOR_SCALES.gray[100],
    }
  },

  // ── COMPONENT LAYER ──────────────────────────────────────────────────────
  component: {
    button: {
      bg: {
        light: COLOR_SCALES.gray[100],
        dark: COLOR_SCALES.gray[800],
      },
      hover: {
        light: COLOR_SCALES.gray[200],
        dark: COLOR_SCALES.gray[700],
      },
      text: {
        light: COLOR_SCALES.gray[900],
        dark: COLOR_SCALES.gray[100],
      }
    },
    badge: {
      bg: {
        light: COLOR_SCALES.gray[100],
        dark: COLOR_SCALES.gray[800],
      },
      text: {
        light: COLOR_SCALES.gray[600],
        dark: COLOR_SCALES.gray[300],
      }
    }
  }
};
export type SecondaryTokens = typeof secondary;
