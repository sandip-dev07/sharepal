import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  use: {
    baseURL: "http://localhost:3000",
    channel: process.platform === "win32" ? "msedge" : undefined,
    viewport: { width: 1530, height: 1000 },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node node_modules/next/dist/bin/next dev --port 3000",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
