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

The app expects the following REST endpoints at `https://localhost:5001`:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/Contacts` | Fetch all contacts |
| `POST` | `/api/Contacts` | Create a new contact |
| `DELETE` | `/api/Contacts/:id` | Delete a contact by ID |

### Contact model

```typescript
interface Contact {
  id: number;
  name: string;       // required, min 2 chars
  email: string | null; // optional, valid email format
  phone: string;      // required, E.164 format e.g. +12345678900
  isActive: boolean;
}
```

---

## Internationalization

Translations live in `public/assets/i18n/`. The active language is persisted to `localStorage` and the page `lang` / `dir` attributes update automatically.

| Language | Code | Direction |
|---|---|---|
| English | `en` | LTR |
| Arabic | `ar` | RTL |
| Spanish | `es` | LTR |

To add a new language, create `public/assets/i18n/<code>.json` using `en.json` as a template, then add a button for it in `app.html`.

---

## Building for Production

```bash
npm run build
```

Output goes to `dist/angular-contact/`. The build is optimized with tree-shaking, minification, and ahead-of-time compilation.

---

## Running Tests

```bash
npm test
```

Uses Karma with Chrome. To run once (CI mode):

```bash
npx ng test --watch=false --browsers=ChromeHeadless
```

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) first.

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push -u origin feature/my-feature`
5. Open a Pull Request

---

## License

Distributed under the MIT License. See [LICENSE.txt](./LICENSE.txt) for details.

---

<div align="center">
Made with ❤️ by <a href="https://github.com/Mostafa-SAID7">Mostafa SAID</a>
</div>
