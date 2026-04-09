import { Suspense } from "react";
import ExploreClient from "./explore-client";

export default function ExplorePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Explore</h1>
        <p className="text-muted-foreground mt-2">
          Search and discover dishes from all restaurants
        </p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ExploreClient />
      </Suspense>
    </div>
  );
}
