import type { Post } from "@/lib/content";
import { PostCard } from "@/components/post-card";

type PostListProps = {
  posts: Post[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={`${post.section}-${post.slug}`} post={post} />
      ))}
    </div>
  );
}
