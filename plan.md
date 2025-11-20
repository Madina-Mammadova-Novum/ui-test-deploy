# Frontend Split Strategy: Marketing vs App
## Monorepo with Subdomain Separation & Independent Deployments

> **Document Purpose**: Implementation plan for separating our marketing site from the authenticated app using a hybrid monorepo approach  
> **Strategy**: One codebase, four servers (2 dev + 2 prod), independent deployments  
> **Team Context**: Small team (2-3 developers) with no dedicated marketing team yet  
> **Package Manager**: Yarn  
> **Deployment**: Docker containers via GitHub Actions → Azure Container Registry → SSH deployment  
> **Environments**: Development (live) & Production  
> **Date**: November 2025
> **Status**: Ready for Implementation

---

## Table of Contents

- [Executive Summary](#executive-summary)
- [The Strategy: Option B Enhanced](#the-strategy-option-b-enhanced)
- [Architecture Overview](#architecture-overview)
- [Folder Structure](#folder-structure)
- [Environment Management](#environment-management)
- [CI/CD Pipeline Strategy](#cicd-pipeline-strategy)
- [Development Workflow](#development-workflow)
- [Authentication & Cookie Strategy](#authentication--cookie-strategy)
- [Implementation Roadmap](#implementation-roadmap)
- [Cost Analysis](#cost-analysis)
- [Developer Experience](#developer-experience)
- [FAQs](#faqs)

---

## Executive Summary

### What We're Building

A **monorepo with subdomain separation** where:
- **ship.link** serves marketing pages (public website)
- **app.ship.link** serves the authenticated application
- **Same codebase**, deployed to **four separate servers** (2 dev + 2 prod)
- **Independent deployments** for marketing and app
- **Using Yarn** as package manager
- **Three environments**: Local development, Live Dev, and Production
- **Docker-based deployment** via existing CI/CD infrastructure

### Why This Approach?

| Benefit | Description |
|---------|-------------|
| ✅ **Monorepo Benefits** | Shared components, no npm packages, single source of truth |
| ✅ **Independent Deployments** | Update marketing without touching app, and vice versa |
| ✅ **Failure Isolation** | If app crashes, marketing stays up (critical for SEO) |
| ✅ **Easy Authentication** | Cookie domain `.ship.link` works across both subdomains |
| ✅ **Testing Environment** | Live dev environment for testing before production |
| ✅ **Simple Maintenance** | Share components easily, fix bugs once |
| ✅ **Future Proof** | Can fully split later if needed |

### Key Metrics

- **Implementation Time**: 2-3 weeks
- **Monthly Cost**: Existing infrastructure (no additional Azure App Services)
- **Team Size Required**: 1-2 developers
- **Deployment Independence**: ✅ Yes
- **Code Sharing**: ✅ Easy (direct imports)
- **Package Manager**: Yarn
- **Deployment Method**: Docker containers via existing workflows

---

## The Strategy: Option B Enhanced

### Core Concept

We keep our **single codebase (monorepo)** but deploy it to **four separate servers** using Docker containers:

```
┌─────────────────────────────────────────────┐
│         ShipLink Frontend Monorepo          │
│                                             │
│  ┌─────────────┐         ┌──────────────┐ │
│  │  Marketing  │         │     App      │ │
│  │   Routes    │         │   Routes     │ │
│  └─────────────┘         └──────────────┘ │
│         │                       │          │
│         └───────┬───────────────┘          │
│                 │                          │
│         ┌───────▼────────┐                │
│         │ Shared         │                │
│         │ Components     │                │
│         └────────────────┘                │
└─────────────────────────────────────────────┘
         │         Dockerfile.ci       │
         │      (Build Docker Image)    │
         ▼                              ▼
┌──────────────────────────────────────────────┐
│   Azure Container Registry (ACR)             │
│   - marketing-dev:latest                     │
│   - marketing-prod:latest                    │
│   - app-dev:latest                           │
│   - app-prod:latest                          │
└──────────────────────────────────────────────┘
         │                              │
         │    SSH Deployment            │
         ▼                              ▼
┌─────────────────┬─────────────────────────────┐
│   DEV Servers   │   PRODUCTION Servers        │
├─────────────────┼─────────────────────────────┤
│ dev.ship.link   │ ship.link                   │
│ (Marketing Dev) │ (Marketing Prod)            │
├─────────────────┼─────────────────────────────┤
│ dev-app.ship    │ app.ship.link               │
│ .link (App Dev) │ (App Prod)                  │
└─────────────────┴─────────────────────────────┘
```

### How It Works

1. **Single Codebase**: All code lives in one repository
2. **Environment Variables**: Each Docker container runs with different `NEXT_PUBLIC_SITE_MODE` (marketing or app)
3. **Dockerfile.ci**: Single Dockerfile builds images for all servers
4. **Azure Container Registry**: Stores all Docker images
5. **GitHub Actions**: Existing reusable workflow deploys via SSH
6. **Middleware Routing**: Routes traffic based on site mode
7. **Shared Components**: Import directly, no npm packages needed
8. **Cookie Sharing**: Domain `.ship.link` works on both subdomains
9. **Yarn Workspaces**: Single `yarn.lock` for consistent dependencies

---

## Architecture Overview

### Domain Structure

| Domain | Purpose | Environment | Server | Users |
|--------|---------|-------------|--------|-------|
| **dev.ship.link** | Dev marketing | Development | Dev Marketing | Testers 🧪 |
| **dev-app.ship.link** | Dev app | Development | Dev App | Testers 🧪 |
| **ship.link** | Public website | Production | Prod Marketing | Everyone 🌍 |
| **app.ship.link** | Authenticated app | Production | Prod App | Logged users 🔐 |

### User Journey (Production)

```
1. User visits ship.link
   ↓
   DNS → Production Marketing Server
   ↓
   Sees: Homepage, Features, Search, About

2. User clicks "Login"
   ↓
   Goes to: ship.link/login (still on Marketing Server)
   ↓
   Enters credentials

3. Login successful
   ↓
   Cookie set with domain: .ship.link
   ↓
   Redirect to: app.ship.link/account/search

4. User arrives at app.ship.link
   ↓
   DNS → Production App Server
   ↓
   Cookie automatically works (same domain)
   ↓
   User sees: Dashboard, Deals, Chat

5. Later: Marketing update
   ↓
   Deploy only Marketing Server (dev and/or prod)
   ↓
   App Server keeps running
   ↓
   Logged users unaffected ✅
```

---

## Folder Structure

### Project Organization

We'll use Next.js **Route Groups** (folders with parentheses) to organize our codebase:

```
shiplink-frontend-ui/
│
├── app/
│   ├── (marketing)/              → Marketing routes for ship.link
│   │   ├── page.js               → Homepage
│   │   ├── about-us/
│   │   │   └── page.js
│   │   ├── contact-us/
│   │   │   └── page.js
│   │   ├── features/
│   │   │   └── page.js
│   │   └── [[...slug]]/          → Strapi dynamic pages
│   │       └── page.js
│   │
│   ├── (auth)/                   → Auth pages (shared by both)
│   │   ├── login/
│   │   │   └── page.js
│   │   ├── signup/
│   │   │   └── page.js
│   │   └── forgot-password/
│   │       └── page.js
│   │
│   └── (app)/                    → App routes for app.ship.link
│       ├── account/
│       │   ├── search/
│       │   │   └── page.js
│       │   ├── positions/
│       │   │   └── page.js
│       │   └── profile/
│       │       └── page.js
│       ├── deals/
│       │   ├── page.js
│       │   └── [id]/
│       │       └── page.js
│       └── negotiating/
│           └── page.js
│
├── components/
│   ├── marketing/                → Marketing-only components
│   │   ├── Hero/
│   │   ├── FeatureSection/
│   │   └── MarketingFooter/
│   │
│   ├── app/                      → App-only components
│   │   ├── DealsList/
│   │   ├── NegotiationPanel/
│   │   └── AppSidebar/
│   │
│   └── shared/                   → Shared components
│       ├── SearchComponent/      ← Used by both!
│       ├── Header/
│       ├── Button/
│       └── Modal/
│
├── lib/
│   ├── config.js                 → Environment-based config
│   ├── constants/
│   └── schemas.js
│
├── services/                     → Business logic (app-focused)
├── store/                        → Redux store (app-focused)
├── adapters/                     → API adapters
├── utils/                        → Shared utilities
│
├── middleware.js                 → Subdomain routing logic
├── next.config.js                → Server-specific optimizations
├── Dockerfile.ci                 → Docker build configuration (existing)
│
├── .github/
│   └── workflows/
│       ├── deploy-reusable.yml   → Existing reusable workflow
│       ├── deploy-dev.yml        → Existing dev deployment
│       ├── deploy-marketing-dev.yml      → New: Deploy marketing to dev
│       ├── deploy-marketing-prod.yml     → New: Deploy marketing to prod
│       ├── deploy-app-dev.yml            → New: Deploy app to dev
│       └── deploy-app-prod.yml           → New: Deploy app to prod
│
├── package.json                  → Dependencies
├── yarn.lock                     → Yarn lock file
│
├── .env.local.example            → Template for local development
├── .env.development.marketing    → Local marketing env
├── .env.development.app          → Local app env
└── .env.example                  → General template
```

**Important Notes:**
- Parentheses `(marketing)`, `(auth)`, `(app)` are just for organization - they don't appear in URLs
- `app/(marketing)/about-us/page.js` → renders at `/about-us`
- `app/(app)/account/search/page.js` → renders at `/account/search`
- Existing `Dockerfile.ci` will build all variants
- Existing deployment workflows will be extended for 4 servers

---

## Environment Management

### Environment Matrix

We have **3 development contexts**:

| Environment | Marketing | App | Branch | Deployment |
|-------------|-----------|-----|--------|------------|
| **Local Development** | localhost:3000 | localhost:3001 | feature/* | Manual |
| **Live Development** | dev.ship.link | dev-app.ship.link | develop | Auto (GitHub Actions) |
| **Production** | ship.link | app.ship.link | main | Auto (GitHub Actions) |

### Environment Variables Structure

#### Local Development: `.env.development.marketing`

```env
# Server Mode (Critical for routing)
NEXT_PUBLIC_SITE_MODE=marketing

# URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_STRAPI=true
NEXT_PUBLIC_MAINTENANCE_MODE=false

# External Services (Dev)
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_RT_URL=http://localhost:5000/hubs

# Auth
NEXT_PUBLIC_COOKIE_DOMAIN=localhost
NEXTAUTH_SECRET=dev_secret_marketing

# Environment
NODE_ENV=development
NEXT_PUBLIC_APP_ENV=development
```

#### Local Development: `.env.development.app`

```env
# Server Mode (Critical for routing)
NEXT_PUBLIC_SITE_MODE=app

# URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3001
NEXT_PUBLIC_MARKETING_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_SIGNALR=true
NEXT_PUBLIC_MAINTENANCE_MODE=false

# External Services (Dev)
NEXT_PUBLIC_RT_URL=http://localhost:5000/hubs
BACKEND_API_URL=http://localhost:5000
IDENTITY_API_URL=http://localhost:5001

# Auth
NEXT_PUBLIC_COOKIE_DOMAIN=localhost
NEXTAUTH_SECRET=dev_secret_app

# Environment
NODE_ENV=development
NEXT_PUBLIC_APP_ENV=development
```

### GitHub Environment Secrets

You'll need to create **4 new GitHub Environments** (in addition to existing `dev` and `prod`):

1. **`dev-marketing`** - Development marketing server
2. **`dev-app`** - Development app server
3. **`prod-marketing`** - Production marketing server
4. **`prod-app`** - Production app server

**Required secrets per environment** (extending your existing setup):

```yaml
# All environments need these base secrets
ACR_REGISTRY_URL: <your-acr>.azurecr.io
ACR_USERNAME: <acr-username>
ACR_PASSWORD: <acr-password>
SSH_HOST: <server-ip-or-hostname>
SSH_USERNAME: <ssh-user>
SSH_PASSWORD: <ssh-password> # or SSH_PRIVATE_KEY
SSH_PORT: 22

# Environment-specific application secrets
NEXT_PUBLIC_SITE_MODE: marketing # or app
NEXT_PUBLIC_BASE_URL: https://dev.ship.link # or appropriate URL
NEXT_PUBLIC_APP_URL: https://dev-app.ship.link # for marketing envs
NEXT_PUBLIC_MARKETING_URL: https://dev.ship.link # for app envs
NEXTAUTH_SECRET: <secret-for-this-env>
NEXT_PUBLIC_API_URL: <api-url>

# All your existing secrets (from deploy-reusable.yml)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY: <secret>
RECAPTCHA_SECRET_KEY: <secret>
NEXT_PUBLIC_STRAPI_API_URL: <url>
NEXT_PUBLIC_RT_URL: <url>
BACKEND_API_URL: <url>
IDENTITY_API_URL: <url>
# ... etc (all existing secrets)
```

### Configuration Helper

Create `lib/config.js` to easily access environment-based configuration:

```javascript
const getConfig = () => {
  const siteMode = process.env.NEXT_PUBLIC_SITE_MODE;
  const env = process.env.NODE_ENV;
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV || 'production';
  const isMarketing = siteMode === 'marketing';
  const isApp = siteMode === 'app';
  
  return {
    siteMode,
    isMarketing,
    isApp,
    
    // URLs
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_URL,
    appUrl: isMarketing 
      ? process.env.NEXT_PUBLIC_APP_URL 
      : process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_URL,
    marketingUrl: isApp 
      ? process.env.NEXT_PUBLIC_MARKETING_URL 
      : process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_URL,
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    
    // External services
    strapiUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    signalrUrl: process.env.NEXT_PUBLIC_RT_URL,
    backendApiUrl: process.env.BACKEND_API_URL,
    
    // Features
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    enableStrapi: isMarketing, // Marketing needs Strapi
    enableSignalR: isApp, // App needs SignalR
    maintenanceMode: process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true',
    
    // Auth
    cookieDomain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    
    // Environment checks
    isDevelopment: env === 'development',
    isProduction: env === 'production',
    isDevEnvironment: appEnv === 'dev' || appEnv === 'development',
    isProdEnvironment: appEnv === 'prod' || appEnv === 'production',
  };
};

export default getConfig;
```

**Usage:**

```javascript
import getConfig from '@/lib/config';

const MyComponent = () => {
  const config = getConfig();
  
  const handleLogin = () => {
    window.location.href = `${config.appUrl}/account/search`;
  };
  
  return (
    <div>
      {config.isMarketing && <MarketingHeader />}
      {config.isApp && <AppHeader />}
      {config.isDevEnvironment && <DevBanner />}
    </div>
  );
};
```

---

## CI/CD Pipeline Strategy

### GitHub Actions Workflows

We'll create **4 new workflow files** based on your existing `deploy-dev.yml`:

1. `.github/workflows/deploy-marketing-dev.yml`
2. `.github/workflows/deploy-marketing-prod.yml`
3. `.github/workflows/deploy-app-dev.yml`
4. `.github/workflows/deploy-app-prod.yml`

All workflows will use your existing `deploy-reusable.yml` workflow.

### Workflow 1: Deploy Marketing Development

**`.github/workflows/deploy-marketing-dev.yml`**

```yaml
name: Deploy Marketing - Development

# 🎯 Triggers: When PR is merged to 'develop' branch and marketing files change
on:
  push:
    branches:
      - develop
    paths:
      # Marketing-specific paths
      - 'app/(marketing)/**'
      - 'components/marketing/**'
      - 'components/shared/**'
      - 'lib/**'
      - 'utils/**'
      # Core files
      - 'package.json'
      - 'yarn.lock'
      - 'next.config.js'
      - 'tailwind.config.js'
      - 'middleware.js'
      - 'Dockerfile.ci'
      - '.github/workflows/deploy-marketing-dev.yml'
      - '.github/workflows/deploy-reusable.yml'

  # Allow manual deployment trigger from GitHub UI
  workflow_dispatch:
    inputs:
      reason:
        description: 'Reason for manual deployment'
        required: false
        default: 'Manual deployment'

# Prevent multiple deployments from running simultaneously
concurrency:
  group: deploy-marketing-dev
  cancel-in-progress: false

jobs:
  deploy:
    name: Deploy Marketing to Development
    uses: ./.github/workflows/deploy-reusable.yml
    with:
      environment: dev-marketing
      image-tag-suffix: marketing-dev-latest
      deployment-reason: ${{ github.event.inputs.reason || 'Automated deployment from develop branch' }}
      environment-display-name: 'DEV MARKETING'
      app-url: 'https://dev.ship.link'
    secrets: inherit
```

### Workflow 2: Deploy Marketing Production

**`.github/workflows/deploy-marketing-prod.yml`**

```yaml
name: Deploy Marketing - Production

# 🎯 Triggers: When PR is merged to 'main' branch and marketing files change
on:
  push:
    branches:
      - main
    paths:
      # Marketing-specific paths
      - 'app/(marketing)/**'
      - 'components/marketing/**'
      - 'components/shared/**'
      - 'lib/**'
      - 'utils/**'
      # Core files
      - 'package.json'
      - 'yarn.lock'
      - 'next.config.js'
      - 'tailwind.config.js'
      - 'middleware.js'
      - 'Dockerfile.ci'
      - '.github/workflows/deploy-marketing-prod.yml'
      - '.github/workflows/deploy-reusable.yml'

  # Allow manual deployment trigger from GitHub UI
  workflow_dispatch:
    inputs:
      reason:
        description: 'Reason for manual deployment'
        required: false
        default: 'Manual deployment'

# Prevent multiple deployments from running simultaneously
concurrency:
  group: deploy-marketing-prod
  cancel-in-progress: false

jobs:
  deploy:
    name: Deploy Marketing to Production
    uses: ./.github/workflows/deploy-reusable.yml
    with:
      environment: prod-marketing
      image-tag-suffix: marketing-prod-latest
      deployment-reason: ${{ github.event.inputs.reason || 'Automated deployment from main branch' }}
      environment-display-name: 'PRODUCTION MARKETING'
      app-url: 'https://ship.link'
    secrets: inherit
```

### Workflow 3: Deploy App Development

**`.github/workflows/deploy-app-dev.yml`**

```yaml
name: Deploy App - Development

# 🎯 Triggers: When PR is merged to 'develop' branch and app files change
on:
  push:
    branches:
      - develop
    paths:
      # App-specific paths
      - 'app/(app)/**'
      - 'components/app/**'
      - 'components/shared/**'
      - 'services/**'
      - 'store/**'
      - 'adapters/**'
      - 'lib/**'
      - 'utils/**'
      # Core files
      - 'package.json'
      - 'yarn.lock'
      - 'next.config.js'
      - 'tailwind.config.js'
      - 'middleware.js'
      - 'Dockerfile.ci'
      - '.github/workflows/deploy-app-dev.yml'
      - '.github/workflows/deploy-reusable.yml'

  # Allow manual deployment trigger from GitHub UI
  workflow_dispatch:
    inputs:
      reason:
        description: 'Reason for manual deployment'
        required: false
        default: 'Manual deployment'

# Prevent multiple deployments from running simultaneously
concurrency:
  group: deploy-app-dev
  cancel-in-progress: false

jobs:
  deploy:
    name: Deploy App to Development
    uses: ./.github/workflows/deploy-reusable.yml
    with:
      environment: dev-app
      image-tag-suffix: app-dev-latest
      deployment-reason: ${{ github.event.inputs.reason || 'Automated deployment from develop branch' }}
      environment-display-name: 'DEV APP'
      app-url: 'https://dev-app.ship.link'
    secrets: inherit
```

### Workflow 4: Deploy App Production

**`.github/workflows/deploy-app-prod.yml`**

```yaml
name: Deploy App - Production

# 🎯 Triggers: When PR is merged to 'main' branch and app files change
on:
  push:
    branches:
      - main
    paths:
      # App-specific paths
      - 'app/(app)/**'
      - 'components/app/**'
      - 'components/shared/**'
      - 'services/**'
      - 'store/**'
      - 'adapters/**'
      - 'lib/**'
      - 'utils/**'
      # Core files
      - 'package.json'
      - 'yarn.lock'
      - 'next.config.js'
      - 'tailwind.config.js'
      - 'middleware.js'
      - 'Dockerfile.ci'
      - '.github/workflows/deploy-app-prod.yml'
      - '.github/workflows/deploy-reusable.yml'

  # Allow manual deployment trigger from GitHub UI
  workflow_dispatch:
    inputs:
      reason:
        description: 'Reason for manual deployment'
        required: false
        default: 'Manual deployment'

# Prevent multiple deployments from running simultaneously
concurrency:
  group: deploy-app-prod
  cancel-in-progress: false

jobs:
  deploy:
    name: Deploy App to Production
    uses: ./.github/workflows/deploy-reusable.yml
    with:
      environment: prod-app
      image-tag-suffix: app-prod-latest
      deployment-reason: ${{ github.event.inputs.reason || 'Automated deployment from main branch' }}
      environment-display-name: 'PRODUCTION APP'
      app-url: 'https://app.ship.link'
    secrets: inherit
```

### Package.json Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "dev:marketing": "cross-env NEXT_PUBLIC_SITE_MODE=marketing PORT=3000 next dev",
    "dev:app": "cross-env NEXT_PUBLIC_SITE_MODE=app PORT=3001 next dev",
    
    "build": "next build",
    "build:marketing": "cross-env NEXT_PUBLIC_SITE_MODE=marketing next build",
    "build:app": "cross-env NEXT_PUBLIC_SITE_MODE=app next build",
    
    "start": "next start",
    "start:marketing": "cross-env NEXT_PUBLIC_SITE_MODE=marketing next start",
    "start:app": "cross-env NEXT_PUBLIC_SITE_MODE=app PORT=3001 next start",
    
    "test": "jest",
    "lint": "next lint"
  }
}
```

### Docker Integration

Your existing `Dockerfile.ci` will build the image. At runtime, pass `NEXT_PUBLIC_SITE_MODE` environment variable to the container:

**Modify the Docker run command in `deploy-reusable.yml` (lines 376-416):**

Add this line to the docker run command:

```yaml
-e NEXT_PUBLIC_SITE_MODE="${{ secrets.NEXT_PUBLIC_SITE_MODE }}" \
```

This environment variable will be different for each GitHub Environment (marketing vs app).

---

## Development Workflow

### Local Development Setup

#### Step 1: Install Dependencies

```bash
yarn install
```

#### Step 2: Install cross-env

```bash
yarn add -D cross-env
```

#### Step 3: Create Environment Files

```bash
cp .env.local.example .env.development.marketing
cp .env.local.example .env.development.app

# Edit both files with your local configuration
```

#### Step 4: Update Hosts File (Optional)

For subdomain testing locally:

**Windows:** `C:\Windows\System32\drivers\etc\hosts`  
**Mac/Linux:** `/etc/hosts`

Add:
   ```
   127.0.0.1 ship.link
   127.0.0.1 app.ship.link
   ```

#### Step 5: Run Both Servers

**Terminal 1 - Marketing:**
```bash
yarn dev:marketing
# Runs on http://localhost:3000
# Or http://ship.link:3000 if hosts file configured
```

**Terminal 2 - App:**
```bash
yarn dev:app
# Runs on http://localhost:3001
# Or http://app.ship.link:3001 if hosts file configured
```

### Development Scenarios

#### Scenario 1: Update Marketing Homepage

```bash
# 1. Create feature branch
git checkout -b feature/homepage-hero

# 2. Run marketing server
yarn dev:marketing

# 3. Edit app/(marketing)/page.js

# 4. Test at http://localhost:3000

# 5. Commit and push
git add .
git commit -m "feat(marketing): update homepage hero section"
git push origin feature/homepage-hero

# 6. Create PR to develop
# → Merged → Auto-deploys to dev.ship.link

# 7. Test on dev: https://dev.ship.link

# 8. Create PR to main
# → Merged → Auto-deploys to ship.link
```

#### Scenario 2: Update Shared Component

```bash
# 1. Create feature branch
git checkout -b feature/search-improvements

# 2. Run BOTH servers
yarn dev:marketing   # Terminal 1
yarn dev:app         # Terminal 2

# 3. Edit components/shared/SearchComponent/index.js

# 4. Test on both:
#    - http://localhost:3000 (marketing)
#    - http://localhost:3001 (app)

# 5. Commit and push
git add .
git commit -m "feat(shared): improve search autocomplete"
git push origin feature/search-improvements

# 6. Create PR to develop
# → Merged → Triggers BOTH marketing-dev AND app-dev workflows
# → Deploys to BOTH dev.ship.link AND dev-app.ship.link

# 7. Test both:
#    - https://dev.ship.link
#    - https://dev-app.ship.link

# 8. Create PR to main
# → Merged → Triggers BOTH marketing-prod AND app-prod workflows
# → Deploys to BOTH ship.link AND app.ship.link
```

#### Scenario 3: Hotfix on Production App

```bash
# 1. Create hotfix from main
git checkout main
git checkout -b hotfix/deal-calculation

# 2. Run app server
yarn dev:app

# 3. Fix bug in services/deal/

# 4. Test at http://localhost:3001

# 5. Commit and push
git add .
git commit -m "fix(app): correct deal calculation logic"
git push origin hotfix/deal-calculation

# 6. Create PR to main (emergency review)
# → Merged → Auto-deploys ONLY to app.ship.link
# → Marketing server (ship.link) unaffected ✅
```

### Branch Strategy

```
main (production)
  ├── ship.link (marketing prod)
  └── app.ship.link (app prod)

develop (live development)
  ├── dev.ship.link (marketing dev)
  └── dev-app.ship.link (app dev)

feature/* (local dev)
  ├── localhost:3000 (marketing)
  └── localhost:3001 (app)
```

---

## Authentication & Cookie Strategy

### Cookie Configuration

**Critical:** Use domain `.ship.link` (with leading dot) for cross-subdomain authentication.

```javascript
// lib/auth.js

export function setAuthCookie(token, refreshToken) {
  const isProduction = process.env.NODE_ENV === 'production';
  const domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN;
  
  // Access token (7 days)
  document.cookie = `auth_token=${token}; domain=${domain}; path=/; ${
    isProduction ? 'secure;' : ''
  } samesite=lax; max-age=604800`;
  
  // Refresh token (30 days)
  document.cookie = `refresh_token=${refreshToken}; domain=${domain}; path=/; ${
    isProduction ? 'secure;' : ''
  } samesite=lax; max-age=2592000`;
}

export function clearAuthCookies() {
  const domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN;
  
  document.cookie = `auth_token=; domain=${domain}; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  document.cookie = `refresh_token=; domain=${domain}; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}
```

### Middleware for Subdomain Routing

**`middleware.js`**

```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  const siteMode = process.env.NEXT_PUBLIC_SITE_MODE;
  const { pathname } = request.nextUrl;
  
  // Server 1 (Marketing): Only allow marketing routes
  if (siteMode === 'marketing') {
    // Block app routes on marketing server
    if (pathname.startsWith('/account') || 
        pathname.startsWith('/deals') ||
        pathname.startsWith('/negotiating')) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL;
      return NextResponse.redirect(new URL(pathname, appUrl));
    }
    
    // Allow marketing routes: /, /about-us, /contact-us, /features, /login, /signup
    return NextResponse.next();
  }
  
  // Server 2 (App): Only allow app routes
  if (siteMode === 'app') {
    // Block marketing routes on app server (except auth and root)
    if (pathname.startsWith('/about-us') || 
        pathname.startsWith('/contact-us') ||
        pathname.startsWith('/features')) {
      const marketingUrl = process.env.NEXT_PUBLIC_MARKETING_URL;
      return NextResponse.redirect(new URL(pathname, marketingUrl));
    }
    
    // Check authentication for app routes
    const token = request.cookies.get('auth_token');
    const isAppRoute = pathname.startsWith('/account') || 
                       pathname.startsWith('/deals') ||
                       pathname.startsWith('/negotiating');
    
    if (!token && isAppRoute) {
      const marketingUrl = process.env.NEXT_PUBLIC_MARKETING_URL;
      return NextResponse.redirect(new URL('/login', marketingUrl));
    }
    
    // Allow authenticated app access
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

### Login Flow Implementation

```javascript
// app/(auth)/login/LoginForm.js

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import getConfig from '@/lib/config';
import { setAuthCookie } from '@/lib/auth';

export default function LoginForm() {
  const router = useRouter();
  const config = getConfig();
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${config.apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Set cookie with .ship.link domain
        setAuthCookie(data.accessToken, data.refreshToken);
        
        // Redirect to app
        window.location.href = `${config.appUrl}/account/search`;
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

---

## Implementation Roadmap

### Week 1: Setup & Structure

#### Day 1-2: Project Reorganization
- [ ] Create route groups: `(marketing)`, `(auth)`, `(app)`
- [ ] Move existing pages to appropriate route groups
- [ ] Reorganize components into `marketing/`, `app/`, `shared/`
- [ ] Create `lib/config.js` helper

#### Day 3-4: Environment Configuration
- [ ] Create 4 environment files for local dev
- [ ] Update `.gitignore` to exclude environment files
- [ ] Add `cross-env` package: `yarn add -D cross-env`
- [ ] Create yarn scripts (dev:marketing, dev:app, build:marketing, build:app)
- [ ] Test local development with both servers running

#### Day 5: Middleware & Authentication
- [ ] Update `middleware.js` for subdomain routing
- [ ] Update cookie configuration in `lib/auth.js`
- [ ] Test authentication flow locally
- [ ] Update login/signup redirects

### Week 2: CI/CD & DNS

#### Day 1-2: GitHub Actions & Environments
- [ ] Create 4 GitHub Environments (dev-marketing, dev-app, prod-marketing, prod-app)
- [ ] Create 4 workflow files
- [ ] Configure secrets for all 4 environments
- [ ] Add `NEXT_PUBLIC_SITE_MODE` to all environment secrets
- [ ] Update `deploy-reusable.yml` to pass SITE_MODE to Docker container

#### Day 3: DNS Configuration
- [ ] Add DNS records:
  - `dev.ship.link` → CNAME/A to dev marketing server
  - `dev-app.ship.link` → CNAME/A to dev app server
  - `app.ship.link` → CNAME/A to prod app server
- [ ] Verify DNS propagation

#### Day 4-5: Server Configuration
- [ ] Prepare 4 servers (or containers) for deployment
- [ ] Configure SSL certificates for all 4 domains
- [ ] Test deployment to dev environment
- [ ] Test deployment to prod environment

### Week 3: Testing & Launch

#### Day 1-2: Development Environment Testing
- [ ] Test full dev environment (both servers)
- [ ] Test authentication across subdomains on dev
- [ ] Test shared component updates on dev
- [ ] Fix any issues found

#### Day 3-4: Production Deployment
- [ ] Deploy to production (both servers)
- [ ] Test authentication across subdomains on prod
- [ ] Test all critical user flows
- [ ] Monitor for issues

#### Day 5: Documentation & Cleanup
- [ ] Update team documentation
- [ ] Create runbook for deployments
- [ ] Monitor and verify stability
- [ ] Celebrate launch! 🎉

---

## Cost Analysis

### Infrastructure Costs

**Good news:** Since you're using existing servers and Docker deployment, there's **no additional cost** for Azure App Services!

| Resource | Monthly Cost | Notes |
|----------|--------------|-------|
| **Existing Servers** | Current cost | No change |
| **Azure Container Registry** | Current cost | Stores Docker images |
| **DNS** | Current cost | Add subdomain records |
| **SSL Certificates** | Current cost or Free | Let's Encrypt or existing |
| **Total Additional Cost** | **$0** | Uses existing infrastructure |

### Cost Comparison

| Approach | Monthly Cost | Notes |
|----------|--------------|-------|
| **Current (Single Server)** | Baseline | Your existing setup |
| **Option B Enhanced (4 Docker Containers)** | Baseline + $0 | No additional infrastructure needed |
| **Azure App Services (4 servers)** | Baseline + $220 | Would require new App Services |

**Key Advantage:** You're using Docker containers on existing servers, so there's **no infrastructure cost increase**! 💰

---

## Developer Experience

### Pros for Developers

✅ **Single Codebase**
- Clone one repo
- All code in one place
- Single package.json and yarn.lock

✅ **Easy Component Sharing**
- Import directly: `import { Button } from '@/components/shared/Button'`
- No npm packages to manage
- Update once, works everywhere

✅ **Simple Local Development**
- Two terminals, two ports
- Test both contexts simultaneously
- No complex setup

✅ **Clear Structure**
- Route groups make organization obvious
- `(marketing)` vs `(app)` is self-documenting
- Components organized by usage

✅ **Existing CI/CD**
- Uses your current deployment infrastructure
- Familiar Docker-based deployment
- Proven reusable workflow pattern

✅ **Smart Deployments**
- Path-based triggers (only deploy what changed)
- Automatic based on file changes
- Can manually trigger via workflow_dispatch

✅ **Testing Environment**
- Live dev environment for testing
- Test before production deployment
- Matches production architecture

✅ **Yarn Benefits**
- Fast installations with caching
- Reliable `yarn.lock` for consistency
- Built-in workspaces support if needed

### Cons to Be Aware Of

⚠️ **Two Servers Running Locally**
- Need to run both for shared component testing
- Two terminal windows
- Minor inconvenience

⚠️ **Environment Variable Management**
- Multiple .env files
- Need to keep secrets synced across 4 GitHub Environments
- Use config helper to simplify

⚠️ **Shared Component Updates**
- Must deploy to both servers (per environment)
- Automatic via GitHub Actions
- Slightly slower than single deploy

⚠️ **Four Production Servers**
- Need to maintain 4 separate server instances
- More SSH access management
- More deployment workflows to monitor

### Developer Onboarding

**New developer checklist:**

1. Clone repository
2. Install dependencies: `yarn install`
3. Copy environment templates:
   ```bash
   cp .env.local.example .env.development.marketing
   cp .env.local.example .env.development.app
   ```
4. Update local environment values
5. (Optional) Update hosts file for subdomain testing
6. Run both servers:
   ```bash
   yarn dev:marketing   # Terminal 1
   yarn dev:app         # Terminal 2
   ```

**Time to first contribution:** ~30 minutes

---

## FAQs

### General Questions

**Q: Why use Docker containers instead of Azure App Services?**

A: We're already using Docker deployment via SSH, so this leverages existing infrastructure with zero additional cost. We just need 4 containers instead of 1.

**Q: How does this work with our existing CI/CD?**

A: We're extending your existing `deploy-reusable.yml` workflow. Each new workflow (marketing-dev, marketing-prod, app-dev, app-prod) calls the same reusable workflow with different parameters.

**Q: What about our existing `deploy-dev.yml`?**

A: You can keep it for backward compatibility or deprecate it. The new workflows split dev deployment into marketing and app separately.

**Q: Do we need 4 separate servers?**

A: Ideally yes, but you could run multiple Docker containers on the same server using different ports and nginx routing. However, 4 separate servers give better isolation.

### Technical Questions

**Q: How do cookies work across ship.link and app.ship.link?**

A: We set cookies with domain `.ship.link` (note the leading dot). This makes them available to:
- ship.link ✅
- app.ship.link ✅
- dev.ship.link ✅
- dev-app.ship.link ✅
- Any future subdomains ✅

**Q: What happens if marketing server is down?**

A: Only marketing pages are affected. App server (app.ship.link) keeps running. Logged-in users can still use the application.

**Q: How do we test subdomain behavior locally?**

A: Two options:
1. Use different ports (localhost:3000 and localhost:3001)
2. Update hosts file and use ship.link:3000 and app.ship.link:3001

**Q: Do we need to deploy both servers for every change?**

A: No! GitHub Actions has path-based triggers:
- Marketing change → deploys only to marketing servers (dev and/or prod)
- App change → deploys only to app servers (dev and/or prod)
- Shared component → deploys to all 4 servers (automatically)

**Q: How does NEXT_PUBLIC_SITE_MODE get set?**

A: It's passed as an environment variable to the Docker container at runtime via the deploy-reusable.yml workflow. Each GitHub Environment has its own value (marketing or app).

**Q: What about SignalR real-time connections?**

A: SignalR connects from the app server (app.ship.link). Since we use environment variables for the URL and cookies work across subdomains, no changes needed.

### Deployment Questions

**Q: What's the deployment process?**

A:
1. Push to `develop` → Auto-deploys to dev servers (marketing and/or app based on changed files)
2. Test on dev.ship.link and dev-app.ship.link
3. Push to `main` → Auto-deploys to prod servers (marketing and/or app based on changed files)
4. Monitor ship.link and app.ship.link

**Q: Can we rollback if something breaks?**

A: Yes! Your existing deployment workflow has automatic rollback built in. Each server tags the previous image for rollback.

**Q: How long does deployment take?**

A:
- Build Docker image: ~3-5 minutes
- Push to ACR: ~1-2 minutes
- SSH deployment: ~2-3 minutes
- Total: ~6-10 minutes per server

**Q: Do we need to update Dockerfile.ci?**

A: No! Your existing Dockerfile.ci can build all variants. The differentiation happens via the `NEXT_PUBLIC_SITE_MODE` environment variable passed at runtime.

### Cost Questions

**Q: Why is there no additional cost?**

A: Because we're using Docker containers on existing servers. We're just running 4 containers instead of 1. No new Azure resources needed.

**Q: What if we need more resources?**

A: You can:
1. Upgrade your existing servers
2. Use separate servers for each container
3. Scale horizontally with load balancers

**Q: Is it worth the complexity?**

A: Yes, for these reasons:
- Marketing can update frequently without risk to app
- App stability is critical for users
- SEO/lead generation stays up even if app has issues
- Test on live dev environment before production
- No additional infrastructure cost

---

## Next Steps

### Immediate Actions

1. **Team Review** (This Week)
   - Review this plan with team
   - Get approval from tech lead
   - Confirm server resources available

2. **Assign Resources** (This Week)
   - Assign 1-2 developers
   - Block 2-3 weeks for implementation
   - Schedule daily sync meetings

3. **Prepare Infrastructure** (Week 1)
   - Prepare 4 server instances (or 4 Docker containers on existing servers)
   - Configure DNS for 4 domains
   - Set up SSL certificates

4. **Begin Implementation** (Week 1-3)
   - Follow roadmap above
   - Test thoroughly on dev environment
   - Deploy to production carefully

### Success Criteria

- [ ] Marketing site (ship.link) loads successfully
- [ ] App (app.ship.link) loads successfully for authenticated users
- [ ] Dev environments (dev.ship.link, dev-app.ship.link) work correctly
- [ ] Login flow works (cookie sharing across all domains)
- [ ] Can deploy marketing independently
- [ ] Can deploy app independently
- [ ] Shared component updates deploy to all 4 servers
- [ ] SignalR connections work on app servers
- [ ] All tests pass
- [ ] No performance degradation
- [ ] SEO rankings maintained
- [ ] Existing deployment workflows remain functional

---

**Document Version:** 3.0  
**Last Updated:** November 2025  
**Strategy:** Option B Enhanced (Monorepo + Docker Containers + Independent Deployments)  
**Package Manager:** Yarn  
**Deployment:** Docker via GitHub Actions → ACR → SSH  
**Environments:** Local, Live Development & Production  
**Servers:** 4 Docker containers (2 dev + 2 prod)  
**Estimated Timeline:** 2-3 weeks  
**Estimated Additional Cost:** $0 (uses existing infrastructure)  
**Status:** Ready for Implementation ✅
