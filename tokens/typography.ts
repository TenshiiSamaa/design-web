/**
 * TYPOGRAPHY DESIGN TOKENS
 * 
 * Flow: Primitives -> Semantic -> Component
 */

// ── PRIMITIVE LAYER ──────────────────────────────────────────────────────

const FAMILIES = {
  sans: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  mono: "var(--font-geist-mono), ui-monospace, 'Courier New', monospace"
};

const SIZES = {
  xs: "0.75rem",      // 12px
  sm: "0.875rem",     // 14px
  md: "1rem",         // 16px
  lg: "1.125rem",     // 18px
  xl: "1.25rem",      // 20px
  xxl: "1.5rem",      // 24px
  "3xl": "1.875rem",  // 30px
  "4xl": "2.25rem",   // 36px
  "5xl": "3rem"       // 48px
};

const WEIGHTS = {
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  black: "900"
};

const LINE_HEIGHTS = {
  none: "1",
  tight: "1.2",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625"
};

const LETTER_SPACING = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em"
};

// ── SEMANTIC & COMPONENT LAYERS ──────────────────────────────────────────

export const typography = {
  primitive: {
    families: FAMILIES,
    sizes: SIZES,
    weights: WEIGHTS,
    lineHeights: LINE_HEIGHTS,
    letterSpacings: LETTER_SPACING
  },

  // Semantic styles
  semantic: {
    display: {
      fontFamily: FAMILIES.sans,
      fontSize: SIZES["5xl"],
      fontWeight: WEIGHTS.black,
      lineHeight: LINE_HEIGHTS.tight,
      letterSpacing: LETTER_SPACING.tighter
    },
    heading: {
      fontFamily: FAMILIES.sans,
      fontSize: SIZES["3xl"],
      fontWeight: WEIGHTS.bold,
      lineHeight: LINE_HEIGHTS.tight,
      letterSpacing: LETTER_SPACING.tight
    },
    title: {
      fontFamily: FAMILIES.sans,
      fontSize: SIZES.xl,
      fontWeight: WEIGHTS.semibold,
      lineHeight: LINE_HEIGHTS.snug,
      letterSpacing: LETTER_SPACING.tight
    },
    body: {
      fontFamily: FAMILIES.sans,
      fontSize: SIZES.md,
      fontWeight: WEIGHTS.normal,
      lineHeight: LINE_HEIGHTS.normal,
      letterSpacing: LETTER_SPACING.normal
    },
    label: {
      fontFamily: FAMILIES.sans,
      fontSize: SIZES.sm,
      fontWeight: WEIGHTS.medium,
      lineHeight: LINE_HEIGHTS.none,
      letterSpacing: LETTER_SPACING.wide
    },
    caption: {
      fontFamily: FAMILIES.sans,
      fontSize: SIZES.xs,
      fontWeight: WEIGHTS.normal,
      lineHeight: LINE_HEIGHTS.normal,
      letterSpacing: LETTER_SPACING.normal
    },
    code: {
      fontFamily: FAMILIES.mono,
      fontSize: SIZES.sm,
      fontWeight: WEIGHTS.normal,
      lineHeight: LINE_HEIGHTS.normal,
      letterSpacing: LETTER_SPACING.normal
    }
  },

  // Component typographic specs
  component: {
    button: {
      fontSize: SIZES.sm,
      fontWeight: WEIGHTS.semibold,
      fontFamily: FAMILIES.sans
    },
    input: {
      fontSize: SIZES.sm,
      fontFamily: FAMILIES.sans
    },
    badge: {
      fontSize: SIZES.xs,
      fontWeight: WEIGHTS.bold,
      fontFamily: FAMILIES.mono
    },
    card: {
      title: {
        fontSize: SIZES.md,
        fontWeight: WEIGHTS.bold,
        fontFamily: FAMILIES.sans
      },
      body: {
        fontSize: SIZES.sm,
        lineHeight: LINE_HEIGHTS.relaxed,
        fontFamily: FAMILIES.sans
      }
    }
  }
};
export type TypographyTokens = typeof typography;
