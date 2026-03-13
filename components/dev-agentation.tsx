"use client"

// Next.js의 dynamic import 유틸리티예요
// 컴포넌트를 지연 로딩하거나, SSR을 끄고 클라이언트에서만 불러올 때 사용해요
import dynamic from "next/dynamic"

// 브라우저 환경에서만 동작하는 Agentation 컴포넌트를 동적으로 불러와요
const Agentation = dynamic(
  () => import("agentation").then((module) => module.Agentation),
  {
    // 서버에서는 렌더링하지 않고 클라이언트에서만 렌더링해요
    ssr: false
  }
)

/**
 * 개발 환경에서만 Agentation 디버깅 UI를 렌더링하는 컴포넌트예요
 * 프로덕션 환경에서는 아무것도 렌더링하지 않아서 불필요한 노출을 막아줘요
 */
export function DevAgentation() {
  // 개발 환경이 아니면 디버깅 도구를 렌더링하지 않아요
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  // 개발 환경에서만 Agentation UI를 표시해요
  return <Agentation />
}
