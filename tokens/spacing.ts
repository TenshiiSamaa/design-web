import { SPACING } from "./primitives";

/**
 * SPACING TOKENS (8px Base System)
 * 
 * Flow: Primitives -> Semantic -> Component
 */
export const spacing = {
  // ── PRIMITIVE LAYER ──────────────────────────────────────────────────────
  primitive: SPACING,

  // ── SEMANTIC LAYER ───────────────────────────────────────────────────────
  semantic: {
    containerPadding: {
      mobile: SPACING[16],
      tablet: SPACING[24],
      desktop: SPACING[40]
    },
    layoutGap: {
      tight: SPACING[8],
      normal: SPACING[16],
      loose: SPACING[24],
      heavy: SPACING[32]
    },
    panelPadding: {
      sm: SPACING[12],
      md: SPACING[16],
      lg: SPACING[24],
      xl: SPACING[32]
    }
  },

  // ── COMPONENT LAYER ──────────────────────────────────────────────────────
  component: {
    button: {
      paddingX: {
        sm: SPACING[12],
        md: SPACING[16],
        lg: SPACING[24]
      },
      paddingY: {
        sm: "0.375rem",
        md: SPACING[8],
        lg: SPACING[12]
      },
      gap: SPACING[8]
    },
    card: {
      padding: {
        sm: SPACING[12],
        md: SPACING[16],
        lg: SPACING[24]
      },
      gap: SPACING[16]
    },
    dialog: {
      padding: SPACING[24],
      gap: SPACING[16]
    },
    input: {
      paddingX: SPACING[12],
      paddingY: SPACING[8]
    },
    avatar: {
      size: {
        sm: SPACING[24],
        md: SPACING[40],
        lg: SPACING[56]
      }
    }
  }
};
export type SpacingTokens = typeof spacing;
