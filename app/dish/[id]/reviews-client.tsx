"use client";

import type Review from "@/types/review.types";
import { useUser } from "@/context/user-context";
import { useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import ReviewContent from "@/components/dish/review-content";

interface ReviewsClientProps {
  reviews: Review[];
  dishId: number;
}

export default function ReviewsClient({ reviews, dishId }: ReviewsClientProps) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const handleDeleteReview = async (reviewId: number) => {
    await api.delete(`/reviews/${reviewId}`);
    queryClient.invalidateQueries({
      queryKey: ["dish", dishId.toString()],
    });
  };

  return (
    <ReviewContent
      reviews={reviews}
      currentUser={user}
      onDeleteReview={handleDeleteReview}
    />
  );
}
