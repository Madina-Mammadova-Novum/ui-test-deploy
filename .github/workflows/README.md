# CI/CD Workflows for ShipLink Frontend

This directory contains GitHub Actions workflows for automated code quality checks and validation on pull requests.

## Available Workflows

### 1. PR Validation (`pr-validation.yml`)

**Comprehensive workflow** - Complete code quality, security, and performance validation.

**Triggers**: All PRs to any branch
**Checks**:

- ✅ ESLint code quality
- ✅ Prettier formatting
- ✅ Project build
- ✅ TypeScript type checking
- 🔒 Security vulnerability scanning
- 📊 Performance monitoring
- 🧪 Test execution (if available)
- 📦 Bundle size analysis
- 💬 Automated PR comments with results

### 3. Commit Message Validation (`commit-validation.yml`)

**Commit linting** - Ensures conventional commit messages.

**Triggers**: All PRs to any branch
**Checks**:

- ✅ Commit message format validation using commitlint
- 📝 Conventional commit standards

## Setup Instructions

### 1. Workflow Setup

The `pr-validation.yml` workflow is ready to use as-is. It provides comprehensive validation for all pull requests.

### 2. Configure Branch Protection Rules

Go to your repository settings:

1. **Settings** → **Branches** → **Add rule**
2. **Branch name pattern**: `main` (or your default branch)
3. **Require status checks to pass**:
   - `validate`
   - `security-scan`
   - `performance-check`
4. **Require branches to be up to date**
5. **Required approvals**: Set as needed (recommended: 1)
6. **Restrict pushes that create matching branches**

### 3. Required Secrets

Add these optional secrets in repository settings if you want to use the corresponding features:

- `YARN_TOKEN` (optional): For publishing packages
- `SONAR_TOKEN` (optional): For SonarQube integration

## Workflow Features

### Caching

- Node.js modules are cached for faster builds
- Next.js build cache is preserved between runs

### Concurrency Control

- Cancels previous runs when new commits are pushed
- Prevents resource waste and queue buildup

### Error Handling

- Clear error messages with fix suggestions
- Automated PR comments on failures
- Continues on non-critical failures

### Performance Optimizations

- Uses latest GitHub Actions versions
- Optimized for Next.js projects
- Minimal timeout configurations

## Customization

### Adding Custom Checks

Edit the workflow files to add your own validation steps:

```yaml
- name: Custom Check
  run: |
    # Your custom validation logic
    yarn custom-script
```

### Modifying Triggers

Change when workflows run by editing the `on` section:

```yaml
on:
  pull_request:
    branches: ['main', 'develop'] # Only specific branches
    types: [opened, synchronize] # Only specific PR events
```

### Environment Variables

Add custom environment variables:

```yaml
env:
  CUSTOM_VAR: 'value'
  NODE_ENV: 'production'
```

## Troubleshooting

### Common Issues

1. **"No package.json found"**

   - Ensure you're running from the correct directory
   - Check that all files are committed

2. **"ESLint not found"**

   - Verify ESLint is in your `devDependencies`
   - Check that `yarn install` completed successfully

3. **Build failures**
   - Check your `next.config.js` configuration
   - Verify environment variables are set
   - Check for missing dependencies

### Debug Mode

Enable debug logging by adding this secret:

- Name: `ACTIONS_RUNNER_DEBUG`
- Value: `true`

## Performance Tips

1. **Use frozen lockfile**: Prevents dependency version drift
2. **Cache dependencies**: Reduces installation time
3. **Parallel jobs**: Run independent checks in parallel
4. **Fail fast**: Stop on critical errors to save time

## Integration with Azure Pipelines

Your project uses Azure Pipelines for builds. These GitHub Actions workflows complement rather than replace your Azure setup:

- **GitHub Actions**: PR validation and code quality
- **Azure Pipelines**: Production builds and deployments

This separation provides faster feedback on PRs while keeping production deployments in Azure.

## Support

For issues with these workflows:

1. Check the Actions tab in your repository
2. Review the workflow logs
3. Verify your project configuration matches the workflow assumptions

## Future Enhancements

Consider adding:

- [ ] Test coverage reporting
- [ ] Performance regression detection
- [ ] Automated dependency updates
- [ ] Security scanning with Snyk/Trivy
- [ ] Accessibility testing
- [ ] Visual regression testing
