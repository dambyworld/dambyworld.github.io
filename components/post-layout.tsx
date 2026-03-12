import Link from "next/link";
import { formatDate, type Post } from "@/lib/content";

type PostLayoutProps = {
  post: Post;
  html: string;
};

export function PostLayout({ post, html }: PostLayoutProps) {
  return (
    <div className="post-layout">
      <article className="content-card fade-in">
        <p className="eyebrow">{post.section}</p>
        <h1>{post.title}</h1>
        <div className="meta-row post-meta">
          <span>{formatDate(post.date)}</span>
          <span>{post.category}</span>
          <span>{post.language}</span>
        </div>
        <p className="muted">{post.description}</p>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          style={{ marginTop: 24 }}
        />
      </article>
      <aside className="sidebar-card fade-in delay-1">
        <p className="eyebrow">metadata</p>
        <ul className="simple-list">
          <li>
            <strong>Category</strong>
            <div>{post.category}</div>
          </li>
          <li>
            <strong>Tags</strong>
            <div className="tag-row" style={{ marginTop: 10 }}>
              {post.tags.map((tag) => (
                <Link key={tag} className="chip-link" href={`/tags/${tag}`}>
                  #{tag}
                </Link>
              ))}
            </div>
          </li>
          <li>
            <strong>Section</strong>
            <div>{post.section}</div>
          </li>
        </ul>
      </aside>
    </div>
  );
}
