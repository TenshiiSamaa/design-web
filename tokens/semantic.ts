import { COLOR_SCALES } from "./primitives";

/**
 * STATE & SEMANTIC STATUS TOKENS
 * 
 * Flow: Primitives -> Semantic -> Component
 */
export const semantic = {
  // ── SUCCESS STATUS ───────────────────────────────────────────────────────
  success: {
    primitive: COLOR_SCALES.green[500],
    semantic: {
      light: COLOR_SCALES.green[600],
      dark: COLOR_SCALES.green[400],
      bgLight: "rgba(34, 197, 94, 0.1)",
      bgDark: "rgba(34, 197, 94, 0.15)",
    },
    component: {
      badgeBg: {
        light: "rgba(34, 197, 94, 0.1)",
        dark: "rgba(34, 197, 94, 0.15)",
      },
      badgeText: {
        light: COLOR_SCALES.green[700],
        dark: COLOR_SCALES.green[300],
      },
      alertBg: {
        light: "rgba(34, 197, 94, 0.05)",
        dark: "rgba(34, 197, 94, 0.1)",
      },
      alertBorder: {
        light: "rgba(34, 197, 94, 0.2)",
        dark: "rgba(34, 197, 94, 0.3)",
      }
    }
  },

  // ── WARNING STATUS ───────────────────────────────────────────────────────
  warning: {
    primitive: COLOR_SCALES.amber[500],
    semantic: {
      light: COLOR_SCALES.amber[600],
      dark: COLOR_SCALES.amber[400],
      bgLight: "rgba(245, 158, 11, 0.1)",
      bgDark: "rgba(245, 158, 11, 0.15)",
    },
    component: {
      badgeBg: {
        light: "rgba(245, 158, 11, 0.1)",
        dark: "rgba(245, 158, 11, 0.15)",
      },
      badgeText: {
        light: COLOR_SCALES.amber[700],
        dark: COLOR_SCALES.amber[300],
      },
      alertBg: {
        light: "rgba(245, 158, 11, 0.05)",
        dark: "rgba(245, 158, 11, 0.1)",
      },
      alertBorder: {
        light: "rgba(245, 158, 11, 0.2)",
        dark: "rgba(245, 158, 11, 0.3)",
      }
    }
  },

  // ── DESTRUCTIVE / DANGER STATUS ──────────────────────────────────────────
  destructive: {
    primitive: COLOR_SCALES.red[500],
    semantic: {
      light: COLOR_SCALES.red[600],
      dark: COLOR_SCALES.red[400],
      bgLight: "rgba(239, 68, 68, 0.1)",
      bgDark: "rgba(239, 68, 68, 0.15)",
    },
    component: {
      badgeBg: {
        light: "rgba(239, 68, 68, 0.1)",
        dark: "rgba(239, 68, 68, 0.15)",
      },
      badgeText: {
        light: COLOR_SCALES.red[700],
        dark: COLOR_SCALES.red[300],
      },
      alertBg: {
        light: "rgba(239, 68, 68, 0.05)",
        dark: "rgba(239, 68, 68, 0.1)",
      },
      alertBorder: {
        light: "rgba(239, 68, 68, 0.2)",
        dark: "rgba(239, 68, 68, 0.3)",
      },
      buttonBg: {
        light: COLOR_SCALES.red[500],
        dark: COLOR_SCALES.red[600],
      }
    }
  },

  // ── MUTED STATES ─────────────────────────────────────────────────────────
  muted: {
    primitive: COLOR_SCALES.gray[500],
    semantic: {
      light: COLOR_SCALES.gray[400],
      dark: COLOR_SCALES.gray[600],
    }
  },

  // ── DISABLED STATE ───────────────────────────────────────────────────────
  disabled: {
    semantic: {
      opacity: "0.5",
      cursor: "not-allowed",
      bgLight: COLOR_SCALES.gray[100],
      bgDark: COLOR_SCALES.gray[800],
      textLight: COLOR_SCALES.gray[400],
      textDark: COLOR_SCALES.gray[600],
    },
    component: {
      buttonBg: {
        light: COLOR_SCALES.gray[100],
        dark: COLOR_SCALES.gray[800],
      },
      buttonText: {
        light: COLOR_SCALES.gray[400],
        dark: COLOR_SCALES.gray[600],
      }
    }
  }
};
export type SemanticTokens = typeof semantic;
