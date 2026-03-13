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
  const fallbackDate = inferDateFromSlug(slug) ?? new Date().toISOString().slice(0, 10);
  const fallbackTitle = inferTitle(content, slug);
  const fallbackDescription = inferDescription(content, fallbackTitle);

  return {
    slug,
    section,
    content,
    title: typeof data.title === "string" && data.title.trim() ? data.title : fallbackTitle,
    date: typeof data.date === "string" && data.date.trim() ? data.date : fallbackDate,
    description:
      typeof data.description === "string" && data.description.trim()
        ? data.description
        : fallbackDescription,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    category:
      typeof data.category === "string" && data.category.trim() ? data.category : section,
    published: typeof data.published === "boolean" ? data.published : true,
    language: (data.language as PostMeta["language"]) ?? "ko",
    hero: data.hero ? String(data.hero) : undefined
  };
}

function inferDateFromSlug(slug: string) {
  const isoMatch = slug.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
  }

  const monthDayMatch = slug.match(/^(\d{1,2})-(\d{1,2})$/);
  if (!monthDayMatch) {
    return undefined;
  }

  const year = new Date().getFullYear();
  const month = monthDayMatch[1].padStart(2, "0");
  const day = monthDayMatch[2].padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function inferTitle(content: string, slug: string) {
  const firstLine = content
    .split("\n")
    .map((line) => line.replace(/^#+\s*/, "").trim())
    .find(Boolean);

  if (firstLine) {
    return firstLine.slice(0, 80);
  }

  return slug;
}

function inferDescription(content: string, title: string) {
  const normalized = content.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return title;
  }

  return normalized.slice(0, 140);
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
