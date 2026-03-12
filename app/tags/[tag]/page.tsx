import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostList } from "@/components/post-list";
import { getTagMap } from "@/lib/content";

export function generateStaticParams() {
  return [...getTagMap().keys()].map((tag) => ({ tag }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `#${tag} 태그로 분류한 글 목록`
  };
}

export default async function TagDetailPage({
  params
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = getTagMap().get(tag);

  if (!posts) {
    notFound();
  }

  return (
    <section className="content-card fade-in" style={{ marginTop: 28 }}>
      <p className="eyebrow">Tag archive</p>
      <h1>#{tag}</h1>
      <PostList posts={posts} />
    </section>
  );
}
