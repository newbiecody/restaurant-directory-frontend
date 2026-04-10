"use client";

import { useState } from "react";
import { Heart } from "@phosphor-icons/react/ssr";
import DetailedImageCard from "./detailed-image-card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/api";
import { useUser } from "@/context/user-context";
import type React from "react";

interface BookmarkableImageCardProps {
  src: string;
  alt: string;
  title: string;
  href: string;
  dishId: number;
  footer?: React.ReactNode;
  className?: string;
  imageClassName?: string;
}

export default function BookmarkableImageCard({
  src,
  alt,
  title,
  href,
  dishId,
  footer,
  className,
  imageClassName,
}: BookmarkableImageCardProps) {
  const { user } = useUser();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please sign in to bookmark");
      return;
    }

    setIsLoading(true);
    try {
      if (isBookmarked) {
        await api.delete(`/bookmarks?dishId=${dishId}`);
        toast.success("Removed from bookmarks");
      } else {
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

  return (
    <div
      className="relative group"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <DetailedImageCard
        src={src}
        alt={alt}
        title={title}
        href={href}
        footer={footer}
        className={className}
        imageClassName={imageClassName}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={handleBookmark}
        disabled={isLoading}
        className={`absolute top-2 right-2 transition-opacity ${
          showButton ? "opacity-100" : "opacity-0"
        } bg-white/80 hover:bg-white`}
      >
        <Heart
          size={18}
          weight={isBookmarked ? "fill" : "regular"}
          className={isBookmarked ? "text-orange-600" : ""}
        />
      </Button>
    </div>
  );
}
