# GitHub Pages 기술 블로그 구축 계획

## 1. 목표

- `dambyworld` GitHub 계정으로 운영하는 기술 블로그를 GitHub Pages 기반으로 구축한다.
- 이번 작업 범위는 **계획 수립과 작업 브랜치 준비**까지만 포함한다.
- 실제 구현, 저장소 생성, 테마 적용, 배포 설정, 콘텐츠 작성은 보류한다.

## 2. 전제와 가정

- 블로그는 개인 기술 아카이브와 실험 기록 용도로 사용한다.
- 운영 저장소는 `dambyworld/dambyworld.github.io` 형태의 사용자 페이지 저장소로 확정한다.
- 정적 사이트 생성기(SSG)는 GitHub Pages와 연동이 간단한 도구를 우선 고려한다.
- 블로그 전용 작업 디렉터리는 `~/Dev/.blog`로 확정한다.
- 현재 `/Users/cozyai/Test`에서는 구현하지 않고, 계획 수립만 진행한다.

## 3. 권장 방향

### 저장소 전략

- 1순위: `dambyworld/dambyworld.github.io`
  - 사용자 페이지로 루트 도메인 형태의 GitHub Pages 운영이 단순하다.
  - 현재 이 방향으로 확정한다.
- 2순위: 별도 저장소 + GitHub Pages
  - 예: `dambyworld/tech-blog`
  - GitHub 제공 도메인(`github.io`)만 사용할 경우 추가 도메인 비용은 발생하지 않는다.
  - 별도 커스텀 도메인을 연결할 때만 도메인 구매/유지 비용이 발생할 수 있다.
  - 메뉴가 `diary`, `tweet`, `review`처럼 3개 정도여도 저장소를 반드시 프로젝트 페이지로 나눌 필요는 없다.
  - 사용자 페이지 저장소 안에서 섹션형 라우팅으로 충분히 구성 가능하다.
  - 별도 저장소는 블로그를 메인 프로필 사이트와 분리하고 싶을 때 검토한다.

### 기술 스택 결정

- 확정 스택: Next.js 정적 export
  - React/Next.js 생태계를 활용하기 쉽고, 추후 커스터마이징 확장성이 높다.
  - GitHub Pages 배포 시 정적 export 기준으로 라우팅/asset 경로를 사전에 맞춰야 한다.
  - App Router 기반으로 확정하고, GitHub Pages 제약에 맞는 정적 출력 전략을 전제로 한다.
  - 서버 액션, 동적 서버 렌더링, 런타임 의존 API는 사용하지 않는 방향으로 설계한다.
  - 콘텐츠 소스는 Markdown `.md` 파일 기반으로 확정한다.

## 4. 작업 단계

### Phase 1. 요구사항 확정

- 블로그 목적 정의
  - 기술 기록, 트러블슈팅, 프로젝트 회고, 코프링 (kopring) / 프론트엔드 / 인프라 카테고리 분류 여부 결정
  - 메뉴 구조를 `diary`, `tweet`, `review` 중심으로 운영하는 방향으로 확정
- 운영 정책 정의
  - 작성 언어는 국문/영문 병행으로 확정
  - 태그와 카테고리는 동시에 운영하는 방향으로 확정
  - 포스트 URL 규칙은 날짜형과 slug 중심 방식 중 하나로 추후 확정
- 도메인 정책 정의
  - 기본 GitHub Pages 도메인 사용으로 확정
  - 추후 커스텀 도메인 연결 여부

### Phase 2. 저장소/배포 구조 설계

- 사용자 페이지 저장소(`dambyworld.github.io`) 사용으로 확정
- 현재 기준 권장안은 사용자 페이지 저장소 1개 안에 섹션 라우팅을 두는 방식이다.
- 별도 저장소를 선택하더라도 `github.io` 도메인만 쓰면 추가 비용은 없다.
- GitHub Actions 기반 배포 방식으로 확정
- 기본 브랜치와 배포 브랜치 전략 정의
  - 예: `main`에 소스 유지, Actions로 Pages 배포

### Phase 3. 블로그 프레임워크 선정

- Next.js 정적 export 기준 세부 구조 확정
- 확인 항목
  - App Router 사용으로 확정
  - `output` 설정과 정적 배포 산출물 구조 확인
  - 사용자 페이지 저장소 기준으로 `basePath`, `assetPrefix` 단순화 가능 여부 확인
  - Markdown `.md` 콘텐츠 처리 방식 확정
  - SEO/OG/meta 및 코드 하이라이팅 적용 방식 확정

### Phase 4. 정보 구조(IA) 설계

- 필수 페이지 정의
  - 홈
  - `diary` 목록/상세
  - `tweet` 목록/상세
  - `review` 목록/상세
  - 태그/카테고리
  - About
- 포스트 메타데이터 정의
  - 제목, 날짜, 설명, 태그, 카테고리, 공개 여부, 대표 이미지
- 콘텐츠 디렉터리 구조 설계
  - 예: `src/content/diary`, `src/content/tweet`, `src/content/review`
- 섹션 성격 정의
  - `diary`: 비교적 긴 기록형 글
  - `tweet`: 짧은 메모/링크형 글
  - `review`: 회고/리뷰형 글

### Phase 5. 디자인 방향 수립

- 블로그 톤 결정
  - 미니멀한 시각 톤과 아카이브형 정보 구조의 조합을 우선 검토
- 공통 UI 요소 정의
  - 헤더, 푸터, TOC, 코드블록, 이전/다음 글 네비게이션
- 브랜딩 요소 정의
  - 사이트 타이틀, 설명, 프로필, 소셜 링크, favicon, OG 이미지 정책

### Phase 6. 운영 자동화 설계

- 배포 자동화
  - GitHub Actions로 push 시 Pages 자동 배포
- 품질 자동화
  - markdown lint, 링크 체크, 이미지 경로 검증 여부 검토
- 분석 도구
  - Plausible 또는 Google Analytics 도입 여부 검토

### Phase 7. 초기 콘텐츠 준비

- 첫 게시글 후보 선정
  - 블로그 소개
  - 코프링 (kopring) 삽질/트러블슈팅 기록
  - 프로젝트 회고
- 템플릿 정의
  - 문제, 원인, 해결, 회고 형식의 포스트 템플릿 초안 작성

## 5. 구현 시작 전 체크리스트

- 실제 구현 작업 디렉터리를 `~/Dev/.blog`로 사용
- `dambyworld` 계정 대상 저장소는 `dambyworld.github.io`로 확정
- 사용자 페이지 저장소로 확정
- GitHub Pages 공개 범위 및 저장소 visibility 확인
- Next.js 정적 export 가능 범위와 제약 확인
- GitHub Actions 배포 권한과 Pages 설정 방식 확인
- 사용자 페이지 저장소 기준 `basePath` 적용 불필요 여부 확인
- `diary`, `tweet`, `review` 섹션별 성격과 첫 게시글 주제 확정
- URL 규칙을 날짜형 또는 slug 중심 방식 중 하나로 확정

## 6. 보류 항목

- GitHub 저장소 실제 생성
- 정적 사이트 생성기 설치
- 프로젝트 초기화
- GitHub Actions 워크플로 작성
- GitHub Pages 설정 적용
- 테마/레이아웃 구현
- 첫 게시글 작성 및 배포

## 7. 다음 작업 제안

- URL 규칙을 날짜형 또는 slug 중심 방식 중 하나로 확정한다.
- 그 다음 Next.js 블로그 초기 스캐폴딩과 GitHub Pages 배포 설정을 한 번에 진행한다.
