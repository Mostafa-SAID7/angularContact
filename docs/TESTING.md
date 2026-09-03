# Testing Guide

Complete guide to testing the Angular Contact Manager.

## Frontend Testing

### Run Unit Tests

```bash
cd frontend
npm test
```

This opens Karma test runner in watch mode. Tests auto-run on file changes.

### Run Tests Once (CI Mode)

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

### Test Coverage

```bash
npm test -- --code-coverage --watch=false
```

Coverage report: `frontend/coverage/index.html`

### E2E Testing (Future)

```bash
npm install -E @angular/cli@latest @angular/cdk
ng e2e
```

---

## Backend Testing

Currently, backend tests are minimal. To add tests:

```bash
npm install --save-dev jest @types/jest ts-jest
```

Create `jest.config.js`:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts']
};
```

Run tests:

```bash
npm test
```

---

## Manual Testing Checklist

### Functionality

- [ ] Create contact with all fields
- [ ] Create contact with only required fields
- [ ] View contact details
- [ ] Delete contact with confirmation
- [ ] Search by name
- [ ] Search by email
- [ ] Search by phone
- [ ] Sort by name ascending
- [ ] Sort by name descending
- [ ] Sort by email ascending
- [ ] Sort by email descending
- [ ] Sort by phone ascending
- [ ] Sort by phone descending
- [ ] Change items per page (5, 10, 20)
- [ ] Navigate between pages
- [ ] Pagination prev/next buttons
- [ ] Pagination first/last buttons

### UI/UX

- [ ] Dark mode toggle works
- [ ] Dark mode persists on reload
- [ ] Language toggle works (EN, AR, ES)
- [ ] Language persists on reload
- [ ] Arabic shows RTL correctly
- [ ] Spanish shows LTR correctly
- [ ] All text is translated in all languages
- [ ] Loading skeletons show
- [ ] Error messages display
- [ ] Success messages display
- [ ] Toast notifications appear
- [ ] Modals display correctly

### Forms

- [ ] Name field required
- [ ] Phone field required
- [ ] Email validation works
- [ ] Phone E.164 validation works
- [ ] Form clears after submit
- [ ] Validation errors show
- [ ] Active checkbox works

### Responsive Design

- [ ] Mobile view (320px)
- [ ] Tablet view (768px)
- [ ] Desktop view (1024px)
- [ ] Layout adjusts properly
- [ ] Touch interactions work
- [ ] Scrolling works

### Performance

- [ ] Page loads quickly
- [ ] Search is responsive
- [ ] Sorting is instant
- [ ] No layout shift
- [ ] Images optimized
- [ ] Bundle size reasonable

### Accessibility

- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Focus states visible
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] ARIA labels present

### Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### API Integration

- [ ] Fetch contacts on load
- [ ] Create contact saves to DB
- [ ] Delete contact removes from DB
- [ ] API errors handled
- [ ] Network timeout handled
- [ ] Validation errors from API shown

---

## Test Data

### Sample Contacts

```json
{
  "name": "Ahmed Hassan",
  "email": "ahmed@example.com",
  "phone": "+201001234567",
  "isActive": true
}
```

### Test Scenarios

1. **Empty state** — No contacts in database
2. **Single contact** — One contact only
3. **Multiple contacts** — 20+ contacts
4. **Search results** — Filter returns 0, 1, many
5. **Validation errors** — Submit invalid data
6. **Network errors** — Simulate API failure

---

## CI/CD Pipeline Tests

### GitHub Actions

Tests run automatically on:
- Push to `main` branch
- Push to `develop` branch
- Pull requests to `main` or `develop`

Workflow: `.github/workflows/ci.yml`

Tests must pass before merging PR.

---

## Performance Testing

### Lighthouse Audit

```bash
# Google Chrome DevTools
# Right-click > Inspect > Lighthouse
```

Target scores:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### Bundle Analysis

```bash
npm run build -- --stats-json
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/angularContact/stats.json
```

---

## Security Testing

### NPM Audit

```bash
npm audit
npm audit --fix
```

### OWASP Top 10

- [ ] Injection prevention
- [ ] Broken authentication (N/A)
- [ ] Sensitive data exposure (HTTPS)
- [ ] XML external entity (N/A)
- [ ] Broken access control (N/A)
- [ ] Security misconfiguration
- [ ] XSS prevention
- [ ] Insecure deserialization (N/A)
- [ ] Using components with known vulnerabilities
- [ ] Insufficient logging & monitoring

---

## Load Testing

### Using Apache Bench

```bash
ab -n 1000 -c 10 http://localhost:5001/api/Contacts
```

### Using Wrk

```bash
wrk -t4 -c100 -d30s http://localhost:5001/api/Contacts
```

### Results to Monitor

- Response time (< 100ms)
- Requests/second
- Error rate (< 1%)
- Throughput

---

## Test Reports

Generate test report:

```bash
npm test -- --reporters=junit
```

Report location: `junit.xml`

---

## Continuous Monitoring

For production error tracking (Sentry) and performance monitoring, see [DEPLOYMENT.md](./DEPLOYMENT.md#monitoring--logging).

---

## Troubleshooting Tests

### Tests not running

```bash
npm install --legacy-peer-deps
npm test
```

### Chrome not found

Install Chrome or use headless:

```bash
npm test -- --browsers=ChromeHeadless
```

### Tests timeout

Increase timeout in `karma.conf.js`:

```javascript
browserNoActivityTimeout: 30000
```

---

For questions and support, see [../.github/SUPPORT.md](../.github/SUPPORT.md).
