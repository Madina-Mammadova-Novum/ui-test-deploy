# 🚀 GitHub Actions CD - Deployment Setup Guide

This guide will walk you through setting up Continuous Deployment (CD) for the ShipLink Frontend using GitHub Actions.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [GitHub Environments Setup](#github-environments-setup)
4. [Adding Secrets to GitHub](#adding-secrets-to-github)
5. [Testing the Deployment](#testing-the-deployment)
6. [Troubleshooting](#troubleshooting)
7. [Rollback Procedure](#rollback-procedure)

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

| Secret Name       | Example Value                        | Description               |
| ----------------- | ------------------------------------ | ------------------------- |
| `SSH_HOST`        | `dev-vm.shiplink.com`                | Dev server hostname or IP |
| `SSH_USERNAME`    | `azureuser`                          | SSH username              |
| `SSH_PORT`        | `22`                                 | SSH port (usually 22)     |
| `SSH_PRIVATE_KEY` | `-----BEGIN RSA PRIVATE KEY-----...` | Full SSH private key      |

**❗ IMPORTANT: SSH_PRIVATE_KEY Format**

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

**Required Secrets** (33 total):

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
| `SEAMETRIX_API_URL`                         | Seametrix tiles API URL            | Seametrix provider / DevOps              |
| `SEAMETRIX_MAP_KEY`                         | Seametrix map key                  | Seametrix provider / DevOps              |
| `NEXT_PUBLIC_ADMIN_URL`                     | Admin panel URL                    | DevOps team / Environment config         |

---

### 🔑 Secrets List for STAGE Environment

Repeat the same process for the `stage` environment, but use STAGE-specific values (get from coworkers):

- Same registry secrets (ACR is usually shared)
- Different SSH credentials (different server)
- Different application URLs (stage-specific)
- **Change `APP_ENV` to `stage`**

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

1. Verify `SSH_PRIVATE_KEY` includes header/footer
2. Verify `SSH_USERNAME` and `SSH_HOST` are correct
3. Test SSH connection manually: `ssh username@host`
4. Ensure the key has access to the server

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

## 🚀 Next Steps

After successful DEV and STAGE deployments:

1. **Production Setup** (Later)
   - Create `prod` environment
   - Add production secrets
   - Configure required approvals
   - Create `deploy-prod.yml` workflow
   - Test with manual deployment first

2. **Enhancements to Consider**
   - Slack/Discord notifications
   - Deployment metrics
   - Blue-green deployment strategy
   - Canary deployments
   - Database migration automation

3. **Security Improvements**
   - Implement secret scanning
   - Add dependency vulnerability checks
   - Enable Dependabot
   - Configure branch protection rules

---

## 📝 Important URLs

- **GitHub Repository**: `https://github.com/YOUR_ORG/shiplink-frontend-ui`
- **GitHub Actions**: `https://github.com/YOUR_ORG/shiplink-frontend-ui/actions`
- **Dev Environment**: `https://dev-int.ship.link`
- **Stage Environment**: `https://stage-int.ship.link` (update when available)

---

## 🎓 Learning Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Document Version**: 1.0  
**Last Updated**: October 2025  
**Maintained By**: DevOps Team
