import { defineConfig, devices } from "@playwright/test";

const previewPort = 4325;
const siteUrl = `http://127.0.0.1:${previewPort}/ektl.dev/`;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  webServer: {
    command: `pnpm preview --host 127.0.0.1 --port ${previewPort}`,
    url: siteUrl,
    reuseExistingServer: false,
    timeout: 120_000,
  },
  use: {
    baseURL: siteUrl,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
