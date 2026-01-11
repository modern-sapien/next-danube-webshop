# Next Danube Webshop

A [Next.js](https://nextjs.org/) e-commerce demo application with integrated [Checkly](https://www.checklyhq.com/) monitoring.

## Architecture

This frontend repo supports multiple deployment environments with Checkly monitoring:

```
Production  → https://next-danube-webshop.vercel.app
Staging     → https://next-danube-webshop-staging.vercel.app
Preview     → Dynamic Vercel preview URLs (per PR)
Development → http://localhost:3000
```

### Environment Detection

The system automatically detects the environment:

1. **Explicit**: `NEXT_PUBLIC_ENVIRONMENT=production|staging` takes priority
2. **Vercel Preview**: Detected via `VERCEL_ENV=preview` + `VERCEL_URL`
3. **Fallback**: Defaults to `development`

### Checkly Integration

Each environment has isolated Checkly configurations:

| Environment | Check Frequency | Checkly Variables | Deployed to Checkly |
|-------------|-----------------|-------------------|---------------------|
| Production  | 5 min           | `PROD_*`          | Yes                 |
| Staging     | 15 min          | `STAGING_*`       | Yes                 |
| Preview     | Ad-hoc          | `PREVIEW_*`       | No (CI only)        |
| Development | Ad-hoc          | `DEV_*`           | No                  |

## Prerequisites

1. Node.js 18+
2. Checkly account with API key
3. Environment variables configured (see below)

## Environment Variables

Create a `.env` or `.env.local` file:

```bash
# Checkly credentials
CHECKLY_API_KEY=your_api_key
CHECKLY_ACCOUNT_ID=your_account_id

# Optional: Override URLs for local development
NEXT_PUBLIC_ENVIRONMENT_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## Installation

```bash
npm install
```

### First-time Setup

Create the Checkly environment variables for all environments:

```bash
npm run checkly:setup-vars
```

This creates `PROD_STORAGE_STATE`, `PROD_COOKIE_TIME`, `STAGING_STORAGE_STATE`, and `STAGING_COOKIE_TIME` in your Checkly account.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Testing Commands

### Local Playwright Tests

```bash
# Run all e2e tests locally
npx playwright test

# Run specific test
npx playwright test login.spec.ts
```

### Checkly Tests (Ad-hoc)

```bash
# Test against production
npm run checkly:test:prod

# Test against staging
npm run checkly:test:staging

# Test with recording (includes traces/videos)
npm run checkly:test:prod -- --record
```

### Checkly Deployment (Persistent Monitoring)

```bash
# Deploy checks to monitor production
npm run checkly:deploy:prod

# Deploy checks to monitor staging
npm run checkly:deploy:staging
```

## NPM Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run checkly:test` | Run Checkly tests (default env) |
| `npm run checkly:test:prod` | Run Checkly tests against production |
| `npm run checkly:test:staging` | Run Checkly tests against staging |
| `npm run checkly:deploy` | Deploy checks (default env) |
| `npm run checkly:deploy:prod` | Deploy checks for production monitoring |
| `npm run checkly:deploy:staging` | Deploy checks for staging monitoring |
| `npm run checkly:setup-vars` | Create Checkly environment variables |

## Project Structure

```
.
├── checks/                    # Checkly check definitions
│   ├── api.check.ts          # API health checks
│   ├── browser.check.ts      # Browser checks
│   ├── playwright.check.ts   # Playwright-based checks
│   ├── multi-step.check.ts   # Multi-step checks
│   └── resources/
│       ├── alertChannels.ts  # Alert channel configs
│       ├── group.check.ts    # Check group definition
│       └── dashboard.check.ts
├── tests/
│   ├── defaults.ts           # Central environment config
│   ├── e2e/                  # Playwright e2e tests
│   │   ├── login.spec.ts
│   │   ├── visit.spec.ts
│   │   └── ...
│   ├── multi/                # Multi-step API tests
│   └── utils/
│       ├── checklyRequestContext.ts
│       └── validateStorageState.ts
├── scripts/
│   └── setup-checkly-variables.ts
├── checkly.config.ts         # Checkly CLI configuration
└── playwright.config.ts      # Playwright configuration
```

## CI/CD Integration

### GitHub Actions

The repo includes workflows for:

- **Preview Deployments**: Runs Checkly tests against Vercel preview URLs
- **Production Deployment**: Deploys Checkly checks after production deploy
- **Staging Deployment**: Deploys Checkly checks after staging deploy

Required GitHub Secrets:
- `CHECKLY_API_KEY`
- `CHECKLY_ACCOUNT_ID`

### Vercel Integration

The environment is auto-detected from Vercel's environment variables:
- `VERCEL_ENV`: `production`, `preview`, or `development`
- `VERCEL_URL`: The deployment URL

## Checkly Features Used

- **Browser Checks**: Playwright-based UI testing
- **API Checks**: Endpoint health monitoring
- **Multi-step Checks**: Complex user flow testing
- **Retry Strategy**: Configurable retry patterns (linear, exponential)
- **Check Groups**: Organized check management
- **Alert Channels**: Email and webhook notifications

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Checkly Documentation](https://www.checklyhq.com/docs/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
