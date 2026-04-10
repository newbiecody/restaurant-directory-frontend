"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LocationInput from "./location-input";
import { CUISINE_OPTIONS } from "@/lib/constants/cuisines";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
  cuisines: string[];
  onCuisinesChange: (v: string[]) => void;
  minPrice: string;
  onMinPriceChange: (v: string) => void;
  maxPrice: string;
  onMaxPriceChange: (v: string) => void;
  isHalal: boolean;
  onIsHalalChange: (v: boolean) => void;
  minRating: string;
  onMinRatingChange: (v: string) => void;
  location: string;
  onLocationChange: (v: string) => void;
  lat: string;
  onLatChange: (v: string) => void;
  lon: string;
  onLonChange: (v: string) => void;
  onReset: () => void;
}

export default function FilterPanel({
  cuisines,
  onCuisinesChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  isHalal,
  onIsHalalChange,
  minRating,
  onMinRatingChange,
  location,
  onLocationChange,
  lat,
  onLatChange,
  lon,
  onLonChange,
  onReset,
}: FilterPanelProps) {
  const toggleCuisine = (cuisine: string) => {
    if (cuisines.includes(cuisine)) {
      onCuisinesChange(cuisines.filter((c) => c !== cuisine));
    } else {
      onCuisinesChange([...cuisines, cuisine]);
    }
  };
  return (
    <div className="border rounded-lg p-4 space-y-4 bg-muted/30">
      {/* Location */}
      <LocationInput
        location={location}
        onLocationChange={onLocationChange}
        lat={lat}
        lon={lon}
        onLocationSelect={(latitude, longitude) => {
          onLatChange(latitude.toString());
          onLonChange(longitude.toString());
        }}
      />

      {/* Cuisine chips */}
      <div>
        <p className="text-sm font-medium mb-2">Cuisines</p>
        <div className="flex flex-wrap gap-2">
          {CUISINE_OPTIONS.map((c) => (
            <button
              key={c}
              onClick={() => toggleCuisine(c)}
              className={cn(
                "px-3 py-1 rounded-full text-sm border transition-colors",
                cuisines.includes(c)
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

      {/* Minimum rating */}
      <div>
        <p className="text-sm font-medium mb-2">Minimum Rating</p>
        <select
          value={minRating}
          onChange={(e) => onMinRatingChange(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All ratings</option>
          <option value="1">1★ and up</option>
          <option value="2">2★ and up</option>
          <option value="3">3★ and up</option>
          <option value="4">4★ and up</option>
          <option value="5">5★ only</option>
        </select>
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
