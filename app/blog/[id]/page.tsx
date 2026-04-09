import { notFound } from "next/navigation";
import api from "@/lib/api";
import type Blog from "@/types/blog.types";
import SanitizedBlogContent from "./sanitized-blog-content";
import { timeAgo } from "@/lib/utils/time";

async function fetchBlog(id: string) {
  try {
    return await api.get<Blog>(`/blogs/${id}`);
  } catch {
    return null;
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await fetchBlog(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <article className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>By {blog.author.username}</p>
            <p>{timeAgo(blog.createdAt)}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <SanitizedBlogContent content={blog.content} />
        </div>
      </article>
    </div>
  );
}
