export interface ColorTheme {
  background: string;
  foreground: string;
  surface: string;
  card: string;
  border: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  success: string;
  warning: string;
  destructive: string;
  ring: string;
  selection: string;
  hover: string;
  active: string;
  disabled: string;
  shadow: string;
  overlay: string;
  scrollbar: string;
  codeBlock: string;
  chartColors: string[];
  tableColors: {
    headerBg: string;
    rowBg: string;
    rowBgHover: string;
  };
}

export interface PreviewMetadata {
  background: string;
  card: string;
  button: string;
  accent: string;
  codeBlock: string;
  chart: string;
  typography: string;
}

export interface Palette {
  id: string;
  slug: string;
  name: string;
  category:
    | "professional"
    | "minimal"
    | "corporate"
    | "purple"
    | "blue"
    | "green"
    | "warm"
    | "neutral"
    | "monochrome"
    | "creative";
  description: string;
  inspiration: string;
  recommendedUsage: string[];
  light: ColorTheme;
  dark: ColorTheme;
  accessibilityNotes: string;
  version: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  futureNotes?: string;
  isTopPick: boolean;
  preview: PreviewMetadata;
}
