# 🎨 Theme Engine & Runtime Theme System (`themes`)

This directory houses the core **Runtime Theme Engine** for the Design Laboratory. It is responsible for translating design tokens into CSS custom properties, calculating real-time contrast ratios, validating WCAG AA readability, and enabling instant palette swaps without page reloads.

---

## 🛠️ Theme Engine Modules

- **`engine/variable-generator.ts`**: Converts `ColorTheme` keys into Tailwind-compatible CSS variables. It generates dynamic styling overrides for scoped containers or `:root`.
- **`validators/theme-validator.ts`**: Evaluates active theme modes against WCAG AA targets (4.5:1 for standard text, 3.0:1 for larger text elements) to detect invalid palettes.
- **`utils/contrast.ts`**: Color science library implementing relative luminance calculations and contrast scoring.
- **`components/theme-inspector.tsx`**: Debugging panel displaying active token parameters, CSS tables, and readability scores.

---

## 🔄 Theme Runtime Lifecycle

Here is the step-by-step lifecycle of how a theme is resolved, applied, and adjusted at runtime:

```
[User triggers Switch] ──► [Theme Provider Updates State]
                                  │
                                  ▼
                     [Re-evaluates Multipliers]
               (radiusScale, spacingScale, fontScale)
                                  │
                                  ▼
                [Triggers Variable Generator Engine]
                 (compiles style sheet override tag)
                                  │
                                  ▼
                   [Injects CSS into Scoped Pane]
             (forces instant re-paint with no reload)
                                  │
                                  ▼
                [Synchronizes to LocalStorage Cache]
```

---

## 🏗️ Hydration Handling & FOIT/FOUT Mitigation

1. **Hydration protection**: Next.js SSR can trigger FOUT (Flash of Unstyled Text) or FOIT (Flash of Incorrect Theme) if the server template doesn't match the user's cached preference.
2. **Server-Safe State**: Local storage reads are deferred until the React component has mounted on the client, using a `setTimeout(..., 0)` inside a `useEffect` loop in the provider.
3. **Transition Classes**: Background changes utilize subtle CSS transitions to avoid jarring flashes, while keeping the repaint time below **16ms** (60 FPS rendering target).

---

## 📊 Variable Compiling Specification

We map theme properties directly into standard CSS selectors:

```typescript
export function compileThemeToCssRule(theme: ColorTheme, selector: string): string {
  const variables = generateCssVariables(theme);
  const ruleBody = Object.entries(variables)
    .map(([prop, val]) => `  ${prop}: ${val} !important;`)
    .join("\n");
  
  return `${selector} {\n${ruleBody}\n}`;
}
```

This compiles themes directly into blocks like:
```css
[data-theme-pane="primary"] {
  --background: #f9f6fe !important;
  --foreground: #0f172a !important;
  ...
}
```

---

## ♿ Contrast Validation

We perform automatic validation for these pairings:
- **Canvas**: `foreground` on `background` (Target: 4.5:1)
- **Surface**: `foreground` on `surface` (Target: 4.5:1)
- **Card**: `foreground` on `card` (Target: 4.5:1)
- **Primary button**: `primaryForeground` on `primary` (Target: 4.5:1)
- **Secondary button**: `secondaryForeground` on `secondary` (Target: 3.0:1)
- **Status success**: `success` on `background` (Target: 3.0:1)
- **Status destructive**: `destructive` on `background` (Target: 3.0:1)

If any critical pairing falls below the target, the inspector flags the palette as a WCAG violation.

---

## 🚀 Future Extensions

1. **Custom Accent Editor**: Bind color picker curves directly to compile variable rules dynamically.
2. **Dynamic Contrast Boosting**: Read active contrast ratios, and if a palette fails validation, automatically shift luminance towards black/white until it passes WCAG AA requirements.
3. **Dynamic Font Loading**: Connect Google Font endpoints dynamically to match the active palette's recommended typography.
