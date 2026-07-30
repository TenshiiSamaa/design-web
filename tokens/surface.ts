import { COLOR_SCALES } from "./primitives";

/**
 * SURFACE TOKENS
 * 
 * Flow: Primitives -> Semantic -> Component
 */
export const surface = {
  // ── PRIMITIVE LAYER ──────────────────────────────────────────────────────
  primitive: {
    light: COLOR_SCALES.neutral.white,
    dark: COLOR_SCALES.gray[900],
  },

  // ── SEMANTIC LAYER ───────────────────────────────────────────────────────
  semantic: {
    base: {
      description: "Default card/panel backing",
      light: COLOR_SCALES.neutral.white,
      dark: COLOR_SCALES.gray[900],
    },
    raised: {
      description: "Raised panel overlays, popovers",
      light: COLOR_SCALES.neutral.white,
      dark: COLOR_SCALES.gray[800],
    },
    sunken: {
      description: "Sunken wells and code blocks",
      light: COLOR_SCALES.gray[100],
      dark: COLOR_SCALES.gray[950],
    }
  },

  // ── COMPONENT LAYER ──────────────────────────────────────────────────────
  component: {
    card: {
      light: COLOR_SCALES.neutral.white,
      dark: COLOR_SCALES.gray[900],
    },
    dialog: {
      light: COLOR_SCALES.neutral.white,
      dark: COLOR_SCALES.gray[900],
    },
    navbar: {
      light: "rgba(255, 255, 255, 0.8)",
      dark: "rgba(3, 7, 18, 0.8)",
    },
    sidebar: {
      light: COLOR_SCALES.gray[50],
      dark: COLOR_SCALES.gray[900],
    },
    tooltip: {
      light: COLOR_SCALES.gray[900],
      dark: COLOR_SCALES.gray[50],
    }
  }
};
export type SurfaceTokens = typeof surface;
