import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] shadow-xs backdrop-blur-md transition-all duration-300",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";
