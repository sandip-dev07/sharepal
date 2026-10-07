# SharePal gaming rental page

The page is available at `/` and `/bangalore/gaming-gadgets-on-rent`.

## Design and data

- Reference: Figma file `kARIaJm38KqGtGXqfJffUA`, main node `5:3`, header `5:624`, footer `5:446`.
- Original exported images and SVGs are stored in `public/figma`. No temporary Figma asset URLs are used at runtime.
- The desktop reference uses a 1,216px content area, a 120px sidebar, a 32px gutter, a 1,064 × 228px hero, and four product columns.
- `src/constants/data/product-list.json` remains the supplied catalog. `products.ts` adds six missing featured products and applies the reference image order, availability, and six-day prices. There are 29 actual records, so counts and pagination reflect 29 rather than the reference's 50.
- Other rental durations use a proportional estimate from the supplied or reference prices. Prices and stock are static demonstration data; this project has no live booking API.

## Interactions

Category filters, catalog search, product detail dialogs, incremental pagination, rental date validation, price recalculation, cart quantities and removal, FAQ accordions, horizontally scrollable reviews, and mobile navigation are implemented. Cart state lasts for the current page session. Login, promotional, support, and informational links lead to the original SharePal services.

The page uses existing Base UI dialog, accordion, input, and button components, plus the installed Inter and Ubuntu fonts. Layouts adapt to desktop, tablet, and mobile, with keyboard focus styles and reduced-motion support.

## Run and verify

```sh
npm run dev
npm run build
npm run test:e2e
```

Playwright uses installed Microsoft Edge on Windows and Chromium on other platforms. On other platforms, run `npx playwright install chromium` once. The tests start a local server if one is not already running.

Browser coverage includes filtering/search/pagination, cart totals and quantities, invalid and valid rental dates, all initial product/design images, FAQs, and mobile overflow/navigation. TypeScript and lint checks can be run with:

```sh
npx tsc --noEmit
npx eslint src/app src/components/sharepal src/constants/data src/lib/rental.ts tests playwright.config.ts
```
