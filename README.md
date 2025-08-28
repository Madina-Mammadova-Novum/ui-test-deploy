# ShipLink Frontend

A Next.js-based maritime B2B platform for vessel chartering, cargo management, and deal negotiation.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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
