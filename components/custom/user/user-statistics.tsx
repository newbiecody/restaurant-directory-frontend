import type Review from "@/types/review.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserStatisticsProps {
  reviews?: Review[];
  bookmarks?: number;
}

const BADGES = [
  { id: "reviewer", label: "Reviewer", minCount: 1, icon: "⭐" },
  { id: "activeReviewer", label: "Active Reviewer", minCount: 5, icon: "🌟" },
  { id: "foodEnthusiast", label: "Food Enthusiast", minCount: 10, icon: "🍽️" },
  { id: "explorer", label: "Explorer", minCount: 20, icon: "🔍" },
  { id: "topContributor", label: "Top Contributor", minCount: 50, icon: "👑" },
];

export default function UserStatistics({
  reviews = [],
  bookmarks = 0,
}: UserStatisticsProps) {
  const reviewCount = reviews.length;
  const averageRating =
    reviewCount > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1)
      : "N/A";

  // Calculate earned badges
  const earnedBadges = BADGES.filter((badge) => reviewCount >= badge.minCount);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Reviews Written
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold">{reviewCount}</p>
              {averageRating !== "N/A" && (
                <p className="text-sm text-muted-foreground">
                  avg {averageRating}★
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Dishes Bookmarked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{bookmarks}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Contributions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{reviewCount + bookmarks}</p>
          </CardContent>
        </Card>
      </div>

      {earnedBadges.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex flex-col items-center gap-1 p-3 rounded-lg bg-orange-50 border border-orange-200"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="text-xs font-medium text-center">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
