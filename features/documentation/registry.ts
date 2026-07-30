export interface DocSpec {
  slug: string;
  title: string;
  category: string;
  overview: string;
  architecture: string;
  usage: string;
  accessibilityNotes: string;
  version: string;
  lastUpdated: string;
}

export const DOCUMENTATION_REGISTRY: DocSpec[] = [
  {
    slug: "theme-engine",
    title: "Runtime Theme Engine",
    category: "Architecture",
    overview: "Injects design token keys as dynamic CSS variables, enabling real-time contrast checking.",
    architecture: "React context mappings that recalculate luminance and rewrite property styles to the DOM root.",
    usage: "Wrap your root layout in ThemeProvider and read parameters using the useTestingTheme hook.",
    accessibilityNotes: "Audited against WCAG AA standards. Interactive elements warn if contrast ratios drop below 4.5:1.",
    version: "2.0.0",
    lastUpdated: "2026-07-30"
  },
  {
    slug: "palette-studio",
    title: "Palette Studio & Color Intelligence",
    category: "Color System",
    overview: "Enables creating and analyzing color palettes dynamically.",
    architecture: "Translates primitive color sets into structured dynamic shades mapping to light and dark modes.",
    usage: "Navigate to /palettes, choose a category or design custom variables in the editor.",
    accessibilityNotes: "Automated color-blind preview indicators check accessibility parameters live.",
    version: "2.0.0",
    lastUpdated: "2026-07-30"
  },
  {
    slug: "forms-studio",
    title: "Forms Studio Builder",
    category: "Composites",
    overview: "Visual layout builder that compiles fields outline settings to TSX forms and Zod validators.",
    architecture: "Decoupled registry of primitive inputs (email, checkbox) compiled into Zod resolvers.",
    usage: "Launch the builder at /form-builder, drag input catalog items, and copy the React code.",
    accessibilityNotes: "Required tags and error announcements are read automatically by screen readers.",
    version: "1.0.0",
    lastUpdated: "2026-07-30"
  }
];
