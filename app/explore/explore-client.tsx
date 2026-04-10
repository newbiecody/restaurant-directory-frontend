"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { SpringPageResponse } from "@/types/spring.types";
import type Dish from "@/types/dish.types";
import { useDebounce } from "@/hooks/use-debounce";
import SearchInput from "@/components/custom/search/search-input";
import SortSelect from "@/components/custom/search/sort-select";
import FilterPanel from "@/components/custom/search/filter-panel";
import BookmarkableImageCard from "@/components/custom/image-card/bookmarkable-image-card";
import { Button } from "@/components/ui/button";

export default function ExploreClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL params
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("name") ?? ""
  );
  const [sort, setSort] = useState(
    searchParams.get("sort") ?? "simpleRating,desc"
  );
  const [cuisines, setCuisines] = useState<string[]>(
    searchParams.get("cuisines")?.split(",").filter(Boolean) ?? []
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");
  const [isHalal, setIsHalal] = useState(
    searchParams.get("halal") === "true"
  );
  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [lat, setLat] = useState(searchParams.get("lat") ?? "");
  const [lon, setLon] = useState(searchParams.get("lon") ?? "");
  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 400);

  // Calculate active filter count
  const activeFilterCount =
    cuisines.length +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0) +
    (isHalal ? 1 : 0) +
    (lat && lon ? 1 : 0);

  // Update URL when search/sort/filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) {
      params.set("name", debouncedSearch);
    }
    if (sort !== "simpleRating,desc") {
      params.set("sort", sort);
    }
    if (cuisines.length > 0) {
      params.set("cuisines", cuisines.join(","));
    }
    if (minPrice) {
      params.set("minPrice", minPrice);
    }
    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }
    if (isHalal) {
      params.set("halal", "true");
    }
    if (location) {
      params.set("location", location);
    }
    if (lat) {
      params.set("lat", lat);
    }
    if (lon) {
      params.set("lon", lon);
    }
    const queryString = params.toString();
    const newUrl = queryString ? `/explore?${queryString}` : "/explore";
    router.replace(newUrl);
  }, [debouncedSearch, sort, cuisines, minPrice, maxPrice, isHalal, location, lat, lon, router]);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "dishes",
      "explore",
      debouncedSearch,
      sort,
      ...cuisines,
      minPrice,
      maxPrice,
      isHalal,
      lat,
      lon,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      let url = `/dishes?page=${pageParam}&size=12&sort=${sort}`;
      if (debouncedSearch) {
        url += `&name=${encodeURIComponent(debouncedSearch)}`;
      }
      cuisines.forEach((cuisine) => {
        url += `&cuisine=${encodeURIComponent(cuisine)}`;
      });
      if (minPrice) {
        url += `&minPrice=${minPrice}`;
      }
      if (maxPrice) {
        url += `&maxPrice=${maxPrice}`;
      }
      if (isHalal) {
        url += `&halal=true`;
      }
      if (lat) {
        url += `&latitude=${lat}`;
      }
      if (lon) {
        url += `&longitude=${lon}`;
      }
      return api.get<SpringPageResponse<Dish[]>>(url);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
    initialPageParam: 0,
  });

  const dishes = data?.pages.flatMap((page) => page.content) || [];
  const totalCount = data?.pages[0]?.totalElements ?? 0;

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load dishes</p>
      </div>
    );
  }

  const handleResetFilters = () => {
    setCuisines([]);
    setMinPrice("");
    setMaxPrice("");
    setIsHalal(false);
    setLocation("");
    setLat("");
    setLon("");
    setShowFilters(false);
  };

  return (
    <div className="space-y-6">
      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-3">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          className="flex-1"
          disabled={isLoading}
        />
        <SortSelect value={sort} onChange={setSort} disabled={isLoading} />
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          disabled={isLoading}
        >
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-600 text-white text-xs font-medium">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <FilterPanel
          cuisines={cuisines}
          onCuisinesChange={setCuisines}
          minPrice={minPrice}
          onMinPriceChange={setMinPrice}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          isHalal={isHalal}
          onIsHalalChange={setIsHalal}
          location={location}
          onLocationChange={setLocation}
          lat={lat}
          onLatChange={setLat}
          lon={lon}
          onLonChange={setLon}
          onReset={handleResetFilters}
        />
      )}

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {cuisines.map((cuisine) => (
            <FilterChip
              key={cuisine}
              label={cuisine}
              onRemove={() =>
                setCuisines(cuisines.filter((c) => c !== cuisine))
              }
            />
          ))}
          {(minPrice || maxPrice) && (
            <FilterChip
              label={`$${minPrice || "0"} – $${maxPrice || "∞"}`}
              onRemove={() => {
                setMinPrice("");
                setMaxPrice("");
              }}
            />
          )}
          {isHalal && (
            <FilterChip label="Halal" onRemove={() => setIsHalal(false)} />
          )}
          {(lat || lon) && (
            <FilterChip
              label={`📍 Near ${location || "your location"}`}
              onRemove={() => {
                setLocation("");
                setLat("");
                setLon("");
              }}
            />
          )}
        </div>
      )}

      {/* Result Count */}
      {!isLoading && (
        <p className="text-sm text-muted-foreground">
          {dishes.length === 0 && debouncedSearch
            ? "No dishes found matching your search"
            : `Showing ${dishes.length} of ${totalCount} dishes`}
        </p>
      )}

      {/* Empty State */}
      {dishes.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {debouncedSearch
              ? "Try a different search term"
              : "Browse all dishes by selecting a sort option"}
          </p>
        </div>
      )}

      {/* Results Grid */}
      {dishes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dishes.map((dish) => (
            <BookmarkableImageCard
              key={dish.id}
              src={dish.reviewPhotos?.[0]?.photoUrl ?? "/placeholder-dish.jpg"}
              alt={dish.name}
              title={dish.name}
              href={`/dish/${dish.id}`}
              dishId={dish.id}
              footer={
                <div className="space-y-1 text-xs">
                  {dish.description && (
                    <p className="text-muted-foreground line-clamp-1">
                      {dish.description}
                    </p>
                  )}
                  <div className="flex justify-between">
                    {dish.price && (
                      <span className="font-semibold">${dish.price}</span>
                    )}
                    {dish.simpleRating && (
                      <span className="text-yellow-600">★ {dish.simpleRating}</span>
                    )}
                  </div>
                </div>
              }
            />
          ))}
        </div>
      )}

      {/* Infinite Load Trigger */}
      {dishes.length > 0 && (
        <div className="flex justify-center py-4">
          {isLoading && (
            <p className="text-sm text-muted-foreground">Loading more...</p>
          )}
          {!isLoading && hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
            >
              Load More
            </button>
          )}
          {!hasNextPage && dishes.length > 0 && (
            <p className="text-xs text-muted-foreground">All dishes loaded</p>
          )}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-medium">
      {label}
      <button
        onClick={onRemove}
        className="hover:text-orange-600 ml-1 font-bold"
      >
        ✕
      </button>
    </span>
  );
}
