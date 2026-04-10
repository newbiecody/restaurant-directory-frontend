"use client";

import { useState } from "react";
import { Heart, Share } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/api";
import { useUser } from "@/context/user-context";

interface DishInteractiveSectionProps {
  dishId: number;
  dishName: string;
}

export default function DishInteractiveSection({
  dishId,
  dishName,
}: DishInteractiveSectionProps) {
  const { user } = useUser();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookmark = async () => {
    if (!user) {
      toast.error("Please sign in to bookmark");
      return;
    }

    setIsLoading(true);
    try {
      if (isBookmarked) {
        // Delete bookmark
        await api.delete(`/bookmarks?dishId=${dishId}`);
        toast.success("Removed from bookmarks");
      } else {
        // Add bookmark
        await api.post("/bookmarks", { dishId });
        toast.success("Added to bookmarks!");
      }
      setIsBookmarked(!isBookmarked);
    } catch {
      toast.error("Failed to update bookmark");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/dish/${dishId}`;
    const text = `Check out this amazing dish: ${dishName}!`;

    if (navigator.share) {
      navigator.share({ title: dishName, text, url });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleBookmark}
        disabled={isLoading}
      >
        <Heart
          size={16}
          weight={isBookmarked ? "fill" : "regular"}
          className={isBookmarked ? "text-orange-600" : ""}
        />
        {isBookmarked ? "Bookmarked" : "Bookmark"}
      </Button>

      <Button variant="outline" size="sm" onClick={handleShare}>
        <Share size={16} />
        Share
      </Button>
    </div>
  );
}
