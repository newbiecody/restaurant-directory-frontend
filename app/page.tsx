import api from "@/lib/api";
import type { SpringPageResponse } from "@/types/spring.types";
import type Dish from "@/types/dish.types";
import { DishCatalogSection } from "@/components/custom/carousel/popular-dish-carousel";
import GreetingSection from "./greeting-section";
import HeroSearch from "./hero-search";

async function fetchDishes() {
  try {
    const response = await api.get<SpringPageResponse<Dish[]>>(
      "/dishes?page=0&size=20&sort=rating,desc"
    );
    return response.content || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const dishes = await fetchDishes();

  return (
    <div className="space-y-8">
      <GreetingSection />
      <HeroSearch />

      {dishes.length > 0 && (
        <>
          <DishCatalogSection dishes={dishes.slice(0, 10)} />
          <DishCatalogSection dishes={dishes.slice(10, 20)} />
        </>
      )}

      {dishes.length === 0 && (
        <p className="text-muted-foreground">No dishes available at the moment.</p>
      )}
    </div>
  );
}
