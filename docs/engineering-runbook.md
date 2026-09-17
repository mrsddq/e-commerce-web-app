# Local verification

Use Node.js 24.15+ with the committed lockfile.

```bash
cd amazon
npm ci
npm test
npm run build
npm run dev
```

Manual check: Search by category, add the same item twice, filter the catalog, and remove each quantity. The cart count and cents total must remain consistent.

State is local to the tab. A passing build/test suite verifies the frontend; it does not establish a backend service or a live deployment.
