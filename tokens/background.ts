import { COLOR_SCALES } from "./primitives";

/**
 * BACKGROUND COLOR TOKENS
 * 
 * Flow: Primitives -> Semantic -> Component
 */
export const background = {
  // ── PRIMITIVE LAYER (Direct Raw References) ──────────────────────────────
  primitive: {
    light: COLOR_SCALES.gray[50],
    dark: COLOR_SCALES.gray[950],
  },

  // ── SEMANTIC LAYER (UI Meanings) ─────────────────────────────────────────
  semantic: {
    canvas: {
      description: "Default body canvas background color",
      light: COLOR_SCALES.gray[50],
      dark: COLOR_SCALES.gray[950],
    },
    surface: {
      description: "Raised panel surfaces, headers, lists",
      light: COLOR_SCALES.neutral.white,
      dark: COLOR_SCALES.gray[900],
    },
    muted: {
      description: "Muted panel backgrounds, sidebar nodes",
      light: COLOR_SCALES.gray[100],
      dark: COLOR_SCALES.gray[800],
    },
    overlay: {
      description: "Scrim color for modal backdrops",
      light: "rgba(0, 0, 0, 0.4)",
      dark: "rgba(0, 0, 0, 0.6)",
    },
    code: {
      description: "Inline code background panels",
      light: COLOR_SCALES.gray[100],
      dark: "#111b27",
    }
  },

  // ── COMPONENT LAYER (Component Scoped Parameters) ─────────────────────────
  component: {
    card: {
      light: "rgba(255, 255, 255, 0.85)",
      dark: "rgba(3, 7, 18, 0.6)",
    },
    dialog: {
      light: COLOR_SCALES.neutral.white,
      dark: COLOR_SCALES.gray[900],
    },
    tooltip: {
      light: COLOR_SCALES.gray[900],
      dark: COLOR_SCALES.gray[50],
    },
    popover: {
      light: COLOR_SCALES.neutral.white,
      dark: COLOR_SCALES.gray[900],
    },
    input: {
      light: COLOR_SCALES.neutral.white,
      dark: COLOR_SCALES.gray[950],
    },
    button: {
      primary: {
        light: COLOR_SCALES.violet[500],
        dark: COLOR_SCALES.violet[500],
      },
      secondary: {
        light: COLOR_SCALES.gray[100],
        dark: COLOR_SCALES.gray[800],
      },
      ghost: {
        light: "transparent",
        dark: "transparent",
      }
    },
    badge: {
      success: {
        light: "rgba(16, 185, 129, 0.1)",
        dark: "rgba(16, 185, 129, 0.1)",
      },
      warning: {
        light: "rgba(245, 158, 11, 0.1)",
        dark: "rgba(245, 158, 11, 0.1)",
      },
      destructive: {
        light: "rgba(239, 68, 68, 0.1)",
        dark: "rgba(239, 68, 68, 0.1)",
      }
    }
  }
};
export type BackgroundTokens = typeof background;
