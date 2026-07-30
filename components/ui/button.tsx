import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          {
            "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 active:opacity-80": variant === "primary",
            "bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--muted)]": variant === "secondary",
            "border border-[var(--border)] bg-transparent hover:bg-[var(--muted)]": variant === "outline",
            "bg-transparent hover:bg-[var(--muted)] text-[var(--foreground)]": variant === "ghost",
            "bg-[var(--destructive)] text-white hover:opacity-90": variant === "danger",
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-4 py-2 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
