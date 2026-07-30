import { SHADOW } from "./primitives";

/**
 * ELEVATION & SHADOW TOKENS
 * 
 * Flow: Primitives -> Semantic -> Component
 */
export const shadow = {
  // ── PRIMITIVE LAYER ──────────────────────────────────────────────────────
  primitive: SHADOW,

  // ── SEMANTIC LAYER ───────────────────────────────────────────────────────
  semantic: {
    flat: "none",
    xs: SHADOW.xs,
    sm: SHADOW.sm,
    md: SHADOW.md,
    lg: SHADOW.lg,
    xl: SHADOW.xl,
    xxl: SHADOW.xxl,
    inner: SHADOW.inner,
    focus: SHADOW.focus,
    floating: SHADOW.floating,
    overlay: SHADOW.overlay
  },

  // ── COMPONENT LAYER ──────────────────────────────────────────────────────
  component: {
    card: {
      flat: "none",
      hover: SHADOW.sm,
      raised: SHADOW.md
    },
    dialog: SHADOW.lg,
    tooltip: SHADOW.xs,
    dropdown: SHADOW.floating,
    popover: SHADOW.floating,
    toast: SHADOW.overlay
  }
};
export type ShadowTokens = typeof shadow;
