import { notFound } from "next/navigation";
import api from "@/lib/api";
import type User from "@/types/user.types";
import type Activity from "@/types/activity.types";
import type { SpringPageResponse } from "@/types/spring.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityCard from "@/components/activity/activity-card";

async function fetchUser(id: string) {
  try {
    return await api.get<User>(`/users/${id}`);
  } catch {
    return null;
  }
}

async function fetchUserActivities(userId: string) {
  try {
    const response = await api.get<SpringPageResponse<Activity[]>>(
      `/activities?userId=${userId}&page=0&size=10&sort=createdAt,desc`
    );
    return response.content || [];
  } catch {
    return [];
  }
}

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [user, activities] = await Promise.all([
    fetchUser(id),
    fetchUserActivities(id),
  ]);

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{user.username}</h1>
        <p className="text-muted-foreground mt-2">{user.bio || "No bio yet"}</p>
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
              Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {user.googleId ? "OAuth" : "Local"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>User account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Username</p>
            <p className="font-medium">{user.username}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          {user.bio && (
            <div>
              <p className="text-sm text-muted-foreground">Bio</p>
              <p className="font-medium">{user.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {activities.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Recent Activity</h2>
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}
