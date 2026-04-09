"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlass } from "@phosphor-icons/react/ssr";

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/explore?name=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-center max-w-2xl">
        Discover your next favorite dish
      </p>
      <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <MagnifyingGlass
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes, cuisines, or restaurants..."
            className="pl-9"
          />
        </div>
        <Button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700"
          disabled={!query.trim()}
        >
          Search
        </Button>
      </form>
    </div>
  );
}
