import { Suspense } from "react";
import ActivityFeedClient from "./activity-feed-client";

export default function ActivityPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Activity Feed</h1>
        <p className="text-muted-foreground mt-2">See what's happening in the community</p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ActivityFeedClient />
      </Suspense>
    </div>
  );
}
