"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/user-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserActivitySection from "./user-activity-section";
import UserStatistics from "@/components/custom/user/user-statistics";
import api from "@/lib/api";
import type Review from "@/types/review.types";
import type Bookmark from "@/types/bookmark.types";
import type { SpringPageResponse } from "@/types/spring.types";

export default function UserOverviewContent() {
  const { user } = useUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [reviewsRes, bookmarksRes] = await Promise.all([
          api
            .get<SpringPageResponse<Review[]>>(
              `/reviews?userId=${user.id}&page=0&size=100`
            )
            .catch(() => ({ content: [] })),
          api
            .get<SpringPageResponse<Bookmark[]>>(`/bookmarks?page=0&size=100`)
            .catch(() => ({ content: [] })),
        ]);

        setReviews(reviewsRes.content || []);
        setBookmarkCount((bookmarksRes.content || []).length);
      } catch {
        // Silently fail
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Please sign in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <p className="text-muted-foreground mt-2">{user.bio || "No bio yet"}</p>
        </div>
        <Link href="/user/overview/edit">
          <Button variant="outline">Edit Profile</Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Member Since
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {new Date(user.createdAt).getFullYear()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{user.isAdmin ? "Admin" : "User"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-bold truncate">{user.email}</p>
          </CardContent>
        </Card>
      </div>

      {!isLoading && (
        <UserStatistics reviews={reviews} bookmarks={bookmarkCount} />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>View your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Username</p>
            <p className="font-medium">{user.username}</p>
          </div>
          {user.googleId && (
            <div>
              <p className="text-sm text-muted-foreground">Google ID</p>
              <p className="font-medium">{user.googleId}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Recent Activity</h2>
        <UserActivitySection userId={user.id} />
      </div>
    </div>
  );
}
