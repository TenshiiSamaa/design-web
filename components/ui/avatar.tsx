import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback: string;
}

export function Avatar({ className, src, alt, fallback, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[var(--secondary)] items-center justify-center font-bold text-sm text-[var(--foreground)] border border-[var(--border)]",
        className
      )}
      {...props}
    >
      {src ? (
        <Image src={src} alt={alt || "Avatar"} className="h-full w-full object-cover" fill unoptimized />
      ) : (
        <span>{fallback.substring(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
}
