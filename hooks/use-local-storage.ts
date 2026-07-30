"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Syncs state to localStorage and keeps it in sync.
 * Server-safe: reads from localStorage only after mount via callback.
 *
 * Usage:
 *   const [theme, setTheme] = useLocalStorage("preferred-theme", "system");
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Read from localStorage via timeout callback to avoid synchronous setState in effect
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const item = window.localStorage.getItem(key);
        if (item !== null) {
          setStoredValue(JSON.parse(item) as T);
        }
      } catch (error) {
        console.warn(`useLocalStorage: error reading key "${key}"`, error);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const valueToStore =
            typeof value === "function"
              ? (value as (prev: T) => T)(prev)
              : value;
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          return valueToStore;
        });
      } catch (error) {
        console.warn(`useLocalStorage: error setting key "${key}"`, error);
      }
    },
    [key]
  );

  return [storedValue, setValue];
}
