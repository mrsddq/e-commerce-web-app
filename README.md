# E-Commerce Web App

A small React storefront with searchable product catalog data, add-to-cart state, responsive product cards, and a reproducible build pipeline.

## Structure

```text
amazon/
  public/
  src/
  package.json
```

## Setup

```bash
cd amazon
npm install
npm start
```

## Implemented Scope

- responsive catalog UI
- search across product names and categories
- cart count and cart total state
- static product data suitable for later API replacement
- GitHub Actions build workflow
- product roadmap in [docs/product-roadmap.md](docs/product-roadmap.md)
- npm lockfile for reproducible installs

## Current Limitation

This is a frontend-only learning app. It does not yet include authentication, payment processing, backend inventory, order persistence, screenshots, or a live deployment URL.
