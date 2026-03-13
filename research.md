# GitHub Pages 블로그 리서치 및 현재 구현 분석

## 문서 목적

- 이 문서는 기존 `research.md`의 기획 리서치와 `rearch.md`의 현재 구현 분석을 병합한 단일 문서다.
- 초기 의사결정 배경과 현재 저장소 상태를 함께 정리해서, 이후 개선 작업의 기준 문서로 사용하는 것을 목표로 한다.
- 대상 저장소는 `dambyworld/dambyworld.github.io`이며, 2026-03-13 기준 현재 구현 상태를 반영한다.

## 1. 요약

이 프로젝트는 **Next.js 15 App Router + Markdown 파일 기반 콘텐츠 저장소 + GitHub Pages 정적 배포** 조합으로 만든 개인 기술 블로그다.  
초기 계획 단계에서 의도했던 "사용자 페이지 저장소 기반 기술 아카이브" 방향이 실제 구현에도 대체로 일관되게 반영되어 있다.

## 2. 기획 의도와 현재 상태

### 초기 기획 의도

- `dambyworld` 계정 기준 개인 기술 블로그를 GitHub Pages로 운영한다.
- 목적은 포트폴리오보다 기술 아카이브, 실험 기록, 트러블슈팅 회고 축적에 가깝다.
- 정보 구조는 `diary`, `tweet`, `review` 세 섹션 중심으로 구성한다.
- 주제 축은 코프링 (kopring), 프론트엔드, 인프라다.
- CMS보다 Git 기반 Markdown 운영과 정적 배포 단순성을 우선한다.

### 현재 구현 상태

- 사용자 페이지 저장소 구조로 운영 중이다.
- Next.js App Router 기반 정적 사이트가 실제로 구현되어 있다.
- 콘텐츠는 `src/content/*` 하위 Markdown 파일로 관리된다.
- GitHub Actions 기반 Pages 배포 워크플로우가 포함되어 있다.
- 홈, 섹션 목록, 포스트 상세, 태그, 카테고리, About 페이지까지 구현되어 있다.

즉, 초기 계획 문서의 핵심 방향은 이미 코드로 구체화된 상태다.

## 3. 저장소 및 운영 전략

### 저장소 전략

- 현재 저장소는 `dambyworld.github.io` 사용자 페이지 저장소다.
- 이 선택은 GitHub Pages 루트 경로 배포가 가능해서 경로 설정이 단순하다.
- 프로젝트 페이지 저장소에서 필요한 `basePath`, `assetPrefix` 복잡도가 현재는 필요 없다.

### 비용 및 도메인 관점

- `github.io` 기본 도메인을 사용하는 구조라 추가 비용이 없다.
- 현재 설정상 커스텀 도메인 전제는 보이지 않는다.
- 개인 아카이브 목적에는 운영 부담이 낮은 선택이다.

## 4. 기술 스택

### 프레임워크 및 언어

- Next.js `15.5.12`
- React `19.2.4`
- TypeScript `5.9.3`
- Bun `1.3.10`

### 콘텐츠 처리

- `gray-matter`: Markdown front matter 파싱
- `remark`
- `remark-html`

### 품질 도구

- ESLint
- Vitest

### 기타

- `agentation`: 개발 환경 전용 디버깅 UI

## 5. 프로젝트 구조 분석

### 핵심 디렉터리

- `app/`
  App Router 기반 페이지와 동적 라우트
- `components/`
  포스트 카드, 포스트 목록, 상세 레이아웃 등 재사용 UI
- `lib/content.ts`
  콘텐츠 수집과 메타데이터 정규화의 핵심 로직
- `src/content/`
  섹션별 Markdown 원본
- `tests/content.test.ts`
  콘텐츠 계층 테스트
- `.github/workflows/deploy.yml`
  GitHub Pages 배포 자동화

### 콘텐츠 저장 구조

- `src/content/diary/*.md`
- `src/content/tweet/*.md`
- `src/content/review/*.md`

이 구조는 초기 기획 문서에서 제안한 섹션 구조와 동일하다.

## 6. 라우팅 구조 분석

### 정적 페이지

- `/`
- `/about`
- `/tags`
- `/categories`

### 섹션 목록 페이지

- `/diary`
- `/tweet`
- `/review`

`app/[section]/page.tsx`가 처리하며, 허용 섹션은 `lib/content.ts`의 `sections` 상수로 제한된다.

### 포스트 상세 페이지

- `/{section}/{slug}`

`app/[section]/[slug]/page.tsx`가 처리한다.  
초기 계획에서 비교했던 날짜형 URL 대신, 현재 구현은 **slug 중심 URL**을 선택했다.

### 태그/카테고리 아카이브

- `/tags/[tag]`
- `/categories/[category]`

모두 `generateStaticParams()` 기반 정적 생성이다.

## 7. 콘텐츠 모델 및 로딩 방식

핵심 로직은 `lib/content.ts`에 집중되어 있다.

### 콘텐츠 수집 흐름

1. `getPostsBySection(section)`가 섹션 디렉터리를 읽는다.
2. Markdown 파일을 `gray-matter`로 파싱한다.
3. front matter 누락분은 fallback 규칙으로 보완한다.
4. `published !== false` 조건으로 공개 글만 남긴다.
5. 날짜 문자열 내림차순으로 정렬한다.

### 현재 메타데이터 필드

- `title`
- `date`
- `description`
- `tags`
- `category`
- `published`
- `language`
- `hero?`

이는 초기 기획에서 검토한 포스트 메타데이터 후보와 거의 일치한다.

### fallback 규칙

- `date`
  슬러그가 `YYYY-MM-DD` 또는 `M-D` 형식이면 날짜를 추론한다.
- `title`
  본문 첫 유효 라인을 제목으로 사용한다.
- `description`
  본문 텍스트를 140자 내로 잘라 사용한다.
- `category`
  없으면 섹션명을 사용한다.
- `published`
  없으면 `true`
- `language`
  없으면 `ko`

### 레거시 호환

`legacyContentRoots = [process.cwd()]`가 존재해 `src/content/{section}` 외에 루트 `{section}` 디렉터리도 함께 탐색한다.  
이건 향후 콘텐츠 반입 또는 과거 구조 호환을 고려한 설계로 보인다.

## 8. 초기 기획 대비 실제 결정 사항

### 확정된 항목

- 저장소 유형: 사용자 페이지 저장소
- 프레임워크: Next.js
- 라우팅 방식: App Router
- 배포 방식: GitHub Pages 정적 export
- 콘텐츠 포맷: Markdown `.md`
- 정보 구조: `diary`, `tweet`, `review`
- URL 규칙: slug 중심

### 기획에서 실제 구현으로 구체화된 부분

- 태그/카테고리 아카이브가 실제로 구현됨
- About 페이지가 실제로 구현됨
- GitHub Actions 배포 파일이 실제로 존재함
- fallback 메타데이터 규칙이 코드로 정리됨
- 홈 화면이 단순 소개 페이지가 아니라 아카이브 인덱스 역할까지 수행함

## 9. 화면 구성 분석

### 홈 화면

홈은 아래 역할을 동시에 수행한다.

- 블로그 성격 소개
- 각 섹션 대표 글 노출
- 최신 글 노출
- 태그 진입점 제공

즉, 홈은 랜딩 페이지이면서 아카이브 탐색 진입점이다.

### 목록 UI

`PostList`와 `PostCard` 조합으로 섹션 목록, 태그 목록, 카테고리 목록을 공통 처리한다.  
포스트 카드에는 제목, 설명, 날짜, 카테고리, 언어, 태그가 표시된다.

### 상세 UI

`PostLayout`이 본문 영역과 메타데이터 사이드바를 분리한다.  
기획 단계에서 필요 요소로 볼 수 있던 탐색성과 메타 정보 표시가 현재 기본 수준으로 충족된다.

## 10. 디자인 방향 분석

초기 기획 문서에서는 "미니멀한 시각 톤 + 아카이브형 정보 구조"가 적합하다고 정리돼 있었다.  
현재 구현은 이 방향과 상당히 일치한다.

### 현재 디자인 특징

- 모노톤 중심 색상 체계
- 세리프 display font + 산세리프 body font 조합
- rounded card 중심 레이아웃
- 라이트/다크 모드 지원
- hero, section panel, chip link 등 반복 가능한 UI 패턴

즉, 정보 구조는 아카이브형이고 시각 톤은 절제된 편이다.

## 11. 빌드 및 배포 방식

### 로컬 명령

- `bun run dev`
- `bun run build`
- `bun run start`
- `bun run lint`
- `bun run test`
- `bun run clean`

### Next.js 정적 export 설정

`next.config.ts` 핵심 설정은 아래와 같다.

- `output: "export"`
- `images.unoptimized: true`

이는 GitHub Pages 환경 제약을 반영한 설정이다.

### GitHub Actions 배포 흐름

`.github/workflows/deploy.yml` 기준:

1. `main` 브랜치 push 시 실행
2. Bun 설치
3. 의존성 설치
4. `bun run build`
5. `out/` 업로드
6. GitHub Pages 배포

초기 계획 단계에서 권장했던 "소스는 `main`, 배포는 Actions" 전략이 실제로 적용되어 있다.

## 12. 테스트 상태 분석

현재 테스트 파일은 `tests/content.test.ts` 하나다.

### 검증하는 항목

- 섹션별 포스트 로딩
- 최신순 정렬
- 태그/카테고리 맵 생성
- featured post 계산
- 루트 섹션 디렉터리 호환
- front matter 없는 note의 fallback 메타데이터

### 해석

테스트 범위는 현재 프로젝트의 핵심인 **콘텐츠 수집 규칙 안정성**에 집중되어 있다.  
이는 작은 정적 블로그의 우선순위와 잘 맞는다.

## 13. 강점

- 구조가 단순해서 유지보수 비용이 낮다.
- Markdown 원본을 Git으로 관리해 이동성과 보관성이 높다.
- App Router + static export 조합이 GitHub Pages와 잘 맞는다.
- 태그/카테고리/섹션 아카이브가 이미 갖춰져 탐색성이 좋다.
- fallback 규칙 덕분에 짧은 글 작성 진입 장벽이 낮다.
- 초기 기획과 실제 구현의 정렬도가 높다.

## 14. 리스크와 개선 포인트

### 1. Markdown 렌더링 보안 여지

현재 HTML 렌더링 결과를 `dangerouslySetInnerHTML`로 출력한다.  
현재 운영 방식에서는 실용적으로 큰 문제가 아닐 수 있지만, 외부 Markdown 유입 가능성이 생기면 sanitization 검토가 필요하다.

### 2. 날짜 정렬이 문자열 비교에 의존

현재 정렬은 날짜 문자열 비교에 의존한다.  
`YYYY-MM-DD` 형식이 유지되면 괜찮지만 형식이 섞이면 안정성이 떨어질 수 있다.

### 3. `hero` 필드 미사용

메타데이터 타입에 `hero?: string`이 있으나 현재 UI 사용처가 없다.  
향후 대표 이미지 도입 예정이 아니라면 정리 후보다.

### 4. 테스트 범위 제한

아래 항목은 아직 테스트 공백이다.

- `generateStaticParams()` 검증
- `generateMetadata()` 검증
- 상세 페이지 렌더링 검증
- 배포 빌드 수준 검증

### 5. 개발 전용 의존성의 역할 제한

`agentation`은 개발 환경에서만 보이는 보조 도구다.  
계속 유지할 가치가 분명하지 않으면 나중에 제거 검토가 가능하다.

## 15. 현재 아키텍처 판단

현재 아키텍처는 "작은 개인 기술 아카이브"라는 목표에 적합하다.

- 서버가 필요 없다.
- CMS가 필요 없다.
- Git으로 글 버전 관리가 된다.
- GitHub Pages 배포가 단순하다.
- 정보 구조가 명확하다.

반대로 아래 요구가 생기면 구조 재검토가 필요하다.

- 고급 검색 기능
- 다국어 사이트 구조 분기
- 작성자 다중화
- 외부 CMS 연동
- 댓글/통계/상호작용 기능 확대

## 16. 다음 단계 제안

- 라우트/메타데이터 테스트를 추가해 정적 생성 안정성을 보강한다.
- Markdown sanitization 필요성을 판단한다.
- 날짜 정렬을 문자열 비교보다 명시적인 날짜 파싱 기준으로 보강할지 결정한다.
- `hero` 필드와 `agentation` 의존성의 유지 필요성을 정리한다.

## 17. 결론

이 저장소는 **"사용자 페이지 저장소 + Next.js 정적 export + Markdown 기반 기술 아카이브"**라는 초기 기획을 실제 코드로 비교적 정확하게 구현한 상태다.  
지금 단계에서 필요한 것은 대규모 재설계가 아니라, 현재 구조의 안정성을 높이는 소규모 보강 작업이다.

핵심 결론은 세 가지다.

- 초기 기획과 현재 구현의 방향이 잘 맞는다.
- 핵심 로직은 `lib/content.ts`에 응집되어 있어 유지보수가 용이하다.
- 다음 우선순위는 기능 추가보다 테스트와 안정성 보강이다.
