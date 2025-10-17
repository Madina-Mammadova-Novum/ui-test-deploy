# 🚀 Production Release Process

This guide explains the complete production release workflow for ShipLink Frontend, including GitHub Milestones, release branches, and production deployments.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Branch Flow](#branch-flow)
3. [Release Process with Milestones](#release-process-with-milestones)
4. [Release Branch Naming Convention](#release-branch-naming-convention)
5. [Production Deployment Checklist](#production-deployment-checklist)
6. [Hotfix Process](#hotfix-process)
7. [Rollback Procedures](#rollback-procedures)
8. [GitHub Milestones Guide](#github-milestones-guide)

---

## 🎯 Overview

### Release Strategy

Our production deployment follows a structured, milestone-driven approach:

- **Milestones** track features and fixes for each release
- **Release branches** (`release/yyyymmdd-count`) are created from `stage`
- **Manual approval** required before production deployment
- **Automated health checks** verify deployment success
- **Automatic rollback** on health check failure

### Key Principles

✅ All production code must pass through: `dev` → `feature` → `stage` → `release/yyyymmdd-count` → `main`  
✅ Production deployments require manual approval  
✅ Health checks run automatically after deployment  
✅ Rollback is automatic on failure  
✅ Hotfixes bypass normal flow for emergencies only

---

## 🌳 Branch Flow

```
Dev ─────► feature ─────► Stage ─────► release/yyyymmdd-count ─────► Main (PROD)
                                                                        ▲
                                                                        │
                                                                     hotfix
```

### Branch Descriptions

| Branch                   | Purpose              | Deployment        | Auto-Deploy      |
| ------------------------ | -------------------- | ----------------- | ---------------- |
| `dev`                    | Development work     | DEV environment   | ✅ Yes           |
| `feature/*`              | Individual features  | None              | ❌ No            |
| `stage`                  | QA testing           | STAGE environment | ✅ Yes           |
| `release/yyyymmdd-count` | Production candidate | None              | ❌ No            |
| `main`                   | Production code      | PROD environment  | ⚠️ With approval |
| `hotfix/*`               | Emergency fixes      | PROD environment  | ⚠️ With approval |

---

## 📅 Release Process with Milestones

### Phase 1: Planning (Start of Sprint/Release Cycle)

**1. Create Milestone**

1. Go to **Issues** → **Milestones** → **New milestone**
2. **Title**: `Release YYYY-MM-DD` or `Version X.Y.Z`
   - Example: `Release 2025-10-15` or `Version 2.5.0`
3. **Due date**: Set target release date
4. **Description**: Add release goals and key features

   ```
   ## Release Goals
   - Implement new vessel search filters
   - Fix cargo calculation bugs
   - Performance optimizations

   ## Target Date: October 15, 2025
   ## Release Lead: @username
   ```

**2. Assign Work to Milestone**

- Create issues for features, bugs, and tasks
- Assign each issue to the milestone
- Label appropriately (`feature`, `bug`, `enhancement`, etc.)
- Assign team members

**Example Structure:**

```
Milestone: Release 2025-10-15 (15 issues)
├── #234 - Add advanced vessel filters (feature)
├── #235 - Fix cargo density calculation (bug)
├── #236 - Optimize search performance (enhancement)
└── ... (12 more issues)
```

---

### Phase 2: Development (Sprint Execution)

**1. Create Feature Branches**

```bash
# From dev branch
git checkout dev
git pull origin dev
git checkout -b feature/vessel-filters
```

**2. Development Workflow**

```
Developer works → Commits → Opens PR to dev
   ↓
PR reviewed and approved
   ↓
Merge to dev (triggers DEV deployment)
   ↓
Issue linked to PR gets updated
   ↓
Milestone progress updates automatically
```

**3. Track Milestone Progress**

- Go to **Issues** → **Milestones** → Click your milestone
- View progress bar: `Closed / Total issues`
- Example: `12 / 15 (80% complete)`

**4. Monitor Progress**

```
✅ Completed: 12 issues
🔄 In Progress: 2 issues
📋 Not Started: 1 issue
────────────────────────
Progress: 80%
Ready for Testing: ⚠️ Not yet
```

---

### Phase 3: Testing (Stage Environment)

**1. Merge to Stage**

When features are ready for QA testing:

```bash
# Merge dev to stage
git checkout stage
git pull origin stage
git merge dev
git push origin stage
```

This automatically deploys to STAGE environment.

**2. QA Testing**

- QA team tests on STAGE environment
- Bugs are reported as new issues
- Bugs are assigned to the same milestone
- Developers fix on `feature` branches
- Fixes merge to `dev`, then to `stage`

**3. Milestone Completion Criteria**

Before creating release branch, ensure:

- [ ] Milestone is 95-100% complete
- [ ] All critical bugs are fixed
- [ ] QA sign-off received
- [ ] Documentation updated
- [ ] Breaking changes documented
- [ ] CHANGELOG.md updated

---

### Phase 4: Release Branch Creation

**When to Create Release Branch:**

- Milestone is 100% complete (or very close)
- QA has approved the stage environment
- Ready for production deployment

**1. Determine Release Branch Name**

Format: `release/yyyymmdd-count`

- `yyyymmdd`: Current date (e.g., `20251010` for Oct 10, 2025)
- `count`: Release number for that day (usually `1`, increment if multiple releases same day)

**Examples:**

```bash
release/20251010-1  # First release on October 10, 2025
release/20251010-2  # Second release same day (e.g., hotfix)
release/20251125-1  # First release on November 25, 2025
```

**How to check existing releases for the day:**

```bash
# List all release branches for today's date
git branch -r | grep "release/20251010-"

# If none exist, use -1
# If release/20251010-1 exists, use -2
```

**2. Create Release Branch**

```bash
# From stage branch
git checkout stage
git pull origin stage

# Create release branch (example for Oct 10, 2025, first release)
git checkout -b release/20251010-1
git push origin release/20251010-1
```

**3. Final Testing on Release Branch**

- Perform smoke tests
- Verify critical features
- Test deployment scripts
- Review environment variables

**4. Critical Fixes Only**

If bugs are found during final testing:

```bash
# Fix directly on release branch
git checkout release/20251010-1
# Make minimal fix
git commit -m "fix(release): critical issue description"
git push origin release/20251010-1

# Also backport to dev and stage
git checkout dev
git cherry-pick <commit-hash>
git push origin dev
```

---

### Phase 5: Production Deployment

**1. Create Pull Request**

- **From**: `release/20251010-1`
- **To**: `main`

**2. PR Description Template**

```markdown
## 🚀 Production Release: 2025-10-10-1

### 📦 Milestone

Closes #milestone-number (Release 2025-10-15)

### ✨ Features

- New vessel search filters (#234)
- Enhanced cargo calculations (#240)
- Performance optimizations (#236)

### 🐛 Bug Fixes

- Fixed cargo density calculation (#235)
- Resolved authentication timeout issues (#238)

### ⚠️ Breaking Changes

- None

### 📋 Pre-Deployment Checklist

- [x] All tests passing
- [x] QA sign-off received
- [x] Documentation updated
- [x] CHANGELOG.md updated
- [x] Environment variables verified
- [x] Rollback plan documented
- [x] Team notified of deployment

### 🔄 Rollback Plan

- Previous version: `release-20251001-1`
- Automatic rollback on health check failure
- Manual rollback: Re-run workflow #12345

### 📞 Contacts

- Release Lead: @arifemregursoy
- On-call Engineer: @DenizCansever
```

**3. Code Review**

- At least 1 approval required
- Review by senior developer or tech lead
- Verify PR description completeness
- Confirm rollback plan

**4. Merge to Main**

Once approved:

```bash
# Merge PR via GitHub UI
# This triggers the production deployment workflow
```

**5. Deployment Workflow**

After merge, the workflow automatically:

1. **Validates source branch** (must be `release/*` or `hotfix/*`)
2. **Builds Docker image** with tags:
   - SHA tag: `abc12345`
   - Environment tag: `prod-latest`
   - Release tag: `release-20251010-1`
3. **Pushes to Azure Container Registry**
4. **Creates approval issue** (if `WAIT_FOR_APPROVAL=true`)
5. **Waits for `deploy-approved` label** ⚠️ **YOU MUST ADD LABEL**
6. **Deploys to production server** (triggers automatically when label added)
7. **Waits 60 seconds** for stabilization
8. **Runs health checks** (automated smoke tests)
9. **Reports success** or triggers automatic rollback

**6. Manual Approval (Label-Based)**

When workflow creates approval issue:

1. Go to **Issues** tab
2. Find the issue labeled `deploy-approval`
3. Review deployment details:
   - Release version
   - Image tag
   - Source branch
   - Commit SHA
4. Add the label `deploy-approved` to the issue
5. Approval workflow will automatically trigger
6. Monitor health checks in the new workflow run

**7. Monitor Deployment**

Watch the workflow logs for:

**Initial Workflow (deploy-prod.yml):**

```
✅ Branch validation successful
✅ Build successful
✅ Image pushed to registry
✅ Approval issue created
⏸️  Waiting for deploy-approved label...
```

**After Adding Label (approve-deploy-prod.yml):**

```
✅ Approval detected
✅ Container deployed
⏳ Running health checks...
✅ Health check: Home Page - PASS
✅ Health check: API Health - PASS
✅ Health check: Account Info (Protected) - PASS
✅ Deployment successful!
```

**8. Post-Deployment Verification**

After successful deployment:

- [ ] Access production URL and verify it loads
- [ ] Test critical user flows (login, search, etc.)
- [ ] Check monitoring dashboards (New Relic, logs)
- [ ] Verify no error spikes
- [ ] Test from different regions/devices

**9. Tag Release in GitHub**

```bash
git checkout main
git pull origin main
git tag -a v2.5.0 -m "Release 2025-10-10: Vessel filters and performance improvements"
git push origin v2.5.0
```

**10. Close Milestone**

1. Go to **Issues** → **Milestones**
2. Click milestone name
3. Click **Close milestone**
4. Add closure comment with deployment details

**11. Post-Release Cleanup**

```bash
# Optionally merge release branch back to dev and stage
git checkout dev
git merge release/20251010-1
git push origin dev

git checkout stage
git merge release/20251010-1
git push origin stage

# Delete release branch (optional, after 30 days)
git branch -d release/20251010-1
git push origin --delete release/20251010-1
```

**12. Update CHANGELOG.md**

```markdown
## [2.5.0] - 2025-10-10

### Added

- Advanced vessel search filters with multi-criteria support
- Real-time cargo capacity calculations

### Fixed

- Cargo density calculation precision issues
- Authentication timeout on slow networks

### Performance

- Optimized vessel search queries (50% faster)
- Reduced bundle size by 15%
```

**13. Communicate Release**

- Send release notes to stakeholders
- Update team in Slack/Teams
- Notify customer success team
- Update documentation if needed

---

## 📛 Release Branch Naming Convention

### Format

```
release/yyyymmdd-count
```

### Components

- **`release/`**: Prefix (required)
- **`yyyymmdd`**: Date in format YYYYMMDD
  - `yyyy`: 4-digit year (e.g., `2025`)
  - `mm`: 2-digit month (e.g., `10` for October)
  - `dd`: 2-digit day (e.g., `15`)
- **`-`**: Separator (required)
- **`count`**: Sequential number for that day (starts at `1`)

### Examples

```bash
release/20251010-1  # October 10, 2025 - First release
release/20251010-2  # October 10, 2025 - Second release (e.g., hotfix)
release/20251125-1  # November 25, 2025 - First release
release/20260101-1  # January 1, 2026 - First release
```

### Rules

✅ **DO:**

- Use current date when creating the branch
- Start with `1` for first release of the day
- Increment count for same-day releases
- Use lowercase `release/`

❌ **DON'T:**

- Use future dates
- Skip numbers (1, 2, 3... not 1, 3, 5)
- Use different date formats
- Include version numbers in branch name

---

## ✅ Production Deployment Checklist

Use this checklist before every production deployment:

### Pre-Deployment

- [ ] **Code Quality**
  - [ ] All PR validations passed
  - [ ] Code reviewed and approved
  - [ ] No linter errors
  - [ ] Tests passing (if available)

- [ ] **Testing**
  - [ ] QA sign-off received
  - [ ] Tested on STAGE environment
  - [ ] Smoke tests performed
  - [ ] Performance verified

- [ ] **Documentation**
  - [ ] CHANGELOG.md updated
  - [ ] README updated (if needed)
  - [ ] API docs updated (if APIs changed)
  - [ ] Release notes prepared

- [ ] **Environment**
  - [ ] Production secrets verified
  - [ ] Environment variables checked
  - [ ] Database migrations ready (if any)
  - [ ] Third-party services notified (if needed)

- [ ] **Planning**
  - [ ] Deployment window scheduled
  - [ ] Team notified
  - [ ] On-call engineer identified
  - [ ] Rollback plan documented

### During Deployment

- [ ] **Monitoring**
  - [ ] Workflow logs being watched
  - [ ] Ready to approve deployment
  - [ ] Monitoring dashboards open

- [ ] **Approval**
  - [ ] Reviewed deployment summary
  - [ ] Approved deployment in GitHub
  - [ ] Health checks monitored

### Post-Deployment

- [ ] **Verification**
  - [ ] Production URL accessible
  - [ ] Critical features tested
  - [ ] No error spikes in logs
  - [ ] Monitoring metrics normal

- [ ] **Cleanup**
  - [ ] GitHub release tagged
  - [ ] Milestone closed
  - [ ] Team notified of success
  - [ ] Documentation updated

---

## 🚨 Hotfix Process

### When to Use Hotfixes

Hotfixes are for **critical production issues only**:

✅ Security vulnerabilities  
✅ Data corruption bugs  
✅ Application crashes  
✅ Critical functionality broken

❌ **NOT for:**

- Minor bugs
- Feature requests
- Performance optimizations
- Non-critical fixes

### Hotfix Workflow

**1. Create Hotfix Branch**

```bash
# Branch from main (current production code)
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-fix
```

**2. Implement Minimal Fix**

- Keep changes minimal and focused
- Only fix the critical issue
- Avoid refactoring or improvements
- Test thoroughly in isolated environment

```bash
# Make minimal fix
git commit -m "hotfix: patch critical security vulnerability CVE-2025-12345"
git push origin hotfix/critical-security-fix
```

**3. Create Pull Request**

- **From**: `hotfix/critical-security-fix`
- **To**: `main`

**PR Description Template:**

```markdown
## 🚨 HOTFIX: Critical Security Vulnerability

### Issue

CVE-2025-12345 allows unauthorized access to user data

### Impact

- Severity: Critical
- Affected users: All
- Discovered: 2025-10-10 14:30 UTC

### Fix

- Patch authentication middleware
- Add input validation

### Testing

- [x] Tested in isolated environment
- [x] Verified fix resolves issue
- [x] No side effects detected

### Rollback Plan

Previous version: release-20251010-1
```

**4. Expedited Review**

- Requires immediate review
- At least 1 approval (can be post-deployment if truly urgent)
- Security team review for security issues

**5. Deploy**

Option A: **Automatic trigger** (merge PR)

```bash
# Merge PR to main
# Workflow triggers automatically
# Still requires manual approval (add deploy-approved label to issue)
```

Option B: **Manual trigger** (more control)

```
1. Go to Actions → Deploy to Production
2. Click "Run workflow"
3. Branch: hotfix/critical-security-fix
4. Reason: "Critical security patch CVE-2025-12345"
5. Find approval issue in Issues tab
6. Add deploy-approved label to approve deployment
```

**6. Backport to Other Branches**

After successful deployment, backport fix:

```bash
# To dev branch
git checkout dev
git pull origin dev
git cherry-pick <hotfix-commit-hash>
git push origin dev

# To stage branch
git checkout stage
git pull origin stage
git cherry-pick <hotfix-commit-hash>
git push origin stage

# Merge to current release branch (if exists)
git checkout release/20251010-1  # or current release
git merge hotfix/critical-security-fix
git push origin release/20251010-1
```

**7. Post-Hotfix**

- [ ] Document incident in postmortem
- [ ] Update milestone if applicable
- [ ] Communicate to stakeholders
- [ ] Review why issue wasn't caught earlier
- [ ] Update tests to prevent regression

---

## 🔄 Rollback Procedures

### Automatic Rollback

Rollback happens automatically if:

- Container fails to start (30-second window)
- Health checks fail (production only)

You'll see:

```
❌ Health checks FAILED
🔄 Attempting automatic rollback...
📦 Starting previous version...
✅ Rollback successful
```

### Manual Rollback Methods

#### Method 1: Re-run Previous Workflow (Recommended)

1. Go to **Actions** tab
2. Find last successful deployment
3. Note the image tag (e.g., `abc12345`)
4. Click **Re-run all jobs**
5. Find approval issue in Issues tab
6. Add `deploy-approved` label to approve
7. Monitor deployment

#### Method 2: Manual Trigger with Specific Version

1. Go to **Actions** → **Deploy to Production**
2. Click **Run workflow**
3. Select **main** branch
4. Reason: "Rolling back to version abc12345"
5. Run workflow
6. Find approval issue in Issues tab
7. Add `deploy-approved` label to approve

#### Method 3: Direct Server Rollback (Emergency)

If GitHub Actions is unavailable:

```bash
# SSH to production server
ssh username@production-server

# Check available images
docker images shiplink-frontend

# Find previous version tag
# Example: shiplink-frontend:release-20251001-1

# Stop current container
docker stop shiplink-frontend
docker rm shiplink-frontend

# Start previous version
docker run -d \
  --name shiplink-frontend \
  --restart always \
  -p 3000:3000 \
  # ... (all environment variables) ...
  your-registry.azurecr.io/shiplink-frontend:release-20251001-1

# Verify
docker ps
docker logs shiplink-frontend
```

### Post-Rollback

After any rollback:

1. **Verify** production is working
2. **Investigate** root cause
3. **Document** incident
4. **Fix** issue in dev/stage
5. **Test** thoroughly before redeployment
6. **Communicate** to stakeholders

---

## 📊 GitHub Milestones Guide

### What are Milestones?

Milestones are GitHub's built-in project management tool to:

- Group related issues and PRs
- Track progress toward a goal
- Set deadlines for releases
- Organize work into releases

### Creating a Milestone

1. Go to **Issues** → **Milestones**
2. Click **New milestone**
3. Fill in details:
   - **Title**: `Release 2025-10-15` or `Version 2.5.0`
   - **Due date**: Target release date
   - **Description**: Release goals and key features

### Best Practices

✅ **DO:**

- Create milestones at start of sprint/release cycle
- Assign all related issues to milestone
- Use clear, descriptive titles
- Set realistic due dates
- Review progress regularly
- Close milestone after release

❌ **DON'T:**

- Create too many milestones
- Leave milestones open indefinitely
- Assign unrelated issues
- Change milestone frequently
- Forget to update completion status

### Tracking Progress

Progress is calculated automatically:

```
Progress = (Closed Issues / Total Issues) × 100%

Example:
15 closed / 20 total = 75% complete
```

View progress:

1. Go to **Issues** → **Milestones**
2. See progress bar for each milestone
3. Click milestone to see details

### Milestone States

- **Open**: Active milestone being worked on
- **Closed**: Milestone completed and released
- **No milestone**: Issues not assigned to any release

---

## 📞 Support & Questions

### Need Help?

- **Deployment issues**: Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Setup questions**: Check [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)
- **Quick reference**: Check [QUICK_START.md](./QUICK_START.md)
- **General info**: Check [README.md](./README.md)

### Emergency Contacts

For production emergencies:

1. Check on-call rotation
2. Contact DevOps team
3. Review incident response plan

---

**Document Version**: 1.0  
**Last Updated**: October 2025  
**Maintained By**: DevOps & Frontend Team
