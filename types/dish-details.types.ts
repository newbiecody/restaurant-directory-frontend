import type Dish from "./dish.types";

export default interface DishDetails extends Dish {
  restaurantId: number;
  totalRating: number;
  ratingsCount: number;
  reviewDistributionSimple: Record<string, number>;
}
