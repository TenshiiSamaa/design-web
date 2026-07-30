import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "error";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
        {
          "border-transparent bg-[var(--primary)] text-[var(--primary-foreground)]": variant === "default",
          "border-transparent bg-[var(--secondary)] text-[var(--foreground)]": variant === "secondary",
          "border-[var(--border)] text-[var(--foreground)]": variant === "outline",
          "border-transparent bg-[var(--success)]/10 text-[var(--success)]": variant === "success",
          "border-transparent bg-[var(--warning)]/10 text-[var(--warning)]": variant === "warning",
          "border-transparent bg-[var(--destructive)]/10 text-[var(--destructive)]": variant === "error",
        },
        className
      )}
      {...props}
    />
  );
}
