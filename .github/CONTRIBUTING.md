# Contributing

Thank you for your interest in contributing to Angular Contact Manager! This guide explains how to contribute.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/angularContact.git`
3. Add upstream: `git remote add upstream https://github.com/Mostafa-SAID7/angularContact.git`
4. Create a branch: `git checkout -b feature/my-feature`

## Development Setup

```bash
# Install dependencies
npm install

# Frontend
cd frontend && npm install
npm start

# Backend (in new terminal)
cd backend && npm install
npm start
```

## Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body

footer
```

**Types:**
- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation
- `style` — Formatting (no code change)
- `refactor` — Code restructuring
- `perf` — Performance improvement
- `test` — Adding tests
- `chore` — Maintenance

**Examples:**

```
feat(contacts): add bulk delete functionality

- Users can select multiple contacts
- Delete button becomes active when items selected
- Confirmation modal before deletion

Fixes #42
```

```
fix(auth): prevent token expiry race condition

Token refresh now happens before expiry instead of after.

Closes #89
```

## Pull Request Process

1. **Update from upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push to your fork**
   ```bash
   git push -u origin feature/my-feature
   ```

3. **Create PR** on GitHub with:
   - Descriptive title
   - Problem statement
   - Solution explanation
   - Testing notes
   - Screenshots (if UI change)

4. **Address review comments** — Update code if requested

5. **Squash commits** before merging (if requested)

## Code Standards

### TypeScript/Angular

- Follow Angular style guide
- Use `const` over `let` over `var`
- Use type annotations everywhere
- Use `input()` and `output()` over @Input/@Output
- Keep components under 150 lines

**ESLint:**
```bash
npm run lint
npm run lint -- --fix
```

### Git

- One feature per branch
- Descriptive commit messages
- No merge commits (use rebase)
- Force push only your own branches

### Testing

- Add tests for new features
- Run `npm test` before submitting PR
- Aim for >80% coverage

### Documentation

- Update README.md if needed
- Add JSDoc comments for complex functions
- Update docs/ if architecture changes

## Code Review Guidelines

**What reviewers look for:**

- ✅ Follows commit conventions
- ✅ Tests included and passing
- ✅ No console.error/warnings
- ✅ Performance implications considered
- ✅ Accessibility maintained
- ✅ Documentation updated
- ✅ No breaking changes (or documented)

**Feedback types:**

- 🟢 **MUST** — Fix before merge
- 🟡 **SHOULD** — Strongly recommended
- 🔵 **COULD** — Nice to have
- ⚪ **INFO** — FYI

## Branch Naming

```
feature/add-export-button
fix/login-race-condition
docs/update-api-docs
refactor/simplify-state-management
```

## Testing

### Frontend

```bash
cd frontend

# Run tests
npm test

# Run once (CI mode)
ng test --watch=false

# Coverage report
ng test --code-coverage
```

### Backend

```bash
cd backend

# Run tests (if configured)
npm test

# Test specific endpoint
curl -X GET http://localhost:5001/api/Contacts
```

## File Structure

**Adding new component:**

```
src/app/components/my-component/
├── my-component.ts
├── my-component.html
├── my-component.css
└── my-component.spec.ts (tests)
```

**Adding new service:**

```
src/app/services/
├── my-service.ts
└── my-service.spec.ts
```

## Common Issues

### "npm install" fails

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

```bash
# Generate missing types
ng generate interface path/to/model

# Check types
npx tsc --noEmit
```

### Port already in use

```bash
# Kill process
lsof -ti:5001 | xargs kill -9
lsof -ti:9887 | xargs kill -9
```

## Getting Help

- **Questions** → [GitHub Discussions](https://github.com/Mostafa-SAID7/angularContact/discussions)
- **Bugs** → [GitHub Issues](https://github.com/Mostafa-SAID7/angularContact/issues)
- **Security** → Email security@example.com

## Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

---

Thanks for contributing! 🙏
