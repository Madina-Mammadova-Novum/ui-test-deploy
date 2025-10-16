# ShipLink Frontend

A Next.js-based maritime B2B platform for vessel chartering, cargo management, and deal negotiation.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Tech Stack Versions

- **Node.js**: 22.x (>=22.0.0)
- **Next.js**: 15.5.3
- **React**: 19.1.1
- **Package Manager**: Yarn (exclusively)

## Getting Started

First, init your Node version to version for the project:

```bash
nvm use
```

Second, create an .env file by copying .env.example:

```bash
cp .env.example .env
```

**Attention: we work only with `yarn`**\
Thirdly. Install dependencies

```bash
yarn
# or
yarn install
```

And finally, we launch the project.

```bash
yarn develop
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Common password validation

```javascript
`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]\\|;:'",.<>/?-]).{8,}$`;
```

Let's break it down:

`^`: start of string anchor\
`(?=.*[a-z])`: positive lookahead for at least one lowercase letter\
`(?=.*[A-Z])`: positive lookahead for at least one uppercase letter\
`(?=.*\d)`: positive lookahead for at least one digit\
`(?=.*[!@#$%^&*()_+={}[\]\\|;:'",.<>/?-])`: positive lookahead for at least one special symbol\
`.{8,}`: match any character (except newline) at least 8 times\
`$`: end of string anchor\

This regular expression uses positive lookaheads to assert that each of the requirements is present in the string, and then matches any character (except newline) at least 8 times. The special symbols in the positive lookahead can be modified to include other symbols if desired.

## Icons Usage

To add a new icon:

1. Add svg icon to the `assets/images` (in the wrapper 24x24px - as in the design)
2. Name the file as it is named in design, with camelCase (minus-circle-alt => minusCircleAlt)
3. Change fill to `"current"` in this file to make it possible reusability of this icon with different colours.

To use icon:

1. Import it as `FileNameSVG` (MinusCircleAltSVG)
2. Determine color by adding classname (`fill-white`)
3. Default size is 24x24px. If you need another size (16x16px)- add classnames (`w-4 h-4`) and add `viewBox="0 0 24 24"`

## CI/CD Workflows

This project uses GitHub Actions for automated code quality checks and validation on pull requests.

### Available Workflows

#### 1. PR Validation (`pr-validation.yml`)

**Comprehensive workflow** - Complete code quality, security, and performance validation.

**Triggers**: All PRs to any branch
**Checks**:

- ✅ ESLint code quality
- ✅ Prettier formatting
- ✅ Project build (with CI environment variables)
- 🔒 Security vulnerability scanning
- 📊 Performance monitoring
- 🧪 Test execution (if available)
- 📦 Bundle size analysis
- 💬 Automated PR comments with results

#### 2. Commit Message Validation (`commit-validation.yml`)

**Commit linting** - Ensures conventional commit messages.

**Triggers**: All PRs to `develop` branch
**Checks**:

- ✅ Commit message format validation using commitlint
- 📝 Conventional commit standards

### Setup Instructions

#### 1. Workflow Setup

The workflows are ready to use as-is. They provide comprehensive validation for all pull requests.

#### 2. Required Secrets (Optional)

Add these optional secrets in repository settings if you want to use specific features:

- `YARN_TOKEN` (optional): For publishing packages
- `SONAR_TOKEN` (optional): For SonarQube integration

### Workflow Features

- **Caching**: Node.js modules and Next.js build cache for faster builds
- **Concurrency Control**: Cancels previous runs when new commits are pushed
- **Environment Variables**: Automatically creates `.env.local` with dummy values for CI builds
- **Error Handling**: Clear error messages with fix suggestions and automated PR comments

### Integration with Azure Pipelines

Your project uses Azure Pipelines for builds. These GitHub Actions workflows complement rather than replace your Azure setup:

- **GitHub Actions**: PR validation and code quality
- **Azure Pipelines**: Production builds and deployments

This separation provides faster feedback on PRs while keeping production deployments in Azure.

## Deployment Workflows

This project uses GitHub Actions for automated deployment to multiple environments using Docker containers.

### Available Deployment Workflows

#### 1. Deploy to Development (`deploy-dev.yml`)

**Automatic deployment** - Deploys to DEV environment when code is merged to `develop` branch.

**Triggers**:

- Push to `develop` branch (with application code changes)
- Manual dispatch from GitHub Actions UI

**Environment**: `dev`
**Docker Tag**: `dev-latest`

#### 2. Deploy to Staging (`deploy-stage.yml`)

**Automatic deployment** - Deploys to STAGE environment when code is merged to `stage` branch.

**Triggers**:

- Push to `stage` branch (with application code changes)
- Manual dispatch from GitHub Actions UI

**Environment**: `stage`
**Docker Tag**: `stage-latest`

#### 3. Reusable Deployment Workflow (`deploy-reusable.yml`)

**Shared deployment logic** - Contains all deployment steps used by environment-specific workflows.

**Features**:

- Docker image building with environment variables
- Push to Azure Container Registry (ACR)
- SSH-based deployment to remote servers
- Automatic rollback on deployment failures
- Production health checks (prod only)
- Deployment summaries with status and URLs

### Deployment Flow

1. **Build**: Creates Docker image with commit SHA tag
2. **Push**: Uploads image to Azure Container Registry
3. **Deploy**: SSHs to target server and deploys container
4. **Verify**: Checks container health (30s startup wait)
5. **Rollback**: Automatic rollback if deployment fails
6. **Health Check**: Production-only comprehensive health checks (with automatic rollback if failed)

### Required Secrets

All secrets must be configured in **GitHub Environments** (Settings → Environments → [environment]):

#### Azure Container Registry Secrets

- `ACR_REGISTRY_URL` - Azure Container Registry URL (e.g., `myregistry.azurecr.io`)
- `ACR_USERNAME` - ACR username
- `ACR_PASSWORD` - ACR password

#### SSH Connection Secrets

- `SSH_HOST` - Target server hostname or IP
- `SSH_USERNAME` - SSH username
- `SSH_PASSWORD` - SSH password (for password authentication)
- `SSH_PRIVATE_KEY` - SSH private key (for key-based authentication)
- `SSH_PORT` - SSH port (optional, defaults to 22)

> **Note**: Use either `SSH_PASSWORD` or `SSH_PRIVATE_KEY` for authentication, not both.

#### Application Secrets

- `NEXTAUTH_SECRET` - NextAuth authentication secret
- `NEXT_PUBLIC_URL` - Public application URL (also used for deployment summary)
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXTAUTH_URL` - NextAuth callback URL
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - reCAPTCHA site key
- `RECAPTCHA_SECRET_KEY` - reCAPTCHA secret key
- `NEXT_PUBLIC_SEAMETRIX_KEY` - Seametrix API key
- `NEXT_PUBLIC_SEAMETRIX_MAP_KEY` - Seametrix map key
- `SEAMETRIX_MAP_KEY` - Server-side Seametrix map key
- `NEXT_PUBLIC_SEAMETRIX_API_URL` - Seametrix API URL
- `SEAMETRIX_API_URL` - Server-side Seametrix API URL
- `NEXT_PUBLIC_STRAPI_API_URL` - Strapi CMS API URL
- `NEXT_PUBLIC_RT_URL` - Real-time service URL
- `NEXT_PUBLIC_FILE_API_URL` - File service URL
- `BACKEND_API_URL` - Server-side backend API URL
- `IDENTITY_API_URL` - Identity service URL
- `IDENTITY_API_CLIENT_ID` - Identity API client ID
- `IDENTITY_API_CLIENT_SECRET` - Identity API client secret
- `IDENTITY_API_GRANT_TYPE` - Identity API grant type
- `IDENTITY_TOKEN_GRANT_TYPE` - Identity token grant type
- `PREVIEW_SECRET` - Content preview secret
- `APP_ENV` - Application environment identifier
- `NEXT_PUBLIC_APP_ENV` - Public application environment identifier
- `NEXT_PUBLIC_MAINTENANCE_MODE` - Maintenance mode flag
- `NEXT_PUBLIC_BETA_MODE` - Beta mode flag
- `NEXT_PUBLIC_ENABLE_MATOMO` - Analytics enablement flag
- `NEXT_PUBLIC_ADMIN_URL` - Admin panel URL

#### Monitoring Secrets (Optional)

- `IDENTITY_NEW_RELIC_APP_NAME` - New Relic application name
- `IDENTITY_NEW_RELIC_LICENSE_KEY` - New Relic license key
- `OTEL_EXPORTER_OTLP_ENDPOINT` - OpenTelemetry endpoint
- `OTEL_METRIC_EXPORTER_OTLP_ENDPOINT` - OpenTelemetry metrics endpoint
- `NEXT_PUBLIC_NEW_RELIC_BROWSER_LICENSE_KEY` - New Relic browser license key
- `NEXT_PUBLIC_NEW_RELIC_BROWSER_APP_ID` - New Relic browser app ID
- `NEXT_PUBLIC_NEW_RELIC_BROWSER_AGENT_ID` - New Relic browser agent ID
- `NEXT_PUBLIC_NEW_RELIC_BROWSER_TRUST_KEY` - New Relic browser trust key
- `NEXT_PUBLIC_NEW_RELIC_BROWSER_ACCOUNT_ID` - New Relic browser account ID

### Optional Variables

For environment-specific display URLs in deployment summaries, you can set up GitHub Variables:

**Variables** (Settings → Secrets and variables → Actions → Variables tab):

- `DEV_APP_URL` - Development environment URL (e.g., `https://dev.shiplink.com`)
- `STAGE_APP_URL` - Staging environment URL (e.g., `https://stage.shiplink.com`)
- `PROD_APP_URL` - Production environment URL (e.g., `https://shiplink.com`)

> **Note**: If these variables are not set, the workflow will automatically use the `NEXT_PUBLIC_URL` secret as a fallback.

### Deployment Features

#### Automatic Rollback

- If deployment fails, the previous version is automatically restored
- Rollback happens in two scenarios:
  1. Container fails to start within 30 seconds
  2. Production health checks fail (prod only)

#### Health Checks (Production Only)

- Runs after successful deployment to production
- Tests critical endpoints:
  - Home page
  - API health endpoint
  - Identity/authentication service
  - Protected API endpoints
- Automatic rollback if any check fails
- Can be skipped for emergency deployments (not recommended)

#### Deployment Summaries

- Detailed deployment reports in GitHub Actions UI
- Shows:
  - Environment name
  - Image tag (commit SHA)
  - Deployment timestamp
  - Deployed by user
  - Application URL
  - Success/failure status
  - Link to workflow run

#### Concurrency Control

- Only one deployment per environment at a time
- Prevents race conditions
- Does not cancel in-progress deployments

### Manual Deployment

To manually trigger a deployment:

1. Go to **Actions** tab in GitHub repository
2. Select the appropriate workflow:
   - `Deploy to Development`
   - `Deploy to Staging`
3. Click **Run workflow**
4. Select the branch to deploy
5. Optionally provide a reason for deployment
6. Click **Run workflow** button

### Environment Setup Checklist

Before deploying to a new environment:

- [ ] Create GitHub Environment (Settings → Environments → New environment)
- [ ] Configure all required secrets in the environment
- [ ] Set up Azure Container Registry
- [ ] Configure target server with Docker installed
- [ ] Set up SSH access (password or key-based)
- [ ] Ensure port 3000 is available on the target server
- [ ] Test SSH connection manually
- [ ] Optionally configure GitHub Variables for custom URLs
- [ ] Run a test deployment

### Troubleshooting

#### Deployment Fails

1. Check deployment logs in GitHub Actions
2. Verify all secrets are configured correctly
3. Test SSH connection to target server manually
4. Check if Docker is running on target server
5. Verify ACR credentials are valid
6. Check server disk space

#### Container Not Starting

1. Check container logs on the server: `docker logs shiplink-frontend`
2. Verify all required environment variables are set
3. Check if port 3000 is already in use
4. Review Docker image build logs
5. Test the image locally if possible

#### Rollback Issues

1. Verify previous image exists: `docker images | grep shiplink-frontend-previous`
2. Check server logs during rollback attempt
3. Manually start previous version if automatic rollback fails
4. Contact DevOps team for assistance

### Security Notes

- All secrets are passed as environment variables at runtime, not baked into the Docker image
- SSH password is passed via `SSHPASS` environment variable for security
- Container registry credentials are never logged
- GitHub automatically redacts secret values in logs
- Use SSH key authentication when possible for better security

## Branch and Commit Management

This project follows strict conventions for branch naming and commit messages to maintain code quality and enable efficient project tracking.

### Branch Naming Convention

All branches must follow the Git-Flow methodology with specific naming patterns:

#### Primary Branch Types

- **`feature/issue-number/brief-description`** - New features and enhancements
- **`bugfix/issue-number/brief-description`** - Bug fixes and patches
- **`hotfix/issue-number/brief-description`** - Critical production fixes
- **`refactor/issue-number/brief-description`** - Code restructuring and improvements
- **`perf/issue-number/brief-description`** - Performance optimizations

#### Secondary Branch Types

- **`docs/issue-number/brief-description`** - Documentation updates
- **`ci/issue-number/brief-description`** - CI/CD pipeline and automation changes
- **`test/issue-number/brief-description`** - Test additions and test-related changes
- **`chore/issue-number/brief-description`** - Maintenance tasks and dependency updates
- **`style/issue-number/brief-description`** - Code style and formatting changes

#### Environment Branches

- **`main`** - Production-ready code
- **`develop`** - Development integration branch
- **`stage`** - Staging environment branch

#### Branch Naming Rules

- Use **kebab-case** (lowercase with hyphens)
- Include **issue number** from the project management system
- Keep descriptions **brief and descriptive**
- Maximum length: **60 characters**
- Choose branch type based on the primary change purpose

#### When to Use Each Branch Type

##### 🚀 **feature/** branches

- New functionality implementation
- User-facing enhancements
- API endpoint additions
- UI/UX improvements

##### 🐛 **bugfix/** branches

- Bug fixes and patches
- Error handling improvements
- Data validation fixes
- Component bug resolutions

##### 🔥 **hotfix/** branches

- Critical production issues
- Security vulnerabilities
- Breaking changes in production
- Emergency fixes

##### 🔄 **refactor/** branches

- Code restructuring
- Architecture improvements
- Technical debt reduction
- Code organization changes

##### ⚡ **perf/** branches

- Performance optimizations
- Memory usage improvements
- Load time reductions
- Database query optimizations

##### 📚 **docs/** branches

- Documentation updates
- README modifications
- API documentation
- Code comments

##### 🔧 **ci/** branches

- Build process changes
- Deployment automation
- Testing pipeline updates
- DevOps improvements

##### 🧪 **test/** branches

- Unit test additions
- Integration test development
- Test framework updates
- Test coverage improvements

##### 🧹 **chore/** branches

- Dependency updates
- Configuration changes
- Tool updates
- Maintenance tasks

##### 💅 **style/** branches

- Code formatting
- Linting rule updates
- Style guide compliance
- Cosmetic changes

#### Branch Strategy Guidelines

##### Primary vs Secondary Branches

- **Primary branches** require PR reviews and follow full testing cycles
- **Secondary branches** can often be merged directly to `develop` for smaller changes
- Choose the most specific branch type that describes your main change
- If your change spans multiple types, use the most significant one

##### Branch Lifecycle

1. **Create** branch from `develop` (or `main` for hotfixes)
2. **Develop** and commit following our commit conventions
3. **Test** locally and ensure CI passes
4. **Create PR** with clear description
5. **Code review** and address feedback
6. **Merge** using appropriate strategy (merge, squash, rebase)
7. **Delete** branch after successful merge

#### Examples

```bash
# Primary branches - require full PR process
feature/123-add-user-authentication
bugfix/456-fix-payment-validation
hotfix/789-resolve-security-vulnerability
refactor/321-simplify-user-service
perf/654-optimize-dashboard-loading

# Secondary branches - can be smaller/faster changes
docs/111-update-api-documentation
ci/222-add-deployment-automation
test/333-improve-test-coverage
chore/444-update-dependencies
style/555-fix-eslint-warnings
```

### Commit Message Convention

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification with additional project-specific rules.

#### Commit Message Format

```
<type>[scope]: <description>

[optional body]

[optional footer]
```

#### Allowed Commit Types

- **`build`** - Changes affecting the build system or external dependencies
- **`ci`** - Changes to CI/CD configuration and scripts
- **`docs`** - Documentation updates only
- **`feat`** - New features and enhancements
- **`fix`** - Bug fixes
- **`perf`** - Performance improvements
- **`refactor`** - Code restructuring without functional changes
- **`revert`** - Reverting previous commits
- **`style`** - Code style changes (formatting, etc.)
- **`test`** - Adding or updating tests

#### Commit Message Rules

##### Type Rules

- Must be **2-8 characters** long
- Must be one of the allowed types listed above

##### Scope Rules

- Must be in **kebab-case**
- Must follow pattern: `[task-number]` or `[task]`
- Must NOT follow pattern: `[number-number]` (e.g., `1-1`, `20-1`)
- Maximum length: **19 characters**
- Examples: `user-auth`, `payment-123`, `dashboard`

##### Subject (Description) Rules

- Must be in **lowercase**
- Must start with a **lowercase letter**
- Maximum length: **80 characters**
- Should be concise but descriptive
- Must NOT contain special characters except hyphens and spaces

#### Commit Message Examples

##### ✅ Valid Examples

```bash
feat(user-auth): add login with email verification
fix(payment-123): resolve stripe webhook timeout issue
docs: update api documentation for user endpoints
refactor(dashboard): simplify component structure
test(auth): add unit tests for password validation
```

##### ❌ Invalid Examples

```bash
FEAT: Add login feature                    # Type must be lowercase
feat: Add login feature                    # Missing scope
feat(UserAuth): Add login feature          # Scope must be kebab-case
fix(1-2): Resolve payment issue           # Invalid scope pattern
feat(very-long-scope-name): add feature    # Scope too long
feat: FIX: Resolve critical bug           # Subject must be lowercase
```

### Linking Commits to Work Items

All commits and branches should be linked to work items in the project management system:

#### Linking Methods

1. **Branch Names**: Include issue number in branch name

   ```bash
   feature/ABC-123-add-new-feature
   bugfix/DEF-456-fix-critical-bug
   ```

2. **Commit Messages**: Reference issue numbers in description or footer

   ```bash
   fix(payment): resolve timeout issue

   Closes #DEF-456
   ```

3. **Work Item URLs**: Use the project's work item linking system
   - See [Azure DevOps documentation](https://learn.microsoft.com/en-us/azure/devops/boards/backlogs/add-link) for detailed linking instructions

### Commit Hooks

The project uses Husky git hooks to enforce commit message standards:

- **`pre-commit`**: Runs linting and formatting checks
- **`commit-msg`**: Validates commit message format against commitlint rules

These hooks run automatically and will prevent invalid commits from being created.

### Best Practices

#### Commit Frequency

- Make **small, focused commits** rather than large changes
- Each commit should represent a **single logical change**
- Use `git add -p` for selective staging when needed

#### Pull Request Guidelines

- Create feature branches from `develop`
- Keep PRs **focused** on a single feature or fix
- Use **descriptive PR titles** following commit conventions
- Include testing instructions and relevant context
- Request reviews from appropriate team members

#### Code Review Process

- All PRs require **at least one approval** before merging
- Reviews should focus on **code quality, functionality, and adherence to conventions**
- Address all review comments before merging
- Use **squash merge** for feature branches to maintain clean history
