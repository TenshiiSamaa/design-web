# Atomic UI Components (`components/ui`)

This module houses all the reusable, atomic UI components of the Design Laboratory. Every component is designed to be themeable, responsive, accessible (supporting ARIA standards and keyboard focus states), and free of portfolio-specific constraints.

## Architecture & Guidelines
- **Semantic Tokens**: Component styles utilize CSS custom variables (e.g. `var(--primary)`, `var(--border)`, `var(--card)`) rather than hardcoded Tailwind color names, allowing instant theme presets changes.
- **Strict Isolation**: Components in this folder must have zero dependencies on specific feature business logic. They may only depend on generic custom hooks, styling libraries (e.g. `clsx`, `tailwind-merge`), and basic React/Framer Motion features.
- **Variants and Sizes**: Complex components specify clean props for size scales (`sm`, `md`, `lg`) and variant structures.

## Dependencies
- `@/lib/utils` (className merging using `tailwind-merge` and `clsx`)
- `lucide-react` (icons)
- `framer-motion` (smooth transitions)

## Public API & Exports
The module uses a barrel export structure at `components/ui/index.ts`. Available components include:
- `Button`
- `Input`
- `Textarea`
- `Card`
- `Badge`
- `Avatar`
- `Separator`
- `Modal`
- `Dropdown`
- `Skeleton`
- `Spinner`

## Examples
```tsx
import { Button, Card, Badge } from "@/components/ui";

export default function CardDemo() {
  return (
    <Card className="p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-sm">Feature Card</h4>
        <Badge variant="success">Active</Badge>
      </div>
      <p className="text-xs text-[var(--muted-foreground)]">
        This is an example implementation of a clean card component.
      </p>
      <Button variant="primary" size="sm">
        Confirm
      </Button>
    </Card>
  );
}
```

## Future Improvements
- Add tooltip, toast, and slider primitives.
- Integrate automated keyboard testing coverage.
