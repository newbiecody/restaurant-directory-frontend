import { useState, useEffect } from "react";
import type { DietaryPreference } from "@/components/custom/search/dietary-preferences";

const STORAGE_KEY = "dietary_preferences";

export function useDietaryPreferences() {
  const [preferences, setPreferences] = useState<DietaryPreference[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load preferences from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPreferences(JSON.parse(stored));
      }
    } catch {
      // Silently fail if localStorage is unavailable
    }
    setIsLoaded(true);
  }, []);

  const updatePreferences = (newPreferences: DietaryPreference[]) => {
    setPreferences(newPreferences);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPreferences));
    } catch {
      // Silently fail if localStorage is full or unavailable
    }
  };

  return {
    preferences,
    isLoaded,
    updatePreferences,
  };
}
