import { useState, useEffect } from "react";

export interface SearchHistoryItem {
  id: string;
  query: string;
  cuisines: string[];
  minPrice?: string;
  maxPrice?: string;
  timestamp: number;
}

const STORAGE_KEY = "search_history";
const MAX_HISTORY = 10;

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      // Silently fail if localStorage is unavailable
    }
    setIsLoaded(true);
  }, []);

  const addSearch = (
    query: string,
    cuisines: string[] = [],
    minPrice?: string,
    maxPrice?: string
  ) => {
    const newItem: SearchHistoryItem = {
      id: Date.now().toString(),
      query,
      cuisines,
      minPrice,
      maxPrice,
      timestamp: Date.now(),
    };

    const updated = [newItem, ...history].slice(0, MAX_HISTORY);
    setHistory(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Silently fail if localStorage is full or unavailable
    }
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Silently fail
    }
  };

  const removeItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Silently fail
    }
  };

  return {
    history,
    isLoaded,
    addSearch,
    clearHistory,
    removeItem,
  };
}
