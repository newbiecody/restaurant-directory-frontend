"use client";

import { useState } from "react";
import type Review from "@/types/review.types";
import type User from "@/types/user.types";
import { timeAgo } from "@/lib/utils/time";
import Link from "next/link";
import { Star, Trash } from "@phosphor-icons/react/ssr";
import { toast } from "sonner";

interface ReviewContentProps {
  reviews: Review[];
  currentUser?: User | null;
  onDeleteReview?: (reviewId: number) => Promise<void>;
}

export default function ReviewContent({ reviews, currentUser, onDeleteReview }: ReviewContentProps) {
  const [deletingReviewId, setDeletingReviewId] = useState<number | null>(null);

  const handleDeleteReview = async (reviewId: number) => {
    if (!onDeleteReview || !window.confirm("Are you sure you want to delete this review?")) return;

    setDeletingReviewId(reviewId);
    try {
      await onDeleteReview(reviewId);
      toast.success("Review deleted successfully");
    } catch (_error) {
      toast.error("Failed to delete review");
    } finally {
      setDeletingReviewId(null);
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const canDelete =
          currentUser?.id === review.user.id || currentUser?.isAdmin === true;

        return (
          <div key={review.id} className="border rounded-lg p-4 space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Link
                  href={`/user/overview/${review.user.id}`}
                  className="font-semibold hover:underline"
                >
                  {review.user.username}
                </Link>
                <p className="text-sm text-muted-foreground">{timeAgo(review.created_at)}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      weight={i < review.rating ? "fill" : "regular"}
                      className="text-orange-600"
                    />
                  ))}
                </div>
                {canDelete && (
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    disabled={deletingReviewId === review.id}
                    className="p-2 hover:bg-destructive/10 rounded transition-colors"
                  >
                    <Trash size={16} className="text-destructive" />
                  </button>
                )}
              </div>
            </div>

            <p className="text-sm">{review.comment}</p>

            {review.reviewPhotos && review.reviewPhotos.length > 0 && (
              <div className="flex gap-2 mt-3">
                {review.reviewPhotos.map((photo) => (
                  <img
                    key={photo.photoId}
                    src={photo.photoUrl}
                    alt="Review photo"
                    className="w-20 h-20 rounded object-cover"
                  />
                ))}
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              {review.reviewVotes?.length || 0} helpful
            </div>
          </div>
        );
      })}
    </div>
  );
}
