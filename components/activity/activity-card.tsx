"use client";

import type Activity from "@/types/activity.types";
import { timeAgo } from "@/lib/utils/time";
import Link from "next/link";

interface ActivityCardProps {
  activity: Activity;
}

function getActivityText(activity: Activity): string {
  switch (activity.actionType) {
    case "REVIEW_CREATED":
      return "left a review";
    case "REVIEW_DELETED":
      return "deleted a review";
    case "DISH_CREATED":
      return "created a new dish";
    case "DISH_DELETED":
      return "deleted a dish";
    case "BOOKMARK_CREATED":
      return "bookmarked a dish";
    case "BOOKMARK_DELETED":
      return "removed a bookmark";
    case "PLACE_CREATED":
      return "added a new restaurant";
    case "PLACE_UPDATED":
      return "updated a restaurant";
    case "PLACE_DELETED":
      return "deleted a restaurant";
    case "BLOG_CREATED":
      return "published a blog post";
    case "BLOG_DELETED":
      return "deleted a blog post";
    case "USER_UPDATED":
      return "updated their profile";
    default:
      return "did something";
  }
}

function getActivityLink(activity: Activity): string {
  switch (activity.actionType) {
    case "DISH_CREATED":
    case "REVIEW_CREATED":
    case "REVIEW_DELETED":
    case "BOOKMARK_CREATED":
    case "BOOKMARK_DELETED":
      return `/dish/${activity.targetId}`;
    case "PLACE_CREATED":
    case "PLACE_UPDATED":
    case "PLACE_DELETED":
      return `/place/${activity.targetId}`;
    case "BLOG_CREATED":
    case "BLOG_DELETED":
      return `/blog/${activity.targetId}`;
    case "USER_UPDATED":
      return `/user/overview/${activity.userId}`;
    default:
      return "#";
  }
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const text = getActivityText(activity);
  const link = getActivityLink(activity);

  return (
    <div className="border rounded-lg p-4 space-y-2 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
          {activity.user.username.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <p className="text-sm">
            <Link
              href={`/user/overview/${activity.user.id}`}
              className="font-semibold hover:underline"
            >
              {activity.user.username}
            </Link>{" "}
            {text}
          </p>
          <p className="text-xs text-muted-foreground">{timeAgo(activity.createdAt)}</p>
        </div>
      </div>

      <Link
        href={link}
        className="text-sm text-orange-600 hover:underline inline-block"
      >
        View →
      </Link>
    </div>
  );
}
