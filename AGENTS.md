# Repository Guidelines

## Project Structure & Module Organization
This repository is a statically exported Next.js 15 blog for GitHub Pages. Routes live in `app/`, including `app/[section]/page.tsx` and `app/[section]/[slug]/page.tsx`. Shared UI goes in `components/`, and Markdown parsing/content queries live in `lib/content.ts`. Posts live in `src/content/diary`, `src/content/tweet`, and `src/content/review`. Tests live in `tests/`, and deployment is handled by `.github/workflows/deploy.yml`.

## Build, Test, and Development Commands
Use Bun for local work because the repo pins `bun@1.3.10`.

- `bun run dev`: start the local Next.js dev server.
- `bun run build`: create the static export in `out/`.
- `bun run start`: run the production server for a built app.
- `bun run lint`: run ESLint with the Next.js core web vitals config.
- `bun run test`: run Vitest tests in `tests/**/*.test.ts`.
- `bun run clean`: remove `.next/` and `out/` build artifacts.

## Coding Style & Naming Conventions
Match the existing TypeScript and JSX layout in nearby files and avoid unrelated reformatting. Use PascalCase for React components, camelCase for helpers, and kebab-case for Markdown slugs such as `introducing-the-archive.md`. Prefer the `@/` alias for internal imports. Keep section names limited to `diary`, `tweet`, and `review`. When mentioning Kotlin + Spring Boot in docs or posts, write `코프링 (kopring)`.

## Testing Guidelines
Vitest runs in a Node environment and validates content loading, ordering, featured-post selection, and tag/category maps. Add or update tests when you change `lib/content.ts`, front matter expectations, or section behavior. Name tests `*.test.ts` and keep assertions focused on observable behavior.

## Commit & Pull Request Guidelines
Recent history follows Conventional Commit types such as `feat:`, `docs:`, `chore:`, and `ci:`. Keep messages short, imperative, and scoped to one change. If you use gitmoji, keep the intent explicit, for example `✨ feat: add tag archive`. Pull requests should include a short summary, verification steps, linked issues when available, and screenshots for UI changes. Run `bun run lint` and `bun run test` before opening the PR.

## Agent-Specific Instructions
- Respond in Korean and start with a 1-2 line summary.
- Prefer TypeScript examples with React function components and hooks, using modern ESM syntax.
- If requirements are ambiguous, ask no more than three focused questions and keep security basics in mind.
- For code changes, explain need, scope, and risk briefly, then show the changed area and why it changed.
- For package suggestions, include purpose, alternatives, and install commands.
- Follow the existing project style and mention the test or verification command with the expected result.
- After finishing, summarize changed files and executed commands, or note why a command could not be run.
