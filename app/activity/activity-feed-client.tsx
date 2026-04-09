"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { SpringPageResponse } from "@/types/spring.types";
import type Activity from "@/types/activity.types";
import ActivityCard from "@/components/activity/activity-card";
import InfiniteList from "@/components/custom/infinite-list/infinite-list";

export default function ActivityFeedClient() {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["activities"],
    queryFn: async ({ pageParam = 0 }) => {
      return api.get<SpringPageResponse<Activity[]>>(
        `/activities?page=${pageParam}&size=20&sort=createdAt,desc`
      );
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
    initialPageParam: 0,
  });

  const activities = data?.pages.flatMap((page) => page.content) || [];

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load activities</p>
      </div>
    );
  }

  if (activities.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No activities yet. Follow users to see their actions!</p>
      </div>
    );
  }

  return (
    <InfiniteList
      items={activities}
      keyExtractor={(activity) => activity.id}
      renderItem={(activity) => <ActivityCard activity={activity} />}
      isLoading={isLoading}
      hasMore={hasNextPage ?? false}
      onLoadMore={() => fetchNextPage()}
    />
  );
}
