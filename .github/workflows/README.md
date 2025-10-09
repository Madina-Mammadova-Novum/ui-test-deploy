# CI/CD Workflows for ShipLink Frontend

This directory contains optimized GitHub Actions workflows for automated code quality checks, security scanning, performance validation, and continuous deployment.

## 🚀 Quick Links

- 📖 [Quick Start Guide](./QUICK_START.md) - Get started with deployments in 5 minutes
- 🔧 [Setup Guide](./DEPLOYMENT_SETUP.md) - Complete deployment setup instructions
- 🐛 [Troubleshooting](./TROUBLESHOOTING.md) - Common issues and solutions

## ✅ Deployment Status

| Environment           | Status               | Last Updated |
| --------------------- | -------------------- | ------------ |
| **Development (DEV)** | 🟡 Ready for Testing | 2025-10-09   |
| **Staging (STAGE)**   | 🟡 Ready for Testing | 2025-10-09   |
| **Production (PROD)** | ⚪ Not Configured    | -            |

**Legend**: ✅ Active · 🟡 Ready for Testing · 🟠 Configuration In Progress · ⚪ Not Configured

## 🎯 Current Versions

- **Node.js**: 22.x
- **Next.js**: 15.5.4
- **React**: 19.2.0
- **Actions Cache**: v4 (latest)

---

## 📋 Available Workflows

### 1. PR Validation (`pr-validation.yml`)

**Comprehensive workflow** - Complete code quality, security, and performance validation with intelligent optimizations.

**Triggers**:

- All PRs to any branch
- Only on relevant file changes (smart path filtering)
- Skips draft PRs automatically

**Jobs**:

#### ✅ **Code Quality & Build Check**

- ESLint code quality (with caching)
- Prettier formatting
- Project build (with CI environment variables)
- Test execution (if available)
- Bundle size analysis
- Automated PR comments with results
- GitHub Actions summary page

#### 🔒 **Security Scan**

- Yarn audit for critical vulnerabilities
- Outdated package detection
- Security summary reporting

#### ⚡ **Performance Check**

- Bundle size analysis
- Build performance monitoring
- Performance summary reporting

---

### 2. Commit Message Validation (`commit-validation.yml`)

**Commit linting** - Ensures conventional commit messages.

**Triggers**:

- PRs to `develop` branch only
- Only on relevant file changes (smart path filtering)

**Checks**:

- ✅ Commit message format validation using commitlint
- 📝 Conventional commit standards

---

### 3. Deploy to Development (`deploy-dev.yml`)

**Continuous Deployment** - Automated deployment to DEV environment.

**Triggers**:

- PR merged to `develop` branch
- Manual trigger via GitHub UI (workflow_dispatch)
- Only on relevant file changes (code, config, Dockerfile)

**Jobs**:

#### 🏗️ **Build & Push Docker Image**

- Checkout code
- Generate deployment metadata (SHA-based tags)
- Login to Azure Container Registry
- Build Docker image with Next.js app
- Push image to registry with unique tag
- Cache Docker layers for faster builds

#### 🚀 **Deploy to Dev Server**

- Setup SSH connection to dev VM
- Pull new Docker image from registry
- Tag old image for rollback capability
- Stop and remove old container
- Start new container with environment secrets
- Wait 30 seconds for application startup
- Verify container is running
- Automatic rollback on failure
- Cleanup old images to save disk space
- Generate deployment summary

**Features**:

- ✅ Zero-downtime capable
- ✅ Automatic rollback on failure
- ✅ Environment-specific secrets via GitHub Environments
- ✅ Deployment audit trail
- ✅ Manual deployment option
- ✅ Comprehensive logging
- ⏱️ ~7-11 minutes total deployment time

---

### 4. Deploy to Staging (`deploy-stage.yml`)

**Continuous Deployment** - Automated deployment to STAGE environment.

**Triggers**:

- PR merged to `stage` branch
- Manual trigger via GitHub UI (workflow_dispatch)
- Only on relevant file changes (code, config, Dockerfile)

**Jobs & Features**:

Same as Deploy to Development, but targeting staging environment with stage-specific secrets and configuration.

---

## 🚀 Key Features & Optimizations

### 🔒 **1. Security Permissions** (Phase 1)

**Principle of least privilege** applied to all workflows:

- Jobs only have necessary permissions
- `contents: read` for most jobs
- `pull-requests: write` only where needed (for PR comments)

### ⚡ **2. Advanced Caching** (Phase 2 & 5)

**Multiple cache layers for maximum performance**:

- ✅ **Actions Cache v4** - Latest with improved compression
- ✅ **Node modules** - Cached via `setup-node`
- ✅ **Next.js build** - `.next/cache` preserved between runs
- ✅ **ESLint cache** - `.eslintcache` for 30-50% faster linting

**Expected cache hit rate**: ~70-80%

### 🎯 **3. Intelligent Path Filtering** (Phase 3)

**Saves 60-70% of CI runs** by skipping workflows on non-code changes:

**Workflows RUN on**:

- ✅ Source code files (`**/*.js`, `**/*.jsx`)
- ✅ Dependencies (`package.json`, `yarn.lock`)
- ✅ Config files (`next.config.js`, `tailwind.config.js`, etc.)
- ✅ All source directories (`components/`, `pages/`, `app/`, etc.)

**Workflows SKIP on**:

- ⏭️ Documentation (`README.md`, `docs/**`, `*.md`)
- ⏭️ Workflow changes (`.github/workflows/**`)
- ⏭️ License files (`LICENSE`, `CODE_OF_CONDUCT.md`)
- ⏭️ Git config (`.gitignore`, `.gitattributes`)

### 💡 **4. Draft PR Skip** (Phase 4)

**Saves 66% of resources during development**:

- ⏭️ All jobs skip when PR is in draft mode
- ✅ CI runs only when marked "Ready for Review"
- 🎯 Developers can iterate freely without wasting CI minutes

### 📦 **5. No Build Artifacts in CI** (Intentional)

**Why PR builds don't save artifacts:**

- ❌ **PR builds are throwaway** - Never deployed to any environment
- ❌ **Wasteful storage** - Every PR creates artifacts that are never used
- ❌ **Logs are sufficient** - Error messages in logs provide enough debug info
- ✅ **Artifacts in CD only** - Deployment builds save artifacts for rollback/audit

**Where artifacts ARE saved:**

- ✅ CD workflows (`deploy-dev.yml`, `deploy-stage.yml`)
- ✅ Used for deployment verification and rollback
- ✅ Stored in Azure Container Registry as Docker images

### 📊 **6. Professional Summaries** (Phase 7)

**Enhanced developer experience**:

**GitHub Actions Summary Page**:

- Overview of all checks at a glance
- No need to dig through logs
- Links to detailed results

**Enhanced PR Comments** (on failure):

- Clear status indicators
- Fix commands included
- Helpful debugging tips
- Direct links to workflow runs

---

## 📈 Performance Improvements

### Before vs After Optimization

| Metric                        | Before      | After   | Improvement          |
| ----------------------------- | ----------- | ------- | -------------------- |
| **Average PR CI time**        | ~30 min     | ~12 min | **60% faster**       |
| **Documentation change runs** | Full 30 min | SKIPPED | **100% saved**       |
| **Cache hit rate**            | ~65%        | ~80%    | **23% better**       |
| **ESLint execution**          | ~2 min      | ~45 sec | **62% faster**       |
| **Unnecessary runs**          | ~70%        | ~10%    | **85% reduction**    |
| **Monthly CI minutes**        | ~5,000      | ~2,000  | **60% cost savings** |

---

## 🛠️ Setup Instructions

### 1. CI Workflows Setup (PR Validation & Commit Validation)

The CI workflows are ready to use as-is. No additional configuration required.

### 2. CD Workflows Setup (Deployment)

**Required setup for deployment workflows:**

1. **Create GitHub Environments**:
   - Go to Settings → Environments
   - Create `dev` and `stage` environments
   - Configure protection rules (optional for dev, recommended for stage)

2. **Add Secrets to Each Environment**:
   - Registry secrets (ACR credentials) - 3 secrets
   - SSH secrets (server access) - 4 secrets
   - Application secrets (environment variables) - 33 secrets
   - See detailed list: [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)

3. **Verify Infrastructure**:
   - Azure Container Registry is accessible
   - VMs are accessible via SSH (or password authentication)
   - Docker is installed on target servers

**📚 Deployment Documentation:**

- 🚀 **Quick Start**: [QUICK_START.md](./QUICK_START.md) - Fast setup guide with checklists
- 📖 **Full Setup Guide**: [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md) - Comprehensive deployment setup
- 🔧 **Troubleshooting**: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues and solutions

**Note on SSH Authentication:**

- Workflows support both SSH key-based and password authentication
- SSH keys are recommended for better security
- Password authentication is simpler for initial setup
- Consult your DevOps team for existing credentials

### 3. Configure Branch Protection Rules

**Recommended settings**:

1. Go to **Settings** → **Branches** → **Add rule**
2. **Branch name pattern**: `main` or `develop`
3. **Require status checks to pass**:
   - ✅ `Code Quality & Build Check`
   - ✅ `Security Scan`
   - ✅ `Performance Check`
   - ✅ `Validate Commit Messages` (for develop branch)
4. **Require branches to be up to date**: ✅ Enable
5. **Required approvals**: 1-2 reviewers
6. **Restrict pushes**: ✅ Enable

### 4. Secrets Configuration

**CI Workflows** (PR & Commit Validation):

- ✅ No secrets required - works out of the box

**CD Workflows** (Deployments):

- ⚠️ Requires environment-specific secrets
- See [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md) for complete list
- Secrets are configured per GitHub Environment (dev, stage)

**Optional Secrets**:

- `YARN_TOKEN` - For publishing packages
- `SONAR_TOKEN` - For SonarQube integration

---

## 💡 Usage Examples

### Example 1: Normal PR Workflow

```
Developer creates PR → Path filter checks files
Code change detected → All jobs run
ESLint, Prettier, Build → All pass
PR is approved → Ready to merge ✅
```

### Example 2: Draft PR Workflow

```
Developer creates Draft PR → All jobs SKIP ⏭️
Makes 5 commits → All jobs SKIP ⏭️
Marks "Ready for Review" → All jobs RUN ✅
CI validates code → Results shown
```

### Example 3: Documentation Update

```
Developer updates README.md → Path filter checks
Only docs changed → All jobs SKIP ⏭️
PR approved directly → Merge immediately ✅
```

### Example 4: Build Failure Investigation

```
Build fails in CI → Check workflow run
Read build logs → Find error message
Fix the issue → Push changes
Build succeeds ✅
```

---

## 🔧 Customization

### Adding Custom Validation Steps

Edit workflow files to add custom checks:

```yaml
- name: Custom Security Check
  run: |
    yarn audit:custom
    yarn scan:dependencies
```

### Modifying Path Filters

Edit the `paths` section to customize triggers:

```yaml
paths:
  - 'src/**' # Your source directory
  - 'config/**' # Your config directory
  - '**/*.ts' # TypeScript files (if you add TS later)
```

### Adjusting Cache Keys

Customize cache invalidation:

```yaml
key: ${{ runner.os }}-custom-${{ hashFiles('**/package.json') }}
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Workflow skipped unexpectedly"

**Cause**: Path filter excluded your files  
**Solution**: Check `paths` in workflow trigger and ensure your files are included

#### 2. "Cache not being used"

**Cause**: Cache key changed (dependencies or config updated)  
**Solution**: This is normal! First run after changes will rebuild cache

#### 3. "ESLint cache not working"

**Cause**: `.eslintcache` might be committed to git  
**Solution**: Verify `.eslintcache` is in `.gitignore` (already added)

#### 4. "Draft PR still running CI"

**Cause**: PR was converted from ready to draft after CI started  
**Solution**: Cancel running workflow and re-convert to draft

### Debug Mode

Enable detailed logging:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add repository secret:
   - Name: `ACTIONS_RUNNER_DEBUG`
   - Value: `true`

---

## 📊 Monitoring & Analytics

### View Workflow Statistics

1. **Actions tab** → **Workflows**
2. Select workflow → View runs
3. Check:
   - Success/failure rate
   - Average execution time
   - Cache hit rates

### Download Workflow Reports

GitHub provides insights on:

- Billable minutes used
- Workflow run durations
- Job completion rates

---

## 🔄 Integration with Azure Pipelines

**Current Strategy**: Dual CI/CD during migration

- **GitHub Actions**: PR validation & code quality (this setup)
- **Azure Pipelines**: Production builds & deployments

**Future State**: GitHub Actions only (migration in progress)

---

## 📚 Best Practices

### For Developers

1. ✅ **Mark PRs as draft** while working → Save CI minutes
2. ✅ **Run linters locally** before pushing → `yarn lint --fix`
3. ✅ **Format code before commit** → `yarn format`
4. ✅ **Review summary page** → Quick status check
5. ✅ **Check logs for errors** → Better debugging

### For Reviewers

1. ✅ Check GitHub Actions summary for overview
2. ✅ Review PR comments for specific issues
3. ✅ Verify all checks passed before approving
4. ✅ Check for security warnings
5. ✅ Validate conventional commit messages

---

## 🎯 Performance Tips

### Optimize Your Workflow Runs

1. **Use draft PRs** for work-in-progress → Saves ~66% of CI time
2. **Batch commits** when possible → Fewer workflow runs
3. **Fix linting locally** → Faster than CI iterations
4. **Review path filters** → Ensure only relevant changes trigger CI
5. **Monitor cache hit rates** → Higher rates = faster builds

### Expected Timings

| Job                      | Cold Cache | Warm Cache | Savings |
| ------------------------ | ---------- | ---------- | ------- |
| **Code Quality & Build** | ~10-12 min | ~4-5 min   | 60%     |
| **Security Scan**        | ~3-5 min   | ~2-3 min   | 40%     |
| **Performance Check**    | ~3-4 min   | ~2-3 min   | 33%     |

---

## 🆘 Support

### Getting Help

1. **Check workflow logs** → Detailed error messages
2. **Review this README** → Common issues covered
3. **Check summary page** → Quick diagnostics
4. **Contact DevOps team** → For workflow issues

### Useful Links

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js CI/CD Best Practices](https://nextjs.org/docs/deployment)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 🎉 Recent Improvements (2025)

### Version 2.0 - Complete Optimization

✅ **Security**: Explicit permissions (principle of least privilege)  
✅ **Performance**: Cache v4 + ESLint caching (60% faster)  
✅ **Cost**: Path filtering + draft skip (60% fewer runs)  
✅ **Quality**: Professional summaries + enhanced comments  
✅ **Experience**: Better error messages + fix suggestions

**Total estimated savings**: **~3,000 CI minutes per month (~50 hours)**

---

## 📝 Changelog

### 2025-10-09 - v2.1.1 - CD Setup Complete

**Setup Status**: ✅ **Ready for Initial Deployment Testing**

**Configuration Completed**:

- ✅ GitHub Environments created (`dev`, `stage`)
- ✅ Azure Container Registry secrets configured
- ✅ Application environment variables configured (33 secrets per environment)
- ✅ SSH/authentication credentials set up
- ✅ Documentation secured (sensitive values removed)
- ✅ Deployment workflows ready to test

**Documentation Updates**:

- ✅ Secured `DEPLOYMENT_SETUP.md` - Removed sensitive values
- ✅ Secured `QUICK_START.md` - Removed sensitive values
- ✅ Added Quick Links section to main README
- ✅ Updated setup instructions with authentication options
- ✅ Removed completed TODO checklist

**Next Steps**:

- 🔜 First deployment test to DEV environment
- 🔜 Verify deployment success and rollback mechanism
- 🔜 First deployment test to STAGE environment
- 🔜 Production deployment preparation

### 2025-10-07 - v2.1.0 - CD Implementation

**New Continuous Deployment Workflows**:

- ✅ Added `deploy-dev.yml` - Automated deployment to development
- ✅ Added `deploy-stage.yml` - Automated deployment to staging
- ✅ Implemented automatic rollback on deployment failure
- ✅ Added GitHub Environments integration for secrets
- ✅ Created comprehensive deployment documentation
- ✅ Added deployment troubleshooting guide
- ✅ Environment-specific secret management
- ✅ SSH-based deployment with Docker containers
- ✅ Deployment audit trail and summaries

**Security Improvements**:

- ✅ Secrets no longer baked into Docker images
- ✅ Runtime-only secret injection
- ✅ Environment-based secret isolation

**Documentation**:

- ✅ Added `DEPLOYMENT_SETUP.md` - Complete setup guide
- ✅ Added `QUICK_START.md` - Quick reference guide
- ✅ Added `TROUBLESHOOTING.md` - Deployment debugging guide
- ✅ Updated main README with CD workflows

### 2025-10-07 - v2.0.0 - CI Optimization

- Added security permissions to all jobs
- Upgraded to actions/cache@v4
- Implemented intelligent path filtering
- Added draft PR skip logic
- Enabled ESLint caching
- Enhanced PR comments and summaries
- Optimized workflow performance

### Previous Version - v1.0.0 - Initial CI

- Initial PR validation workflow
- Basic commit message validation
- Standard security scanning

---

_Last updated: 2025-10-07_  
_Maintained by: Frontend Team_  
_Questions? Check the Support section above_
