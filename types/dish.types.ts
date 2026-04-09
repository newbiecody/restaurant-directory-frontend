import type ReviewPhoto from "./photo.types";

export default interface Dish {
  id: number;
  restaurantId: number;
  name: string;
  description?: string;
  price?: number;
  simpleRating?: number;
  reviewPhotos?: ReviewPhoto[];
}
