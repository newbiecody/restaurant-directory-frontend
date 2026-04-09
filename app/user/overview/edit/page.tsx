"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/api";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { useUser, useUserActions } from "@/context/user-context";
import type User from "@/types/user.types";

const editProfileSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  bio: z.string().max(300, "Bio must be 300 characters or less").optional(),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

export default function EditProfilePage() {
  useRequireAuth();
  const router = useRouter();
  const { user } = useUser();
  const { updateUser } = useUserActions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user?.username ?? "",
      bio: user?.bio ?? "",
    },
  });

  const onSubmit = async (data: EditProfileFormData) => {
    if (!user) {
      toast.error("User not found");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.put<User>(`/users/${user.id}`, {
        username: data.username,
        bio: data.bio || "",
      });
      updateUser({ username: data.username, bio: data.bio || "" });
      toast.success("Profile updated successfully!");
      router.push("/user/overview");
    } catch (_error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <p className="text-muted-foreground mt-2">Update your profile information</p>
      </div>

      <div className="space-y-4 border rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Username</label>
            <Input
              {...register("username")}
              type="text"
              placeholder="Your username"
              disabled={isSubmitting}
              className="mt-2"
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Bio</label>
            <textarea
              {...register("bio")}
              placeholder="Tell us about yourself (optional)"
              disabled={isSubmitting}
              maxLength={300}
              className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
              rows={4}
            />
            {errors.bio && (
              <p className="text-sm text-red-500 mt-1">{errors.bio.message}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {register("bio").name ? "0" : "0"}/300 characters
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            <Button onClick={() => router.back()} variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
