# Twenty Everyday Tools Expansion

## Objective

Add 20 complete, browser-side tools that solve common everyday tasks and are useful without accounts, external APIs, or uploads.

## Tool set

- Calculators: Age, BMI, Percentage, Discount, GST, EMI, SIP, Date Difference, Unit Converter, Fuel Cost.
- Text: Case Converter, Remove Duplicate Lines, Text Sorter, Find and Replace, Whitespace Cleaner, Line Counter.
- Web/privacy: URL Encoder/Decoder, Base64 Encoder/Decoder, Password Generator, UUID Generator.

## Product requirements

- Every tool has a dedicated clean URL, unique title/description, one H1, breadcrumbs, structured data, instructions, validation, reset/copy actions where applicable, and related tools.
- All work happens locally in the browser. No user input is transmitted.
- Inputs must handle empty, invalid, zero, negative, and large values without `NaN`, crashes, or misleading results.
- Calculations must state assumptions. Financial calculators are estimates, not financial advice.
- Routes must be discoverable from category pages, site search, sitemap, and internal links.
- Mobile widths from 320px upward must not overflow.

## Architecture

Add catalog records and three focused client components backed by pure calculation/text utility functions. Category-level dynamic routes select only allow-listed published tools; unknown slugs return 404. Shared tool layouts keep design and SEO consistent.

## Verification

Pure function unit tests, component smoke tests, route metadata tests, responsive E2E route coverage, lint, typecheck, and production build.
