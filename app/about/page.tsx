export default function AboutPage() {
  return (
    <section className="about-grid">
      <article className="content-card fade-in">
        <p className="eyebrow">About the archive</p>
        <h1>Long memory for technical work</h1>
        <p>
          이 블로그는 한 번 해결한 문제를 다시 덜 헤매기 위해 만든 기술 아카이브예요.
          코프링 (kopring), 프론트엔드, 인프라 주제를 중심으로 실험과 회고를 정리해요.
        </p>
        <p>
          구조는 단순하지만, 글은 오래 남길 수 있게 설계했어요. 주소는 slug 중심으로
          유지하고, 날짜와 분류는 메타데이터와 탐색 UI에서 보여줘요.
        </p>
      </article>
      <aside className="sidebar-card fade-in delay-1">
        <p className="eyebrow">Profile</p>
        <ul className="simple-list">
          <li>
            <strong>Writer</strong>
            <div>dambyworld</div>
          </li>
          <li>
            <strong>Primary topics</strong>
            <div>코프링 (kopring), frontend, infra</div>
          </li>
          <li>
            <strong>Format</strong>
            <div>Markdown source, static export, GitHub Pages</div>
          </li>
        </ul>
      </aside>
    </section>
  );
}
