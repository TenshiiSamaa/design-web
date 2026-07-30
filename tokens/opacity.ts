import { OPACITY } from "./primitives";

/**
 * OPACITY / TRANSPARENCY TOKENS
 * 
 * Flow: Primitives -> Semantic -> Component
 */
export const opacity = {
  // ── PRIMITIVE LAYER ──────────────────────────────────────────────────────
  primitive: OPACITY,

  // ── SEMANTIC LAYER ───────────────────────────────────────────────────────
  semantic: {
    opaque: OPACITY[100],
    translucent: OPACITY[50],
    transparent: OPACITY[0],
    disabled: OPACITY[50],
    scrim: OPACITY[40],
    hover: OPACITY[10] || "0.1",
    active: OPACITY[20] || "0.2"
  },

  // ── COMPONENT LAYER ──────────────────────────────────────────────────────
  component: {
    button: {
      disabled: OPACITY[50]
    },
    input: {
      disabled: OPACITY[50]
    },
    dialog: {
      overlay: OPACITY[40]
    }
  }
};
export type OpacityTokens = typeof opacity;
