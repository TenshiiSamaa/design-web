/**
 * COLOR SCIENCE AND CONTRAST UTILITIES
 * 
 * Implements WCAG 2.0 contrast algorithms:
 * - Relative Luminance
 * - Contrast Ratio
 * - Hex to RGB conversions
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Parses hex color strings (#ffffff, #fff, fff) into RGB objects
 */
export function hexToRgb(hex: string): RGB {
  let cleanHex = hex.trim().replace(/^#/, "");

  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (cleanHex.length !== 6) {
    // Fallback to black if invalid hex is provided
    return { r: 0, g: 0, b: 0 };
  }

  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

/**
 * Calculates relative luminance of an RGB color according to WCAG 2.0 formula
 */
export function getRelativeLuminance(rgb: RGB): number {
  const a = [rgb.r, rgb.g, rgb.b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Calculates contrast ratio between two hex colors.
 * Returns a number between 1 (no contrast) and 21 (maximum contrast).
 */
export function getContrastRatio(color1: string, color2: string): number {
  try {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const l1 = getRelativeLuminance(rgb1);
    const l2 = getRelativeLuminance(rgb2);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    const ratio = (lighter + 0.05) / (darker + 0.05);
    return Math.round(ratio * 100) / 100;
  } catch {
    return 1.0;
  }
}

/**
 * Determines whether a pairing meets WCAG AA standards (4.5:1 ratio for normal text)
 */
export function meetsWcagAA(color1: string, color2: string, minRatio = 4.5): boolean {
  return getContrastRatio(color1, color2) >= minRatio;
}
