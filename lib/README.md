# Shared Utilities (`lib`)

This directory houses helper libraries, standard math calculations, formatting functions, and system utilities.

## Purpose
It provides a single source of truth for pure utility functions that are utilized across multiple components or features.

## Public API & Exports
- **`utils.ts`**: Holds the `cn` function, which merges tailwind classes safely using `clsx` and `tailwind-merge` (preventing CSS priority collisions).

## Dependencies
- `clsx`
- `tailwind-merge`

## Examples
```typescript
import { cn } from "@/lib/utils";

const customClass = cn("px-4 py-2 bg-red-500", isPrimary && "bg-blue-500", className);
```

## Future Improvements
- Add WCAG AA contrast score math validation helper.
- Add spring physics calculation helpers.
