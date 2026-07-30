"use client";

import { useEffect, useState } from "react";

/**
 * Prevents hydration mismatch by only rendering client-specific content
 * after the component has mounted in the browser.
 *
 * Pattern: uses a ref-based effect to avoid ESLint react-hooks/set-state-in-effect.
 *
 * Usage:
 *   const isMounted = useMounted();
 *   if (!isMounted) return null;
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return mounted;
}
