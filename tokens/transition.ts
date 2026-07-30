/**
 * TRANSITION PROPERTY TOKENS
 * 
 * Flow: Primitives -> Semantic -> Component
 */
export const transition = {
  // ── PRIMITIVE LAYER ──────────────────────────────────────────────────────
  primitive: {
    all: "all",
    colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
    opacity: "opacity",
    shadow: "box-shadow",
    transform: "transform"
  },

  // ── SEMANTIC LAYER ───────────────────────────────────────────────────────
  semantic: {
    default: "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    colors: "color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease",
    shadow: "box-shadow 0.2s ease",
    transform: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
  },

  // ── COMPONENT LAYER ──────────────────────────────────────────────────────
  component: {
    button: "all 0.15s ease-in-out",
    input: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    card: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    modal: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
  }
};
export type TransitionTokens = typeof transition;
