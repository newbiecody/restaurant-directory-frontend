import { notFound } from "next/navigation";
import api from "@/lib/api";
import type Dish from "@/types/dish.types";
import type Review from "@/types/review.types";
import type Restaurant from "@/types/restaurant.types";
import { SpringPageResponse } from "@/types/spring.types";
import ReviewsClient from "./reviews-client";
import DishInteractiveSection from "@/components/dish/dish-interactive-section";
import BookmarkableImageCard from "@/components/custom/image-card/bookmarkable-image-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function fetchDish(id: string) {
  try {
    return await api.get<Dish>(`/dishes/${id}`);
  } catch {
    return null;
  }
}

async function fetchReviews(dishId: string) {
  try {
    const response = await api.get<SpringPageResponse<Review[]>>(
      `/reviews?dishId=${dishId}&page=0&size=50&sort=created_at,desc`
    );
    return response.content || [];
  } catch {
    return [];
  }
}

async function fetchRestaurant(restaurantId: number) {
  try {
    return await api.get<Restaurant>(`/places/${restaurantId}`);
  } catch {
    return null;
  }
}

async function fetchSuggestedDishes(restaurantId: number, currentDishId: number) {
  try {
    const response = await api.get<SpringPageResponse<Dish[]>>(
      `/dishes?restaurantId=${restaurantId}&page=0&size=6&sort=simpleRating,desc`
    );
    // Filter out the current dish
    return (response.content || []).filter((d) => d.id !== currentDishId);
  } catch {
    return [];
  }
}

export default async function DishDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [dish, reviews] = await Promise.all([
    fetchDish(id),
    fetchReviews(id),
  ]);

  if (!dish) {
    notFound();
  }

  const [restaurant, suggestedDishes] = await Promise.all([
    fetchRestaurant(dish.restaurantId),
    fetchSuggestedDishes(dish.restaurantId, dish.id),
  ]);

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "N/A";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold">{dish.name}</h1>
          <p className="text-muted-foreground mt-2">{dish.description}</p>
          {restaurant && (
            <p className="text-sm text-muted-foreground mt-2">
              From{" "}
              <Link href={`/place/${restaurant.id}`} className="text-orange-600 hover:underline">
                {restaurant.name}
              </Link>
            </p>
          )}
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Rating</p>
            <p className="text-3xl font-bold">{avgRating}</p>
            <p className="text-xs text-muted-foreground">({reviews.length} reviews)</p>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-3xl font-bold">{dish.price ? `$${dish.price}` : "N/A"}</p>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="text-3xl font-bold">Available</p>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Your Rating</p>
            <p className="text-3xl font-bold">-</p>
            <Button size="sm" variant="outline" className="mt-2 w-full" asChild>
              <Link href={`/dish/${dish.id}/review`}>Add Review</Link>
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <DishInteractiveSection dishId={dish.id} dishName={dish.name} />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <ReviewsClient reviews={reviews} dishId={dish.id} />
      </div>

      {suggestedDishes.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">More from {restaurant?.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedDishes.map((suggestedDish) => (
              <BookmarkableImageCard
                key={suggestedDish.id}
                src={
                  suggestedDish.reviewPhotos?.[0]?.photoUrl ??
                  "/placeholder-dish.jpg"
                }
                alt={suggestedDish.name}
                title={suggestedDish.name}
                href={`/dish/${suggestedDish.id}`}
                dishId={suggestedDish.id}
                footer={
                  <div className="space-y-1 text-xs">
                    {suggestedDish.description && (
                      <p className="text-muted-foreground line-clamp-1">
                        {suggestedDish.description}
                      </p>
                    )}
                    <div className="flex justify-between">
                      {suggestedDish.price && (
                        <span className="font-semibold">${suggestedDish.price}</span>
                      )}
                      {suggestedDish.simpleRating && (
                        <span className="text-yellow-600">
                          ★ {suggestedDish.simpleRating}
                        </span>
                      )}
                    </div>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
