import { hexToRgb, getContrastRatio } from "@/themes/utils/contrast";

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
