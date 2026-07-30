import { RADIUS } from "./primitives";

/**
 * CORNER RADIUS TOKENS
 * 
 * Flow: Primitives -> Semantic -> Component
 */
export const radius = {
  // ── PRIMITIVE LAYER ──────────────────────────────────────────────────────
  primitive: RADIUS,

  // ── SEMANTIC LAYER ───────────────────────────────────────────────────────
  semantic: {
    sharp: RADIUS.none,
    xs: RADIUS.xs,
    sm: RADIUS.sm,
    md: RADIUS.md,
    lg: RADIUS.lg,
    xl: RADIUS.xl,
    xxl: RADIUS.xxl,
    full: RADIUS.full
  },

  // ── COMPONENT LAYER ──────────────────────────────────────────────────────
  component: {
    button: {
      sm: RADIUS.xs,
      md: RADIUS.sm,
      lg: RADIUS.md
    },
    input: RADIUS.sm,
    card: RADIUS.md,
    dialog: RADIUS.lg,
    badge: RADIUS.full,
    avatar: RADIUS.full,
    tooltip: RADIUS.xs
  }
};
export type RadiusTokens = typeof radius;
