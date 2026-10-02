import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
const routes = [
  "/",
  "/about",
  "/blog",
  "/contact",
  "/disclaimer",
  "/education",
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
];
for (const width of [320, 375, 390, 414, 768, 1024, 1280, 1440]) {
  test(`routes have no console errors or overflow at ${width}px`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
        ),
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
