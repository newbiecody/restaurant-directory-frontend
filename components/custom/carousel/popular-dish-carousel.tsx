import Carousel from "./custom-carousel";
import type Dish from "@/types/dish.types";
import DetailedImageCard from "../image-card/detailed-image-card";

export function DishCatalogSection({ dishes }: { dishes: Dish[] }) {
  return (
    <Carousel<Dish>
      title="Popular Dishes"
      initialItems={dishes}
      itemKey={(dish) => dish.id}
      renderItem={(dish) => (
        <DetailedImageCard
          src={dish.reviewPhotos?.[0]?.photoUrl || "/placeholder-dish.jpg"}
          alt={dish.name}
          title={dish.name}
          href={`/dish/${dish.id}`}
          footer={
            <div className="space-y-1">
              {dish.description && (
                <p className="text-xs line-clamp-1">{dish.description}</p>
              )}
              <div className="flex justify-between items-center">
                {dish.price && <span className="font-bold">${dish.price}</span>}
                {dish.simpleRating && (
                  <span className="text-xs">★ {dish.simpleRating}</span>
                )}
              </div>
            </div>
          }
        />
      )}
    />
  );
}
