"use client";

import { X } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SearchHistoryItem } from "@/hooks/use-search-history";

interface SearchHistoryProps {
  items: SearchHistoryItem[];
  onSelect: (item: SearchHistoryItem) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function SearchHistory({
  items,
  onSelect,
  onRemove,
  onClear,
}: SearchHistoryProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="border rounded-lg p-4 space-y-3 bg-muted/20">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Recent Searches</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-xs h-auto py-1 px-2"
        >
          Clear All
        </Button>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={cn(
              "w-full text-left p-2 rounded-lg border border-transparent hover:bg-muted transition-colors",
              "flex items-start justify-between gap-2"
            )}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.query}</p>
              {item.cuisines.length > 0 && (
                <p className="text-xs text-muted-foreground truncate">
                  {item.cuisines.join(", ")}
                </p>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(item.id);
              }}
              className="flex-shrink-0 hover:text-muted-foreground"
            >
              <X size={16} />
            </button>
          </button>
        ))}
      </div>
    </div>
  );
}
