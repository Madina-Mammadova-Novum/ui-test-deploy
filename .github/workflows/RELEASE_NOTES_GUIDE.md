# 📦 Automated Release Notes & GitHub Releases

This guide explains the automated release notes generation system for ShipLink Frontend production deployments.

---

## 🎯 Overview

Every successful production deployment now automatically creates a **GitHub Release** with:

- ✅ **Version Tag** (format: `v2025.10.23.1054-f9b4949`)
- ✅ **What's Changed** section with grouped commits
- ✅ **Full Changelog** comparison link
- ✅ **Contributors** list
- ✅ **Deployment metadata**

This matches the backend team's release format exactly.

---

## 🏷️ Tag Format

Tags follow this format: `v{YYYY}.{MM}.{DD}.{HHMM}-{SHA8}`

**Example:** `v2025.10.23.1054-f9b4949`

**Components:**

- `v` - Version prefix
- `2025.10.23` - Deployment date (YYYY.MM.DD)
- `1054` - Deployment time (HHMM) in UTC
- `f9b4949` - Short commit SHA (8 characters)

---

## 📋 Release Notes Structure

### Example Release Notes

```markdown
## What's Changed

### ✨ Features

- **vessel**: Add new vessel search filters by @username in #125
- **cargo**: Implement cargo type filtering by @username in #126

### 🐛 Bug Fixes

- **countdown**: Pause countdown timers for running assigned tasks when a deal is frozen by @username in #617
- **api**: Refactor CalculateAsync method to improve step execution logic by @username in #614

### ♻️ Refactoring & Performance

- **store**: Optimize Redux selector performance by @username in #130

### 📚 Documentation

- **api**: Update API documentation for new endpoints by @username in #128

### 🎨 Styling

- **ui**: Update button hover states by @username in #129

### 🧪 Testing

- **components**: Add unit tests for vessel components by @username in #131

### 🔧 Chores & CI

- **ci**: Update deployment workflow by @username in #132

**Full Changelog**: https://github.com/org/repo/compare/v2025.10.22.1530-abc1234...v2025.10.23.1054-f9b4949

## Contributors

- @username1
- @username2
- @username3

---

## 🚀 Deployment Information

- **Release Version**: `20251023-1`
- **Image Tag**: `f9b4949`
- **Deployed**: 2025-10-23 10:54:00 UTC
- **Source Branch**: `release/20251023-1`
```

---

## 🔄 How It Works

### Workflow Sequence

```
1. PR Merged to main (from release/*)
   ↓
2. validate → build → request-approval
   ↓
3. Manual Approval (add deploy-approved label)
   ↓
4. deploy → health-checks ✅
   ↓
5. create-release (NEW!)
   ├─ Generate tag name
   ├─ Parse commits
   ├─ Group by type
   ├─ Create Git tag
   └─ Create GitHub Release
   ↓
6. update-issue (with release link)
```

### Commit Parsing Logic

The system uses **Conventional Commits** to group changes:

| Commit Type               | Section                   | Icon |
| ------------------------- | ------------------------- | ---- |
| `feat:`                   | Features                  | ✨   |
| `fix:`                    | Bug Fixes                 | 🐛   |
| `refactor:`, `perf:`      | Refactoring & Performance | ♻️   |
| `docs:`                   | Documentation             | 📚   |
| `style:`                  | Styling                   | 🎨   |
| `test:`                   | Testing                   | 🧪   |
| `chore:`, `ci:`, `build:` | Chores & CI               | 🔧   |
| Others                    | Other Changes             | 📦   |

### Commit Format Examples

**Good commit messages (will be grouped):**

```
feat(vessel): Add vessel search filters
fix(countdown): Pause timers when deal is frozen
docs(api): Update endpoint documentation
refactor(store): Optimize Redux selectors
style(ui): Update button hover states
test(components): Add vessel component tests
chore(ci): Update deployment workflow
```

**Without scope (still grouped):**

```
feat: Add new feature
fix: Fix critical bug
docs: Update documentation
```

**Without conventional prefix (goes to "Other Changes"):**

```
Update README
Fix typo in component
```

### PR Number Extraction

The system automatically extracts PR numbers from commit messages:

- Pattern: `#123` anywhere in commit message
- Creates link: `in #123`
- Links to: `https://github.com/org/repo/pull/123`

---

## 🎯 When Releases Are Created

Releases are created **ONLY** for:

✅ **Production deployments** (not staging)  
✅ **After health checks pass** (confirmed working)  
✅ **From release branches** (`release/yyyymmdd-count`)  
✅ **From hotfix branches** (`hotfix/*`)

Releases are **NOT** created for:

❌ Staging deployments  
❌ Development deployments  
❌ Failed deployments  
❌ Deployments that didn't pass health checks

---

## 📁 Files Structure

```
.github/
├── actions/
│   └── generate-release-notes/
│       └── action.yml              # Release notes generator
└── workflows/
    └── approve-deploy-prod.yml     # Modified: includes create-release job
```

---

## 🔧 Configuration

### Required Permissions

The workflow needs these permissions:

```yaml
permissions:
  contents: write # For creating tags and releases
  issues: write # For updating approval issues
```

### Job Configuration

```yaml
create-release:
  name: Create GitHub Release
  needs: [gate, deploy]
  if: needs.deploy.result == 'success' # Only if deployment succeeded
  runs-on: ubuntu-latest
  timeout-minutes: 5
```

---

## 🧪 Testing the Release System

### Test Scenario 1: Normal Release

1. Create release branch: `release/20251024-1`
2. Merge to `main`
3. Add `deploy-approved` label to approval issue
4. Wait for deployment + health checks to pass
5. **Verify**: GitHub Release created with tag `v2025.10.24.HHMM-SHA`

### Test Scenario 2: Hotfix Release

1. Create hotfix branch: `hotfix/critical-security-fix`
2. Merge to `main`
3. Add `deploy-approved` label
4. Wait for deployment + health checks
5. **Verify**: Release created with tag `v2025.10.24.HHMM-SHA`

### Test Scenario 3: Failed Deployment

1. Start deployment process
2. Deployment fails or health checks fail
3. **Verify**: NO release is created (correct behavior)

---

## 📊 Release Information in Approval Issue

After successful deployment, the approval issue is updated with release details:

```markdown
✅ **Deployment SUCCESSFUL**

- Environment: `prod`
- Image Tag: `f9b4949`
- Release Version: `20251023-1`
- Result: SUCCESSFUL

### 📦 GitHub Release Created

- **Tag**: `v2025.10.23.1054-f9b4949`
- **Release**: https://github.com/org/repo/releases/tag/v2025.10.23.1054-f9b4949

[View deployment details](...)
```

---

## 🔍 Troubleshooting

### Issue: No release created after successful deployment

**Check:**

1. Did deployment succeed including health checks?
2. Does workflow have `contents: write` permission?
3. Check workflow logs for errors in `create-release` job

### Issue: Tag already exists

**Problem:** Tag name collision (rare, timestamp-based)

**Solution:**

- Delete existing tag: `git push origin :refs/tags/v2025.10.23.1054-f9b4949`
- Re-run workflow

### Issue: Commits not grouped correctly

**Problem:** Commits don't follow conventional commit format

**Solution:**

- Use conventional commit prefixes: `feat:`, `fix:`, etc.
- Commits without prefixes go to "Other Changes" section

### Issue: Contributors not showing usernames

**Problem:** Git commits use non-GitHub email addresses

**Solution:**

- Contributors with GitHub emails (`@users.noreply.github.com`) show as `@username`
- Others show as full name from Git commit

### Issue: PR links not working

**Problem:** Commit message doesn't contain PR number

**Solution:**

- Include PR number in commit message: `fix: Description (#123)`
- GitHub merge commits automatically include PR numbers

---

## 🎓 Best Practices

### Writing Good Commit Messages

**✅ DO:**

```
feat(vessel): Add advanced search filters (#125)
fix(countdown): Prevent timer race condition (#617)
docs(api): Update vessel endpoints documentation
refactor(store): Optimize negotiating selector performance
```

**❌ DON'T:**

```
updates
fixed bug
wip
merge main
```

### Creating Meaningful Releases

1. **Group related features** in release branches
2. **Use conventional commits** for automatic categorization
3. **Include PR numbers** for traceability
4. **Test thoroughly** before merging to main
5. **Review changelog** in GitHub Release after creation

---

## 📖 Additional Resources

- **Conventional Commits**: https://www.conventionalcommits.org/
- **GitHub Releases API**: https://docs.github.com/en/rest/releases
- **Release Process**: See [RELEASE_PROCESS.md](./RELEASE_PROCESS.md)
- **Deployment Setup**: See [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)

---

## 🚀 Future Enhancements

Potential improvements for the future:

- [ ] **Breaking changes detection** - Highlight breaking changes
- [ ] **Semantic versioning** - Automatic version bumping
- [ ] **Release notes templates** - Customizable templates
- [ ] **Slack notifications** - Post release to Slack
- [ ] **Asset uploads** - Attach build artifacts to releases
- [ ] **Release drafts** - Create draft for review before publishing

---

## 🤝 Contributing

When making changes to the release system:

1. Test in staging first (if applicable)
2. Update this documentation
3. Notify team in deployment channel
4. Monitor first production release

---

**Version:** 1.0  
**Last Updated:** October 2025  
**Maintained By:** DevOps & Frontend Team

**Status:** ✅ Production Ready
