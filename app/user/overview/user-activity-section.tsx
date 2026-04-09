"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { SpringPageResponse } from "@/types/spring.types";
import type Activity from "@/types/activity.types";
import ActivityCard from "@/components/activity/activity-card";

interface UserActivitySectionProps {
  userId: string;
}

export default function UserActivitySection({ userId }: UserActivitySectionProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userActivity", userId],
    queryFn: async () => {
      const response = await api.get<SpringPageResponse<Activity[]>>(
        `/activities?userId=${userId}&page=0&size=10&sort=createdAt,desc`
      );
      return response.content || [];
    },
  });

  const activities = data || [];

  if (isLoading) {
    return <p className="text-muted-foreground">Loading activity...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Failed to load activity</p>;
  }

  if (activities.length === 0) {
    return <p className="text-muted-foreground">No activity yet</p>;
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
