"use client";

import { useState } from "react";
import { Bookmark, X } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import type { SavedSearch } from "@/hooks/use-saved-searches";

interface SavedSearchesProps {
  searches: SavedSearch[];
  onLoadSearch: (search: SavedSearch) => void;
  onSaveCurrentSearch: (name: string) => void;
  onDeleteSearch: (id: string) => void;
}

export default function SavedSearches({
  searches,
  onLoadSearch,
  onSaveCurrentSearch,
  onDeleteSearch,
}: SavedSearchesProps) {
  const [open, setOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);

  const handleSave = () => {
    if (saveName.trim()) {
      onSaveCurrentSearch(saveName);
      setSaveName("");
      setShowSaveForm(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Bookmark size={16} />
          {searches.length > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-600 text-white text-xs font-medium">
              {searches.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Saved Searches</SheetTitle>
        </SheetHeader>
        <div className="space-y-3 mt-4">
          {showSaveForm ? (
            <div className="space-y-2">
              <Input
                placeholder="Search name (e.g., 'Budget Sushi')"
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSave();
                }}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave} className="flex-1">
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowSaveForm(false);
                    setSaveName("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => setShowSaveForm(true)}
            >
              Save Current Search
            </Button>
          )}

          {searches.length > 0 && (
            <div className="space-y-2 pt-2 border-t">
              {searches.map((search) => (
                <button
                  key={search.id}
                  onClick={() => {
                    onLoadSearch(search);
                    setOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-lg border border-muted-foreground hover:bg-muted transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{search.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {search.searchTerm || "All dishes"}
                        {search.cuisines.length > 0 &&
                          ` • ${search.cuisines.join(", ")}`}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSearch(search.id);
                      }}
                      className="flex-shrink-0 hover:text-destructive"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </button>
              ))}
            </div>
          )}

          {searches.length === 0 && !showSaveForm && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No saved searches yet
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
