import BlogFeedClient from "./blog-feed-client";

export default function BlogPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="text-muted-foreground mt-2">Read and discover restaurant stories</p>
      </div>
      <BlogFeedClient />
    </div>
  );
}
