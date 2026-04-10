import { notFound } from "next/navigation";
import api from "@/lib/api";
import type Restaurant from "@/types/restaurant.types";
import type Dish from "@/types/dish.types";
import type { SpringPageResponse } from "@/types/spring.types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookmarkableImageCard from "@/components/custom/image-card/bookmarkable-image-card";

async function fetchRestaurant(id: string) {
  try {
    return await api.get<Restaurant>(`/places/${id}`);
  } catch {
    return null;
  }
}

async function fetchRestaurantDishes(id: string) {
  try {
    const response = await api.get<SpringPageResponse<Dish[]>>(
      `/dishes?restaurantId=${id}&page=0&size=50&sort=simpleRating,desc`
    );
    return response.content || [];
  } catch {
    return [];
  }
}

export default async function RestaurantProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [restaurant, dishes] = await Promise.all([
    fetchRestaurant(id),
    fetchRestaurantDishes(id),
  ]);

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Restaurant Header */}
      <div className="border rounded-lg p-6 space-y-4 bg-muted/50">
        <div className="flex items-start gap-4">
          {restaurant.logo && (
            <img
              src={restaurant.logo}
              alt={restaurant.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
          )}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                {restaurant.cuisine && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Cuisine: {restaurant.cuisine}
                  </p>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  {restaurant.address}
                </p>
              </div>
              {restaurant.rating && (
                <div className="text-right">
                  <p className="text-2xl font-bold text-yellow-600">
                    ★ {restaurant.rating}
                  </p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dishes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Dishes</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {dishes.length} {dishes.length === 1 ? "dish" : "dishes"}
            </p>
          </div>
          <Link href="/dish/new" className="hidden md:block">
            <Button className="bg-orange-600 hover:bg-orange-700">
              Add Dish
            </Button>
          </Link>
        </div>

        {dishes.length === 0 && (
          <div className="text-center py-12 border rounded-lg">
            <p className="text-muted-foreground">
              No dishes from this restaurant yet.
            </p>
            <Link href="/dish/new">
              <Button variant="outline" className="mt-4">
                Be the first to add a dish
              </Button>
            </Link>
          </div>
        )}

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
      </div>
    </div>
  );
}
