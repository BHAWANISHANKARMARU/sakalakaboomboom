# Bilingual NCERT Learning Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the reusable bilingual education platform, verified Class 9–12 directories, and a high-quality Class 9 Mathematics pilot based on official 2026–27 curriculum sources.

**Architecture:** Typed local catalog and lesson records sit behind repository functions and build-time validation. Static Server Component routes render English at `/education/...` and Hindi at `/hi/education/...`; only published localized lessons enter search and sitemap. The initial pilot lists the complete official Class 9 Mathematics curriculum and publishes two original bilingual lessons, without creating indexable placeholders for unreviewed chapters.

**Tech Stack:** Next.js 16 App Router, React 19 Server Components, TypeScript, Tailwind CSS, Vitest, Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-04-bilingual-ncert-learning-library.md`

## Global Constraints

- Use CBSE Academic and NCERT first-party sources only for current syllabus claims.
- Academic session is `2026-27`; every published catalog item carries a source URL and `verifiedAt` date.
- Explanations, examples and questions are original; do not copy textbook prose, exercises or answer keys.
- English and Hindi pages use stable shared ASCII slugs and reciprocal locale metadata.
- Draft or planned lessons are excluded from route generation, search and sitemap.
- Server Components render content by default; client JavaScript is limited to genuine interaction.
- Do not add accounts, runtime AI/syllabus APIs, paid products or non-AdSense monetization.

## Review Focus

- An unknown class/subject/book/chapter must return 404 rather than render an empty page.
- A chapter published in English but not Hindi must not generate a Hindi route or `hreflang` pointing to one.
- Duplicate IDs/slugs and orphaned relationships must fail validation with actionable messages.
- Long Hindi words, equations and chapter titles must not create horizontal overflow at 320px.
- Search and sitemap must include only published locale pages and never planned chapter placeholders.

---

### Task 1: Typed catalog, content and validation

**Files:**
- Create: `src/types/education.ts`
- Create: `src/content/education/catalog.ts`
- Create: `src/content/education/lessons.ts`
- Create: `src/lib/education/repository.ts`
- Create: `src/lib/education/validate.ts`
- Test: `tests/unit/education/repository.test.ts`
- Test: `tests/unit/education/validation.test.ts`

**Interfaces:**
- Produces: typed `EducationClass`, `EducationSubject`, `EducationBook`, `EducationChapter`, `ChapterLesson` records.
- Produces: `getClassDirectory`, `getSubjectDirectory`, `getBookDirectory`, `getPublishedLesson`, `getPublishedLessonParams`, `getEducationSearchRecords`, `validateEducationContent`.
- Consumes: existing `Locale` and `PublicationStatus` types.

- [ ] **Step 1: Write failing repository tests** for locale resolution, complete Class 9 Mathematics chapter ordering, publication filtering and missing records.
- [ ] **Step 2: Run tests and verify they fail** because education modules do not exist.
- [ ] **Step 3: Implement types, the verified 2026–27 class/subject/book/chapter catalog, two bilingual pilot lessons and repository functions.**
- [ ] **Step 4: Write failing validation tests** for duplicate slugs, orphaned records and missing published fields.
- [ ] **Step 5: Run tests and verify validation behavior is missing.**
- [ ] **Step 6: Implement deterministic validation and run both test files green.**
- [ ] **Step 7: Commit** with `feat: add verified bilingual education content model`.

### Task 2: Reusable education UI and localized routes

**Files:**
- Create: `src/components/education/education-breadcrumbs.tsx`
- Create: `src/components/education/class-directory.tsx`
- Create: `src/components/education/subject-directory.tsx`
- Create: `src/components/education/book-chapter-list.tsx`
- Create: `src/components/education/chapter-lesson-layout.tsx`
- Create: `src/components/education/language-switcher.tsx`
- Create: `src/components/education/syllabus-verification-notice.tsx`
- Create: `src/app/education/[classSlug]/page.tsx`
- Create: `src/app/education/[classSlug]/[subjectSlug]/page.tsx`
- Create: `src/app/education/[classSlug]/[subjectSlug]/[bookSlug]/page.tsx`
- Create: `src/app/education/[classSlug]/[subjectSlug]/[bookSlug]/[chapterSlug]/page.tsx`
- Create: matching pages under `src/app/hi/education/...`
- Modify: `src/app/education/page.tsx`
- Test: `tests/integration/education-routes.test.tsx`
- Test: `tests/unit/components/education-layout.test.tsx`

**Interfaces:**
- Consumes: Task 1 repository functions and records.
- Produces: static English/Hindi class, subject, book and published chapter routes.

- [ ] **Step 1: Write failing route and component tests** for directories, language links, published lessons, verification notices and 404 behavior.
- [ ] **Step 2: Run tests and verify they fail** because routes/components are absent.
- [ ] **Step 3: Implement reusable server-rendered components and English routes.**
- [ ] **Step 4: Implement Hindi mirrored routes using the same repository and stable slugs.**
- [ ] **Step 5: Run route/component tests green and check accessible heading hierarchy.**
- [ ] **Step 6: Commit** with `feat: add bilingual education routes and layouts`.

### Task 3: Education SEO, search and sitemap integration

**Files:**
- Modify: `src/lib/seo/metadata.ts`
- Modify: `src/lib/search/build-index.ts`
- Modify: `src/app/sitemap.ts`
- Test: `tests/unit/seo/education-metadata.test.ts`
- Test: `tests/unit/search/search.test.ts`
- Test: `tests/integration/routes.test.tsx`

**Interfaces:**
- Consumes: Task 1 published route/search records.
- Produces: localized canonical/`hreflang` metadata and discoverable education records.

- [ ] **Step 1: Write failing metadata, search and sitemap tests** proving reciprocal locale URLs and draft exclusion.
- [ ] **Step 2: Run tests and verify expected failures.**
- [ ] **Step 3: Extend metadata helper with locale alternates and expose published education routes/search records.**
- [ ] **Step 4: Update sitemap and search index, then run targeted tests green.**
- [ ] **Step 5: Commit** with `feat: integrate education content with SEO and search`.

### Task 4: Responsive and production verification

**Files:**
- Modify: `src/app/globals.css` only if tests identify an education-specific overflow issue.
- Modify: `tests/e2e/site.spec.ts`

**Interfaces:**
- Consumes: completed education UI and routes.
- Produces: regression coverage at mobile and desktop sizes.

- [ ] **Step 1: Add failing E2E assertions** for Class 9 directory, English/Hindi lesson navigation, 320px overflow and keyboard-visible language switching.
- [ ] **Step 2: Run targeted E2E and confirm new assertions exercise the routes.**
- [ ] **Step 3: Fix only confirmed responsive/accessibility defects and rerun targeted E2E green.**
- [ ] **Step 4: Run content validation, formatting, full unit/integration suite, TypeScript, ESLint and production build.**
- [ ] **Step 5: Commit** with `test: verify bilingual education library`.

