"use client";

import { useTestingTheme } from "@/providers/theme-provider";

export function useThemePreset() {
  return useTestingTheme();
}
export { useTestingTheme };
