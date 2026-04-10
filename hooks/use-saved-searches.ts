import { useState, useEffect } from "react";

export interface SavedSearch {
  id: string;
  name: string;
  searchTerm: string;
  cuisines: string[];
  minPrice: string;
  maxPrice: string;
  minRating: string;
  timestamp: number;
}

const STORAGE_KEY = "saved_searches";
const MAX_SAVES = 10;

export function useSavedSearches() {
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSearches(JSON.parse(stored));
      }
    } catch {
      // Silently fail
    }
    setIsLoaded(true);
  }, []);

  const saveSearch = (
    name: string,
    searchTerm: string,
    cuisines: string[] = [],
    minPrice: string = "",
    maxPrice: string = "",
    minRating: string = ""
  ): SavedSearch | null => {
    if (!name.trim()) return null;

    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name,
      searchTerm,
      cuisines,
      minPrice,
      maxPrice,
      minRating,
      timestamp: Date.now(),
    };

    const updated = [newSearch, ...searches].slice(0, MAX_SAVES);
    setSearches(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Silently fail
    }

    return newSearch;
  };

  const deleteSearch = (id: string) => {
    const updated = searches.filter((s) => s.id !== id);
    setSearches(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Silently fail
    }
  };

  const updateSearchName = (id: string, newName: string) => {
    const updated = searches.map((s) =>
      s.id === id ? { ...s, name: newName } : s
    );
    setSearches(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Silently fail
    }
  };

  return {
    searches,
    isLoaded,
    saveSearch,
    deleteSearch,
    updateSearchName,
  };
}
