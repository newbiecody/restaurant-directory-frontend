"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/api";

export default function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  useRequireAuth();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Comment is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const { id } = await params;
      
      // Create review
      const formData = new FormData();
      formData.append("dishId", id);
      formData.append("rating", rating.toString());
      formData.append("comment", comment);

      // Add photos if present
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formData.append("photos", files[i]);
        }
      }

      await api.post("/reviews", {
        dishId: parseInt(id),
        rating,
        comment,
      });

      toast.success("Review submitted successfully!");
      router.push(`/dish/${id}`);
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Write a Review</h1>
        <p className="text-muted-foreground mt-2">Share your experience with this dish</p>
      </div>

      <div className="space-y-4 border rounded-lg p-6">
        <div>
          <label className="text-sm font-medium">Rating</label>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => setRating(value)}
                className={`w-10 h-10 rounded border text-lg ${
                  rating >= value
                    ? "bg-orange-600 text-white border-orange-600"
                    : "border-muted-foreground text-muted-foreground"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this dish..."
            className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
            rows={5}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Photos (optional)</label>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(e.target.files)}
            disabled={isSubmitting}
            className="mt-2"
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !comment.trim()}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
          <Button onClick={() => router.back()} variant="outline" disabled={isSubmitting}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
