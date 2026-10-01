# Sahaj Tools Foundation and First Tool Batch Design

## Status

Approved in-chat architecture captured as an implementation-ready specification on 2 October 2026.

## Product Intent

Sahaj Tools is a fast, trustworthy consumer utility and information website for Indian internet users. It combines practical browser-based tools with carefully reviewed education, exam, technology, and everyday digital guidance. The site must be useful before advertising is enabled and must earn long-term organic traffic through quality, performance, and trust rather than page volume.

The initial product is English-first. Content records and route composition must permit Hindi content to be added later without replacing the application architecture. The only intended monetisation is Google AdSense; the product must not introduce subscriptions, affiliate marketing, paid plans, client services, marketplaces, or deceptive advertising patterns.

## Delivery Scope

This specification covers the production foundation and first controlled implementation cycle:

- Current stable or Active-LTS Next.js at implementation time, using App Router and TypeScript.
- Tailwind CSS, ESLint, and Prettier where compatible with the selected Next.js release.
- A reusable responsive design system, global header, footer, mobile navigation, and page shells.
- Homepage, tool indexes, requested content indexes, search page, and five legal/trust pages.
- SEO foundations including canonical metadata, Open Graph metadata, robots rules, dynamic sitemap generation, breadcrumbs, and applicable structured data.
- Lightweight search architecture over published tools and content.
- Five complete tools: PDF Merger, Image Compressor, Word Counter, JSON Formatter/Validator, and QR Code Generator.
- The registry and route roadmap for the remaining fifteen tools, without publishing non-functional tool pages.
- A locale-aware content model and an editorial roadmap containing exactly 100 article briefs in the required category distribution.
- Analytics and AdSense integration boundaries that remain inactive until explicitly configured.
- Automated unit, integration, browser, accessibility, responsive, and production-build verification appropriate to this scope.

The scope does not include implementing the remaining fifteen tools, writing or publishing 100 full articles, integrating a CMS or database, deploying the site, or enabling advertisements.

## Working Identity

`Sahaj Tools` is the working product name and `/home/gaurav/sahaj-tools` is the repository location. Brand name, public URL, contact address, and analytics identifiers must live in central site configuration rather than being repeated through components. Changing the eventual domain or public name must not require route or component rewrites.

## Technical Approach

The application uses statically generated and server-rendered pages where possible. Server Components own page composition, navigation, metadata, content lists, relationships, and legal/editorial copy. Client Components are restricted to tool interactions, local search interaction, mobile navigation, and consent-aware analytics events.

Structured TypeScript registries are the single source of truth for tools, categories, page relationships, and article metadata. Article bodies are stored in locale-specific MDX-ready directories. No database or external CMS is introduced in the first cycle. Only records marked `published` and containing complete content are eligible for public article routes or the sitemap.

Tool functionality is feature-local. Each tool separates metadata, validation, processing, and interactive presentation so processing functions can be tested without rendering React. Browser-side processing is preferred because it protects privacy and avoids server storage. Heavy code is dynamically imported only when the associated tool is used.

## Proposed Repository Structure

```text
sahaj-tools/
├── docs/
│   ├── architecture/
│   ├── content/100-article-roadmap.md
│   └── superpowers/{specs,plans}/
├── public/{icons,workers}/
├── src/
│   ├── app/
│   │   ├── (content)/{education,exams,technology,how-to,blog}/
│   │   ├── (legal)/{about,contact,privacy-policy,terms,disclaimer}/
│   │   ├── tools/{pdf,image,text,web,scanner,calculators}/
│   │   ├── search/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/{articles,layout,search,seo,tools,ui}/
│   ├── content/articles/en/
│   ├── features/{pdf-merger,image-compressor,word-counter,json-formatter,qr-generator}/
│   ├── lib/{analytics,files,search,seo,validation}/
│   ├── types/
│   └── workers/
├── tests/{unit,integration,e2e}/
└── package.json
```

Exact framework-generated configuration filenames may differ according to the current supported defaults, but the responsibility boundaries above must remain.

## Public Routes

The first cycle creates these navigable route families:

- `/`
- `/tools`
- `/tools/pdf`
- `/tools/image`
- `/tools/text`
- `/tools/web`
- `/tools/scanner`
- `/tools/calculators`
- `/education`
- `/education/class-11`
- `/education/class-12`
- `/education/ncert`
- `/education/cbse`
- `/exams`
- `/technology`
- `/how-to`
- `/blog`
- `/search`
- `/about`
- `/contact`
- `/privacy-policy`
- `/terms`
- `/disclaimer`

The first live tool routes are:

- `/tools/pdf/pdf-merger`
- `/tools/image/image-compressor`
- `/tools/text/word-counter`
- `/tools/web/json-formatter-validator`
- `/tools/web/qr-code-generator`

The remaining fifteen tool slugs are retained in the roadmap/registry with a non-published status. They do not receive indexable empty pages, sitemap entries, or navigation links that imply availability.

## Page Composition

### Global shell

The header contains the brand, Tools, Education, Exams, Guides, and Search entry points. Desktop navigation stays compact. Mobile navigation uses a simple disclosure menu with correct focus management, escape-to-close, and no off-canvas overflow. The footer exposes category links, trust pages, and a concise privacy statement.

### Homepage

The homepage opens with a compact, left-aligned promise: “Useful online tools and guides for everyday tasks.” Search appears in the initial viewport, followed by live popular tools, category navigation, an education section, latest guides, and popular articles. Empty editorial areas use honest pre-publication copy or are omitted; they do not fabricate articles.

### Tool pages

Every tool page follows this order:

1. Breadcrumbs.
2. Unique H1 and concise description.
3. Working tool interface.
4. Result or output region with accessible status announcements.
5. Optional inactive ad boundary after the tool result.
6. How-to steps.
7. Substantive explanation and privacy/limitations.
8. Genuine FAQ where useful.
9. Related live tools.
10. Related published articles, omitted when none exist.

The interface must appear without a decorative hero or unrelated content preceding it.

### Content indexes

Education and topic routes explain what the section will cover and list only published material. Empty categories remain useful through curated navigation and clearly worded editorial status rather than generated filler.

## Component Boundaries

Reusable shell components are `Header`, `Footer`, `MobileNavigation`, `Breadcrumbs`, `PageContainer`, and `SectionHeading`.

Reusable tool components are `ToolLayout`, `ToolHeader`, `ToolInput`, `ToolResult`, `FileUploader`, `RelatedTools`, `RelatedArticles`, `EmptyState`, `ErrorMessage`, and `LoadingIndicator`.

Reusable editorial components are `ArticleLayout`, `ArticleMeta`, `SourceList`, and `RelatedContent`.

`SiteSearch` consumes a generated, serialisable search index containing only title, description, category, locale, and URL. It does not ship article bodies to the browser.

`AdPlaceholder` is a layout boundary, not a visible fake advertisement. With advertising disabled it must not show deceptive empty boxes, “advertisement” furniture, or unnecessary layout gaps. When enabled later it must reserve defined dimensions and remain visually distinct from tool controls.

## Design System

The visual language is a calm, established Indian consumer utility rather than a startup dashboard or AI landing page.

### Colour

- Deep navy `#17324D`: navigation, high-emphasis text, and primary brand areas.
- Utility blue `#1769AA`: links, focus accents, and primary actions.
- Saffron `#E58A1F`: sparse editorial emphasis, never large decorative gradients.
- Ink `#17212B`: body text.
- Cool paper `#F6F8FA`: page background and subtle grouped regions.
- Border `#D8E0E7`: dividers and restrained component boundaries.

Success, warning, and error colours are separate semantic tokens and never rely on colour alone. All text and controls must meet WCAG AA contrast.

### Type

Use locally served fonts or robust system fallbacks with no render-blocking font CDN. A humanist sans-serif serves headings; a highly legible sans-serif serves body and UI text; tabular numerals are enabled for counts and measurements. Body content targets approximately 65 characters per line. Heading sizes use a restrained fluid scale with balanced wrapping.

### Layout and interaction

The reading column is narrower than tool workspaces. Layout uses grid/flex gaps rather than accumulated element margins. Borders are preferred to shadows; corner radii are moderate and not applied indiscriminately. Interactive elements have visible focus styles and minimum 44-by-44-pixel touch areas. Motion is limited to necessary state transitions and disabled under reduced-motion preferences.

Phase 1 intentionally ships a polished light theme. Dark mode is deferred rather than delivered as an unreviewed automatic inversion.

## Tool Specifications

### PDF Merger

Accept multiple PDF files through a labelled picker and drag/drop region. Validate the PDF MIME type, `.pdf` extension, `%PDF-` file signature, per-file size, total size, and maximum file count. Defaults are a 25 MB per-file limit, 100 MB total limit, and 20 files. Users can reorder and remove selected files before merging. Processing occurs locally through a dynamically imported maintained PDF library. The result is a single downloadable PDF with a sanitised filename. Encrypted, malformed, oversized, and unsupported files produce actionable errors without exposing stack traces.

### Image Compressor

Accept JPEG, PNG, and WebP images only, with signature validation and a 20 MB input limit. Show original dimensions and size. Users choose output quality for lossy formats and may preserve the original dimensions. Processing uses browser image APIs or a dedicated worker if measured processing blocks the main thread. The result shows output type, dimensions, byte size, and percentage reduction before download. Unsupported formats, decoding failures, and cases where compression increases size receive clear explanations.

### Word Counter

Accept pasted or typed Unicode text. Display word count, character count with and without spaces, sentence count, paragraph count, and estimated reading time. Counts update locally and responsively. Word segmentation uses `Intl.Segmenter` where supported with a tested whitespace/token fallback. Empty text returns zeroes. No content is persisted or transmitted.

### JSON Formatter and Validator

Accept plain text JSON with a documented input-size ceiling to prevent browser lockups. Validate with `JSON.parse`, format with two-space indentation, minify valid input, clear, and copy output. Errors are converted into safe, understandable messages with position information where reliably available; raw engine stacks are never shown. Duplicate object keys are not claimed to be detected because standard parsing does not preserve them.

### QR Code Generator

Accept non-empty text or URLs up to a documented safe length. Generate a QR code locally with selectable size and error-correction level. Permit PNG download with a sanitised filename. The interface explains that generated destinations should be checked before sharing. It does not shorten URLs, call third-party APIs, or claim that arbitrary content is safe.

## File and Resource Safety

Client-side checks exist for immediate feedback, but processing functions independently enforce the same limits. Validation considers declared MIME type, extension, and file signature where available. Filenames are displayed as text, never injected as HTML, and download filenames are normalised to safe characters. Object URLs and worker resources are released after use and when components unmount.

The initial cycle has no server upload endpoint and creates no temporary server files. Later server-processed tools must introduce server-side validation, rate limiting, execution timeouts, bounded memory/CPU use, safe cleanup, and abuse controls before release.

## Tool and Content Registries

Each tool record includes a stable identifier, locale-aware title and description, category, slug, processing location, publication status, related tools, related article identifiers, and SEO metadata.

Each article record includes:

```ts
type ArticleStatus = "planned" | "draft" | "reviewed" | "published";

type ArticleSection =
  | "education"
  | "exams"
  | "technology"
  | "how-to"
  | "india-guides";

type Article = {
  locale: "en" | "hi";
  slug: string;
  title: string;
  description: string;
  section: ArticleSection;
  topics: string[];
  audience: string[];
  searchIntent: string;
  relatedToolIds: string[];
  relatedArticleIds: string[];
  publishedAt?: string;
  updatedAt?: string;
  verifiedAt?: string;
  sources?: { title: string; url: string; publisher: string }[];
  status: ArticleStatus;
};
```

The editorial roadmap contains exactly 100 original briefs:

- 25 Education/NCERT/CBSE.
- 20 Competitive Exams.
- 20 Technology/Internet.
- 20 How-to/Digital Utilities.
- 15 India-focused useful guides.

Every brief specifies search intent, audience, scope, planned headings, useful examples, related tools, internal links, freshness classification, and official sources that must be checked where applicable. A roadmap entry is not an article and is never published as though it were one.

Current syllabus, curriculum, notices, exam dates, eligibility, vacancies, cut-offs, and policies require official-source verification and a visible verification date before publication. Evergreen content must still have an editorial review date.

## Search

The build produces a compact search index from live tools and published articles. Search matches normalised title, description, category, and curated topic terms, then applies simple weighted scoring: exact title and prefix matches rank above topic and description matches. Results show title, category, short description, and canonical URL.

The query is represented in the URL so results can be shared, but search-result combinations are not indexable. Empty queries show suggested categories; no-match states recommend alternative terms and category browsing. Search usage can emit a privacy-conscious event without recording the complete query by default.

## SEO

A central site configuration owns the canonical origin. A metadata utility builds unique titles, descriptions, absolute canonical URLs, Open Graph tags, and Twitter metadata. Each indexable page has one H1, semantic landmarks, logical heading order, and contextual links.

Breadcrumb structured data appears where visible breadcrumbs exist. Functioning tools may use applicable `WebApplication` structured data. Published articles may use `Article` structured data only when dates, authorship/publisher representation, and content support it. FAQ structured data is omitted unless the visible page genuinely contains eligible questions and answers and current search guidelines support its use.

The sitemap includes canonical live routes and reviewed published content only. Search pages, drafts, planned tools, and error states are excluded. `robots.ts` references the sitemap and applies conservative crawl rules without blocking required rendering resources.

## Analytics and Advertising Boundaries

Google Analytics and Search Console configuration use environment variables. No analytics script loads when its public measurement identifier is absent. Events are typed and limited to tool start, tool completion, download, search, and outbound-link interaction. Events must not include file contents, entered text, complete search phrases, filenames, JSON contents, generated QR content, or other personal data.

AdSense remains disabled. Future activation must be consent- and policy-aware and use defined content-boundary slots after results or between long editorial sections. Ads must never appear within upload controls, resemble buttons, interrupt processing, or obscure results.

## Legal and Trust Pages

The five required pages contain product-specific, professionally written copy:

- About explains the utility-and-guidance purpose without invented company history, scale, or credentials.
- Contact provides a configurable contact method and explains appropriate enquiries without fabricating an office or team.
- Privacy Policy accurately reflects local browser processing, optional analytics, future advertising, retention, and user choices.
- Terms describe acceptable use, availability, intellectual property, and user responsibilities in plain language.
- Disclaimer explains informational limitations, educational verification needs, external-link boundaries, and that tools are not professional advice.

Legal copy must not claim compliance certifications, response times, guarantees, or corporate facts that have not been established.

## Performance Requirements

- Server Components are the default.
- Tool libraries load only on their tool routes and, where possible, only after interaction.
- No large hero image, animation framework, external search provider, or unnecessary third-party script is permitted.
- Fonts are local and subset where licensing and tooling allow.
- Layouts reserve stable space for asynchronous results to reduce shifting.
- Images use Next.js image handling where it provides value; generated tool previews use bounded dimensions and local object URLs.
- Search data contains summaries rather than article bodies.
- CPU-heavy work moves to workers when profiling establishes meaningful input delay or long tasks.
- Pages must have no horizontal document overflow at 320, 375, 390, 414, 768, 1024, 1280, and 1440 CSS pixels.

Targets are excellent real-user Core Web Vitals rather than synthetic-score gaming. Performance regressions must be measured and addressed before enabling ads or analytics.

## Error and State Design

Tool interfaces explicitly handle empty, ready, processing, success, and recoverable-error states. Controls that cannot safely run are disabled with an explanation. Processing indicators use accessible status semantics. Errors identify the affected file or input and explain the next action. Raw library, browser, network, or stack-trace output never appears to users.

Unexpected component errors fall back to a calm recovery screen that preserves global navigation. A tool error must not make the rest of the page unusable.

## Verification Strategy

### Unit tests

Test content-registry integrity, slug uniqueness, route eligibility, sitemap filtering, metadata generation, search scoring, filename sanitisation, file limits/signatures, word-count segmentation, JSON state conversion, and per-tool processing helpers.

### Integration tests

Verify required routes render, each indexable page has unique metadata and one H1, canonical URLs are correct, structured data matches visible content, planned material is excluded from search/sitemap, and internal registry links resolve.

### Browser tests

Exercise the five tools through success, empty, invalid, oversized, and reset/retry states. Verify keyboard use, focus behaviour, download creation, mobile navigation, search, and no console errors.

### Responsive and accessibility tests

Render the homepage, representative category pages, legal copy, and every tool at all specified widths. Assert no document-level horizontal overflow. Perform automated accessibility checks and manual checks for heading order, labels, focus visibility, status announcements, touch targets, and contrast.

### Release checks

The first cycle is complete only when unit/integration/browser tests, TypeScript, ESLint, formatting verification, and a clean production build pass; live routes have no known broken internal links or console errors; and generated robots and sitemap output are inspected.

## Phased Continuation

After this cycle, each remaining tool receives its own bounded specification and testable release. Content production begins with twenty researched articles, not 100 generated drafts. The remaining roadmap progresses only after editorial review, source verification where required, internal linking, and a quality check. Performance, SEO, and deployment audits remain separate later phases so their evidence is not conflated with initial construction.

## Acceptance Criteria

The foundation is accepted when:

- All first-cycle routes and five tools work as specified.
- The site is useful with analytics and advertising disabled.
- Only functioning tools and reviewed content are indexable.
- The exactly-100-item roadmap passes distribution and uniqueness validation.
- Browser-side tools do not transmit user content.
- Required metadata, sitemap, robots rules, breadcrumbs, and relevant structured data are present and valid.
- Mobile layouts have no document overflow at every specified width.
- Empty, loading, success, and error states are accessible and understandable.
- No fabricated claims, current educational/exam facts, articles, testimonials, statistics, or organisational details appear.
- Type checking, linting, automated tests, accessibility checks, and the production build pass.

