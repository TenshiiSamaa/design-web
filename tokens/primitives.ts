/**
 * DESIGN SYSTEM PRIMITIVES
 * 
 * Raw, single-value tokens with no semantic UI meaning.
 * Consumed by semantic design tokens to map to UI features.
 */

// ── COLOR PALETTES (Raw Scales) ─────────────────────────────────────────────

export const COLOR_SCALES = {
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712"
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    955: "#172554"
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764"
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065"
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    955: "#052e16"
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22"
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a"
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03"
  },
  neutral: {
    white: "#ffffff",
    black: "#000000"
  }
};

// ── SPACING SCALES (8px System Base) ───────────────────────────────────────

export const SPACING = {
  4: "0.25rem",
  8: "0.5rem",
  12: "0.75rem",
  16: "1rem",
  20: "1.25rem",
  24: "1.5rem",
  32: "2rem",
  40: "2.5rem",
  48: "3rem",
  56: "3.5rem",
  64: "4rem",
  72: "4.5rem",
  80: "5rem",
  96: "6rem",
  128: "8rem"
};

// ── CORNER RADIUS SCALES ───────────────────────────────────────────────────

export const RADIUS = {
  none: "0",
  xs: "0.125rem",     // 2px
  sm: "0.25rem",      // 4px
  md: "0.375rem",     // 6px
  lg: "0.5rem",       // 8px
  xl: "0.75rem",      // 12px
  xxl: "1rem",        // 16px
  full: "9999px"      // Circle
};

// ── OPACITY SCALES ─────────────────────────────────────────────────────────

export const OPACITY = {
  0: "0",
  5: "0.05",
  10: "0.1",
  20: "0.2",
  25: "0.25",
  30: "0.3",
  40: "0.4",
  50: "0.5",
  60: "0.6",
  70: "0.7",
  75: "0.75",
  80: "0.8",
  90: "0.9",
  95: "0.95",
  100: "1"
};

// ── SHADOW SCALES ──────────────────────────────────────────────────────────

export const SHADOW = {
  xs: "0 1px 2px rgba(0, 0, 0, 0.05)",
  sm: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  xxl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
  focus: "0 0 0 3px rgba(99, 102, 241, 0.5)",
  floating: "0 10px 30px rgba(0, 0, 0, 0.08), 0 1px 8px rgba(0, 0, 0, 0.04)",
  overlay: "0 20px 40px rgba(0, 0, 0, 0.12), 0 1px 10px rgba(0, 0, 0, 0.05)"
};

// ── Z-INDEX LAYERS ─────────────────────────────────────────────────────────

export const Z_INDEX = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  banner: 400,
  overlay: 500,
  modal: 600,
  popover: 700,
  toast: 800,
  tooltip: 900
};
