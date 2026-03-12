import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostList } from "@/components/post-list";
import { getCategoryMap } from "@/lib/content";

export function generateStaticParams() {
  return [...getCategoryMap().keys()].map((category) => ({ category }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  return {
    title: category,
    description: `${category} 카테고리 글 목록`
  };
}

export default async function CategoryDetailPage({
  params
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const posts = getCategoryMap().get(category);

  if (!posts) {
    notFound();
  }

  return (
    <section className="content-card fade-in" style={{ marginTop: 28 }}>
      <p className="eyebrow">Category archive</p>
      <h1>{category}</h1>
      <PostList posts={posts} />
    </section>
  );
}
