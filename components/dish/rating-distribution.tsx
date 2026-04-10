import type Review from "@/types/review.types";

interface RatingDistributionProps {
  reviews: Review[];
}

export default function RatingDistribution({ reviews }: RatingDistributionProps) {
  // Calculate distribution
  const distribution = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  reviews.forEach((review) => {
    const rating = review.rating as keyof typeof distribution;
    if (rating >= 1 && rating <= 5) {
      distribution[rating]++;
    }
  });

  const total = reviews.length || 1;

  return (
    <div className="space-y-3">
      {([5, 4, 3, 2, 1] as const).map((rating) => (
        <div key={rating} className="flex items-center gap-3">
          <div className="flex items-center gap-1 w-12">
            <span className="text-sm font-medium">{rating}★</span>
          </div>
          <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-orange-600 h-full transition-all"
              style={{
                width: `${((distribution[rating] / total) * 100).toFixed(0)}%`,
              }}
            />
          </div>
          <span className="text-sm text-muted-foreground w-12 text-right">
            {distribution[rating]}
          </span>
        </div>
      ))}
    </div>
  );
}
