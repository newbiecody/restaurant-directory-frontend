export default interface Restaurant {
  id: number;
  name: string;
  address: string;
  cuisine?: string;
  isHalal?: boolean;
  lat?: number;
  lon?: number;
  openingHours?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  distance?: number;
  totalReviews?: number;
  averageRating?: number;
  logo?: string;
  rating?: number;
}
