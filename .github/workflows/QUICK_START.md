# 🚀 Quick Start Guide - GitHub Actions CD

A quick reference for getting your deployments up and running.

---

## ⚡ 5-Minute Setup Checklist

### Step 1: Get Information from Coworkers ✍️

Before you can deploy, you need these details:

- [ ] **Azure Container Registry URL** (e.g., `shiplink.azurecr.io`)
- [ ] **Registry Username** (usually same as registry name)
- [ ] **Registry Password** (from Azure Portal → Container Registries → Access Keys)
- [ ] **DEV Server SSH Host** (hostname or IP)
- [ ] **DEV Server SSH Username** (e.g., `azureuser`)
- [ ] **DEV Server SSH Private Key** (full key with headers)
- [ ] **STAGE Server SSH Host** (hostname or IP)
- [ ] **STAGE Server SSH Username**
- [ ] **STAGE Server SSH Private Key**
- [ ] **STAGE Environment Secrets** (like dev secrets but stage-specific)

---

### Step 2: Create GitHub Environments 🌍

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Environments** (left sidebar)
4. Create two environments:
   - Name: `dev` (click "New environment")
   - Name: `stage` (click "New environment")

---

### Step 3: Add Secrets to DEV Environment 🔐

1. Go to **Settings** → **Environments** → **dev**
2. Scroll to **Environment secrets**
3. Add these secrets one by one (click "Add secret"):

#### Registry Secrets (3 secrets)

```
ACR_REGISTRY_URL     = (get from coworkers)
ACR_USERNAME         = (get from coworkers)
ACR_PASSWORD         = (get from coworkers)
```

#### SSH Secrets (4 secrets)

```
SSH_HOST             = (get from coworkers)
SSH_USERNAME         = (get from coworkers)
SSH_PORT             = 22
SSH_PRIVATE_KEY      = (full key including -----BEGIN----- and -----END-----)
```

#### Application Secrets (33 secrets)

**⚠️ SECURITY NOTE**: Actual secret values should be obtained from your team lead, DevOps team, or secure password manager.

**To get the secret values:**

1. Contact your DevOps team or team lead
2. Check your team's secure password manager (e.g., 1Password, LastPass, Azure Key Vault)
3. Refer to environment-specific documentation
4. See [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md) for the complete list of 33 required secrets with descriptions

**Required secrets include:**

- API URLs and endpoints (8 secrets)
- Authentication & authorization (7 secrets)
- Third-party integrations (Seametrix, reCAPTCHA, New Relic) (15 secrets)
- Feature flags and configuration (3 secrets)

---

### Step 4: Add Secrets to STAGE Environment 🔐

Repeat Step 3 but:

- Go to **Environments** → **stage**
- Use same registry secrets (ACR is usually shared)
- Use different SSH credentials (stage server)
- Use stage-specific application URLs and secrets (get from coworkers)
- Change `APP_ENV=stage`

---

### Step 5: Test Deployment 🧪

#### Method 1: Manual Test (Recommended First)

1. Go to **Actions** tab in GitHub
2. Click **Deploy to Development** workflow
3. Click **Run workflow** button (right side)
4. Select branch: `develop`
5. Add reason: "First deployment test"
6. Click **Run workflow** button
7. Watch the deployment happen! 🎉

#### Method 2: Automatic Test (After Manual Test Works)

1. Create a small change in your code
2. Create a PR targeting `develop` branch
3. Get PR approved
4. Merge the PR
5. Deployment automatically starts!

---

## 📊 What to Expect During Deployment

### Timeline

```
0:00  - Workflow triggered
0:01  - Checking out code
0:02  - Building Docker image starts
5:00  - Docker build completes
6:00  - Pushing image to registry
7:00  - SSH connection to server
7:30  - Pulling new image
8:00  - Stopping old container
8:10  - Starting new container
8:40  - Waiting for app startup (30 seconds)
9:10  - Verifying deployment
9:30  - Cleanup old images
10:00 - ✅ Deployment complete!
```

**Total time: ~7-11 minutes**

---

## 🎯 How to Monitor Deployment

### In GitHub Actions

1. Go to **Actions** tab
2. Click on the running workflow
3. You'll see two jobs:
   - **Build & Push Docker Image** (5-8 min)
   - **Deploy to Dev Server** (2-3 min)
4. Click on each job to see detailed logs

### Success Indicators

✅ Green checkmarks on both jobs  
✅ Summary page shows deployment details  
✅ No error messages in logs  
✅ Website is accessible and working

### Failure Indicators

❌ Red X on one or both jobs  
❌ Error messages in logs  
❌ Website shows 502/503 errors  
🔄 Automatic rollback may have occurred

---

## 🐛 Quick Troubleshooting

### Error: "Cannot login to registry"

**Fix**: Check your ACR secrets (ACR_USERNAME, ACR_PASSWORD, ACR_REGISTRY_URL)

### Error: "Permission denied (publickey)"

**Fix**: Check SSH_PRIVATE_KEY includes full key with headers/footers

### Error: "Container exited immediately"

**Fix**: Check application secrets - one or more might be missing or wrong

### Deployment Stuck?

**Fix**: Wait for 10-minute timeout, then check server directly via SSH

**For all other issues**: See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 🔄 How to Rollback

### If Automatic Rollback Didn't Work

1. Go to **Actions** tab
2. Find a previous successful deployment
3. Note the image tag (e.g., `a1b2c3d4`)
4. Click **Re-run all jobs**
5. Or SSH into server and manually start old container

**Detailed instructions**: See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#manual-rollback)

---

## 📖 Additional Resources

### For Setup

- **Full Setup Guide**: [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)
- **Detailed secrets list with explanations**
- **GitHub Environments configuration**
- **Security best practices**

### For Troubleshooting

- **Troubleshooting Guide**: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Common errors and solutions**
- **Step-by-step debugging**
- **Emergency procedures**

### For Overview

- **Main README**: [README.md](./README.md)
- **All workflows documented**
- **Architecture and features**
- **Performance metrics**

---

## ✅ Verification Checklist

After your first successful deployment:

- [ ] Deployment completed in ~10 minutes
- [ ] Website is accessible at dev URL
- [ ] No JavaScript errors in browser console
- [ ] API calls are working
- [ ] Login functionality works
- [ ] No 502/503 errors
- [ ] Deployment summary shows in GitHub
- [ ] You can see container running on server (via SSH)

---

## 🏗️ Understanding the Architecture

We use a **reusable workflow pattern** to avoid code duplication:

```
deploy-dev.yml      → Calls deploy-reusable.yml with environment=dev
deploy-stage.yml    → Calls deploy-reusable.yml with environment=stage
deploy-reusable.yml → Contains all the actual deployment logic
```

**Why this matters:**

- ✅ When you need to modify deployment logic, you only update `deploy-reusable.yml`
- ✅ Both dev and stage use exactly the same deployment process
- ✅ Adding production deployment later is just copying `deploy-dev.yml` and changing the environment

**You don't need to touch `deploy-reusable.yml`** - it's already fully configured. You only interact with `deploy-dev.yml` and `deploy-stage.yml` for environment-specific triggers.

---

## 🚨 Remember

### Security Notes

⚠️ **IMPORTANT**: The secrets you entered are now exposed in our conversation  
🔐 **ACTION REQUIRED**: After deployment works, rotate all secrets  
🔄 **HOW TO ROTATE**: Generate new values, update GitHub secrets, redeploy

### Best Practices

1. ✅ Test in DEV first, then STAGE
2. ✅ Keep this guide updated as you learn
3. ✅ Document any issues you encounter
4. ✅ Share knowledge with team
5. ✅ Monitor deployments for first week

---

## 🎉 You're Ready!

Once you've completed Steps 1-5:

- ✅ Your CD pipeline is ready
- ✅ Merging to `develop` → auto-deploys to DEV
- ✅ Merging to `stage` → auto-deploys to STAGE
- ✅ Manual deployments work via GitHub UI
- ✅ Automatic rollback protects you

**Questions?** Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) or ask your DevOps team!

---

_Last updated: 2025-10-07_  
_Quick reference for ShipLink Frontend deployments_
