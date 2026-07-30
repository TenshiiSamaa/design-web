/**
 * EASING TOKENS
 * 
 * Flow: Primitives -> Semantic -> Component
 */
export const easing = {
  // ── PRIMITIVE LAYER ──────────────────────────────────────────────────────
  primitive: {
    ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    easeIn: "cubic-bezier(0.42, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.58, 1)",
    easeInOut: "cubic-bezier(0.42, 0, 0.58, 1)",
    linear: "linear",
    springDefault: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    springStiff: "cubic-bezier(0.3, 1.5, 0.6, 1)",
    springSlow: "cubic-bezier(0.16, 1, 0.3, 1)"
  },

  // ── SEMANTIC LAYER ───────────────────────────────────────────────────────
  semantic: {
    standard: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    enter: "cubic-bezier(0, 0, 0.2, 1)",        // Decelerating (ease-out)
    exit: "cubic-bezier(0.4, 0, 1, 1)",         // Accelerating (ease-in)
    spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    smooth: "cubic-bezier(0.16, 1, 0.3, 1)"
  },

  // ── COMPONENT LAYER ──────────────────────────────────────────────────────
  component: {
    dialog: {
      enter: "cubic-bezier(0.34, 1.56, 0.64, 1)", // spring-like pop
      exit: "cubic-bezier(0.4, 0, 0.2, 1)"
    },
    tooltip: {
      enter: "cubic-bezier(0.16, 1, 0.3, 1)",
      exit: "linear"
    },
    dropdown: {
      enter: "cubic-bezier(0.16, 1, 0.3, 1)",
      exit: "cubic-bezier(0.4, 0, 1, 1)"
    }
  }
};
export type EasingTokens = typeof easing;
