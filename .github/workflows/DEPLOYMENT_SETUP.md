# 🚀 GitHub Actions CD - Deployment Setup Guide

This guide will walk you through setting up Continuous Deployment (CD) for the ShipLink Frontend using GitHub Actions.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [GitHub Environments Setup](#github-environments-setup)
4. [Adding Secrets to GitHub](#adding-secrets-to-github)
5. [Adding Environment Variables](#adding-environment-variables)
6. [Testing the Deployment](#testing-the-deployment)
7. [Troubleshooting](#troubleshooting)
8. [Rollback Procedure](#rollback-procedure)

---

## 🎯 Overview

### What We Have

- **Three deployment workflows:**
  - `deploy-dev.yml` - Deploys to DEV environment when PR merges to `develop` branch
  - `deploy-stage.yml` - Deploys to STAGE environment when PR merges to `stage` branch
  - `deploy-reusable.yml` - **Shared deployment logic** (used by both dev and stage)

### Architecture: Reusable Workflow Pattern

We use GitHub's **reusable workflow** feature to eliminate code duplication:

```
deploy-dev.yml (caller)
    ↓ calls with environment=dev
deploy-reusable.yml (core logic)
    ↑ calls with environment=stage
deploy-stage.yml (caller)
```

**Benefits:**

- ✅ Single source of truth for deployment logic
- ✅ Easier maintenance (update once, applies to all environments)
- ✅ Consistent deployment process across environments
- ✅ Simple to add production deployment later

**Caller workflows** (`deploy-dev.yml`, `deploy-stage.yml`) are minimal:

- Define triggers (branches, paths)
- Pass environment-specific parameters
- ~50 lines instead of ~450 lines

**Reusable workflow** (`deploy-reusable.yml`) contains all the logic:

- Docker build and push
- SSH deployment
- Rollback mechanism
- Verification and cleanup

### How It Works

```
PR Merged → Build Docker Image → Push to Registry → Deploy to Server → Verify
```

1. When you merge a PR to `develop` or `stage`, the workflow triggers
2. Caller workflow invokes the reusable workflow with environment parameters
3. Docker image is built with your Next.js app
4. Image is pushed to Azure Container Registry
5. SSH connection is made to the target VM
6. Old container is stopped, new container is started
7. Deployment is verified (30 seconds wait + running check)
8. If deployment fails, automatic rollback to previous version

---

## 🔧 Prerequisites

Before setting up, gather this information from your coworkers:

### 1. Azure Container Registry Information

- **Registry URL** (e.g., `shiplink.azurecr.io` or `shiplinkregistry.azurecr.io`)
- **Registry Username** (usually the registry name)
- **Registry Password** (from Azure Portal → Container Registry → Access Keys)

### 2. SSH Information for DEV Server

- **VM Hostname/IP** (e.g., `dev.shiplink.com` or `192.168.1.100`)
- **SSH Username** (e.g., `azureuser`, `ubuntu`, `shiplink`)
- **SSH Port** (usually `22`)
- **SSH Private Key** (the key that has access to the server)

### 3. SSH Information for STAGE Server

- Same as above but for staging server

### 4. Environment-Specific Secrets

You already have DEV secrets. You'll need STAGE secrets as well (with different values).

---

## 🌍 GitHub Environments Setup

GitHub Environments allow you to organize secrets per deployment target (dev, stage, prod).

### Step 1: Create Environments

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. In left sidebar, click **Environments**
4. Click **New environment**
5. Create these environments:
   - Name: `dev`
   - Name: `stage`
   - (Later: `prod`)

### Step 2: Configure Environment Protection Rules (Optional but Recommended)

**For DEV environment:**

- No protection needed (auto-deploy on merge)

**For STAGE environment:**

- Optional: Add "Wait timer" (5 minutes delay before deployment)
- Optional: Add "Required reviewers" (someone must approve deployment)

**For PROD environment (later):**

- ✅ Add "Required reviewers" (at least 1-2 team members)
- ✅ Add deployment branch protection (only `main` branch)

---

## 🔐 Adding Secrets to GitHub

You need to add secrets to **each environment** separately.

### How to Add Secrets

1. Go to **Settings** → **Environments**
2. Click on environment name (e.g., `dev`)
3. Scroll to **Environment secrets**
4. Click **Add secret**
5. Add each secret below

---

### 🔑 Secrets List for DEV Environment

Go to your `dev` environment and add these secrets:

#### **Registry Secrets** (Get from coworkers)

| Secret Name        | Example Value         | Description                    |
| ------------------ | --------------------- | ------------------------------ |
| `ACR_REGISTRY_URL` | `shiplink.azurecr.io` | Azure Container Registry URL   |
| `ACR_USERNAME`     | `shiplink`            | Registry username              |
| `ACR_PASSWORD`     | `xyz123...`           | Registry password (from Azure) |

#### **SSH Secrets** (Get from coworkers)

| Secret Name       | Example Value                        | Description                       |
| ----------------- | ------------------------------------ | --------------------------------- |
| `SSH_HOST`        | `dev-vm.shiplink.com`                | Dev server hostname or IP         |
| `SSH_USERNAME`    | `azureuser`                          | SSH username                      |
| `SSH_PORT`        | `22`                                 | SSH port (usually 22)             |
| `SSH_PRIVATE_KEY` | `-----BEGIN RSA PRIVATE KEY-----...` | Full SSH private key              |
| `SSH_PASSWORD`    | `your-ssh-password`                  | SSH password (alternative to key) |

**❗ IMPORTANT: SSH Authentication Methods**

The workflow supports both SSH key and password authentication:

**SSH Key Authentication (Recommended):**

- Set `SSH_PRIVATE_KEY` with full private key
- Leave `SSH_PASSWORD` empty or don't set it
- More secure and automated

**Password Authentication (Alternative):**

- Set `SSH_PASSWORD` with server password
- Leave `SSH_PRIVATE_KEY` empty or don't set it
- Simpler setup but less secure

**SSH_PRIVATE_KEY Format (if using key authentication):**

- Must include `-----BEGIN RSA PRIVATE KEY-----` header
- Must include `-----END RSA PRIVATE KEY-----` footer
- Must preserve ALL line breaks
- Should look like:
  ```
  -----BEGIN RSA PRIVATE KEY-----
  MIIEpAIBAAKCAQEA1234567890...
  (multiple lines)
  ...xyz890abcdef
  -----END RSA PRIVATE KEY-----
  ```

#### **Application Secrets**

**⚠️ SECURITY NOTE**: Actual secret values should be obtained from your team lead, DevOps team, or secure password manager. Never commit secrets to version control.

**Required Secrets** (38 total):

| Secret Name                                 | Description                        | Where to Get                             |
| ------------------------------------------- | ---------------------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_API_URL`                       | Public API base URL                | DevOps team / Environment config         |
| `NEXTAUTH_URL`                              | NextAuth callback URL              | DevOps team / Environment config         |
| `IDENTITY_API_GRANT_TYPE`                   | Identity API grant type            | Backend team                             |
| `PREVIEW_SECRET`                            | Preview mode secret                | Generate with: `openssl rand -base64 32` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`            | Google reCAPTCHA site key          | Google reCAPTCHA console                 |
| `NEXT_PUBLIC_URL`                           | Public application URL             | DevOps team / Environment config         |
| `NEXT_PUBLIC_SEAMETRIX_API_URL`             | Seametrix API endpoint             | Seametrix provider / DevOps              |
| `NEXT_PUBLIC_SEAMETRIX_KEY`                 | Seametrix API key                  | Seametrix provider / DevOps              |
| `NEXT_PUBLIC_SEAMETRIX_MAP_KEY`             | Seametrix map key                  | Seametrix provider / DevOps              |
| `IDENTITY_TOKEN_GRANT_TYPE`                 | Token grant type                   | Backend team                             |
| `BACKEND_API_URL`                           | Backend API endpoint               | DevOps team / Environment config         |
| `IDENTITY_API_CLIENT_SECRET`                | Identity client secret             | Backend team / Azure AD                  |
| `NEXT_PUBLIC_RT_URL`                        | Real-time service URL              | DevOps team / Environment config         |
| `NEXT_PUBLIC_FILE_API_URL`                  | File service URL                   | DevOps team / Environment config         |
| `NEXT_PUBLIC_STRAPI_API_URL`                | Strapi CMS URL                     | DevOps team / Environment config         |
| `NEXTAUTH_SECRET`                           | NextAuth secret                    | Generate with: `openssl rand -base64 32` |
| `IDENTITY_API_CLIENT_ID`                    | Identity client ID                 | Backend team / Azure AD                  |
| `RECAPTCHA_SECRET_KEY`                      | Google reCAPTCHA secret key        | Google reCAPTCHA console                 |
| `IDENTITY_API_URL`                          | Identity service URL               | DevOps team / Environment config         |
| `IDENTITY_NEW_RELIC_APP_NAME`               | New Relic app name                 | New Relic console / DevOps               |
| `IDENTITY_NEW_RELIC_LICENSE_KEY`            | New Relic license key              | New Relic console / DevOps               |
| `OTEL_EXPORTER_OTLP_ENDPOINT`               | OpenTelemetry traces endpoint      | New Relic console / DevOps               |
| `OTEL_METRIC_EXPORTER_OTLP_ENDPOINT`        | OpenTelemetry metrics endpoint     | New Relic console / DevOps               |
| `NEXT_PUBLIC_MAINTENANCE_MODE`              | Maintenance mode flag (true/false) | Set to `false` for normal operation      |
| `NEXT_PUBLIC_ENABLE_MATOMO`                 | Matomo analytics flag (true/false) | Set to `false` to disable                |
| `NEXT_PUBLIC_NEW_RELIC_BROWSER_LICENSE_KEY` | New Relic browser license          | New Relic console / DevOps               |
| `NEXT_PUBLIC_NEW_RELIC_BROWSER_APP_ID`      | New Relic browser app ID           | New Relic console / DevOps               |
| `NEXT_PUBLIC_NEW_RELIC_BROWSER_AGENT_ID`    | New Relic browser agent ID         | New Relic console / DevOps               |
| `NEXT_PUBLIC_NEW_RELIC_BROWSER_TRUST_KEY`   | New Relic browser trust key        | New Relic console / DevOps               |
| `NEXT_PUBLIC_NEW_RELIC_BROWSER_ACCOUNT_ID`  | New Relic browser account ID       | New Relic console / DevOps               |
| `APP_ENV`                                   | Environment name (dev/stage/prod)  | Set to `dev` for DEV environment         |
| `NEXT_PUBLIC_APP_ENV`                       | Public environment name            | Set to `dev` for DEV environment         |
| `NEXT_PUBLIC_BETA_MODE`                     | Beta mode flag (true/false)        | Set to `false` for stable features       |
| `SEAMETRIX_API_URL`                         | Seametrix tiles API URL (server)   | Seametrix provider / DevOps              |
| `SEAMETRIX_MAP_KEY`                         | Seametrix map key (server)         | Seametrix provider / DevOps              |
| `NEXT_PUBLIC_ADMIN_URL`                     | Admin panel URL                    | DevOps team / Environment config         |

---

### 🔑 Secrets List for STAGE Environment

Repeat the same process for the `stage` environment, but use STAGE-specific values (get from coworkers):

- Same registry secrets (ACR is usually shared)
- Different SSH credentials (different server)
- Different application URLs (stage-specific)
- **Change `APP_ENV` to `stage`**

---

## 🌐 Adding Environment Variables

**IMPORTANT**: To prevent deployment summaries from showing `***` instead of environment names and URLs, you need to add **Environment Variables** (non-secret).

### Why This is Needed

GitHub Actions automatically masks **secrets** in logs and summaries to protect sensitive data. However, this also masks public information like URLs and environment names, showing `***` instead.

**Example of the problem:**

```
| Environment     | ***                      |
| Access URL      | ***                      |
```

**After adding variables:**

```
| Environment     | DEV                      |
| Access URL      | https://dev.shiplink.com |
```

### Quick Setup Steps

For **each environment** (`dev`, `stage`, `prod`):

1. Go to **Settings → Environments → [environment-name]**
2. Scroll to **Environment variables** section (NOT Secrets)
3. Click **Add variable**
4. Add the following:

| Environment | Variable Name   | Example Value                 |
| ----------- | --------------- | ----------------------------- |
| dev         | `DEV_APP_URL`   | `https://dev-int.ship.link`   |
| stage       | `STAGE_APP_URL` | `https://stage-int.ship.link` |
| prod        | `PROD_APP_URL`  | `https://ship.link`           |

### ⚠️ Important Notes

- ✅ Add as **Environment variables** (NOT Secrets)
- ✅ Use exact variable names: `DEV_APP_URL`, `STAGE_APP_URL`, `PROD_APP_URL`
- ✅ Replace example values with your actual application URLs
- ✅ Each environment gets its own variable
- ❌ Don't add as secrets
- ❌ Don't change the variable names

### Where to Find Your URLs

If you're unsure about your environment URLs:

1. Check the `NEXT_PUBLIC_URL` secret value in each environment (but add as variable, not secret)
2. Ask your DevOps team
3. Check the "Important URLs" section at the bottom of this document

### Variables vs Secrets - What's the Difference?

**Environment Variables (Non-Secret):**

- ✅ Public, non-sensitive information
- ✅ Visible in logs and summaries
- ✅ Use for: URLs, environment names, feature flags

**Secrets:**

- 🔒 Sensitive information
- 🔒 Always masked as `***` in logs
- 🔒 Use for: API keys, passwords, tokens, credentials

### Verification

After adding the variables, they should appear in the environment like this:

**dev Environment:**

```
Environment variables:
└── DEV_APP_URL = https://dev-int.ship.link

Environment secrets:
├── ACR_REGISTRY_URL
├── ACR_USERNAME
├── ACR_PASSWORD
└── ... (all other secrets)
```

---

## 🧪 Testing the Deployment

### Method 1: Automatic Trigger (Recommended)

1. Create a small change in your code
2. Create a PR targeting `develop` branch
3. Get PR approved and merge it
4. Deployment will automatically start
5. Monitor progress: Go to **Actions** tab → Click on the running workflow

### Method 2: Manual Trigger

1. Go to **Actions** tab in GitHub
2. Click **Deploy to Development** (or **Deploy to Staging**)
3. Click **Run workflow** button
4. Select branch (e.g., `develop`)
5. Optionally add a reason
6. Click **Run workflow**

### What to Watch During Deployment

The workflow has 2 main jobs:

**Job 1: Build & Push Docker Image (~5-8 minutes)**

- ✅ Checkout code
- ✅ Generate deployment metadata
- ✅ Login to Azure Container Registry
- ✅ Build Docker image
- ✅ Push to registry

**Job 2: Deploy to Server (~2-3 minutes)**

- ✅ Setup SSH connection
- ✅ Pull new image from registry
- ✅ Stop old container
- ✅ Start new container
- ✅ Wait 30 seconds for startup
- ✅ Verify container is running
- ✅ Cleanup old images

**Total Time: ~7-11 minutes**

---

## 🔍 Monitoring Deployment Status

### GitHub UI

- **Green checkmark** ✅ = Deployment successful
- **Red X** ❌ = Deployment failed
- **Yellow circle** 🟡 = Deployment in progress

### Workflow Summary

Each deployment generates a summary with:

- Environment deployed to
- Image tag used
- Commit SHA
- Who deployed it
- Deployment timestamp
- Access URL

---

## 🐛 Troubleshooting

### Issue: "Error: Unable to locate credentials"

**Problem:** ACR credentials are wrong or missing

**Solution:**

1. Verify `ACR_USERNAME`, `ACR_PASSWORD`, `ACR_REGISTRY_URL` are set
2. Test credentials from Azure Portal
3. Regenerate credentials if needed

---

### Issue: "Permission denied (publickey)"

**Problem:** SSH private key is wrong or not formatted correctly

**Solution:**

1. Verify SSH authentication is properly configured:
   - For key auth: `SSH_PRIVATE_KEY` includes header/footer
   - For password auth: `SSH_PASSWORD` is set correctly
2. Verify `SSH_USERNAME` and `SSH_HOST` are correct
3. Test SSH connection manually: `ssh username@host`
4. Ensure the key has access to the server (or password is correct)

---

### Issue: "Container exited immediately after start"

**Problem:** Application failed to start (usually environment variable issue)

**Solution:**

1. Check workflow logs for error messages
2. Verify all required secrets are set
3. SSH into server and check Docker logs:
   ```bash
   docker logs shiplink-frontend
   ```
4. Automatic rollback should restore previous version

---

### Issue: "Build failed: COPY failed: no source files were specified"

**Problem:** Dockerfile issue or missing files

**Solution:**

1. Verify `Dockerfile.ci` exists in repository root
2. Check if there were recent Dockerfile changes
3. Review build logs for specific error

---

### Issue: "Deployment hangs at 'Waiting 30 seconds...'"

**Problem:** Container might be starting very slowly

**Solution:**

1. Wait for timeout (workflow will fail after 10 minutes)
2. SSH into server and check:
   ```bash
   docker ps -a  # Check container status
   docker logs shiplink-frontend  # Check logs
   ```
3. May need to increase memory/CPU on VM

---

## 🔄 Rollback Procedure

### Automatic Rollback

The workflow includes automatic rollback:

- If container fails to start within 30 seconds
- Previous working version is automatically restored
- You'll see this in the logs

### Manual Rollback

If you need to manually rollback to a specific version:

#### Method 1: Via GitHub Actions

1. Go to **Actions** tab
2. Find a previous successful deployment
3. Note the **image tag** (e.g., `a1b2c3d4`)
4. SSH into server:

   ```bash
   ssh username@server

   # Pull the old image
   docker pull your-registry.azurecr.io/shiplink-frontend:a1b2c3d4

   # Stop current container
   docker stop shiplink-frontend
   docker rm shiplink-frontend

   # Start old version (copy the full docker run command from old workflow logs)
   docker run -d --name shiplink-frontend ... your-registry.azurecr.io/shiplink-frontend:a1b2c3d4
   ```

#### Method 2: Re-run Old Workflow

1. Go to **Actions** tab
2. Find the deployment you want to rollback to
3. Click **Re-run all jobs**
4. This will deploy that exact version again

---

## 📊 Deployment Comparison: Azure vs GitHub Actions

| Feature                    | Azure Pipeline (Old) | GitHub Actions (New)   |
| -------------------------- | -------------------- | ---------------------- |
| **Trigger**                | Push to develop      | PR merge to develop    |
| **Secrets in Image**       | ❌ Yes (18 secrets)  | ✅ No (runtime only)   |
| **Rollback**               | ❌ Manual            | ✅ Automatic           |
| **Environment Management** | ⚠️ Variable groups   | ✅ GitHub Environments |
| **Deployment Time**        | ~5 min               | ~7-11 min              |
| **Audit Trail**            | ⚠️ Basic             | ✅ Full GitHub audit   |
| **Manual Trigger**         | ⚠️ Via parameters    | ✅ Via UI button       |
| **Deployment Summary**     | ❌ None              | ✅ Rich summary        |
| **Caching**                | ❌ None              | ✅ GitHub Cache        |

---

## 🔐 Security Best Practices

### ✅ DO

- Store ALL secrets in GitHub Environments, never in code
- Use separate secrets per environment
- Rotate secrets regularly (every 90 days)
- Use strong, randomly generated secrets
- Limit who can approve production deployments
- Review deployment logs regularly

### ❌ DON'T

- Never commit secrets to Git (even in `.env` files)
- Never share secrets via chat, email, or Slack
- Never use same secrets across environments
- Never skip secret rotation
- Never bypass deployment protections

---

## 📞 Getting Help

### Before Asking for Help

1. Check workflow logs for error messages
2. Review the [Troubleshooting](#troubleshooting) section
3. Check if secrets are properly set
4. Try manual deployment to isolate issue

### Where to Get Help

- **GitHub Actions logs**: Most detailed information
- **Server logs**: SSH into server and check Docker logs
- **Team DevOps channel**: For infrastructure issues
- **This documentation**: Keep it updated!

---

## 🚀 Production Setup

After successful DEV and STAGE deployments, set up production deployment:

### Step 1: Create Production Environment

1. Go to **Settings** → **Environments**
2. Click **New environment**
3. Name: `prod`
4. **Environment Protection Rules**:
   - ✅ **Required reviewers**: Add 1-2 team members
   - ✅ **Deployment branches**: Select "Selected branches" → Add `main` only
   - ⚠️ **Optional**: Wait timer (5-10 minutes for final review)

### Step 2: Add Production Secrets

Go to `prod` environment and add all 45 secrets (same as dev/stage but with PRODUCTION values):

**⚠️ CRITICAL**: Production secrets must be:

- Different from dev/stage
- Stored securely
- Rotated every 90 days
- Never committed to code

**Get production secrets from:**

- DevOps team / Team lead
- Secure password manager (1Password, LastPass, etc.)
- Azure Key Vault
- Production environment documentation

**Registry Secrets** (3):

- `ACR_REGISTRY_URL` (same as dev/stage)
- `ACR_USERNAME` (same as dev/stage)
- `ACR_PASSWORD` (same as dev/stage)

**SSH Secrets** (5):

- `SSH_HOST` (production server hostname/IP)
- `SSH_USERNAME` (production server username)
- `SSH_PORT` (usually `22`)
- `SSH_PRIVATE_KEY` (production server SSH key - if using key auth)
- `SSH_PASSWORD` (production server password - if using password auth)

**Application Secrets** (38):

- Same list as dev/stage but with **PRODUCTION VALUES**
- Change `APP_ENV` to `prod`
- Use production URLs, keys, and credentials

### Step 3: Configure Branch Protection

**For `main` branch** (Settings → Branches → Add rule):

1. **Branch name pattern**: `main`
2. **Protect matching branches**:
   - ✅ Require pull request before merging
   - ✅ Require approvals: 1
   - ✅ Require status checks to pass:
     - Code Quality & Build Check
     - Security Scan
     - Performance Check
   - ✅ Require conversation resolution
   - ✅ Restrict who can push to matching branches
   - ✅ Block force pushes

3. **Deployment branch restrictions**:
   - Go to Settings → Environments → `prod`
   - Deployment branches: "Selected branches"
   - Add pattern: `main` (only main branch can deploy to prod)

**For `stage` branch**:

- Require PR from feature branches
- Require 1 approval
- Require status checks to pass

### Step 4: Configure Approval System

**⚠️ IMPORTANT**: This project uses a label-based approval system that works without GitHub Enterprise.

1. Go to **Settings** → **Environments** → **prod**
2. Add environment **variables** (NOT secrets):
   - Name: `WAIT_FOR_APPROVAL`
   - Value: `true`

**Optional Configuration:**

3. **Approval Assignees** (auto-assign approval issues):
   - Name: `APPROVAL_ASSIGNEES`
   - Value: `username1,username2` (comma-separated GitHub usernames)

4. **Custom Labels** (additional labels for approval issues):
   - Name: `APPROVAL_LABELS`
   - Value: `production,critical` (comma-separated, default includes `deploy-approval`)

**How It Works:**

When a PR is merged to `main`:

1. Workflow validates the source branch (`release/*` or `hotfix/*`)
2. Builds Docker image and pushes to registry
3. Creates a GitHub issue labeled `deploy-approval`
4. **Deployment PAUSES** - waiting for approval
5. Approver adds `deploy-approved` label to the issue
6. Deployment automatically continues
7. Health checks verify deployment success

**To Approve a Deployment:**

1. Find the approval issue in the Issues tab
2. Review deployment details (release version, image tag, etc.)
3. Add the label `deploy-approved` to the issue
4. Deployment will automatically start

**To Disable Approval (Not Recommended for Production):**

- Set `WAIT_FOR_APPROVAL` to `false` or remove the variable
- Deployments will proceed automatically without approval

### Step 5: Understand Production Workflow

**Branch Flow:**

```
Main (PROD) → feature → dev ──► (deploy to DEV)
                │
                └──► stage ──► (deploy to STAGE)
                │
                └──► release/yyyymmdd-count ──► Main (PROD)
                                                   ▲
                                                   │
                                                hotfix
```

**Flow Explanation:**

- Feature branches are created from `main` (production)
- Features first merge to `dev` for testing
- Same feature merges to `stage` after dev validation
- Release branch is created and features merge into it
- Release branch merges to `main` for production
- Hotfixes branch from and merge directly to `main`

**Release Branch Naming:**

- Format: `release/yyyymmdd-count`
- Example: `release/20251010-1` (first release on Oct 10, 2025)
- Example: `release/20251010-2` (second release same day)

**Deployment Process:**

1. Create release branch from `stage`: `release/20251010-1`
2. Final testing on release branch
3. Create PR: `release/20251010-1` → `main`
4. Get PR approved
5. Merge PR (triggers deployment workflow)
6. Workflow validates source branch and builds Docker image
7. **Manual approval required** → Add `deploy-approved` label to the approval issue
8. Deployment to server (triggered automatically after approval)
9. **Automated health checks** run
10. Automatic rollback if health checks fail

### Step 6: Test Production Deployment

**First Deployment Test** (recommended):

1. Create test release branch:

   ```bash
   git checkout stage
   git checkout -b release/test-$(date +%Y%m%d)-1
   git push origin release/test-$(date +%Y%m%d)-1
   ```

2. Create PR to `main`

3. Review PR description (use template from RELEASE_PROCESS.md)

4. Get approval and merge

5. Find approval issue in **Issues** tab

6. **Approve deployment** by adding `deploy-approved` label to the issue

7. **Monitor** (approval workflow will trigger automatically):
   - Container deployment
   - Health checks (Home, API, Auth, Vessels API)
   - Health check summary

8. **Verify**:
   - Access production URL
   - Test critical features
   - Check monitoring dashboards

### Step 7: Health Checks Information

Production deployments include automated health checks:

**What's Tested:**

- Home Page (`/`) - expects 200 OK
- API Health (`/api/health`) - expects 200 OK
- Protected Authentication (`/api/account/info`) - expects 401 (unauthenticated = healthy)

**Features:**

- 60-second stabilization wait after deployment
- 2 retries per endpoint (5-second delay between retries)
- 30-second timeout per check
- Automatic rollback on any failure

**Health Check Summary:**

```
✅ Health check: Home Page - PASS
✅ Health check: API Health - PASS
✅ Health check: Account Info (Protected) - PASS
📊 Total: 3/3 checks passed
🎉 Production deployment verified!
```

If health checks fail:

```
❌ Health check: API Health - FAIL
🔄 Initiating automatic rollback...
📦 Starting previous version...
✅ Rollback successful
```

### Step 8: Hotfix Process

For emergency production fixes:

1. **Create hotfix branch from main:**

   ```bash
   git checkout main
   git checkout -b hotfix/critical-security-fix
   ```

2. **Make minimal fix** and test thoroughly

3. **Create PR**: `hotfix/*` → `main`

4. **Fast-track approval** and merge

5. **Approve deployment** in GitHub Actions

6. **Backport to other branches:**

   ```bash
   git checkout dev
   git cherry-pick <hotfix-commit>
   git push origin dev

   git checkout stage
   git cherry-pick <hotfix-commit>
   git push origin stage
   ```

**See Also**: [RELEASE_PROCESS.md](./RELEASE_PROCESS.md) for complete production workflow

---

## 💡 Best Practices

### Production Deployment

✅ **DO:**

- Deploy during off-peak hours
- Have rollback plan ready
- Monitor health checks closely
- Test release branch thoroughly before merging
- Use milestones to track releases
- Document all production changes
- Communicate deployments to team

❌ **DON'T:**

- Deploy on Fridays (unless critical)
- Skip health checks (except emergencies)
- Deploy without approval
- Deploy untested code
- Deploy without rollback plan
- Ignore health check failures

### Secret Management

✅ **DO:**

- Rotate secrets every 90 days
- Use different secrets per environment
- Store in secure password manager
- Document where to find secrets
- Use principle of least privilege

❌ **DON'T:**

- Reuse secrets across environments
- Share secrets via chat/email
- Commit secrets to code
- Use weak secrets
- Skip secret rotation

---

## 🔜 Next Enhancements

After production deployment is stable:

1. **Monitoring & Notifications**
   - Slack/Discord deployment notifications
   - Deployment metrics dashboard
   - Alert on deployment failures

2. **Advanced Deployment Strategies**
   - Blue-green deployments
   - Canary deployments
   - Database migration automation

3. **Security Enhancements**
   - Secret scanning
   - Dependency vulnerability checks
   - Enable Dependabot
   - Security audit logs

---

## 📝 Important URLs

- **GitHub Repository**: `https://github.com/YOUR_ORG/shiplink-frontend-ui`
- **GitHub Actions**: `https://github.com/YOUR_ORG/shiplink-frontend-ui/actions`
- **Dev Environment**: `https://dev-int.ship.link`
- **Stage Environment**: `https://stage-int.ship.link`
- **Production Environment**: (Configure after production setup)

---

## 🎓 Learning Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Release Process Guide](./RELEASE_PROCESS.md) - Complete production release workflow

---

**Document Version**: 2.0  
**Last Updated**: October 10, 2025  
**Maintained By**: DevOps & Frontend Team
