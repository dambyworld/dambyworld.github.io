import Link from "next/link";
import { PostList } from "@/components/post-list";
import { getAllPosts, getFeaturedPosts, getTagMap } from "@/lib/content";

export default function HomePage() {
  const featured = getFeaturedPosts();
  const latestPosts = getAllPosts().slice(0, 4);
  const tags = [...getTagMap().entries()].slice(0, 6);

  return (
    <>
      <section className="hero-grid">
        <div className="hero-card fade-in">
          <p className="eyebrow">GitHub Pages Technical Blog</p>
          <h2 className="hero-title">A quiet archive for code, failures, and repeatable fixes.</h2>
          <p className="hero-meta">
            코프링 (kopring) 실험, 프론트엔드 구조화, 인프라 회고를 섹션별로 정리하는 정적
            블로그예요. 짧은 메모는 `tweet`, 긴 정리는 `diary`, 판단과 회고는 `review`에
            쌓아요.
          </p>
          <div className="hero-actions">
            <Link className="button-primary" href="/diary">
              Browse diary
            </Link>
            <Link className="button-secondary" href="/about">
              Read about
            </Link>
          </div>
        </div>
        <aside className="aside-card fade-in delay-1">
          <p className="eyebrow">Sections</p>
          <ul className="stat-list">
            <li>
              <strong>Diary</strong>
              <span>{featured.diary?.title ?? "No post yet"}</span>
            </li>
            <li>
              <strong>Tweet</strong>
              <span>{featured.tweet?.title ?? "No post yet"}</span>
            </li>
            <li>
              <strong>Review</strong>
              <span>{featured.review?.title ?? "No post yet"}</span>
            </li>
          </ul>
        </aside>
      </section>

      <section className="section-grid">
        <div className="section-panel fade-in delay-1">
          <p className="eyebrow">Diary</p>
          <h3 className="section-title">Long-form records</h3>
          <p>구조를 길게 설명하고, 다시 참고할 수 있게 실험과 결정 배경을 함께 남겨요.</p>
          <Link className="button-secondary" href="/diary">
            Open diary
          </Link>
        </div>
        <div className="section-panel fade-in delay-1">
          <p className="eyebrow">Tweet</p>
          <h3 className="section-title">Small observations</h3>
          <p>짧은 링크 메모, 작게 배운 점, 빠르게 공유할 만한 포인트를 모아둬요.</p>
          <Link className="button-secondary" href="/tweet">
            Open tweet
          </Link>
        </div>
        <div className="section-panel fade-in delay-2">
          <p className="eyebrow">Review</p>
          <h3 className="section-title">Postmortem and review</h3>
          <p>무엇을 선택했고 왜 바꿨는지, 결과와 트레이드오프까지 정리하는 공간이에요.</p>
          <Link className="button-secondary" href="/review">
            Open review
          </Link>
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <div className="section-panel fade-in delay-2">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <p className="eyebrow">Latest</p>
              <h3 className="section-title">Fresh entries</h3>
            </div>
            <div className="tag-row">
              {tags.map(([tag, posts]) => (
                <Link key={tag} className="chip-link" href={`/tags/${tag}`}>
                  #{tag} ({posts.length})
                </Link>
              ))}
            </div>
          </div>
          <PostList posts={latestPosts} />
        </div>
      </section>
    </>
  );
}
