"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/hooks/use-require-auth";
import TextEditor from "@/components/custom/text-editor/text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/api";

export default function NewBlogPostPage() {
  useRequireAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/blogs", { title, content });
      toast.success("Blog post created successfully!");
      router.push("/blog");
    } catch {
      toast.error("Failed to create blog post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create a new blog post</h1>
        <p className="text-muted-foreground mt-2">Share your restaurant discoveries with others</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            placeholder="Enter blog post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            className="mt-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Content</label>
          <TextEditor
            placeholder="Write your blog post here..."
            value={content}
            onChange={setContent}
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
          <Button
            onClick={() => router.back()}
            variant="outline"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
