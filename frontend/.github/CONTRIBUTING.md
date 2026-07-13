# Contributing to Angular Contact Manager

Thanks for taking the time to contribute!

## Setup

```bash
git clone https://github.com/Mostafa-SAID7/angularContact.git
cd angularContact
npm install
npm start
```

## Workflow

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature` or `fix/your-fix`
3. Make your changes
4. Run tests: `npm test`
5. Commit using [Conventional Commits](https://www.conventionalcommits.org):
   - `feat: add contact edit modal`
   - `fix: phone validation pattern`
   - `chore: update dependencies`
6. Push and open a Pull Request against `master`

## Code Style

- Follow the existing Angular patterns (standalone components, signals, reactive forms)
- All UI text must go through `ngx-translate` — no hardcoded strings in templates
- New languages: add a JSON file in `public/assets/i18n/` and a button in `app.html`
- Run `npx prettier --write .` before committing

## Reporting Issues

Use the issue templates — they make it faster to triage and fix problems.
