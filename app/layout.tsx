import type { Metadata } from "next";
import Link from "next/link";
import { DevAgentation } from "@/components/dev-agentation";
import "./globals.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/diary", label: "Diary" },
  { href: "/tweet", label: "Tweet" },
  { href: "/review", label: "Review" },
  { href: "/tags", label: "Tags" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" }
];

export const metadata: Metadata = {
  metadataBase: new URL("https://dambyworld.github.io"),
  title: {
    default: "dambyworld archive",
    template: "%s | dambyworld archive"
  },
  description:
    "코프링 (kopring), 프론트엔드, 인프라 실험을 아카이브하는 GitHub Pages 기반 기술 블로그."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="page-shell">
          <header className="site-header fade-in">
            <div className="header-top">
              <div className="brand">
                <span className="brand-mark">dambyworld archive</span>
                <h1 className="brand-title">build notes for patient systems</h1>
                <p className="brand-copy">
                  코프링 (kopring), frontend, infra를 길게 기록하는 기술 아카이브예요.
                  실험 메모는 짧게, 회고는 또렷하게, 배운 건 다시 찾기 쉽게 쌓아요.
                </p>
              </div>
              <nav className="site-nav" aria-label="Primary">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="footer">
            <p>Built for GitHub Pages with static export, App Router, and Markdown content.</p>
          </footer>
        </div>
        <DevAgentation />
      </body>
    </html>
  );
}
