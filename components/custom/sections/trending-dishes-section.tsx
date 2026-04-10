import api from "@/lib/api";
import type Dish from "@/types/dish.types";
import type { SpringPageResponse } from "@/types/spring.types";
import BookmarkableImageCard from "../image-card/bookmarkable-image-card";

export async function TrendingDishesSection() {
  try {
    const response = await api.get<SpringPageResponse<Dish[]>>(
      "/dishes?page=0&size=6&sort=simpleRating,desc"
    );
    const dishes = response.content || [];

    if (dishes.length === 0) {
      return null;
    }

    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Trending Dishes</h2>
          <p className="text-muted-foreground mt-1">
            Highly rated dishes from our community
          </p>
        </div>
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
                      <span className="text-yellow-600">
                        ★ {dish.simpleRating}
                      </span>
                    )}
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </div>
    );
  } catch {
    return null;
  }
}
