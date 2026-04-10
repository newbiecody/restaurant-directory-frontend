"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CUISINE_OPTIONS } from "@/lib/constants/cuisines";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
  cuisine: string;
  onCuisineChange: (v: string) => void;
  minPrice: string;
  onMinPriceChange: (v: string) => void;
  maxPrice: string;
  onMaxPriceChange: (v: string) => void;
  isHalal: boolean;
  onIsHalalChange: (v: boolean) => void;
  onReset: () => void;
}

export default function FilterPanel({
  cuisine,
  onCuisineChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  isHalal,
  onIsHalalChange,
  onReset,
}: FilterPanelProps) {
  return (
    <div className="border rounded-lg p-4 space-y-4 bg-muted/30">
      {/* Cuisine chips */}
      <div>
        <p className="text-sm font-medium mb-2">Cuisine</p>
        <div className="flex flex-wrap gap-2">
          {CUISINE_OPTIONS.map((c) => (
            <button
              key={c}
              onClick={() => onCuisineChange(cuisine === c ? "" : c)}
              className={cn(
                "px-3 py-1 rounded-full text-sm border transition-colors",
                cuisine === c
                  ? "bg-orange-600 text-white border-orange-600"
                  : "border-muted-foreground hover:border-orange-600"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <p className="text-sm font-medium mb-2">Price Range</p>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="w-24"
            min="0"
          />
          <span className="text-muted-foreground text-sm">–</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="w-24"
            min="0"
          />
        </div>
      </div>

      {/* Halal toggle */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="halal"
          checked={isHalal}
          onChange={(e) => onIsHalalChange(e.target.checked)}
          className="rounded border-muted-foreground"
        />
        <label htmlFor="halal" className="text-sm font-medium cursor-pointer">
          Halal only
        </label>
      </div>

      {/* Reset button */}
      <Button variant="outline" size="sm" onClick={onReset} className="w-full">
        Reset Filters
      </Button>
    </div>
  );
}
