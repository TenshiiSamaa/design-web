# design-web — Standalone UI/UX Sandbox Laboratory

Welcome to `design-web`, the official standalone UI/UX laboratory, sandbox environment, and design engine workspace. 

Restructured from the `/testing` routing module of our production portfolio, this independent repository serves as a professional laboratory for building, testing, validating, and optimizing colors, components, typography scales, layout frameworks, and complex spring animations before they are promoted into the lightweight production portfolio.

Example deployment target: [design-web.vercel.app](https://design-web.vercel.app) or [design.mdafha.my.id](https://design.mdafha.my.id).

---

## 🎯 Primary Objective

The sandbox environment mimics developer-first platforms such as Storybook, Radix UI, Vercel, Stripe, Supabase, and Linear.

### Laboratory Features
- **Theme Playground**: Adjust light/dark themes, system overrides, font sizes, corners, paddings, and motions.
- **Palette Builder**: Custom interface supporting contrast verification, imports/exports, and custom styling.
- **Animation Lab**: High performance (60 FPS) transitions matching standard modern desktop application behaviors.
- **Component Gallery**: Clean component showcase displaying states (variant, size, loading, keyboard navigation).

---

## 🏗️ Architecture Layout

To preserve clean modular limits, a single-responsibility architecture is enforced:

```
design-web/
├── app/                  # App Router configurations and page endpoints
├── features/             # Isolated feature modules (theme-playground, colors, animations, components)
│   ├── theme-playground/ # Feature isolation containing components, hooks, styles, types, constants
│   └── ...
├── components/           # Reusable UI parts (atomic button, input, card, dropdown, modals)
├── hooks/                # Local storage, media-query state, and theme proxies
├── providers/            # Central Theme Provider engine
├── registry/             # Palette and Theme registries (asset lists)
├── tokens/               # Platform-agnostic design tokens
├── themes/               # User custom overrides configuration
├── animations/           # Spring curves and motion constants
├── styles/               # System reset and custom styling sheets
├── lib/                  # Shared pure utilities (className compiler)
├── docs/                 # Guides, checklists, and specification docs
└── public/               # Static assets
```

---

## ⚙️ Development Guidelines

1. **Feature Isolation**: Never import code directly from one feature module (`@/features/a`) into another (`@/features/b`). Shared elements belong inside `lib/`, `providers/`, or `registry/`.
2. **Semantic Tokens**: No hardcoded Tailwind color names. Elements must bind to CSS variables controlled by our live theme state.
3. **Automated Validation**: Verify build integrity:
   - TypeScript checking: `npx tsc --noEmit`
   - Linting check: `npm run lint`
   - Build optimization: `npm run build`

---

## 📍 Project Milestones & Status

- **[CURRENT] Milestone 1: Project Setup & Architecture Set-Up**
  - Standalone project initialization using Next.js 16.2.
  - Directories created (features, registry, providers, tokens).
  - Central theme engine and CSS theme mapping variables configured.
  - Sidebar and Toolbar layout integrated with main workspace.
  - Barrel-exported UI components and helper hooks migrated.
  - Lint, compile, and Turbopack builds validated.
- **Milestone 2: Migrate & Refactor Theme Playground & Theme Registry**
- **Milestone 3: Implement Manual Palette Editor & Automated Color Validation**
- **Milestone 4: Migrate & Refactor Component Gallery & Animation System**
- **Milestone 5: Palette Expansion, Optimization, and Documentation**
