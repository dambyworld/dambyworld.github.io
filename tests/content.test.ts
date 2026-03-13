import { describe, expect, it } from "vitest";
import {
  getAllPosts,
  getCategoryMap,
  getFeaturedPosts,
  getPostsBySection,
  getTagMap
} from "@/lib/content";

describe("content collections", () => {
  it("loads posts for each section", () => {
    expect(getPostsBySection("diary").length).toBeGreaterThan(0);
    expect(getPostsBySection("tweet").length).toBeGreaterThan(0);
    expect(getPostsBySection("review").length).toBeGreaterThan(0);
  });

  it("sorts newest posts first", () => {
    const posts = getPostsBySection("diary");
    expect(posts[0]?.slug).toBe("introducing-the-archive");
  });

  it("builds tag and category maps", () => {
    expect(getTagMap().has("github-pages")).toBe(true);
    expect(getCategoryMap().has("frontend")).toBe(true);
  });

  it("returns featured posts", () => {
    const featured = getFeaturedPosts();
    expect(featured.diary?.slug).toBeTruthy();
    expect(featured.tweet?.slug).toBeTruthy();
    expect(featured.review?.slug).toBeTruthy();
    expect(getAllPosts().length).toBeGreaterThanOrEqual(6);
  });

  it("supports top-level section directories for future content drops", () => {
    expect(() => getPostsBySection("tweet")).not.toThrow();
  });
});
