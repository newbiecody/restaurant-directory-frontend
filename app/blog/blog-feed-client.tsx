"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import type { SpringPageResponse } from "@/types/spring.types";
import type Blog from "@/types/blog.types";
import BlogFeedCard from "@/components/blog/blog-feed-card";
import InfiniteList from "@/components/custom/infinite-list/infinite-list";
import { useUser } from "@/context/user-context";
import { toast } from "sonner";

export default function BlogFeedClient() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: async ({ pageParam = 0 }) => {
      return api.get<SpringPageResponse<Blog[]>>(
        `/blogs?page=${pageParam}&size=10&sort=createdAt,desc`
      );
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
    initialPageParam: 0,
  });

  const blogs = data?.pages.flatMap((page) => page.content) || [];

  const handleDeleteBlog = async (blogId: number) => {
    try {
      await api.delete(`/blogs/${blogId}`);
      toast.success("Blog deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    } catch (_error) {
      toast.error("Failed to delete blog");
    }
  };

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load blogs</p>
      </div>
    );
  }

  return (
    <InfiniteList
      items={blogs}
      keyExtractor={(blog) => blog.id}
      renderItem={(blog) => (
        <BlogFeedCard
          blog={blog}
          canDelete={user?.id === blog.author.id || user?.isAdmin === true}
          onDelete={handleDeleteBlog}
        />
      )}
      isLoading={isLoading}
      hasMore={hasNextPage ?? false}
      onLoadMore={() => fetchNextPage()}
    />
  );
}
