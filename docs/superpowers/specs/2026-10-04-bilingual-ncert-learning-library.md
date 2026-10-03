# Bilingual NCERT Learning Library

## Objective

Build a trustworthy Class 9–12 learning library for Indian students. Students must be able to browse a class, stream, subject, book and chapter, then learn the chapter through original plain-language explanations and question-and-answer material in English or Hindi.

This is a publishing system, not an automated textbook copier. Accuracy, syllabus traceability and genuinely useful explanations take priority over page count.

## Scope

The finished information architecture supports:

- Classes 9 and 10: the common CBSE/NCERT core subjects, languages and supported sixth subjects.
- Classes 11 and 12: Science, Commerce and Humanities subject groupings plus officially listed academic electives.
- Multiple NCERT books within a subject where applicable.
- Separate English and Hindi reading experiences.
- Chapter-level explanatory content and original practice questions with answers.

Publishing is phased. The platform and verified catalog are built first; reviewed chapters are then released class by class. A route must not be indexable merely because its catalog record exists.

## Source of truth and verification

The catalog uses first-party sources only:

- The CBSE Academic curriculum page for the applicable academic session.
- The NCERT textbook portal and official NCERT announcements.
- Official CBSE subject curriculum PDFs when subject-level detail is required.

Every class, subject, book and chapter record stores its academic session, official source URL and `verifiedAt` date. Source snapshots are represented as reviewed repository data rather than fetched during a visitor request.

No public syllabus API is required. Runtime API dependence would introduce availability, CORS, rate-limit and unreviewed-update risks without improving the student experience. Official changes are imported through a controlled editorial update and validated before publication.

The 2026–27 Grade 9 transition requires special handling: only the final released textbook structure may be marked current. Draft syllabus material may inform planning but must be visibly labelled draft and must not create indexable chapter pages.

## Copyright and originality

The site may display factual identifiers such as class, subject, book and chapter names needed for navigation. It must not reproduce NCERT chapter text, exercise sets, answer keys, illustrations or substantial textbook passages.

Learning content must be newly written:

- plain-language concept explanations;
- original worked examples;
- original short-answer, long-answer and practice questions;
- common mistakes and revision points;
- links to the official NCERT book instead of hosting copied book files.

Attribution does not replace the originality requirement.

## Information architecture

English is served from the existing site hierarchy:

- `/education/class-9`
- `/education/class-9/mathematics`
- `/education/class-9/mathematics/mathematics-textbook`
- `/education/class-9/mathematics/mathematics-textbook/number-systems`

Hindi mirrors published education routes beneath `/hi`:

- `/hi/education/class-9`
- `/hi/education/class-9/mathematics`
- `/hi/education/class-9/mathematics/mathematics-textbook`
- `/hi/education/class-9/mathematics/mathematics-textbook/number-systems`

Stable ASCII slugs are shared across locales. Locale-specific titles and content are stored separately. Class 11 and 12 subject pages may carry stream labels, but a subject has one canonical URL even when it belongs to more than one stream.

The hierarchy is:

`locale → class → stream (optional grouping) → subject → book → chapter`

## Content model

### Catalog entities

`EducationClass` records the grade, academic session and publication state.

`EducationSubject` records:

- stable ID and slug;
- localized name and description;
- applicable classes and streams;
- subject code when officially defined;
- ordering and publication state;
- official curriculum source and verification date.

`EducationBook` records:

- stable ID, subject relationship and localized title;
- NCERT publication/book code when available;
- medium and official textbook URL;
- academic session and verification state.

`EducationChapter` records:

- stable ID, book relationship, number/order and shared slug;
- localized official navigation title;
- source URL and verification date;
- lifecycle state: `planned`, `draft`, `reviewed`, `published` or `archived`.

### Chapter lesson entity

Each locale has an independently reviewable `ChapterLesson` containing:

- search intent and summary;
- prerequisites;
- learning objectives;
- concept sections with plain-language explanations;
- original examples;
- key terms;
- common mistakes;
- revision points;
- original questions grouped by type and difficulty;
- concise answers plus explanations;
- optional practice set without immediately visible answers;
- related chapter and tool IDs;
- authoring, review and last-updated fields.

English and Hindi lessons must communicate equivalent learning outcomes but are not required to be literal translations. Hindi copy should use natural student-friendly Hindi and retain familiar English technical terms in parentheses where helpful.

## Publishing and quality gates

A chapter route is public and indexable only when:

- the catalog entry is verified against an official current source;
- the selected locale lesson is `published`;
- required lesson sections are non-empty;
- questions and answers are original and reviewed;
- source, reviewer and update metadata are present;
- internal links resolve;
- no materially duplicate lesson exists.

Planned and draft records remain unavailable to search engines. A localized page is not emitted until that locale is reviewed. This prevents English pages with placeholder Hindi and prevents thin page inflation.

Automated validation fails the build for duplicate IDs/slugs, orphaned relationships, invalid source URLs, impossible class/stream mappings, missing required published fields, stale session labels and unresolved related-content IDs.

## Page experience

### Class page

Shows a concise class introduction, current-session notice, stream choices where applicable, subjects grouped clearly, and links to official-source information. It avoids a large hero and puts navigation above supporting guidance.

### Subject page

Shows subject purpose, books, chapter counts, progress-neutral chapter lists and related study tools. Class 11–12 pages show stream context without implying that every school offers every elective.

### Book page

Shows verified book identity, academic session, medium, official NCERT link and ordered chapter list. Unpublished chapters appear only when there is useful navigation value and are labelled “lesson being prepared”; they are not linked to empty pages.

### Chapter page

The reading sequence is:

1. breadcrumbs and compact chapter header;
2. language switch and verification note;
3. quick summary and learning objectives;
4. concept explanations and examples;
5. key terms and common mistakes;
6. questions and answers;
7. practice and revision points;
8. official source, related chapters and related tools.

Answers use accessible disclosure controls where collapsing improves scanning. Essential content remains server-rendered. No login, progress tracking or personal student data is required.

## Components and boundaries

Reusable server components:

- `EducationBreadcrumbs`
- `ClassDirectory`
- `SubjectDirectory`
- `BookChapterList`
- `ChapterLessonLayout`
- `LanguageSwitcher`
- `SyllabusVerificationNotice`
- `ConceptSection`
- `QuestionAnswerList`
- `PracticeSection`
- `EducationSourceList`
- `RelatedEducationContent`

Small client components are permitted only for answer disclosures, copy actions and language-switch affordances that cannot be handled by links. Content discovery and lesson rendering remain Server Components.

Catalog access is isolated behind typed repository functions. Pages do not import raw data files directly. This permits a later migration to a CMS without changing routes or layouts.

## Search and internal linking

Published localized class, subject, book and chapter records feed the existing lightweight search index. Search results include locale, class, subject and content type.

Internal linking follows:

- class → subjects;
- subject → books and chapters;
- chapter → previous/next chapter;
- chapter → prerequisite and related chapters;
- chapter → genuinely relevant calculators/text tools;
- education landing page → every published class directory.

No automated keyword-link injection is used.

## SEO

Every public education page has a unique localized title, description, canonical URL, Open Graph data and breadcrumbs. English and Hindi counterparts declare reciprocal `hreflang` entries, including `x-default` to English.

Structured data is limited to applicable types:

- `BreadcrumbList` for navigational hierarchy;
- `Article` or `LearningResource` only when the rendered content satisfies that type;
- FAQ schema is not emitted for routine textbook questions.

Sitemaps include only published, indexable locale pages and expose `lastModified`. Archived syllabus versions return an explanatory page or redirect only when a true replacement exists; they are not silently presented as current.

Titles describe the actual learning resource and must not make unsupported claims such as “complete marks guarantee”, “official solutions” or “100% exam questions”.

## Accessibility and responsive behavior

- Logical heading order and a single H1 per page.
- Keyboard-accessible language switch and answer disclosures.
- Visible focus, adequate contrast and touch targets of at least 44px where practical.
- Tables receive small-screen alternatives or controlled scrolling with labels.
- Mathematical expressions have readable text equivalents where needed.
- Devanagari uses the existing system-font strategy to avoid blocking font downloads.
- Pages must not overflow at 320px, 375px, 390px, 414px, 768px, 1024px, 1280px or 1440px.

## Performance

Lessons are statically generated from local typed content. No syllabus API runs during page views. Only published routes are generated. Long lessons are split into semantic server-rendered sections without client hydration.

Search data is compact and excludes full lesson bodies. Heavy mathematics or diagram support is added only when a published lesson requires it. Ads remain optional reserved placements and never interrupt a question and its answer.

## Privacy, safety and trust

Reading lessons requires no account and sends no student content to a server. The site clearly states that it is an independent learning resource and not an official NCERT or CBSE website. Official links are visually identified.

Current session labels and verification dates remain visible. Content corrections can be made through repository review, and outdated lessons can be removed from indexing without deleting the underlying audit trail.

## Rollout

### Phase A — platform and verified catalog

Create the typed catalog, validators, bilingual route infrastructure, reusable directory/lesson components, search integration and SEO rules. Add Class 9 and Class 10 landing pages. Import only reviewed official catalog data.

### Phase B — Class 9 pilot

Publish one complete, reviewed subject vertically: subject directory, book, all verified chapter navigation and an initial set of fully written bilingual chapter lessons. Use the pilot to validate readability, editorial effort and templates before scaling.

### Phase C — Class 9 and 10 core coverage

Complete core subject catalogs and release lessons in reviewed batches. Languages and sixth subjects are added only when the exact book/curriculum combination is verified.

### Phase D — Class 11 and 12 streams

Add Science, Commerce and Humanities discovery pages, then publish subject catalogs and lessons in coherent batches. Electives remain catalog-driven rather than duplicated across streams.

### Phase E — supported electives and maintenance

Add remaining high-demand official electives based on verified availability and editorial capacity. At each academic-session change, run the syllabus audit before updating current labels or chapter structures.

## Testing and acceptance

Automated tests cover:

- schema and relationship validation;
- publication gates for both locales;
- deterministic route generation;
- canonical and reciprocal `hreflang` metadata;
- sitemap exclusion of drafts;
- search inclusion of published localized lessons;
- previous/next chapter ordering;
- invalid route 404 behavior;
- accessible headings, disclosures and language links;
- responsive navigation and absence of horizontal overflow.

Production acceptance requires formatting, TypeScript, ESLint, unit/integration tests, route tests and a successful Next.js production build. Editorial acceptance additionally requires an official-source check and human review of every published lesson in both languages.

## Explicit non-goals

- Scraping or republishing NCERT books.
- Generating every chapter page before its content is reviewed.
- Claiming affiliation with NCERT, CBSE or the Government of India.
- Depending on a third-party AI or syllabus API at runtime.
- Student accounts, saved progress, tutoring chat, paid plans or subscriptions.
- Publishing guessed dates, deleted chapters or unofficial answer keys.
