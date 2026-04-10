export function getMockReviewResponse() {
  const isSuccess = Math.random() < 0.5;

  if (isSuccess) {
    return {
      status: "success",
      message: "Review submitted successfully.",
      reviewId: "REV" + Math.floor(Math.random() * 900 + 100)
    };
  }

  return {
    status: "error",
    message: "Failed to submit review. Try again later."
  };
}
