"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export type DietaryPreference = "vegetarian" | "vegan" | "glutenFree" | "dairyFree" | "nutFree";

const DIETARY_OPTIONS: { id: DietaryPreference; label: string; emoji: string }[] = [
  { id: "vegetarian", label: "Vegetarian", emoji: "🥬" },
  { id: "vegan", label: "Vegan", emoji: "🌱" },
  { id: "glutenFree", label: "Gluten-Free", emoji: "🌾" },
  { id: "dairyFree", label: "Dairy-Free", emoji: "🥛" },
  { id: "nutFree", label: "Nut-Free", emoji: "🥜" },
];

interface DietaryPreferencesProps {
  preferences: DietaryPreference[];
  onChange: (preferences: DietaryPreference[]) => void;
}

export default function DietaryPreferences({
  preferences,
  onChange,
}: DietaryPreferencesProps) {
  const [open, setOpen] = useState(false);

  const togglePreference = (id: DietaryPreference) => {
    if (preferences.includes(id)) {
      onChange(preferences.filter((p) => p !== id));
    } else {
      onChange([...preferences, id]);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
        >
          Dietary
          {preferences.length > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-600 text-white text-xs font-medium">
              {preferences.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Dietary Preferences</SheetTitle>
        </SheetHeader>
        <div className="space-y-3 mt-4">
          {DIETARY_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => togglePreference(option.id)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                preferences.includes(option.id)
                  ? "border-orange-600 bg-orange-50"
                  : "border-muted-foreground hover:border-orange-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{option.emoji}</span>
                <span className="font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Selected preferences help us suggest suitable dishes and filters.
        </p>
      </SheetContent>
    </Sheet>
  );
}
