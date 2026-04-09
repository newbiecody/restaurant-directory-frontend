"use client";

import { useRequireAuth } from "@/hooks/use-require-auth";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { SpringPageResponse } from "@/types/spring.types";
import type Bookmark from "@/types/bookmark.types";
import type Dish from "@/types/dish.types";
import { DishCatalogSection } from "@/components/custom/carousel/popular-dish-carousel";

export default function BookmarkedPage() {
  useRequireAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const bookmarks = await api.get<SpringPageResponse<Bookmark[]>>(
        "/bookmarks?page=0&size=100&sort=createdAt,desc"
      );

      // Fetch dishes for each bookmark
      const dishIds = bookmarks.content.map((b) => b.dishId);
      const dishPromises = dishIds.map((id) =>
        api.get<Dish>(`/dishes/${id}`).catch(() => null)
      );
      const dishes = (await Promise.all(dishPromises)).filter(
        (d) => d !== null
      ) as Dish[];

      return dishes;
    },
  });

  const dishes = data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Saved Dishes</h1>
        <p className="text-muted-foreground mt-2">Your collection of favorite dishes</p>
      </div>

      {isLoading && <p className="text-center text-muted-foreground">Loading...</p>}
      {isError && <p className="text-center text-red-500">Failed to load bookmarks</p>}
      {!isLoading && dishes.length === 0 && (
        <p className="text-center text-muted-foreground">No bookmarked dishes yet</p>
      )}

      {dishes.length > 0 && <DishCatalogSection dishes={dishes} />}
    </div>
  );
}
