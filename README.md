# E-Commerce Web App

MarketLab is a React storefront demonstrating a searchable product catalog,
immutable cart updates, quantity removal, and exact integer-cent pricing.

## Run locally

Requires Node.js 24.15+ and npm. No credentials or backend are needed.

```bash
cd amazon
npm ci
npm test
npm run build
npm run dev
```

The Vite development server prints its local URL; `npm run preview` serves the
production build from `dist/`. The locked dependency graph is shared with CI.

## Behavior and design

- Search trims whitespace and matches product names or categories without case sensitivity.
- Adding the same item increments its quantity; removing it decrements one unit and deletes an empty cart line.
- Search filtering does not change cart contents. An empty catalog result and empty cart have explicit messages.
- Product prices are stored as integer USD cents; rendering converts to dollars only at the UI boundary.
- A reducer makes sequential cart transitions independent of captured React state.
- React Testing Library tests user-visible search, repeated additions, removal, totals, and reducer non-mutation. GitHub Actions runs tests before building.

The `amazon/` folder is retained from the original learning project. The build
has moved from Create React App to Vite, removing the unused router and Web
Vitals scaffolding. Product photos load from Unsplash; the state and tests work
without an image service or API.

## Scope

This is a frontend demonstration. Cart state resets on refresh. It has no
accounts, server-side price/inventory validation, order storage, checkout, or
payment processing. Production pricing and order authority would belong on the
server. It is not a deployed commerce service.
