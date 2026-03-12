import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostList } from "@/components/post-list";
import { getPostsBySection, sections, type Section } from "@/lib/content";

const sectionCopy: Record<Section, { title: string; description: string }> = {
  diary: {
    title: "Diary",
    description: "길게 설명하는 실험 기록과 구현 메모를 모아둔 섹션이에요."
  },
  tweet: {
    title: "Tweet",
    description: "짧은 메모, 링크, 아이디어 스냅샷을 빠르게 남기는 섹션이에요."
  },
  review: {
    title: "Review",
    description: "회고, 설계 판단, 도입 후 평가를 정리하는 섹션이에요."
  }
};

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  if (!sections.includes(section as Section)) {
    return {};
  }

  return {
    title: sectionCopy[section as Section].title,
    description: sectionCopy[section as Section].description
  };
}

export default async function SectionPage({
  params
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!sections.includes(section as Section)) {
    notFound();
  }

  const typedSection = section as Section;
  const posts = getPostsBySection(typedSection);

  return (
    <section className="content-card fade-in" style={{ marginTop: 28 }}>
      <p className="eyebrow">{typedSection}</p>
      <h1>{sectionCopy[typedSection].title}</h1>
      <p className="muted">{sectionCopy[typedSection].description}</p>
      <PostList posts={posts} />
    </section>
  );
}
