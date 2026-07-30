# Global Providers (`providers`)

This directory houses React Context providers that wrap the entire application or scope. In this architecture, it is responsible for the Design Laboratory's core Theme Engine and Layout settings.

## Purpose
The primary provider, `TestingThemeProvider`, acts as the state manager for the design lab. It synchronizes custom user scales (radius, spacing, typography size), theme modes (light, dark, system), animation states, comparison views, recent selections, and favorites.

## Architecture & Logic
1. **Dynamic CSS Generation**: The provider generates live CSS rule overrides in a `<style>` tag, injecting semantic values (e.g. `--primary`, `--background`, `--card`, `--border`) directly scoped to the container pane (`data-theme-pane="primary"` or `data-theme-pane="compare"`).
2. **React Context**: Exposes variables and callbacks using `useTestingTheme()`.
3. **Local Storage Synchronization**: Toggles are synced to local storage to maintain configuration across sessions.
4. **Reduced Motion**: Applies stylesheet rules that nullify animation transition times when reduced motion is checked.

## Dependencies
- `@/tokens/theme-tokens`
- `@/registry/theme-registry`
- React (state, context, callbacks, memos)

## Public API & Exports
`providers/theme-provider.tsx` exports:
- `TestingThemeProvider` (wrapper component)
- `useTestingTheme()` (hook)
- `ThemeMode`, `RadiusScale`, `SpacingScale`, `FontScale` (types)

## Examples
```tsx
import { TestingThemeProvider } from "@/providers/theme-provider";

export default function Layout({ children }) {
  return (
    <TestingThemeProvider>
      <main>{children}</main>
    </TestingThemeProvider>
  );
}
```

## Future Improvements
- Add custom color palette generators based on contrast curves (WCAG analytics).
- Integrate layout alignment rules (grids/columns) into the provider variables.
