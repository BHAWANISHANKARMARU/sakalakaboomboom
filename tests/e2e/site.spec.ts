import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
const routes = [
  "/",
  "/tools",
  "/tools/pdf/pdf-merger",
  "/tools/image/image-compressor",
  "/tools/text/word-counter",
  "/tools/web/json-formatter-validator",
  "/tools/web/qr-code-generator",
  "/about",
  "/privacy-policy",
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
