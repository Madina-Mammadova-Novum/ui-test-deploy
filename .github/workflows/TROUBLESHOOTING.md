# 🔧 Deployment Troubleshooting Guide

This guide covers common deployment issues and their solutions. As a frontend developer, this will help you understand and fix deployment problems without deep DevOps knowledge.

---

## 📋 Table of Contents

1. [Quick Diagnostics Checklist](#quick-diagnostics-checklist)
2. [Common Error Messages](#common-error-messages)
3. [Step-by-Step Debugging](#step-by-step-debugging)
4. [Manual Deployment Verification](#manual-deployment-verification)
5. [Emergency Procedures](#emergency-procedures)
6. [Release Creation Issues](#release-creation-issues-production-only)
7. [Getting More Help](#getting-more-help)

---

## 🚨 Quick Diagnostics Checklist

When a deployment fails, check these in order:

- [ ] **Are all GitHub secrets set?** (Settings → Environments → Dev/Stage)
- [ ] **Did the PR merge successfully?** (GitHub shows merged, not just closed)
- [ ] **Is the workflow enabled?** (Actions tab shows the workflow)
- [ ] **Are there any typos in secret names?** (They're case-sensitive!)
- [ ] **Did you wait for the full 10-minute timeout?** (Don't cancel early)
- [ ] **Is this the first deployment?** (First deployment needs special setup)

---

## 🐛 Common Error Messages

### 1. Registry & Authentication Issues

#### Error: "Error: Cannot perform an interactive login from a non TTY device"

```
Error response from daemon: Get "https://yourregistry.azurecr.io/v2/":
unauthorized: authentication required
```

**What this means (Frontend Translation):**
Like trying to access a private GitHub repo without being logged in.

**Cause:**

- Wrong Azure Container Registry credentials
- Expired registry password
- Missing secrets in GitHub Environment

**Solution:**

```bash
1. Go to GitHub → Settings → Environments → dev
2. Verify these secrets exist and are correct:
   - ACR_REGISTRY_URL (e.g., shiplink.azurecr.io)
   - ACR_USERNAME (usually same as registry name)
   - ACR_PASSWORD (get from Azure Portal)

3. Test credentials in Azure Portal:
   - Go to Azure Portal → Container Registries
   - Click your registry
   - Go to "Access keys"
   - Copy the password (regenerate if needed)
   - Update GitHub secret with new password
```

**Prevention:**

- Set reminders to rotate credentials every 90 days
- Document where to find credentials

---

#### Error: "repository does not exist or may require authentication"

```
Error: Error response from daemon: pull access denied for
yourregistry.azurecr.io/shiplink-frontend, repository does not exist
or may require 'docker login'
```

**What this means (Frontend Translation):**
Like trying to `npm install` from a package that doesn't exist.

**Cause:**

- Image was never pushed to registry
- Registry URL is wrong
- Repository name doesn't match

**Solution:**

```bash
1. Check if the BUILD job succeeded:
   - Go to Actions → Click failed workflow
   - Check if "Build & Push Docker Image" job is green ✅
   - If build failed, fix build errors first

2. Verify registry URL in secrets:
   - Should NOT have https:// prefix
   - Should NOT have trailing slash
   - Correct: shiplink.azurecr.io
   - Wrong: https://shiplink.azurecr.io/

3. Check repository name in workflow:
   - Should match what's in Azure registry
   - Default is "shiplink-frontend"
```

---

### 2. SSH & Connection Issues

#### Error: "Permission denied (publickey)"

```
Warning: Permanently added 'your-server' (ED25519) to the list of known hosts.
your-username@your-server: Permission denied (publickey).
```

**What this means (Frontend Translation):**
Like trying to push to GitHub without setting up your SSH key.

**Cause:**

- SSH private key is missing or wrong format
- Key doesn't have access to the server
- Wrong username or hostname

**Solution:**

```bash
1. Verify SSH secrets in GitHub:
   Settings → Environments → dev → Check these secrets:
   - SSH_HOST (hostname or IP, e.g., dev-vm.shiplink.com)
   - SSH_USERNAME (e.g., azureuser, ubuntu)
   - SSH_PORT (usually 22)
   - SSH_PRIVATE_KEY (FULL key with headers) [for key authentication]
   - SSH_PASSWORD (server password) [for password authentication]

2. Choose authentication method:

   For SSH Key Authentication (Recommended):
   - Set SSH_PRIVATE_KEY with full key (format below)
   - Leave SSH_PASSWORD empty

   For Password Authentication:
   - Set SSH_PASSWORD with server password
   - Leave SSH_PRIVATE_KEY empty

3. SSH_PRIVATE_KEY must be in this EXACT format (if using key auth):
   -----BEGIN RSA PRIVATE KEY-----
   MIIEpAIBAAKCAQEA1234567890abcdef...
   (many lines)
   ...xyz890
   -----END RSA PRIVATE KEY-----

4. Test SSH connection manually:
   ssh -i path/to/key username@hostname  (for key auth)
   ssh username@hostname  (for password auth)

   If manual connection fails, the credentials don't work.

5. Generate new SSH key if needed (for key auth):
   ssh-keygen -t rsa -b 4096 -C "deployment@shiplink"

6. Add public key to server (for key auth):
   ssh-copy-id -i key.pub username@hostname
```

**Prevention:**

- Store SSH keys in secure password manager
- Document which key is used for which server
- Test SSH access before adding to GitHub

---

#### Error: "Host key verification failed"

```
Host key verification failed.
```

**What this means (Frontend Translation):**
SSH is being extra careful about connecting to a server it doesn't recognize.

**Solution:**
This should auto-resolve with our workflow config, but if it persists:

```bash
1. The workflow already handles this with:
   ssh-keyscan -H ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts

2. If still failing, SSH_HOST might be wrong:
   - Verify it's just the hostname (no ssh:// prefix)
   - No port number in hostname (use SSH_PORT separately)
   - Correct: dev-vm.shiplink.com
   - Wrong: ssh://dev-vm.shiplink.com:22
```

---

### 3. Docker & Container Issues

#### Error: "Container exited with status code 1"

```
Container exited immediately after start
Status: Exited (1) 2 seconds ago
```

**What this means (Frontend Translation):**
Like running `yarn start` and it crashes immediately.

**Cause:**

- Missing environment variables
- Wrong environment variable values
- Next.js build is broken
- Port 3000 already in use

**Solution:**

```bash
1. Check container logs on server:
   ssh username@server
   docker logs shiplink-frontend

2. Common log errors and fixes:

   Error: "Error: Could not load env file"
   Fix: Make sure ALL environment variables are set in GitHub secrets

   Error: "EADDRINUSE: address already in use"
   Fix: Port 3000 is occupied. Kill the process:
        docker ps -a
        docker rm -f $(docker ps -aq)

   Error: "MODULE_NOT_FOUND"
   Fix: Dependency issue. Rebuild with:
        yarn install --frozen-lockfile

3. Verify all secrets are set:
   Go to Settings → Environments → dev
   Count secrets: Should have 30+ secrets
   Missing secrets = app won't start

4. Test locally with same env vars:
   Copy all GitHub secrets to .env.local
   Run: yarn build && yarn start
   If it fails locally, fix code first
```

---

#### Error: "No space left on device"

```
Error response from daemon: write /var/lib/docker/...: no space left on device
```

**What this means (Frontend Translation):**
Like running out of disk space on your laptop.

**Cause:**

- Too many old Docker images
- Too many old containers
- Server disk is full

**Solution:**

```bash
1. SSH into server and clean up:
   ssh username@server

2. Remove old Docker images:
   docker system prune -a -f

3. Remove old Docker volumes:
   docker volume prune -f

4. Check disk space:
   df -h
   # Should see at least 5GB free

5. If still no space:
   # Remove specific old images manually
   docker images
   docker rmi IMAGE_ID

6. Long-term fix:
   - Increase server disk size
   - Set up automated cleanup script
   - Monitor disk usage
```

---

#### Error: "failed to solve with frontend dockerfile.v0"

```
ERROR: failed to solve: process "/bin/sh -c yarn build" did not complete successfully: exit code: 137
```

**What this means (Frontend Translation):**
Like your laptop running out of RAM during `yarn build`.

**Cause:**

- Server ran out of memory during Docker build
- Build process is too memory-intensive

**Solution:**

```bash
1. Increase server memory:
   - Current minimum: 4GB RAM
   - Recommended: 8GB RAM
   - For production: 16GB RAM

2. Optimize build process (temporary fix):
   - Build locally and push image
   - Or increase Docker memory limit

3. Check build logs for specific error:
   Actions → Failed workflow → Build job → Expand logs
   Look for JavaScript heap out of memory
```

---

### 4. Deployment Verification Issues

#### Issue: "Deployment successful but website shows 502 Bad Gateway"

**What this means (Frontend Translation):**
Container is running, but Next.js app inside isn't working.

**Cause:**

- App crashed after starting
- Wrong port mapping
- Next.js server didn't start

**Solution:**

```bash
1. SSH into server:
   ssh username@server

2. Check if container is actually running:
   docker ps
   # Should show shiplink-frontend with "Up" status

3. Check container logs:
   docker logs shiplink-frontend
   # Look for Next.js startup message:
   # "ready - started server on 0.0.0.0:3000"

4. If logs show errors:
   - Copy error message
   - Check if it's environment variable issue
   - Verify all secrets are correctly set

5. Test from inside server:
   curl http://localhost:3000
   # Should return HTML, not error

6. If curl works but external access fails:
   - Check firewall rules
   - Check nginx/load balancer config
   - Check port mapping: -p 3000:3000
```

---

#### Issue: "Deployment takes forever (10+ minutes)"

**What this means (Frontend Translation):**
Like waiting for `yarn build` that never finishes.

**Cause:**

- Docker build is slow
- Pulling image is slow
- Server is under-powered

**Solution:**

```bash
1. Check which step is slow:
   Actions → Running workflow → Click "Build & Push" job
   Expand each step to see timing

2. If "Build Docker image" is slow (>10 min):
   - Normal for first build
   - Should be faster with caching
   - Check if cache is working:
     Look for "cache-from: type=gha" in logs

3. If "Pull image" is slow:
   - Check server internet speed
   - Check ACR location (should be same region as server)
   - Check if image is very large (>2GB is too big)

4. If "Waiting 30 seconds" seems stuck:
   - App might be starting slowly
   - Check container logs (docker logs)
   - May need to increase wait time to 60 seconds
```

---

## 🔍 Step-by-Step Debugging

When something goes wrong, follow this process:

### Step 1: Identify the Failed Stage

Open the failed workflow in GitHub Actions:

```
Actions → Click failed workflow → Look for red X ❌
```

**Failed at "Build & Push Docker Image"?** → Go to [Debug Build Issues](#debug-build-issues)

**Failed at "Deploy to Server"?** → Go to [Debug Deployment Issues](#debug-deployment-issues)

---

### Debug Build Issues

1. **Expand the build logs:**

   ```
   Click "Build & Push Docker Image" job → Expand "Build Docker image" step
   ```

2. **Look for specific errors:**
   - `ERROR: failed to solve` → Dockerfile syntax error
   - `npm ERR!` or `yarn error` → Dependency problem
   - `Module not found` → Import error in code
   - `exit code: 137` → Out of memory

3. **Test locally:**

   ```bash
   # Try building the same way workflow does
   docker build -f Dockerfile.ci -t test-build .

   # If it fails locally, fix the code/Dockerfile first
   # If it works locally, it's a GitHub Actions issue
   ```

4. **Common fixes:**

   ```bash
   # Update dependencies
   yarn install --frozen-lockfile

   # Clear cache and rebuild
   rm -rf .next node_modules
   yarn install
   yarn build

   # Check Dockerfile.ci for syntax errors
   cat Dockerfile.ci
   ```

---

### Debug Deployment Issues

1. **Check SSH connection:**

   ```bash
   # From workflow logs, find the SSH command
   # Try it manually (if you have access)
   ssh -i path/to/key username@server
   ```

2. **Check if image was pushed:**

   ```bash
   # From Azure Portal:
   Container Registries → Your Registry → Repositories
   # Should see "shiplink-frontend" with recent tags
   ```

3. **Check server directly:**

   ```bash
   ssh username@server

   # Is container running?
   docker ps

   # Check container logs
   docker logs shiplink-frontend

   # Check recent images
   docker images

   # Try pulling image manually
   docker pull your-registry.azurecr.io/shiplink-frontend:latest
   ```

4. **Check secrets:**

   ```bash
   # In GitHub:
   Settings → Environments → dev → Environment secrets

   # Verify count:
   - Registry secrets: 3
   - SSH secrets: 5
   - App secrets: 30+

   # Total should be 38+ secrets
   ```

---

## 🔬 Manual Deployment Verification

After a deployment (successful or failed), verify everything manually:

### 1. Check GitHub Actions Status

```
Actions → Latest workflow run → Should see:
✅ Build & Push Docker Image
✅ Deploy to Dev Server
```

### 2. Check Azure Container Registry

```
Azure Portal → Container Registries → Your Registry → Repositories

Should see:
- shiplink-frontend
  - Latest tag: 8-character SHA (e.g., a1b2c3d4)
  - Time: Within last few minutes
```

### 3. Check Server Status

```bash
# SSH into server
ssh username@dev-server

# Check container is running
docker ps

# Should show:
CONTAINER ID   IMAGE                           STATUS        PORTS
abc123         yourregistry.azurecr.io/...    Up 2 minutes  0.0.0.0:3000->3000/tcp

# Check logs for errors
docker logs shiplink-frontend --tail 50

# Should see Next.js startup messages:
# "ready - started server on 0.0.0.0:3000, url: http://localhost:3000"

# Test from server
curl http://localhost:3000

# Should return HTML, not error page
```

### 4. Check Application Access

```bash
# From your browser
https://dev-int.ship.link

# Should show:
- Latest version of your app
- No 502/503 errors
- All features working

# Check browser console:
- No JavaScript errors
- API calls working
- WebSockets connected (if applicable)
```

---

## 🚨 Emergency Procedures

### Emergency 1: Production is Down

**Immediate Actions:**

1. **Check if auto-rollback happened:**

   ```bash
   ssh username@server
   docker logs shiplink-frontend | head -20
   # Look for "Rollback successful" message
   ```

2. **If no rollback, do manual rollback:**

   ```bash
   # Stop broken container
   docker stop shiplink-frontend
   docker rm shiplink-frontend

   # Start previous version
   docker tag shiplink-frontend-previous shiplink-frontend:latest
   docker start $(docker ps -aq -f name=shiplink-frontend)

   # Or pull a known-good version
   docker pull your-registry.azurecr.io/shiplink-frontend:KNOWN_GOOD_TAG
   # Then start it (use docker run command from old workflow)
   ```

3. **Notify team:**
   - Post in team channel
   - Tag on-call engineer
   - Document what happened

4. **Fix root cause later:**
   - Don't rush fixes during outage
   - Get back to stable first
   - Then investigate calmly

---

### Emergency 2: Deployment Stuck for 20+ Minutes

**Immediate Actions:**

1. **Cancel the workflow:**

   ```
   Actions → Running workflow → Cancel workflow
   ```

2. **Check server status:**

   ```bash
   ssh username@server

   # Check if Docker is responsive
   docker ps

   # Check CPU/memory
   top
   # Press 'q' to quit

   # Check disk space
   df -h
   ```

3. **If server is unresponsive:**
   - Contact DevOps/Infrastructure team
   - May need server restart
   - Don't restart server yourself without approval!

4. **If server is responsive:**
   - Cleanup Docker:
     ```bash
     docker system prune -a -f
     ```
   - Retry deployment:
     ```
     Actions → Re-run workflow
     ```

---

### Emergency 3: All Secrets Lost/Corrupted

**Immediate Actions:**

1. **Don't panic** - Secrets are backed up (hopefully!)

2. **Contact team lead:**
   - They should have backup of secrets
   - Or access to Azure Key Vault

3. **Restore secrets one environment at a time:**
   - Start with dev (least critical)
   - Test deployment
   - Then stage
   - Finally prod

4. **Document recovery:**
   - What happened?
   - How was it fixed?
   - How to prevent it?

---

## 📦 Release Creation Issues (Production Only)

### Issue: GitHub Release not created after successful deployment

**What this means:**
The deployment succeeded but the automated GitHub Release wasn't created.

**Cause:**

- Health checks failed (release only created after successful health checks)
- Workflow permissions issue
- Git tag already exists with the same name
- Network issue communicating with GitHub API

**Solution:**

```bash
# 1. Check if deployment actually succeeded with health checks
Go to Actions → Find the workflow run → Check all jobs are green

# 2. Verify permissions in approve-deploy-prod.yml
Look for:
  permissions:
    contents: write  # Required for creating tags and releases
    issues: write    # For updating approval issue

# 3. Check if tag already exists (rare, timestamp-based)
Go to repository → Releases → Check if tag v2025.10.23.XXXX-XXXXXXXX exists

# 4. Check workflow logs
Go to Actions → Click workflow → Click "Create GitHub Release" job
Look for error messages in the logs

# 5. If tag exists, delete and re-run
git push origin :refs/tags/v2025.10.23.1054-f9b4949
# Then re-run the workflow
```

**Prevention:**

- Ensure workflow has `contents: write` permission
- Don't manually create tags with the same format
- Monitor first few deployments to catch issues early

---

### Issue: Release notes missing commits or incorrectly grouped

**What this means:**
The release was created but commits are not properly categorized or some are missing.

**Cause:**

- Commits don't follow Conventional Commits format
- Commits made directly to main (not through PR merge)
- Squash merge combined multiple commits

**Solution:**

```bash
# For future releases, use conventional commit format:
feat(scope): Add feature description
fix(scope): Fix bug description
docs: Update documentation
refactor: Improve code structure
style: Update styling
test: Add tests
chore: Update dependencies

# Examples of good commit messages:
feat(vessel): Add vessel search filters
fix(countdown): Prevent timer race condition (#617)
docs(api): Update endpoint documentation
```

**What happens to non-conventional commits:**

- They still appear in the release
- Grouped under "📦 Other Changes" section
- Not categorized by type

**Note:** This is informational, not a blocker. The release will still be created.

---

### Issue: Contributors not showing GitHub usernames

**What this means:**
Contributors section shows full names instead of `@username` links.

**Cause:**
Git commits use non-GitHub email addresses (e.g., `user@company.com` instead of GitHub email).

**Solution:**

This is expected behavior for commits made with non-GitHub emails.

**How contributors are detected:**

```bash
# If commit email matches GitHub format:
username@users.noreply.github.com
→ Shows as: @username

# If commit email is regular email:
user@company.com
→ Shows as: Full Name from Git commit
```

**To use GitHub username in future commits:**

```bash
# Configure Git to use GitHub email
git config user.email "your-github-username@users.noreply.github.com"

# Or use GitHub's noreply email from Settings → Emails
```

---

### Issue: PR numbers not linked in release notes

**What this means:**
Release notes show commit messages but no PR links (e.g., "in #123").

**Cause:**
Commit messages don't contain PR number references.

**Solution:**

```bash
# GitHub automatically adds PR numbers to merge commit messages
# If using "Merge pull request":
Merge pull request #123 from org/feature-branch

# If using "Squash and merge":
feat: Add new feature (#123)

# Manual commits should include PR number:
fix(api): Fix endpoint issue (#456)
```

**Prevention:**

- Use GitHub's merge options (they auto-add PR numbers)
- Manually include PR number in commit message: `(#123)`
- PR numbers are extracted from anywhere in commit message

---

### Issue: Tag format doesn't match expectation

**What this means:**
Tag is created but format looks different than backend releases.

**Expected Format:**

```
v{YYYY}.{MM}.{DD}.{HHMM}-{SHA8}
v2025.10.23.1054-f9b4949
```

**Components:**

- `v` - Version prefix
- `2025.10.23` - Deployment date (YYYY.MM.DD) in UTC
- `1054` - Deployment time (HHMM) in UTC
- `f9b4949` - Short commit SHA (8 characters)

**If format is different:**

Check the `generate-release-notes` action - the format is hardcoded to match backend.

**See:** [RELEASE_NOTES_GUIDE.md](./RELEASE_NOTES_GUIDE.md) for complete tag format documentation

---

### Issue: Release notes too long or cluttered

**What this means:**
Release notes contain too many commits or too much detail.

**Cause:**
Many commits between releases, or commits include verbose messages.

**Solution:**

This is informational - the release will work fine with many commits.

**Best practices for cleaner releases:**

```bash
# Group related work in release branches
release/20251023-1 should contain related features

# Use concise commit messages
✅ Good: feat(vessel): Add search filters
❌ Too verbose: feat(vessel): Add search filters including name, IMO, flag, type, and deadweight with debounce and caching

# Squash related commits before merging
If you have 5 commits for one feature, squash to 1 commit
```

**Remember:** Even with many commits, the release is automatically organized by type (Features, Bug Fixes, etc.)

---

## 📞 Getting More Help

### Before Asking for Help

1. **Gather diagnostic information:**

   ```bash
   # From workflow logs:
   - Screenshot of error
   - Full error message
   - Which step failed

   # From server (if accessible):
   - docker ps -a
   - docker logs shiplink-frontend
   - df -h (disk space)
   - free -h (memory)
   ```

2. **Try the obvious fixes:**
   - Re-run workflow
   - Check secrets are set
   - Check for typos
   - Read error message carefully

3. **Search for similar issues:**
   - GitHub Actions documentation
   - Docker documentation
   - Team's documentation

### When Asking for Help

**Provide:**

- Link to failed workflow run
- Error message (copy-paste, not screenshot)
- What you already tried
- What environment (dev/stage/prod)

**Don't:**

- Just say "it's not working"
- Skip diagnostic steps
- Share secrets in the message

**Example Good Help Request:**

```
🚨 Deployment Issue - DEV Environment

**Problem:** Deployment fails at "Deploy to server" step

**Error Message:**
```

Permission denied (publickey)

```

**What I tried:**
1. Verified SSH authentication secrets are set in GitHub (SSH_PRIVATE_KEY or SSH_PASSWORD)
2. Checked key format has header/footer (if using key auth)
3. Confirmed SSH_HOST is correct (dev-vm.shiplink.com)

**Workflow Link:**
https://github.com/ORG/REPO/actions/runs/12345

**Need Help:**
- Is this the correct SSH key for dev server?
- Should I regenerate the key?
```

---

## 📚 Reference: Deployment Architecture

### Normal Flow

```
┌──────────────┐
│ PR Merged    │
│ to develop   │
└──────┬───────┘
       ↓
┌──────────────────────┐
│ GitHub Actions       │
│ Workflow Triggers    │
└──────┬───────────────┘
       ↓
┌──────────────────────┐
│ Build Docker Image   │
│ - Install deps       │
│ - Build Next.js      │
│ - Create image       │
└──────┬───────────────┘
       ↓
┌──────────────────────┐
│ Push to ACR          │
│ Tag: <git-sha>       │
└──────┬───────────────┘
       ↓
┌──────────────────────┐
│ SSH to Server        │
│ - Pull image         │
│ - Stop old container │
│ - Start new one      │
└──────┬───────────────┘
       ↓
┌──────────────────────┐
│ Verify Deployment    │
│ - Wait 30 sec        │
│ - Check running      │
└──────┬───────────────┘
       ↓
   ✅ Success!
```

### Rollback Flow

```
       ❌ Deployment Failed
              ↓
┌──────────────────────┐
│ Check for Previous   │
│ Image                │
└──────┬───────────────┘
       ↓
   Found?
       ├─ Yes ──→ ┌──────────────────┐
       │          │ Stop Failed      │
       │          │ Container        │
       │          └────────┬─────────┘
       │                   ↓
       │          ┌──────────────────┐
       │          │ Start Previous   │
       │          │ Version          │
       │          └────────┬─────────┘
       │                   ↓
       │              ✅ Rolled Back
       │
       └─ No ───→ ❌ Manual Intervention Required
```

---

## 🎓 Learning Resources

- [GitHub Actions Debugging](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/enabling-debug-logging)
- [Docker Troubleshooting](https://docs.docker.com/config/containers/troubleshooting/)
- [SSH Debugging](https://www.ssh.com/academy/ssh/command#debugging-ssh)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Document Version**: 1.0  
**Last Updated**: October 2025  
**Keep Updated**: Add new issues as you encounter them!
