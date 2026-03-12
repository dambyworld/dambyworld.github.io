import Link from "next/link";
import { getCategoryMap } from "@/lib/content";

export default function CategoriesPage() {
  const categories = [...getCategoryMap().entries()];

  return (
    <section className="content-card fade-in" style={{ marginTop: 28 }}>
      <p className="eyebrow">Categories</p>
      <h1>Browse by category</h1>
      <div className="tag-row">
        {categories.map(([category, posts]) => (
          <Link key={category} className="chip-link" href={`/categories/${category}`}>
            {category} ({posts.length})
          </Link>
        ))}
      </div>
    </section>
  );
}
