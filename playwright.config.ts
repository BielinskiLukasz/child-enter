import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  // These tests drive the scene with a fake clock, and one of them registers a
  // service worker on the same origin. Parallel workers then contend for CPU and
  // for that registration, which makes the timing-sensitive tests flaky, so the
  // suite runs one test at a time.
  fullyParallel: false,
  workers: 1,
  // The scene is rich (8 landscapes, parallax meadow, 24 fps atmosphere), so the
  // long clock-driven journey tests need more wall time than the 30 s default.
  timeout: 90000,
  // Several tests stack two native dialogs and render a heavy SVG scene under a
  // fake clock; a longer expect window absorbs CPU contention without hiding
  // real regressions (each assertion still retries until it passes).
  expect: { timeout: 10000 },
  use: { baseURL: "http://localhost:5173", headless: true },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium", viewport: { width: 1440, height: 900 } },
    },
  ],
  webServer: {
    command: "npm run dev -- --host 0.0.0.0",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },
});
