/**
 * DURATION TOKENS
 * 
 * Flow: Primitives -> Semantic -> Component
 */
export const duration = {
  // ── PRIMITIVE LAYER ──────────────────────────────────────────────────────
  primitive: {
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms"
  },

  // ── SEMANTIC LAYER ───────────────────────────────────────────────────────
  semantic: {
    instant: "0ms",
    fast: "150ms",     // Hover transitions
    normal: "300ms",   // Standard UI movements
    slow: "500ms",     // Slide-overs and drawers
    extraSlow: "700ms" // Full-page reveals
  },

  // ── COMPONENT LAYER ──────────────────────────────────────────────────────
  component: {
    button: "150ms",
    input: "150ms",
    dialog: "300ms",
    drawer: "500ms",
    tooltip: "100ms",
    dropdown: "200ms"
  }
};
export type DurationTokens = typeof duration;
