import { COLOR_SCALES } from "./primitives";

/**
 * FOREGROUND COLOR TOKENS
 * 
 * Flow: Primitives -> Semantic -> Component
 */
export const foreground = {
  // ── PRIMITIVE LAYER ──────────────────────────────────────────────────────
  primitive: {
    light: COLOR_SCALES.gray[900],
    dark: COLOR_SCALES.gray[50],
  },

  // ── SEMANTIC LAYER ───────────────────────────────────────────────────────
  semantic: {
    primary: {
      description: "Default bold headers and body text",
      light: COLOR_SCALES.gray[900],
      dark: COLOR_SCALES.gray[50],
    },
    secondary: {
      description: "Secondary labels and medium contrast copy",
      light: COLOR_SCALES.gray[600],
      dark: COLOR_SCALES.gray[300],
    },
    muted: {
      description: "Low-contrast placeholder texts and metadata",
      light: COLOR_SCALES.gray[400],
      dark: COLOR_SCALES.gray[500],
    },
    inverse: {
      description: "Text on high contrast dark backdrops",
      light: COLOR_SCALES.neutral.white,
      dark: COLOR_SCALES.gray[950],
    },
    link: {
      description: "Interactive hyperlinks",
      light: COLOR_SCALES.blue[600],
      dark: COLOR_SCALES.blue[400],
    }
  },

  // ── COMPONENT LAYER ──────────────────────────────────────────────────────
  component: {
    button: {
      primary: {
        light: COLOR_SCALES.neutral.white,
        dark: COLOR_SCALES.neutral.white,
      },
      secondary: {
        light: COLOR_SCALES.gray[900],
        dark: COLOR_SCALES.gray[100],
      },
      ghost: {
        light: COLOR_SCALES.gray[900],
        dark: COLOR_SCALES.gray[100],
      }
    },
    input: {
      light: COLOR_SCALES.gray[900],
      dark: COLOR_SCALES.gray[100],
    },
    badge: {
      success: {
        light: COLOR_SCALES.green[700],
        dark: COLOR_SCALES.green[400],
      },
      warning: {
        light: COLOR_SCALES.amber[700],
        dark: COLOR_SCALES.amber[400],
      },
      destructive: {
        light: COLOR_SCALES.red[700],
        dark: COLOR_SCALES.red[400],
      }
    }
  }
};
export type ForegroundTokens = typeof foreground;
