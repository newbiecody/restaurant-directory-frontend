"use client";

import Link from "next/link";
import type Blog from "@/types/blog.types";
import { Heart, Chat, Trash } from "@phosphor-icons/react/ssr";
import { timeAgo } from "@/lib/utils/time";
import { useState } from "react";

interface BlogFeedCardProps {
  blog: Blog;
  onDelete?: (id: number) => Promise<void>;
  canDelete?: boolean;
}

export default function BlogFeedCard({ blog, onDelete, canDelete = false }: BlogFeedCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete || !window.confirm("Are you sure you want to delete this blog?")) return;
    
    setIsDeleting(true);
    try {
      await onDelete(blog.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Link href={`/blog/${blog.id}`} className="hover:underline">
            <h3 className="text-lg font-semibold line-clamp-2">{blog.title}</h3>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">
            By {blog.author.username} • {timeAgo(blog.createdAt)}
          </p>
        </div>
        {canDelete && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 hover:bg-destructive/10 rounded transition-colors"
          >
            <Trash size={18} className="text-destructive" />
          </button>
        )}
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2">{blog.content}</p>

      <div className="flex gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Heart size={16} />
          <span>{blog.likes}</span>
        </div>
        <div className="flex items-center gap-1">
          <Chat size={16} />
          <span>{blog.comments}</span>
        </div>
      </div>
    </div>
  );
}
