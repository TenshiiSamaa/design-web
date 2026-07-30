/**
 * BREAKPOINT TOKENS
 * 
 * Flow: Primitives -> Semantic -> Component
 */
export const breakpoints = {
  // ── PRIMITIVE LAYER ──────────────────────────────────────────────────────
  primitive: {
    mobile: "320px",
    xsMobile: "390px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1440px",
    ultraWide: "1920px"
  },

  // ── SEMANTIC LAYER ───────────────────────────────────────────────────────
  semantic: {
    sm: "320px",
    md: "768px",
    lg: "1024px",
    xl: "1440px",
    xxl: "1920px"
  },

  // ── COMPONENT LAYER ──────────────────────────────────────────────────────
  component: {
    sidebar: {
      collapseBreakpoint: "1024px" // Collapses to overlay mode below this width
    },
    grid: {
      columns1: "320px",
      columns2: "768px",
      columns3: "1024px"
    }
  }
};
export type BreakpointTokens = typeof breakpoints;
