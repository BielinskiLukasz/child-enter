import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  // The scene is rich (8 landscapes, parallax meadow, 24 fps atmosphere), so the
  // long clock-driven journey tests need more wall time than the 30 s default.
  timeout: 90000,
  expect: { timeout: 5000 },
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
