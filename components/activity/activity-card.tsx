import Link from "next/link";
import { Card } from "@/components/ui/card";
import type Activity from "@/types/activity.types";

export default function ActivityCard({ activity }: { activity: Activity }) {
  const getActivityText = () => {
    const userName = activity.actor.username;
    const subjectName = activity.subject.name;

    switch (activity.actionType) {
      case "REVIEW_CREATED":
        return `${userName} reviewed ${subjectName}`;
      case "REVIEW_UPDATED":
        return `${userName} updated their review of ${subjectName}`;
      case "DISH_CREATED":
        return `${userName} added ${subjectName}`;
      case "DISH_UPDATED":
        return `${userName} updated ${subjectName}`;
      case "RESTAURANT_CREATED":
        return `${userName} created ${subjectName}`;
      case "RESTAURANT_UPDATED":
        return `${userName} updated ${subjectName}`;
      case "USER_UPDATED":
        return `${userName} updated their profile`;
      case "USER_REPORTED":
        return `${userName} reported ${subjectName}`;
      default:
        return `${userName} did something with ${subjectName}`;
    }
  };

  const getActivityLink = () => {
    const { type, id } = activity.subject;
    if (type === "DISH") {
      return `/dish/${id}`;
    } else if (type === "PLACE") {
      return `/place/${id}`;
    } else if (type === "USER") {
      return `/user/overview/${id}`;
    }
    return "#";
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={activity.actor.avatarUrl}
            alt={activity.actor.username}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <Link
              href={getActivityLink()}
              className="font-medium text-sm hover:underline"
            >
              {getActivityText()}
            </Link>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(activity.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
