import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
const routes = [
  "/",
  "/about",
  "/blog",
  "/contact",
  "/disclaimer",
  "/education",
  "/education/class-9",
  "/education/class-9/mathematics",
  "/education/class-9/mathematics/mathematics-2026-27",
  "/education/class-9/mathematics/mathematics-2026-27/number-system",
  "/hi/education",
  "/hi/education/class-9",
  "/hi/education/class-9/mathematics/mathematics-2026-27/number-system",
  "/education/cbse",
  "/education/class-11",
  "/education/class-12",
  "/education/ncert",
  "/exams",
  "/how-to",
  "/privacy-policy",
  "/search",
  "/technology",
  "/terms",
  "/tools",
  "/tools/calculators",
  "/tools/image",
  "/tools/image/image-compressor",
  "/tools/pdf",
  "/tools/pdf/pdf-merger",
  "/tools/scanner",
  "/tools/text",
  "/tools/text/word-counter",
  "/tools/web",
  "/tools/web/json-formatter-validator",
  "/tools/web/qr-code-generator",
  "/tools/calculators/age-calculator",
  "/tools/calculators/bmi-calculator",
  "/tools/calculators/percentage-calculator",
  "/tools/calculators/discount-calculator",
  "/tools/calculators/gst-calculator",
  "/tools/calculators/emi-calculator",
  "/tools/calculators/sip-calculator",
  "/tools/calculators/date-difference-calculator",
  "/tools/calculators/unit-converter",
  "/tools/calculators/fuel-cost-calculator",
  "/tools/text/case-converter",
  "/tools/text/remove-duplicate-lines",
  "/tools/text/text-sorter",
  "/tools/text/find-replace-text",
  "/tools/text/whitespace-cleaner",
  "/tools/text/line-counter",
  "/tools/web/url-encoder-decoder",
  "/tools/web/base64-encoder-decoder",
  "/tools/web/password-generator",
  "/tools/web/uuid-generator",
];
for (const width of [320, 375, 390, 414, 768, 1024, 1280, 1440]) {
  test(`routes have no console errors or overflow at ${width}px`, async ({
    page,
  }) => {
    test.setTimeout(120_000);
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("h1")).toHaveCount(1);
      const overflow = await page.evaluate(() => ({
        fits:
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
        elements: [...document.querySelectorAll<HTMLElement>("body *")]
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return rect.right > document.documentElement.clientWidth + 1;
          })
          .slice(0, 5)
          .map((element) => `${element.tagName}.${element.className}`),
      }));
      expect(
        overflow.fits,
        `${route} must not overflow at ${width}px: ${overflow.elements.join(", ")}`,
      ).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}
test("homepage and tool page pass automated accessibility checks", async ({
  page,
}) => {
  for (const route of ["/", "/tools/text/word-counter"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  }
});
test("word counter and JSON formatter work", async ({ page }) => {
  await page.goto("/tools/text/word-counter");
  await page.getByLabel("Enter or paste text").fill("one two three");
  await expect(
    page.getByText("Words").locator("..").locator("strong"),
  ).toHaveText("3");
  await page.goto("/tools/web/json-formatter-validator");
  await page.getByLabel("JSON input").fill('{"ok":true}');
  await page.getByRole("button", { name: "Format & validate" }).click();
  await expect(page.getByLabel("Result")).toContainText('"ok": true');
});
test("homepage search opens shareable results", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Search tools and guides").fill("word counter");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page).toHaveURL(/\/search\?q=word\+counter$/);
  await expect(page.getByRole("link", { name: /Word Counter/ })).toBeVisible();
});

test("homepage uses readable wide-desktop scale", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");
  const contentWidth = await page
    .locator(".home-content")
    .first()
    .evaluate((element) => element.getBoundingClientRect().width);
  const navFontSize = await page
    .locator(".site-nav-link")
    .first()
    .evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).fontSize),
    );
  expect(contentWidth).toBeGreaterThanOrEqual(1600);
  expect(navFontSize).toBeGreaterThanOrEqual(18);
});

test("tool pages match the approved wide-desktop physical scale", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/tools/pdf/pdf-merger");
  const headingSize = await page
    .locator("h1")
    .evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).fontSize),
    );
  const noticeCopySize = await page
    .locator(".status-notice p")
    .evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).fontSize),
    );
  const navSize = await page
    .locator(".site-nav-link")
    .first()
    .evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).fontSize),
    );
  expect(headingSize).toBeGreaterThanOrEqual(90);
  expect(noticeCopySize).toBeGreaterThanOrEqual(18);
  expect(navSize).toBeGreaterThanOrEqual(20);
});

test("new everyday tools render and calculate on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/tools/calculators/percentage-calculator");
  await page.getByRole("spinbutton", { name: "Part" }).fill("25");
  await page.getByRole("spinbutton", { name: "Total" }).fill("200");
  await expect(page.getByText("12.5%")).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);

  await page.goto("/tools/text/case-converter");
  await page.getByRole("textbox", { name: "Your text" }).fill("hello india");
  await expect(page.locator(".tool-output pre")).toHaveText("HELLO INDIA");

  await page.goto("/tools/web/password-generator");
  await page.getByRole("button", { name: "Generate" }).click();
  await expect(page.locator(".tool-output pre")).not.toHaveText(
    "Your result will appear here.",
  );
});

test("education lesson is bilingual, accessible and mobile-safe", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto(
    "/education/class-9/mathematics/mathematics-2026-27/number-system",
  );
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Number System Explained Simply",
    }),
  ).toBeVisible();
  const hindiLink = page.getByRole("link", { name: "हिंदी में पढ़ें" });
  await hindiLink.focus();
  await expect(hindiLink).toBeFocused();
  await hindiLink.click();
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "संख्या पद्धति आसान भाषा में",
    }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("every sitemap page declares itself as canonical", async ({ page }) => {
  test.setTimeout(180_000);
  const response = await page.request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );
  expect(new Set(urls).size).toBe(urls.length);

  for (const url of urls) {
    const pathname = new URL(url).pathname;
    await page.goto(pathname);
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(
      canonical ? new URL(canonical).toString() : canonical,
      `${pathname} must self-canonicalize`,
    ).toBe(new URL(url).toString());
    await expect(page).not.toHaveTitle(
      /\| Sakalakaboomboom \| Sakalakaboomboom$/,
    );
  }
});
