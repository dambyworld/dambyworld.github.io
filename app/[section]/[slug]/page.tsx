import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostLayout } from "@/components/post-layout";
import { getPost, renderMarkdown, getPostsBySection, sections, type Section } from "@/lib/content";

export function generateStaticParams() {
  return sections.flatMap((section) =>
    getPostsBySection(section).map((post) => ({
      section,
      slug: post.slug
    }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ section: string; slug: string }>;
}): Promise<Metadata> {
  const { section, slug } = await params;
  if (!sections.includes(section as Section)) {
    return {};
  }

  const post = getPost(section as Section, slug);
  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description
  };
}

export default async function PostPage({
  params
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  if (!sections.includes(section as Section)) {
    notFound();
  }

  const post = getPost(section as Section, slug);
  if (!post) {
    notFound();
  }

  const html = await renderMarkdown(post.content);

  return <PostLayout post={post} html={html} />;
}
