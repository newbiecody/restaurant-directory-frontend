import type Dish from "./dish.types";
import type Restaurant from "./restaurant.types";

export interface BookmarkContent {
  dish: Dish[];
  restaurant: Restaurant[];
}

export default interface Bookmark {
  id: number;
  userId: number;
  dishId: number;
  createdAt: string;
}
