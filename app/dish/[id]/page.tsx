import { notFound } from "next/navigation";
import api from "@/lib/api";
import type Dish from "@/types/dish.types";
import type Review from "@/types/review.types";
import { SpringPageResponse } from "@/types/spring.types";
import ReviewsClient from "./reviews-client";
import DishInteractiveSection from "@/components/dish/dish-interactive-section";
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
    </div>
  );
}
