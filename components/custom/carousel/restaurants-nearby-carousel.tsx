"use client";

import CustomCarousel from "./custom-carousel";
import type Restaurant from "@/types/restaurant.types";

export function RestaurantSection({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  return (
    <CustomCarousel<Restaurant>
      title="Nearby Restaurants"
      initialItems={restaurants}
      itemKey={(res) => res.id}
      renderItem={(res) => (
        <div className="p-4 border rounded-xl">
          <img src={res.logo} alt={res.name} className="h-20 w-20" />
          <h3 className="font-bold">{res.name}</h3>
          <p className="text-sm">{res.address}</p>
        </div>
      )}
    />
  );
}
