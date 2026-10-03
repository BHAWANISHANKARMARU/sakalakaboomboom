# Twenty Everyday Tools Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 20 complete local-processing tools with dedicated SEO routes.

**Architecture:** Pure utility functions power three reusable interactive clients. Allow-listed dynamic routes provide metadata and layouts without duplicating page files.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-04-twenty-everyday-tools.md`

## Global Constraints

- No external APIs, accounts, uploads, or new dependencies.
- Server Components by default; only tool interfaces are client components.
- Every route must be indexable, internally linked, responsive, and useful.

## Review Focus

- Invalid numeric inputs show guidance instead of `NaN`.
- Financial formulas handle zero interest and disclose estimates.
- Unicode text operations do not corrupt input.
- Copy/reset controls work with empty input.
- Unknown dynamic slugs return 404.

### Task 1: Pure utility engines

**Files:** Create `src/features/everyday-tools/calculations.ts`, `text.ts`, `web.ts`; test `tests/unit/features/everyday-tools.test.ts`.

- [ ] Write failing representative formula and transform tests.
- [ ] Run tests and confirm expected failures.
- [ ] Implement pure functions with finite-input validation.
- [ ] Run tests and commit.

### Task 2: Interactive tool clients

**Files:** Create `src/features/everyday-tools/calculator-tool.tsx`, `text-tool.tsx`, `web-tool.tsx`, shared styles as needed.

- [ ] Add component interaction tests.
- [ ] Implement accessible labelled inputs, results, errors, copy and reset.
- [ ] Verify component tests and commit.

### Task 3: Routes, catalog and discovery

**Files:** Create category `[slug]/page.tsx` routes; modify `src/content/tools.ts`, registry/search/sitemap consumers as required.

- [ ] Add failing route/catalog tests for exactly 20 new published tools.
- [ ] Add allow-listed route metadata and static params.
- [ ] Add catalog records and related links.
- [ ] Verify unit tests and commit.

### Task 4: Production verification

- [ ] Run formatting, typecheck, lint and all unit tests.
- [ ] Run responsive route E2E coverage.
- [ ] Run production build and inspect sitemap.
- [ ] Commit and push verified state to `main`.
