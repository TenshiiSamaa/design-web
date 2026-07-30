# Shared React Hooks (`hooks`)

This directory houses reusable, custom React hooks that provide utility state management, event listeners, and media integrations across playgrounds.

## Public API & Exports
- **`useLocalStorage` (`hooks/use-local-storage.ts`)**: Synced state manager for Local Storage. Safe for SSR (hydration-safe, delays reading until post-mount).
- **`useMediaQuery` (`hooks/use-media-query.ts`)**: Detects viewport matches for media strings (such as `(max-width: 768px)`).
- **`useMounted` (`hooks/use-mounted.ts`)**: Prevents hydration mismatches by returning a boolean indicating if browser mounting is finished.
- **`useThemePreset` (`hooks/use-theme-preset.ts`)**: Small proxy hook that hooks into the central testing theme state.

## Examples
```tsx
import { useMediaQuery } from "@/hooks/use-media-query";

export default function NavDemo() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return <div>{isMobile ? "Mobile Drawer" : "Desktop Sidebar"}</div>;
}
```

## Future Improvements
- Add `useKeyPress` hook for accessible keyboard controls.
- Add `useIntersectionObserver` for heavy animation performance tracking.
