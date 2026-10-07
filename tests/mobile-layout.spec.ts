import { expect, test } from "@playwright/test";

for (const width of [320, 393, 430, 768, 1440]) {
  test(`catalog fits a ${width}px viewport`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 852 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    await page.locator(".hero-gaming img, .product-card:nth-child(-n+2) img").evaluateAll(async (images) => {
      await Promise.all(images.map(async (img) => {
        if (!(img instanceof HTMLImageElement)) return;
        img.loading = "eager";
        await img.decode().catch(() => {});
      }));
    });
    await expect(page.locator(".product-card")).toHaveCount(12);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);

    const columns = await page.locator(".product-grid").evaluate((el) =>
      getComputedStyle(el).gridTemplateColumns.split(" ").length,
    );
    expect(columns).toBe(width < 640 ? 2 : width < 1024 ? 3 : 4);

    if (width < 640) {
      await expect.poll(() => page.locator(".category-tabs").evaluate((rail) => {
        const active = rail.querySelector("[aria-current]")!;
        return Math.abs(active.getBoundingClientRect().left - rail.getBoundingClientRect().left);
      })).toBeLessThan(1);
      const login = await page.locator(".login-link").boundingBox();
      expect(login!.x + login!.width).toBeLessThanOrEqual(width);
      await expect(page.getByRole("complementary", { name: "Gaming categories" })).toBeVisible();
      const hero = await page.locator(".hero-gaming").boundingBox();
      expect(hero?.height).toBe(150);
      const first = page.locator(".product-card").first();
      await expect(first.locator(".add-product-label")).toBeVisible();
      const action = await first.locator(".add-product").boundingBox();
      const card = await first.boundingBox();
      expect(action?.width).toBeCloseTo(card!.width - 20, 0);
    }
    await page.screenshot({ path: testInfo.outputPath("catalog.png"), animations: "disabled" });
  });
}

test("mobile filtering, cart quantity, pagination and FAQ remain usable", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const first = page.locator(".product-card").first();
  await first.locator(".add-product").click();
  await expect(first.locator(".qty-stepper span")).toHaveText("1");
  await first.getByRole("button", { name: /Add one more/ }).click();
  await expect(first.locator(".qty-stepper span")).toHaveText("2");
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("button", { name: "Cart (2)" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("cart.png"), animations: "disabled" });
  const dates = await page.locator(".cart-dates").boundingBox();
  const edit = await page.locator(".cart-dates-edit").boundingBox();
  expect(edit!.x + edit!.width).toBeLessThanOrEqual(dates!.x + dates!.width);
  expect(await page.getByRole("dialog").evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
  await page.keyboard.press("Escape");
  await page.getByRole("complementary").getByRole("button", { name: "Xbox Console", exact: true }).click();
  await expect(page.locator(".product-card h3").first()).toContainText(/xbox/i);
  await page.getByRole("complementary").getByRole("button", { name: "All", exact: true }).click();
  await page.getByRole("button", { name: "Show More", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(24);
  const faq = page.getByRole("button", { name: "How can I rent from SharePal?" });
  await faq.click();
  await expect(faq).toHaveAttribute("aria-expanded", "true");
  await faq.click();
  await page.locator(".social-proof").scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath("reviews.png") });
  await page.locator(".faq-section").screenshot({ path: testInfo.outputPath("faq.png") });
});
