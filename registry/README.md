# 🎨 Palette Registry System (`registry`)

This directory houses the **Professional Palette Registry** for the Design Laboratory. It manages a database of high-quality color schemes, categorized by target use case, and compiles them automatically into static manifests for frontend use.

---

## 🏗️ Registry Architecture

To support scalability up to 100, 250, and 500+ palettes without changing existing codebase configuration or slowing down Turbopack, the registry uses a decoupled, modular filesystem layout:

```
registry/
├── professional/        # Clean dark/light theme systems (Linear/Raycast inspired)
├── minimal/             # Neutral, low-fatigue layout backings
├── corporate/           # Enterprise SaaS color structures (Stripe/Atlassian)
├── purple/              # Indigo/Violet orchid palettes (Clerk auth style)
├── blue/                # Arctic ice sky and sea-deep blues
├── green/               # Forest pine, emerald, and mint refresh accents
├── warm/                # Burnt clay, sunset roses, and amber golds
├── neutral/             # Balanced Tailwind slates, stone, and lead coals
├── monochrome/          # Absolute clean black-and-whites and refined silvers
├── creative/            # High-contrast neon-toxic and retro retro themes
├── types.ts             # Strongly-typed schemas (ColorTheme, PreviewMetadata, Palette)
├── registry-manifest.ts # GENERATED. Contains static imports of all palettes in one array
└── index.ts             # Primary barrel export for the module
```

---

## ⚙️ Automated Pre-Build Compiler

To preserve static Vercel deployment performance, the registry does not read the raw filesystem at runtime. Instead, it utilizes an npm pre-compile script:
1. When running `npm run dev` or `npm run build`, npm triggers `node scripts/build-registry.js`.
2. The script scans all category folders for `.ts` files, maps them, and writes the statically compiled `registry/registry-manifest.ts`.
3. In this way, adding a new palette only requires creating a single new file (e.g. `registry/blue/my-new-sky.ts`), and the builder incorporates it into the application automatically on the next dev/build cycle.

---

## 📄 Key Schemas (`registry/types.ts`)

Every registered palette must satisfy the `Palette` contract, defining properties for light and dark modes, metadata, accessibility benchmarks, and preview metrics:

```typescript
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
```

---

## ♿ Accessibility Targets (WCAG AA)

Each palette represents high-contrast pairings evaluated before registration:
- **Background vs Foreground**: minimum `4.5:1` contrast ratio.
- **Surface vs Text**: minimum `4.5:1` contrast ratio.
- **Primary vs text**: contrast ratio conforming to WCAG AA rules.

---

## 🚀 Future Roadmap

- **Batch 2 (+25 palettes)**: Focuses on startup templates, high-contrast darks, pastel-lights, and specialized data-visualization ranges.
- **Batch 3 (+25 palettes)**: Brings the total catalog to 100 palettes, incorporating vintage print, cyberpunk-glows, and material-3 design system mappings.
