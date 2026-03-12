import Link from "next/link";
import { formatDate, type Post } from "@/lib/content";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card">
      <p className="eyebrow">{post.section}</p>
      <h3>
        <Link href={`/${post.section}/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="muted">{post.description}</p>
      <div className="meta-row list-meta">
        <span>{formatDate(post.date)}</span>
        <span>{post.category}</span>
        <span>{post.language}</span>
      </div>
      <div className="tag-row">
        {post.tags.map((tag) => (
          <Link key={tag} className="chip-link" href={`/tags/${tag}`}>
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
