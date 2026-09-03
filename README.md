<div align="center">

<img src="https://angular.io/assets/images/logos/angular/angular.svg" width="80" alt="Angular Logo" />

# Angular Contact Manager

A modern, fully responsive contact management SPA built with **Angular 20**, **Tailwind CSS**, and **ngx-translate** — featuring dark mode, multi-language support (EN / AR / ES), real-time search, sorting, pagination, and full CRUD operations against a REST API.

[![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE.txt)

</div>

---

## Features

- **CRUD** — Add, view, and delete contacts via REST API
- **Real-time search** — Filter across name, email, and phone simultaneously
- **Sorting** — Sort by name, email, or phone (ascending / descending)
- **Pagination** — Configurable page size (5 / 10 / 20 per page)
- **Dark mode** — Toggle with persistent `localStorage` state
- **i18n** — Full English, Arabic (RTL), and Spanish translations via `ngx-translate`
- **RTL support** — Automatic `dir` and `lang` attribute switching for Arabic
- **Form validation** — Reactive forms with inline error messages (required, email, phone E.164, min-length)
- **Loading skeletons** — Skeleton placeholders while data loads
- **Accessible** — `aria-pressed`, `aria-invalid`, `aria-current`, `aria-live` throughout

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 20 (standalone components) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS 3.4 |
| i18n | @ngx-translate/core 17 + http-loader 17 |
| Reactive state | Angular Signals |
| HTTP | Angular HttpClient |
| Forms | Angular Reactive Forms |
| Testing | Karma + Jasmine |
| Build | Angular CLI 20 / @angular/build |

---

## Prerequisites

| Tool | Required Version |
|---|---|
| Node.js | `^20.19.0` or `^22.12.0` or `>=24.0.0` |
| npm | `>=8.0.0` |
| Angular CLI | `>=20.0.0` (optional, global) |
| Backend API | Running at `https://localhost:5001` |

> The app consumes a REST API at `https://localhost:5001/api/Contacts`.  
> You need to have the backend running locally before using the app.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Mostafa-SAID7/angularContact.git
cd angularContact
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

Open your browser at **[http://127.0.0.1:9887](http://127.0.0.1:9887)**

The server hot-reloads on every file change.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start dev server at `http://127.0.0.1:9887` |
| `npm run build` | Production build into `dist/` |
| `npm run watch` | Build in watch mode (development) |
| `npm test` | Run unit tests with Karma |
| `ng generate component <name>` | Scaffold a new component |

---

## Project Structure

```
angularContact/
├── public/
│   ├── favicon.ico
│   └── assets/
│       └── i18n/
│           ├── en.json          # English translations
│           ├── ar.json          # Arabic translations (RTL)
│           └── es.json          # Spanish translations
├── src/
│   ├── app/
│   │   ├── app.ts               # Root standalone component (all logic)
│   │   ├── app.html             # Main template
│   │   ├── app.css              # Component styles
│   │   ├── app.module.ts        # App module
│   │   └── app-routing-module.ts
│   ├── models/
│   │   └── contact.model.ts     # Contact interface
│   ├── environments/            # Environment configs
│   ├── index.html
│   ├── main.ts
│   └── styles.css               # Tailwind directives
├── angular.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

---

## API Contract

The app expects `GET`, `POST`, and `DELETE` endpoints at `http://localhost:5001/api/Contacts`.

See [docs/API.md](./docs/API.md) for the full endpoint reference, request/response schemas, and validation rules.

---

## Internationalization

Translations live in `public/assets/i18n/` (EN, AR/RTL, ES). Language and direction persist via `localStorage`.
See [docs/OVERVIEW.md](./docs/OVERVIEW.md) for the full i18n breakdown.

---

## Building for Production

See [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) for platform-specific deployment guides (Vercel, Railway, Docker, self-hosted).

---

## Running Tests

See [docs/TESTING.md](./docs/TESTING.md) for the full testing guide including unit, E2E, performance, and security testing.

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) for coding standards, commit format, and PR process.

---

## License

Distributed under the MIT License. See [LICENSE.txt](./LICENSE.txt) for details.

---

<div align="center">
Made with ❤️ by <a href="https://github.com/Mostafa-SAID7">Mostafa SAID</a>
</div>
