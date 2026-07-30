"use client";

import { useEffect, useState } from "react";

/**
 * Detects whether the viewport matches a given CSS media query string.
 * Server-safe: returns false until the component is mounted.
 *
 * Usage:
 *   const isMobile = useMediaQuery("(max-width: 768px)");
 *   const isLargeScreen = useMediaQuery("(min-width: 1280px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Use addEventListener with an immediately-fired synthetic event to set initial value
    // This avoids calling setState synchronously in the effect body
    mediaQueryList.addEventListener("change", listener);

    // Use a timeout so the initial state read is in a callback, not synchronous
    const initTimer = setTimeout(() => {
      setMatches(window.matchMedia(query).matches);
    }, 0);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
      clearTimeout(initTimer);
    };
  }, [query]);

  return matches;
}
