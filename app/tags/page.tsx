import Link from "next/link";
import { getTagMap } from "@/lib/content";

export default function TagsPage() {
  const tagMap = [...getTagMap().entries()];

  return (
    <section className="content-card fade-in" style={{ marginTop: 28 }}>
      <p className="eyebrow">Tags</p>
      <h1>Browse by tag</h1>
      <div className="tag-row">
        {tagMap.map(([tag, posts]) => (
          <Link key={tag} className="chip-link" href={`/tags/${tag}`}>
            #{tag} ({posts.length})
          </Link>
        ))}
      </div>
    </section>
  );
}
