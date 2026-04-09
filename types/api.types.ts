type GetRestaurantParams = {
  latitude: number;
  longitude: number;
  priceLow: number;
  priceHigh: number;
  isHalal: boolean;
  limit: number;
  offset: number;
  name: string;
  cuisineType: string;
  address: string;
  openingHours: string;
};
