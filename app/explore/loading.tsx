import { Skeleton } from "@/components/ui/skeleton";

export default function ExploreLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Explore</h1>
        <p className="text-muted-foreground">Loading dishes...</p>
      </div>

      {/* Search and Sort Skeleton */}
      <div className="flex flex-col md:flex-row gap-3">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 md:w-48" />
      </div>

      {/* Result Count Skeleton */}
      <Skeleton className="h-4 w-48" />

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
  );
}
