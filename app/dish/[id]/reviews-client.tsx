"use client";

import { useState, useMemo } from "react";
import type Review from "@/types/review.types";
import { useUser } from "@/context/user-context";
import { useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import ReviewContent from "@/components/dish/review-content";
import ReviewSortSelect from "./review-sort-select";

interface ReviewsClientProps {
  reviews: Review[];
  dishId: number;
}

export default function ReviewsClient({ reviews, dishId }: ReviewsClientProps) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [sortBy, setSortBy] = useState("createdAt,desc");

  const sortedReviews = useMemo(() => {
    const [field, direction] = sortBy.split(",");
    const sorted = [...reviews];

    sorted.sort((a, b) => {
      let aVal: any = a[field as keyof Review];
      let bVal: any = b[field as keyof Review];

      // Handle nested fields like createdAt vs created_at
      if (aVal === undefined && field === "createdAt") {
        aVal = a.created_at;
        bVal = b.created_at;
      }

      // Handle helpfulCount which comes from reviewVotes length
      if (field === "helpfulCount") {
        aVal = a.reviewVotes?.length || 0;
        bVal = b.reviewVotes?.length || 0;
      }

      if (aVal === undefined || bVal === undefined) {
        return 0;
      }

      if (typeof aVal === "string") {
        return direction === "desc"
          ? bVal.localeCompare(aVal)
          : aVal.localeCompare(bVal);
      }

      return direction === "desc" ? bVal - aVal : aVal - bVal;
    });

    return sorted;
  }, [reviews, sortBy]);

  const handleDeleteReview = async (reviewId: number) => {
    await api.delete(`/reviews/${reviewId}`);
    queryClient.invalidateQueries({
      queryKey: ["dish", dishId.toString()],
    });
  };

  return (
    <div className="space-y-4">
      {reviews.length > 0 && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{reviews.length} Review{reviews.length !== 1 ? "s" : ""}</h3>
          <ReviewSortSelect value={sortBy} onChange={setSortBy} />
        </div>
      )}
      <ReviewContent
        reviews={sortedReviews}
        currentUser={user}
        onDeleteReview={handleDeleteReview}
      />
    </div>
  );
}
