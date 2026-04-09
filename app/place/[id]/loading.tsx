import { Skeleton } from "@/components/ui/skeleton";

export default function RestaurantLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Restaurant Header Skeleton */}
      <div className="border rounded-lg p-6 space-y-4 bg-muted/50">
        <div className="flex items-start gap-4">
          <Skeleton className="w-24 h-24 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3 mt-2" />
          </div>
        </div>
      </div>

      {/* Dishes Section Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>

        {/* Grid of Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
