# StudyTools.in Site-wide Responsive Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the established StudyTools.in homepage design system to every existing public route with reusable layouts, reliable responsive scaling, and no regressions to the five live tools.

**Architecture:** Introduce focused interior-page primitives, then rebuild existing shared layouts from those primitives so route families inherit one visual system. Keep tool business logic untouched and verify each family through semantic component tests plus browser coverage at required viewports.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Vitest, Testing Library, Playwright, axe-core.

**Spec:** `docs/superpowers/specs/2026-10-02-site-wide-responsive-redesign.md`

## Global Constraints

- Preserve all current URLs, metadata, structured data, and five live tool implementations.
- Do not publish unfinished tools or editorial briefs as working pages.
- Maintain comfortable 100% zoom readability from 320px through 1920px.
- Use Server Components unless interaction requires a Client Component.
- Do not add dependencies, animation libraries, monetization, or unrelated functionality.

## Review Focus

- A 1920px viewport must use wide, readable content rather than the former miniaturized 1152px treatment; Task 1 browser assertions pin container and type size.
- A 320px viewport must not overflow when breadcrumbs, long headings, controls, code, or result text are present; Tasks 1, 3, and 6 cover this.
- Planned tools and unpublished articles must remain visibly unavailable and non-clickable; Task 2 component tests pin link behavior.
- File-processing privacy language must remain accurate on all tool pages; Task 3 layout tests pin the disclosure.
- Legal and empty-state pages must not become thin decorative shells; Tasks 4 and 5 assert useful structure and copy.

---

### Task 1: Interior Design Primitives and Responsive Scale

**Files:**
- Create: `src/components/layout/interior-hero.tsx`
- Create: `src/components/layout/content-section.tsx`
- Create: `src/components/layout/responsive-grid.tsx`
- Create: `src/components/ui/status-notice.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/components/layout/page-container.tsx`
- Test: `tests/unit/components/interior-layout.test.tsx`
- Test: `tests/e2e/site.spec.ts`

**Interfaces:**
- Produces: `InteriorHero`, `ContentSection`, `ResponsiveGrid`, and `StatusNotice` React components used by Tasks 2–5.

- [ ] Write failing component tests asserting semantic breadcrumbs, one H1, optional actions, and labelled status notices.
- [ ] Add failing Playwright assertions for no overflow at 320px and minimum interior container/type sizes at 1920px.
- [ ] Run the focused tests and confirm failures are caused by missing primitives and scale rules.
- [ ] Implement the four primitives and shared responsive CSS tokens without changing homepage behavior.
- [ ] Run focused tests and confirm they pass.
- [ ] Commit the task files with `feat: add responsive interior page primitives`.

### Task 2: Directory and Category Page Families

**Files:**
- Create: `src/components/ui/tool-directory-card.tsx`
- Create: `src/components/ui/resource-card.tsx`
- Modify: `src/components/layout/section-index.tsx`
- Modify: `src/components/layout/tool-category-page.tsx`
- Modify: `src/components/ui/category-card.tsx`
- Modify: `src/app/tools/page.tsx`
- Modify: `src/app/education/page.tsx`
- Modify: `src/app/exams/page.tsx`
- Modify: `src/app/technology/page.tsx`
- Modify: `src/app/how-to/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Test: `tests/unit/components/directories.test.tsx`

**Interfaces:**
- Consumes: Task 1 layout primitives.
- Produces: `ToolDirectoryCard` with `status: "live" | "planned"` and `ResourceCard` for section indexes.

- [ ] Write failing tests asserting live tools are links, planned tools are non-links with “Coming soon”, and each directory has useful descriptive structure.
- [ ] Run focused tests and confirm expected failures.
- [ ] Implement directory cards and rebuild shared index/category layouts.
- [ ] Migrate all directory routes to the shared layouts while preserving metadata and honest publication states.
- [ ] Run focused tests and route tests.
- [ ] Commit with `feat: redesign directories and category pages`.

### Task 3: Five Live Tool Pages

**Files:**
- Modify: `src/components/tools/tool-layout.tsx`
- Modify: `src/components/tools/file-uploader.tsx`
- Modify: `src/components/tools/tool-result.tsx`
- Modify: `src/components/tools/related-tools.tsx`
- Modify: `src/app/tools/pdf/pdf-merger/page.tsx`
- Modify: `src/app/tools/image/image-compressor/page.tsx`
- Modify: `src/app/tools/text/word-counter/page.tsx`
- Modify: `src/app/tools/web/json-formatter-validator/page.tsx`
- Modify: `src/app/tools/web/qr-code-generator/page.tsx`
- Test: `tests/unit/components/tool-layout.test.tsx`
- Test: `tests/e2e/site.spec.ts`

**Interfaces:**
- Consumes: Task 1 primitives and existing tool client components.
- Produces: a shared `ToolLayout` that keeps the interactive interface above instructions and exposes privacy, result, details, and related-content slots.

- [ ] Write failing layout tests for breadcrumbs, compact title, browser-processing disclosure, tool-before-instructions order, and related tools.
- [ ] Add failing mobile browser checks for uploader, textarea, result, code, and download-control containment.
- [ ] Run focused tests and confirm expected failures.
- [ ] Redesign shared tool components without changing processing modules.
- [ ] Integrate all five route pages and preserve JSON-LD.
- [ ] Run tool unit tests and real browser workflows for word count, JSON format, QR generation, image compression, and PDF merge.
- [ ] Commit with `feat: redesign live tool pages`.

### Task 4: Search and Trust Pages

**Files:**
- Modify: `src/app/search/page.tsx`
- Modify: `src/components/search/site-search.tsx`
- Create: `src/components/layout/document-layout.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/privacy-policy/page.tsx`
- Modify: `src/app/terms/page.tsx`
- Modify: `src/app/disclaimer/page.tsx`
- Test: `tests/unit/components/search.test.tsx`
- Test: `tests/unit/components/document-layout.test.tsx`

**Interfaces:**
- Consumes: Task 1 primitives.
- Produces: `DocumentLayout` for readable trust/legal documents and redesigned search results with explicit empty states.

- [ ] Write failing tests for search result fields, empty/no-result guidance, document H1/sections, and accurate privacy copy.
- [ ] Run focused tests and confirm expected failures.
- [ ] Redesign search and implement `DocumentLayout`.
- [ ] Migrate all five trust/legal routes without inventing organisation claims.
- [ ] Run focused tests and metadata tests.
- [ ] Commit with `feat: redesign search and trust pages`.

### Task 5: Shared Article Layout and Content States

**Files:**
- Modify: `src/components/articles/article-layout.tsx`
- Modify: `src/components/ui/breadcrumbs.tsx`
- Modify: `src/components/ui/section-heading.tsx`
- Test: `tests/unit/components/article-layout.test.tsx`

**Interfaces:**
- Consumes: Task 1 primitives.
- Produces: an article-ready layout supporting breadcrumbs, metadata, readable prose, related resources, and truthful unpublished states.

- [ ] Write failing tests for heading hierarchy, readable article structure, breadcrumbs, and unpublished-state messaging.
- [ ] Run focused tests and confirm expected failures.
- [ ] Implement the article layout and supporting shared components.
- [ ] Run focused tests.
- [ ] Commit with `feat: align article layouts with site design`.

### Task 6: Whole-site Verification and Corrections

**Files:**
- Modify: `tests/e2e/site.spec.ts`
- Modify: files from Tasks 1–5 only when a confirmed regression requires correction.

**Interfaces:**
- Consumes: all redesigned page families.
- Produces: verification evidence for the complete current route set.

- [ ] Expand the route matrix to every public route and assert one H1, no console errors, no broken internal links, and no document overflow at 320, 375, 390, 414, 768, 1024, 1280, 1440, and 1920px.
- [ ] Add representative axe checks for homepage, directory, tool, search, and legal page families.
- [ ] Run full browser tests and fix only confirmed issues.
- [ ] Run `npm run format:check`, `npm run typecheck`, `npm run lint`, and `npm test -- --run` under Node 22.
- [ ] Run `npm run build` under Node 22 and confirm all current routes generate successfully.
- [ ] Perform final desktop and mobile screenshot review against the homepage identity.
- [ ] Commit with `test: verify site-wide responsive redesign`.
