---
title: "App Router와 정적 export를 함께 쓸 때 체크한 점"
date: "2026-03-11"
description: "GitHub Pages 정적 배포를 전제로 Next.js App Router를 구성할 때의 제약을 정리한다."
tags:
  - nextjs
  - github-pages
  - static-export
category: "frontend"
published: true
language: "ko"
---

# 핵심 제약

GitHub Pages는 정적 파일만 서빙하므로, 런타임 서버가 필요한 기능은 설계 단계에서 제외해야 해요.

## 체크 항목

1. 모든 라우트는 빌드 시점에 생성 가능해야 한다.
2. 서버 액션과 동적 서버 렌더링은 사용하지 않는다.
3. 이미지 최적화는 기본 동작 대신 정적 export 친화적으로 설정한다.

## 결론

App Router는 충분히 사용할 수 있지만, **정적 export 우선 사고방식**이 먼저예요.
