# Sahaj Tools Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the production-ready Sahaj Tools foundation, five complete browser-side tools, and an exactly-100-item editorial roadmap.

**Architecture:** A Next.js App Router application uses Server Components for page composition and small feature-local Client Components for interactive tools. Typed registries drive routes, search, SEO, relationships, sitemap inclusion, and future localisation; processing and validation remain separate from UI and operate locally in the browser.

**Tech Stack:** Current stable or Active-LTS Next.js at execution time, React, TypeScript, Tailwind CSS, ESLint, Prettier, Vitest plus Testing Library, Playwright, axe-core, `pdf-lib`, and a maintained QR encoding library selected during dependency installation.

**Spec:** `docs/superpowers/specs/2026-10-02-sahaj-tools-foundation-design.md`

## Global Constraints

- Work in `/home/gaurav/sahaj-tools` on the existing `main` branch unless an execution worktree is created first.
- Resolve and record the current stable or Active-LTS Next.js version from official Next.js/npm sources immediately before scaffolding; do not use a prerelease tag.
- Use App Router, TypeScript, Tailwind CSS, ESLint, and Server Components by default.
- Use Client Components only for tool interaction, search interaction, mobile navigation, and consent-aware analytics dispatch.
- No database, CMS, external search provider, external tool-processing API, advertisements, affiliate links, subscriptions, paid plan, marketplace, or client-services flow.
- Browser-side tools must not transmit files, pasted text, JSON, or QR payloads.
- Only functioning tools and reviewed published articles may be indexable, searchable, linked as available, or included in the sitemap.
- English ships first; registry and content interfaces must accept `"en" | "hi"` without duplicating page components.
- Use the approved colour tokens and locally served or system-fallback fonts; do not add a font CDN, gradients, glass effects, decorative blobs, or animation libraries.
- Every tool must implement empty, ready, processing where applicable, success, recoverable error, reset, and accessible status behaviour.
- All required routes must avoid document-level horizontal overflow at 320, 375, 390, 414, 768, 1024, 1280, and 1440 CSS pixels.
- Do not publish generated filler, invented current facts, fake statistics, testimonials, corporate history, or organisational claims.

## Review Focus

- Malformed files whose extension and MIME declaration look valid but whose binary signature is invalid must be rejected before processing; Task 6 pins this for PDFs and Task 7 for images.
- Repeated tool runs must revoke obsolete object URLs and leave controls usable; Tasks 6, 7, and 9 include cleanup/retry browser tests.
- Unicode, mixed-script, emoji, and punctuation-heavy text must produce stable counts without crashes; Task 8 tests `Intl.Segmenter` and fallback paths.
- Planned tools and article roadmap entries must never leak into search, public availability lists, or the sitemap; Tasks 2, 4, and 5 test publication filtering.
- Very long JSON and QR input must be bounded before expensive processing and return actionable errors; Tasks 8 and 9 test size ceilings.

---

## File Responsibility Map

```text
package.json / framework configs       build, quality, test, and browser scripts
src/config/site.ts                     public identity, canonical origin, contact/env flags
src/types/content.ts                   stable registry and localisation contracts
src/content/*.ts                       category, tool, navigation, and article metadata
src/lib/seo/*                          metadata and structured-data builders
src/lib/search/*                       static index construction and ranking
src/lib/files/*                        shared binary and filename validation
src/components/layout/*                global navigation and page frame
src/components/ui/*                    small accessible primitives
src/components/tools/*                 reusable tool composition primitives
src/features/<tool>/*                  one tool's validation, processing, and client UI
src/app/**                             route composition and route-level metadata
tests/unit/**                          pure contracts and processing behaviour
tests/integration/**                   registry, metadata, sitemap, and route assertions
tests/e2e/**                           browser workflows, accessibility, and responsive checks
```

### Task 1: Scaffold the quality-gated application

**Files:**
- Create: `package.json`
- Create: framework-generated Next.js, TypeScript, Tailwind, ESLint, and PostCSS configuration files
- Create: `.prettierrc.json`
- Create: `.prettierignore`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `tests/unit/smoke.test.ts`

**Interfaces:**
- Produces scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `format:check`, `test`, `test:watch`, and `test:e2e`.
- Produces alias: `@/*` resolves to `src/*`.

- [ ] **Step 1: Resolve the supported framework version**

Check the official Next.js release documentation and `npm view next version`; record the exact selected stable version in `package.json` and the implementation log. Reject prerelease versions.

- [ ] **Step 2: Scaffold the application and install test tooling**

Use the official Next.js scaffolder with TypeScript, App Router, Tailwind, ESLint, `src/`, and the package manager already available in the environment. Add Vitest, Testing Library, jsdom, Playwright, axe-core integration, and Prettier as development dependencies.

- [ ] **Step 3: Write the failing quality-script smoke test**

In `tests/unit/smoke.test.ts`, assert that the test environment resolves `@/app/page` and renders the initial H1.

- [ ] **Step 4: Run the test to verify the harness fails before final configuration**

Run: `npm test -- --run tests/unit/smoke.test.ts`

Expected: FAIL because the Vitest alias/jsdom setup or final page contract is not complete.

- [ ] **Step 5: Complete the minimum configuration and page shell**

Configure jsdom, the alias, scripts, strict TypeScript, formatting, and a semantic root page with one H1.

- [ ] **Step 6: Verify the scaffold**

Run: `npm run typecheck && npm run lint && npm run format:check && npm test -- --run && npm run build`

Expected: all commands exit 0.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json '*.config.*' tsconfig.json .prettier* src tests
git commit -m "chore: scaffold Sahaj Tools application"
```

### Task 2: Define typed content and site registries

**Files:**
- Create: `src/config/site.ts`
- Create: `src/types/content.ts`
- Create: `src/content/categories.ts`
- Create: `src/content/tools.ts`
- Create: `src/content/articles.ts`
- Create: `src/content/navigation.ts`
- Create: `src/lib/content/registry.ts`
- Test: `tests/unit/content/registry.test.ts`

**Interfaces:**
- Produces: `Locale`, `PublicationStatus`, `ToolCategory`, `ToolRecord`, `ArticleRecord`, `CategoryRecord`.
- Produces: `getLiveTools(locale)`, `getToolBySlug(category, slug, locale)`, `getPublishedArticles(locale)`, `getRelatedTools(toolId, locale)`, and `getRelatedArticles(articleId, locale)`.
- Produces: `siteConfig` with working name, canonical origin, default locale, contact address, analytics ID, and advertising flag.

- [ ] **Step 1: Write failing registry contract tests**

Assert 20 unique tool IDs/slugs, exactly five `published` tools, six tool categories, no broken related-tool references, locale fallback to English, and exclusion of `planned` records from live selectors.

- [ ] **Step 2: Run the registry tests**

Run: `npm test -- --run tests/unit/content/registry.test.ts`

Expected: FAIL because registry modules do not exist.

- [ ] **Step 3: Implement the types and registries**

Add all 20 roadmap tools with only the approved first five marked `published`. Keep public identity and environment-backed features in `siteConfig`.

- [ ] **Step 4: Run the registry tests**

Run: `npm test -- --run tests/unit/content/registry.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/config src/types src/content src/lib/content tests/unit/content
git commit -m "feat: add typed site and content registries"
```

### Task 3: Build the design system and global shell

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Create: `src/components/layout/header.tsx`
- Create: `src/components/layout/mobile-navigation.tsx`
- Create: `src/components/layout/footer.tsx`
- Create: `src/components/layout/page-container.tsx`
- Create: `src/components/ui/breadcrumbs.tsx`
- Create: `src/components/ui/section-heading.tsx`
- Create: `src/components/ui/category-card.tsx`
- Create: `src/components/ui/ad-placeholder.tsx`
- Test: `tests/unit/components/layout.test.tsx`

**Interfaces:**
- Produces: `Header`, `Footer`, `PageContainer`, `Breadcrumbs`, `SectionHeading`, `CategoryCard`, and `AdPlaceholder` React components.
- Consumes: `siteConfig` and `navigationItems` from Task 2.

- [ ] **Step 1: Write failing semantic and interaction tests**

Assert landmark presence, one labelled mobile menu button, correct `aria-expanded` changes, escape-to-close, focus return, active link semantics, and no visible ad placeholder while ads are disabled.

- [ ] **Step 2: Run the component tests**

Run: `npm test -- --run tests/unit/components/layout.test.tsx`

Expected: FAIL because the components do not exist.

- [ ] **Step 3: Implement approved tokens and primitives**

Define CSS custom properties for the approved palette, typography roles, focus ring, spacing, content widths, radii, and status colours. Use local/system fonts and avoid remote font requests.

- [ ] **Step 4: Implement the global shell**

Build desktop and accessible mobile navigation, footer, container, breadcrumbs, headings, category card, and inactive ad boundary. Integrate them in the root layout.

- [ ] **Step 5: Verify components and static quality**

Run: `npm test -- --run tests/unit/components/layout.test.tsx && npm run typecheck && npm run lint`

Expected: all commands exit 0.

- [ ] **Step 6: Commit**

```bash
git add src/app src/components tests/unit/components
git commit -m "feat: build responsive design system and site shell"
```

### Task 4: Implement routes, homepage, legal copy, and reusable page layouts

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/tools/tool-layout.tsx`
- Create: `src/components/tools/tool-header.tsx`
- Create: `src/components/tools/tool-result.tsx`
- Create: `src/components/tools/file-uploader.tsx`
- Create: `src/components/tools/related-tools.tsx`
- Create: `src/components/articles/article-layout.tsx`
- Create: requested category, content index, and legal route files under `src/app/`
- Create: `tests/integration/routes.test.tsx`
- Create: `tests/integration/internal-links.test.ts`

**Interfaces:**
- Produces: every index and legal route listed in the specification.
- Produces: `ToolLayout`, `ToolHeader`, `ToolResult`, `FileUploader`, `RelatedTools`, and `ArticleLayout`.
- Consumes: live registry selectors from Task 2 and shell primitives from Task 3.

- [ ] **Step 1: Write failing route and link tests**

Assert the required route files exist, the homepage renders its exact thesis and live tools, legal pages contain product-specific headings without fabricated claims, planned tool links are absent, and registry-driven internal links resolve.

- [ ] **Step 2: Run the integration tests**

Run: `npm test -- --run tests/integration/routes.test.tsx tests/integration/internal-links.test.ts`

Expected: FAIL because route compositions are missing.

- [ ] **Step 3: Implement reusable layouts and route pages**

Build the compact homepage, tool indexes, content indexes, and five legal pages with real copy. Omit empty “latest” blocks rather than inventing content.

- [ ] **Step 4: Run route, link, and accessibility component tests**

Run: `npm test -- --run tests/integration/routes.test.tsx tests/integration/internal-links.test.ts tests/unit/components`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app src/components tests/integration
git commit -m "feat: add homepage category and trust routes"
```

### Task 5: Add SEO, sitemap, robots, search, and analytics boundaries

**Files:**
- Create: `src/lib/seo/metadata.ts`
- Create: `src/lib/seo/structured-data.ts`
- Create: `src/lib/search/build-index.ts`
- Create: `src/lib/search/rank-results.ts`
- Create: `src/components/search/site-search.tsx`
- Create: `src/app/search/page.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/lib/analytics/events.ts`
- Create: `src/components/analytics/google-analytics.tsx`
- Test: `tests/unit/seo/metadata.test.ts`
- Test: `tests/unit/search/search.test.ts`
- Test: `tests/integration/sitemap.test.ts`
- Test: `tests/unit/analytics/events.test.ts`

**Interfaces:**
- Produces: `buildPageMetadata(input): Metadata` and JSON-LD builders for breadcrumbs and functioning tools.
- Produces: `buildSearchIndex({ tools, articles })` and `searchIndex(query, records)`.
- Produces: typed `trackEvent(event)` accepting only tool start/completion, download, search-without-raw-query, and outbound-link events.
- Consumes: registries and `siteConfig` from Task 2.

- [ ] **Step 1: Write failing metadata, search, sitemap, and privacy tests**

Assert absolute canonicals, unique titles/descriptions for known pages, exact/prefix search ranking, useful empty/no-match states, exclusion of planned records from search and sitemap, robots sitemap reference, and event payload types that reject file/content/query data.

- [ ] **Step 2: Run focused tests**

Run: `npm test -- --run tests/unit/seo tests/unit/search tests/integration/sitemap.test.ts tests/unit/analytics`

Expected: FAIL because the modules do not exist.

- [ ] **Step 3: Implement SEO, search, sitemap, robots, and analytics boundaries**

Generate only valid structured data matching visible content. Keep the search page `noindex`. Load analytics only when its configured measurement ID exists.

- [ ] **Step 4: Run focused and route tests**

Run: `npm test -- --run tests/unit/seo tests/unit/search tests/integration tests/unit/analytics`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib src/components/search src/components/analytics src/app/search src/app/sitemap.ts src/app/robots.ts tests
git commit -m "feat: add search SEO and analytics foundations"
```

### Task 6: Implement PDF Merger

**Files:**
- Create: `src/lib/files/signatures.ts`
- Create: `src/lib/files/filenames.ts`
- Create: `src/features/pdf-merger/constants.ts`
- Create: `src/features/pdf-merger/validate.ts`
- Create: `src/features/pdf-merger/merge.ts`
- Create: `src/features/pdf-merger/pdf-merger.tsx`
- Create: `src/app/tools/pdf/pdf-merger/page.tsx`
- Test: `tests/unit/files/file-validation.test.ts`
- Test: `tests/unit/tools/pdf-merger.test.ts`
- Test: `tests/e2e/pdf-merger.spec.ts`

**Interfaces:**
- Produces: `validatePdfFiles(files: File[]): Promise<ValidationResult>`.
- Produces: `mergePdfFiles(files: File[]): Promise<Uint8Array>`.
- Produces: `sanitizeDownloadFilename(input, extension): string`.
- Consumes: `ToolLayout`, `FileUploader`, analytics events, and the PDF tool registry entry.

- [ ] **Step 1: Write failing validation and processing tests**

Cover empty lists, more than 20 files, over 25 MB per file, over 100 MB total, mismatched signature/MIME/extension, malformed and encrypted data, ordering, successful multi-file merge, and sanitised output names.

- [ ] **Step 2: Run unit tests to confirm failure**

Run: `npm test -- --run tests/unit/files/file-validation.test.ts tests/unit/tools/pdf-merger.test.ts`

Expected: FAIL because the feature does not exist.

- [ ] **Step 3: Implement validation and local merging**

Dynamically import `pdf-lib` in the processing path. Never import it into global layouts or registry modules.

- [ ] **Step 4: Implement the accessible tool interface and route**

Support selection, drag/drop, reorder, remove, merge, download, reset, errors, status announcements, privacy copy, how-to content, and related live tools.

- [ ] **Step 5: Write and run browser workflow tests**

Test valid merging, invalid signature rejection, retry after error, repeated-run object URL cleanup, keyboard controls, and download creation.

Run: `npm run test:e2e -- tests/e2e/pdf-merger.spec.ts`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/files src/features/pdf-merger src/app/tools/pdf/pdf-merger tests
git commit -m "feat: add private browser-based PDF merger"
```

### Task 7: Implement Image Compressor

**Files:**
- Create: `src/features/image-compressor/constants.ts`
- Create: `src/features/image-compressor/validate.ts`
- Create: `src/features/image-compressor/compress.ts`
- Create: `src/features/image-compressor/image-compressor.tsx`
- Create: `src/app/tools/image/image-compressor/page.tsx`
- Test: `tests/unit/tools/image-compressor.test.ts`
- Test: `tests/e2e/image-compressor.spec.ts`

**Interfaces:**
- Produces: `validateImageFile(file: File): Promise<ValidationResult>`.
- Produces: `compressImage(input, options): Promise<CompressedImage>` where the result includes blob, MIME type, dimensions, original size, and output size.
- Consumes: shared signatures/filenames, tool primitives, analytics events, and registry metadata.

- [ ] **Step 1: Write failing image validation and compression tests**

Cover JPEG/PNG/WebP signatures, spoofed input, 20 MB ceiling, decode failure, bounded dimensions, lossy quality values, larger-than-input result messaging, and object URL disposal.

- [ ] **Step 2: Run focused tests**

Run: `npm test -- --run tests/unit/tools/image-compressor.test.ts`

Expected: FAIL because the feature does not exist.

- [ ] **Step 3: Implement local processing and UI**

Use browser image APIs behind an injectable processing boundary so unit tests do not depend on a real canvas. Move processing to a worker only if profiling in Task 11 records meaningful main-thread long tasks.

- [ ] **Step 4: Run unit and browser tests**

Run: `npm test -- --run tests/unit/tools/image-compressor.test.ts && npm run test:e2e -- tests/e2e/image-compressor.spec.ts`

Expected: PASS for upload, quality adjustment, compression, download, invalid input, reset, retry, and cleanup.

- [ ] **Step 5: Commit**

```bash
git add src/features/image-compressor src/app/tools/image/image-compressor tests
git commit -m "feat: add local image compressor"
```

### Task 8: Implement Word Counter and JSON Formatter/Validator

**Files:**
- Create: `src/features/word-counter/count-text.ts`
- Create: `src/features/word-counter/word-counter.tsx`
- Create: `src/app/tools/text/word-counter/page.tsx`
- Create: `src/features/json-formatter/constants.ts`
- Create: `src/features/json-formatter/format-json.ts`
- Create: `src/features/json-formatter/json-formatter.tsx`
- Create: `src/app/tools/web/json-formatter-validator/page.tsx`
- Test: `tests/unit/tools/word-counter.test.ts`
- Test: `tests/unit/tools/json-formatter.test.ts`
- Test: `tests/e2e/text-tools.spec.ts`

**Interfaces:**
- Produces: `countText(text, segmenter?): TextCounts` with word, character, character-without-spaces, sentence, paragraph, and reading-time values.
- Produces: `parseAndFormatJson(input): JsonResult` and `minifyJson(input): JsonResult` with safe user-facing failures.

- [ ] **Step 1: Write failing pure-function tests**

Cover empty strings, whitespace, English, Hindi, mixed scripts, emoji, punctuation, line breaks, forced segmenter fallback, valid JSON primitives/arrays/objects, malformed JSON, unsafe-looking text rendered as text, and input exceeding the documented ceiling.

- [ ] **Step 2: Run focused tests**

Run: `npm test -- --run tests/unit/tools/word-counter.test.ts tests/unit/tools/json-formatter.test.ts`

Expected: FAIL because the features do not exist.

- [ ] **Step 3: Implement pure processing and client interfaces**

Keep word counting responsive and local. Implement format, minify, copy, clear, input ceiling, accessible error output, and no duplicate-key detection claim.

- [ ] **Step 4: Run unit and browser tests**

Run: `npm test -- --run tests/unit/tools/word-counter.test.ts tests/unit/tools/json-formatter.test.ts && npm run test:e2e -- tests/e2e/text-tools.spec.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/word-counter src/features/json-formatter src/app/tools/text/word-counter src/app/tools/web/json-formatter-validator tests
git commit -m "feat: add word counter and JSON formatter"
```

### Task 9: Implement QR Code Generator

**Files:**
- Create: `src/features/qr-generator/constants.ts`
- Create: `src/features/qr-generator/generate-qr.ts`
- Create: `src/features/qr-generator/qr-generator.tsx`
- Create: `src/app/tools/web/qr-code-generator/page.tsx`
- Test: `tests/unit/tools/qr-generator.test.ts`
- Test: `tests/e2e/qr-generator.spec.ts`

**Interfaces:**
- Produces: `validateQrInput(value): ValidationResult`.
- Produces: `generateQrPng(value, options): Promise<Blob>` with size and error-correction options.
- Consumes: selected maintained local QR library, filename helper, tool primitives, analytics boundary, and registry metadata.

- [ ] **Step 1: Write failing validation and generation tests**

Cover blank input, whitespace-only input, maximum accepted length, over-limit rejection before generation, supported sizes/error-correction values, safe handling of text that resembles markup, PNG result, filename sanitisation, retry, and URL cleanup.

- [ ] **Step 2: Run focused tests**

Run: `npm test -- --run tests/unit/tools/qr-generator.test.ts`

Expected: FAIL because the feature does not exist.

- [ ] **Step 3: Implement local QR generation and route UI**

Load the encoder only on this feature path. Include destination-check guidance without representing generated content as safe.

- [ ] **Step 4: Run unit and browser tests**

Run: `npm test -- --run tests/unit/tools/qr-generator.test.ts && npm run test:e2e -- tests/e2e/qr-generator.spec.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/qr-generator src/app/tools/web/qr-code-generator tests
git commit -m "feat: add local QR code generator"
```

### Task 10: Create and validate the 100-article roadmap

**Files:**
- Create: `docs/content/100-article-roadmap.md`
- Create: `src/content/article-roadmap.ts`
- Test: `tests/unit/content/article-roadmap.test.ts`

**Interfaces:**
- Produces: `articleRoadmap: PlannedArticle[]` where each record has unique ID/slug, locale, section, title, description, audience, search intent, heading plan, example plan, related tool IDs, internal-link targets, freshness class, official source requirements, and `planned` status.
- Consumes: article/tool types and all 20 tool IDs from Task 2.

- [ ] **Step 1: Write failing roadmap integrity tests**

Assert exactly 100 records; distribution 25/20/20/20/15; unique IDs, slugs, and non-placeholder titles; required editorial fields; valid related-tool references; official-source requirements for time-sensitive/current-fact topics; and `planned` status for every record.

- [ ] **Step 2: Run the roadmap tests**

Run: `npm test -- --run tests/unit/content/article-roadmap.test.ts`

Expected: FAIL because the roadmap does not exist.

- [ ] **Step 3: Write the original structured roadmap**

Create concise, non-duplicative briefs. The Markdown document is the human editorial view; the TypeScript records are the validated machine-readable view. Do not create article route bodies.

- [ ] **Step 4: Run roadmap and publication-filter tests**

Run: `npm test -- --run tests/unit/content/article-roadmap.test.ts tests/unit/content/registry.test.ts tests/integration/sitemap.test.ts`

Expected: PASS and zero roadmap entries in public search/sitemap.

- [ ] **Step 5: Commit**

```bash
git add docs/content src/content/article-roadmap.ts tests/unit/content
git commit -m "docs: add validated 100-article editorial roadmap"
```

### Task 11: Perform whole-site responsive, accessibility, performance, and release verification

**Files:**
- Create: `tests/e2e/navigation.spec.ts`
- Create: `tests/e2e/search.spec.ts`
- Create: `tests/e2e/responsive.spec.ts`
- Create: `tests/e2e/accessibility.spec.ts`
- Create: `tests/integration/metadata-routes.test.ts`
- Create: `docs/architecture/verification-report.md`
- Modify: implementation files only where failures reveal defects

**Interfaces:**
- Consumes all routes and features from Tasks 1–10.
- Produces reproducible release evidence in `verification-report.md`.

- [ ] **Step 1: Write failing whole-site browser checks**

Test global navigation, mobile menu focus, search sharing and no-match behaviour, one-H1/unique-metadata rules, internal links, console errors, and representative keyboard workflows.

- [ ] **Step 2: Add the exact responsive matrix**

For 320, 375, 390, 414, 768, 1024, 1280, and 1440 pixels, visit the homepage, one category page, one legal page, and all five tools. Assert `document.documentElement.scrollWidth <= document.documentElement.clientWidth` and capture screenshots on failure.

- [ ] **Step 3: Add automated accessibility checks**

Run axe checks on the homepage, search, all five tools in initial and result/error states, and a legal page. Keep manual checks for heading logic, status announcements, touch targets, focus visibility, and contrast in the verification report.

- [ ] **Step 4: Run full verification and fix only evidenced defects**

Run:

```bash
npm run format:check
npm run typecheck
npm run lint
npm test -- --run
npm run test:e2e
npm run build
```

Expected: every command exits 0, with no browser console errors or broken tested links.

- [ ] **Step 5: Inspect production output and runtime payload boundaries**

Confirm PDF, image, and QR libraries are not included in unrelated route client bundles; analytics and ads remain absent without environment configuration; sitemap and robots output contain only eligible routes; and no network request transmits tool inputs.

- [ ] **Step 6: Profile representative tool interactions**

Record mobile-emulated interaction observations for image compression and PDF merging. If processing produces repeated long tasks or blocks input, add a dedicated worker behind the existing processing interface and rerun affected tests.

- [ ] **Step 7: Write the verification report**

Document exact commands, versions, results, viewport coverage, manual accessibility observations, bundle inspection, known non-blocking limitations, and whether a worker was required. Do not claim metrics that were not measured.

- [ ] **Step 8: Commit**

```bash
git add tests docs/architecture src
git commit -m "test: verify foundation for production readiness"
```

### Task 12: Final diff review and handoff

**Files:**
- Modify: only files implicated by review findings
- Update: `docs/architecture/verification-report.md`

**Interfaces:**
- Consumes the completed implementation and test evidence.
- Produces a reviewed, clean working tree and an honest phase-one handoff.

- [ ] **Step 1: Review the complete branch diff against the specification**

Check scope, registry truthfulness, client/server boundaries, privacy, validation, SEO eligibility, accessibility, and absence of fabricated or placeholder public content.

- [ ] **Step 2: Run targeted tests for every review correction**

For each correction, first add or strengthen a test that reproduces the issue, confirm failure, apply the smallest fix, and confirm the focused test passes.

- [ ] **Step 3: Run the final release gate**

Run:

```bash
git diff --check
npm run format:check
npm run typecheck
npm run lint
npm test -- --run
npm run test:e2e
npm run build
git status --short
```

Expected: clean formatting, all checks pass, production build succeeds, and only intentionally uncommitted artifacts appear.

- [ ] **Step 4: Commit final corrections if any**

```bash
git add <reviewed-files>
git commit -m "fix: address foundation review findings"
```

- [ ] **Step 5: Hand off Phase 1 and Phase 2 evidence**

Report live routes, functioning tools, test/build results, measured limitations, configuration still required before deployment, and the explicit fact that fifteen tools and the full article bodies remain later controlled phases.

