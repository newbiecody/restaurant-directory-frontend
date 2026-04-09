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
import DetailedImageCard from "@/components/custom/image-card/detailed-image-card";

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

  const debouncedSearch = useDebounce(searchTerm, 400);

  // Update URL when search/sort changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) {
      params.set("name", debouncedSearch);
    }
    if (sort !== "simpleRating,desc") {
      params.set("sort", sort);
    }
    const queryString = params.toString();
    const newUrl = queryString ? `/explore?${queryString}` : "/explore";
    router.replace(newUrl);
  }, [debouncedSearch, sort, router]);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["dishes", "explore", debouncedSearch, sort],
    queryFn: async ({ pageParam = 0 }) => {
      let url = `/dishes?page=${pageParam}&size=12&sort=${sort}`;
      if (debouncedSearch) {
        url += `&name=${encodeURIComponent(debouncedSearch)}`;
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
      </div>

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
            <DetailedImageCard
              key={dish.id}
              src={dish.reviewPhotos?.[0]?.photoUrl ?? "/placeholder-dish.jpg"}
              alt={dish.name}
              title={dish.name}
              href={`/dish/${dish.id}`}
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
