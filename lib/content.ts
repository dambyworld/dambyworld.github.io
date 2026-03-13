import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export const sections = ["diary", "tweet", "review"] as const;
export type Section = (typeof sections)[number];

export type PostMeta = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  category: string;
  published: boolean;
  language: "ko" | "en" | "mixed";
  hero?: string;
};

export type Post = PostMeta & {
  slug: string;
  section: Section;
  content: string;
};

const contentRoot = path.join(process.cwd(), "src", "content");
const legacyContentRoots = [path.join(process.cwd())];

function getSectionDirs(section: Section) {
  return [path.join(contentRoot, section), ...legacyContentRoots.map((root) => path.join(root, section))];
}

function readPostFile(section: Section, fullPath: string): Post {
  const fileContent = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContent);
  const slug = path.basename(fullPath, ".md");

  return {
    slug,
    section,
    content,
    title: String(data.title),
    date: String(data.date),
    description: String(data.description),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    category: String(data.category),
    published: Boolean(data.published),
    language: (data.language as PostMeta["language"]) ?? "ko",
    hero: data.hero ? String(data.hero) : undefined
  };
}

export function getPostsBySection(section: Section): Post[] {
  const filesBySlug = new Map<string, string>();

  for (const dir of getSectionDirs(section)) {
    if (!fs.existsSync(dir)) {
      continue;
    }

    const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
    for (const file of files) {
      filesBySlug.set(file.replace(/\.md$/, ""), path.join(dir, file));
    }
  }

  return [...filesBySlug.values()]
    .map((fullPath) => readPostFile(section, fullPath))
    .filter((post) => post.published)
    .sort((left, right) => right.date.localeCompare(left.date));
}

export function getAllPosts(): Post[] {
  return sections.flatMap((section) => getPostsBySection(section));
}

export function getPost(section: Section, slug: string): Post | undefined {
  return getPostsBySection(section).find((post) => post.slug === slug);
}

export async function renderMarkdown(markdown: string) {
  const processed = await remark().use(html).process(markdown);
  return processed.toString();
}

export function getTagMap() {
  const map = new Map<string, Post[]>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      const current = map.get(tag) ?? [];
      current.push(post);
      map.set(tag, current);
    }
  }

  return new Map([...map.entries()].sort((a, b) => a[0].localeCompare(b[0])));
}

export function getCategoryMap() {
  const map = new Map<string, Post[]>();

  for (const post of getAllPosts()) {
    const current = map.get(post.category) ?? [];
    current.push(post);
    map.set(post.category, current);
  }

  return new Map([...map.entries()].sort((a, b) => a[0].localeCompare(b[0])));
}

export function getFeaturedPosts() {
  return {
    diary: getPostsBySection("diary")[0],
    tweet: getPostsBySection("tweet")[0],
    review: getPostsBySection("review")[0]
  };
}

export function formatDate(input: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "long"
  }).format(new Date(input));
}
