import { existsSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

const systemChrome = "/usr/bin/google-chrome";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: "http://localhost:3000",
    trace: "off",
  },
  webServer: {
    command: "npm run dev -- --webpack",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: existsSync(systemChrome)
          ? { executablePath: systemChrome }
          : {},
      },
    },
  ],
});
