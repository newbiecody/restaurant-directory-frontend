import type { Metadata } from "next";
import api from "@/lib/api";
import type { BookmarkContent } from "@/types/bookmark.types";
import BookmarkableImageCard from "@/components/custom/image-card/bookmarkable-image-card";

export const metadata: Metadata = {
  title: "Bookmarked Dishes - Where to Next",
  description: "View your bookmarked dishes",
};

export default async function BookmarkedPage() {
  try {
    const response = await api.get<{
      content: BookmarkContent;
      pageable: unknown;
      totalPages: number;
      totalElements: number;
      last: boolean;
      first: boolean;
      number: number;
      size: number;
      numberOfElements: number;
      empty: boolean;
    }>("/bookmarks?page=0&size=100&sort=createdAt,desc");

    const dishes = response.content?.dish || [];

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Bookmarked Dishes</h1>
          <p className="text-muted-foreground mt-2">
            {dishes.length === 0
              ? "No bookmarked dishes yet"
              : `${dishes.length} bookmarked dishes`}
          </p>
        </div>

        {dishes.length > 0 ? (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Start bookmarking dishes to see them here
            </p>
          </div>
        )}
      </div>
    );
  } catch {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load bookmarked dishes</p>
      </div>
    );
  }
}
