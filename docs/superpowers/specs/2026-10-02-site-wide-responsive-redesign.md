# StudyTools.in Site-wide Responsive Redesign

## Objective

Extend the established homepage identity across every existing public route without changing URLs, removing working functionality, publishing unfinished content, or creating page-specific visual drift. Every page must remain comfortably readable at 100% browser zoom from 320px mobile screens through 1920px desktop screens.

## Design Direction

The homepage remains the visual source of truth: bright white and pale-blue surfaces, deep navy headings, accessible blue actions, restrained borders, modest radii, strong typography, and generous but controlled whitespace. Interior pages must feel like parts of the same established Indian consumer utility website rather than separate templates.

The redesign will not add decorative gradients, glass effects, giant illustrations, excessive cards, animation libraries, or dashboard styling. Tool interfaces remain the primary content on tool pages.

## Page Families

### Global shell

The shared header, functional desktop dropdowns, mobile navigation, search entry, footer, container widths, focus states, and wide-desktop scaling apply consistently across every route.

### Directory and category pages

Routes such as `/tools`, tool categories, `/education`, `/exams`, `/technology`, `/how-to`, and `/blog` use a shared interior-page hero followed by purpose-specific grids or honest editorial states. The hero is compact and left-aligned so useful content remains above the fold.

Tool cards distinguish live tools from planned tools. Planned tools are visibly labelled and are never presented as working links.

### Tool pages

The five live tool pages retain all current processing logic. A redesigned `ToolLayout` provides breadcrumbs, a compact title block, privacy status, the working interface, result area, instructions, explanation, related tools, and optional ad space. The interactive tool must remain visible without scrolling through a large hero.

### Search

The search route uses the same search treatment as the homepage, with readable result cards showing title, category, description, and URL. Empty and no-result states explain what the user can do next.

### Legal and trust pages

About, contact, privacy, terms, and disclaimer use a shared readable document layout with a compact introduction, anchored content sections where useful, and a maximum prose measure. No fake company history, people, addresses, or unsupported claims will be introduced.

## Reusable Components

- `InteriorHero`: breadcrumbs, eyebrow, title, description, and optional actions.
- `ContentSection`: consistent section heading, supporting copy, and optional action.
- `ResourceCard`: shared education, guide, and directory card structure.
- `ToolDirectoryCard`: live/planned tool states with category styling.
- `ResponsiveGrid`: controlled column changes without route-specific repetition.
- `StatusNotice`: honest empty, planned, privacy, or verification notices.
- `DocumentLayout`: legal and trust content with readable measure.
- Updated `SectionIndex`, `ToolCategoryPage`, `ToolLayout`, `ArticleLayout`, `CategoryCard`, `Breadcrumbs`, and `RelatedTools` built from the shared primitives.

Existing tool-specific client components remain separate from layout and are not rewritten unless integration exposes a confirmed defect.

## Responsive Scale

- 320–639px: one-column layouts, 16px minimum body copy where practical, touch targets at least 44px, wrapped controls, and no horizontal page overflow.
- 640–1023px: two-column grids where content permits and compact navigation behavior.
- 1024–1439px: full desktop navigation and balanced content widths.
- 1440–1920px: wide containers and proportionally larger type/cards so the interface remains naturally readable at 100% zoom instead of looking miniaturized.
- Tables, code, and unusually wide tool output scroll only within their own containers.

The implementation must be checked at 320, 375, 390, 414, 768, 1024, 1280, 1440, and 1920 pixels.

## Accessibility

Semantic landmarks and heading order remain valid. Interactive elements use visible focus states and descriptive labels. Navigation dropdowns work with keyboard activation. Colour combinations meet WCAG AA contrast. Motion respects reduced-motion preferences. Empty, loading, error, and success states do not rely on colour alone.

## SEO and Content Integrity

Current metadata, canonical URLs, sitemap entries, robots configuration, breadcrumbs, and applicable structured data remain intact. Redesigning a page must not turn unpublished editorial briefs into indexable articles. Current education or exam claims will not be invented. Internal links only target real routes.

## Implementation Order

1. Add shared interior-page primitives and responsive tokens.
2. Redesign directory and category templates.
3. Redesign the shared tool layout and integrate all five tools.
4. Redesign search, legal, and trust layouts.
5. Review every route for consistency, content honesty, metadata, and broken links.
6. Run responsive, accessibility, functional, unit, lint, type, and production-build verification.

## Acceptance Criteria

- Every existing public route uses the StudyTools.in design system.
- Every route has exactly one clear H1 and a logical heading hierarchy.
- All five live tools still process input and produce accurate results or downloads.
- No page has horizontal document overflow at required viewport widths.
- Content is comfortably readable at 100% zoom on 1920px desktop screens.
- Header dropdowns, mobile navigation, search, forms, and relevant downloads work.
- Planned tools and unpublished guides are not misrepresented as live content.
- Automated accessibility checks report no violations on representative page families.
- TypeScript, ESLint, formatting, unit tests, browser tests, and the production build pass.
