# README.md

This file provides guidance to AI when working with code in this repository.

## Project Overview

Next Danube is a book e-commerce application with two main components:
- **next-webstore/**: Next.js 13 frontend with App Router
- **server/**: Express.js + MongoDB backend API

The project uses Checkly for monitoring and synthetic testing in addition to Playwright for E2E tests.

## Common Commands

### Frontend (next-webstore/)
```bash
cd next-webstore
npm run dev          # Start development server on localhost:3000
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Backend (server/)
```bash
cd server
npm run dev          # Start with nodemon on port 5000
npm start            # Start production server
```

### Testing & Monitoring
```bash
# Run Playwright tests locally
cd next-webstore
npx playwright test                    # Run all E2E tests
npx playwright test tests/e2e/login.spec.ts  # Run single test

# Checkly commands (from next-webstore/)
NEXT_PUBLIC_ENVIRONMENT=staging npx checkly test --record    # Test against staging
NEXT_PUBLIC_ENVIRONMENT=production npx checkly test --record # Test against production
npx checkly deploy                                            # Deploy checks to Checkly
npx checkly test --update-snapshots                          # Update visual snapshots
```

## Architecture

### Frontend Structure (next-webstore/app/)
Uses Next.js 13 App Router with page-based routing:
- `app/` - Route segments (about/, book/, cart/, login/, user/)
- `app/components/` - Shared React components
- `app/styles/` - CSS modules

### Backend Structure (server/)
Express.js REST API following MVC pattern:
- `controllers/` - Request handlers (auth.js, books.js, reviews.js, users.js)
- `models/` - Mongoose schemas (Book.js, Review.js, User.js)
- `routes/` - Express route definitions
- `middleware/` - Auth middleware (auth.js), error handling (error.js), async wrapper
- API base path: `/api/v1/`

### Testing Structure (next-webstore/)
- `tests/e2e/` - Playwright browser tests (used by Checkly browserChecks)
- `tests/multi/` - Checkly multi-step checks
- `tests/defaults.ts` - Shared test configuration (URLs, credentials per environment)
- `checks/` - Checkly check definitions (API, browser, multi-step)
- `checks/resources/` - Alert channels, check groups, dashboards

### Environment Configuration
- `tests/defaults.ts` controls environment-specific settings based on `NEXT_PUBLIC_ENVIRONMENT`:
  - `production`: next-danube-webshop.vercel.app
  - `staging`: next-danube-webshop-staging.vercel.app
  - Backend API similarly differentiated

## CI/CD

GitHub Actions workflows:
- `playwright.yml` - Runs Playwright tests on all branches
- `checkly-preview-test.yml` - Runs Checkly tests on Vercel preview deployments
- `checkly-fail-safe.yml` - Additional Checkly workflow

Both frontend and backend deploy independently to Vercel.
