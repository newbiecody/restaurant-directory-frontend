"use client";

import { Button } from "@/components/ui/button";

interface QuickFiltersProps {
  onApplyPreset: (
    cuisines: string[],
    minPrice?: string,
    maxPrice?: string,
    minRating?: string
  ) => void;
}

const FILTER_PRESETS = [
  {
    label: "Budget-Friendly",
    description: "Under $10",
    cuisines: [],
    minPrice: "0",
    maxPrice: "10",
    minRating: "",
  },
  {
    label: "Top Rated",
    description: "4★ and above",
    cuisines: [],
    minPrice: "",
    maxPrice: "",
    minRating: "4",
  },
  {
    label: "Vegetarian",
    description: "Common veggie cuisines",
    cuisines: ["Indian", "Mediterranean", "Thai", "Mexican"],
    minPrice: "",
    maxPrice: "",
    minRating: "",
  },
  {
    label: "Asian",
    description: "Asian cuisines",
    cuisines: ["Chinese", "Japanese", "Thai", "Vietnamese"],
    minPrice: "",
    maxPrice: "",
    minRating: "",
  },
  {
    label: "Halal",
    description: "Halal certified",
    cuisines: [],
    minPrice: "",
    maxPrice: "",
    minRating: "",
  },
];

export default function QuickFilters({ onApplyPreset }: QuickFiltersProps) {
  const handlePresetClick = (preset: (typeof FILTER_PRESETS)[0]) => {
    onApplyPreset(
      preset.cuisines,
      preset.minPrice,
      preset.maxPrice,
      preset.minRating
    );
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Quick Filters</p>
      <div className="flex flex-wrap gap-2">
        {FILTER_PRESETS.map((preset) => (
          <Button
            key={preset.label}
            variant="outline"
            size="sm"
            onClick={() => handlePresetClick(preset)}
            className="flex flex-col items-start h-auto py-2 px-3"
          >
            <span className="font-medium text-xs">{preset.label}</span>
            <span className="text-xs text-muted-foreground">
              {preset.description}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
