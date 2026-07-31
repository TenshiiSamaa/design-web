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

/**
 * Converts RGB to Hex color string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.max(0, Math.min(255, Math.round(val)));
  return (
    "#" +
    [clamp(r), clamp(g), clamp(b)]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

/**
 * Blends a color with black or white to increase contrast against a background
 */
export function suggestAccessibleColor(
  textColor: string,
  bgColor: string,
  targetRatio = 4.5
): string {
  const currentRatio = getContrastRatio(textColor, bgColor);
  if (currentRatio >= targetRatio) {
    return textColor; // Already compliant
  }

  // Determine if background is light or dark using relative luminance
  const bgRgb = hexToRgb(bgColor);
  const bgLuminance =
    (0.2126 * bgRgb.r + 0.7152 * bgRgb.g + 0.0722 * bgRgb.b) / 255;
  const isBgLight = bgLuminance > 0.5;

  const textRgb = hexToRgb(textColor);

  // Iteratively blend text color with black (if light bg) or white (if dark bg)
  // in 10% increments until target contrast is satisfied
  for (let weight = 0.1; weight <= 1.0; weight += 0.1) {
    const targetBlend = isBgLight ? 0 : 255; // Blend with black (0) or white (255)
    
    const r = textRgb.r * (1 - weight) + targetBlend * weight;
    const g = textRgb.g * (1 - weight) + targetBlend * weight;
    const b = textRgb.b * (1 - weight) + targetBlend * weight;
    
    const blendedHex = rgbToHex(r, g, b);
    const newRatio = getContrastRatio(blendedHex, bgColor);
    
    if (newRatio >= targetRatio) {
      return blendedHex;
    }
  }

  return isBgLight ? "#000000" : "#ffffff"; // Hard fallback
}

