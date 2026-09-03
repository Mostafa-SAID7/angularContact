# Architecture

## Overview

Angular Contact Manager follows a **modular, component-based architecture** with clear separation between frontend and backend:

```
angularContact/
├── backend/              # Node.js/Express REST API
│   ├── server.js         # Main server entry
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   └── seed.js           # Database seeding
├── frontend/             # Angular 20 SPA
│   ├── src/app/
│   │   ├── pages/        # Route components (Dashboard, etc.)
│   │   ├── components/   # Reusable UI components
│   │   ├── services/     # Business logic (API, state)
│   │   ├── models/       # TypeScript interfaces
│   │   └── app.ts        # Root router component
│   └── public/           # Static assets & i18n
└── docs/                 # Documentation
```

---

## Frontend Architecture

### Routing Strategy

- **AppComponent** — Root component with `<router-outlet>`
- **DashboardComponent** — Main contacts page (default route `/`)
- **ErrorPageComponent** — 404 & 500 error pages
- **Wildcard route** — Catch-all for undefined routes → 404

### Component Hierarchy

```
app.ts (root router outlet)
├── error-boundary.ts (catches component errors)
├── toast.ts (global toast notifications)
└── router-outlet
    ├── DashboardComponent (/)
    │   ├── header
    │   ├── contact-form (sidebar)
    │   ├── contact-list (main)
    │   │   ├── custom-select (sort dropdown)
    │   │   ├── contact-card (repeated)
    │   │   └── pagination
    │   ├── modal (delete confirmation)
    │   └── contact-detail-modal (view)
    └── ErrorPageComponent (404/500)
```

### State Management

**Angular Signals** (reactive primitives):

```typescript
// In DashboardComponent
currentPage = signal<number>(1);
itemsPerPage = signal<number>(5);
searchTerm = signal<string>('');
sortField = signal<'name' | 'email' | 'phone'>('name');
sortDirection = signal<'asc' | 'desc'>('asc');
darkMode = signal<boolean>();
currentLang = signal<string>();
isLoading = signal<boolean>();
contacts = signal<Contact[]>([]);
```

**No Redux/NgRx** — Signals are lightweight, built-in, and sufficient for this scale.

### Service Layer

**ContactService** — HTTP API client

```typescript
getContacts(): Observable<Contact[]>
createContact(contact: Partial<Contact>): Observable<Contact>
deleteContact(id: string): Observable<void>
```

**ToastService** — Global notifications

```typescript
success(message: string, duration?: number): string
error(message: string, duration?: number): string
warning(message: string, duration?: number): string
info(message: string, duration?: number): string
```

### Error Handling

- **ErrorBoundaryComponent** — Catches child component errors
- **GlobalErrorHandler** — Handles uncaught exceptions globally
- **ToastService** — Displays error messages to user
- **ErrorPageComponent** — Renders 404/500 pages

---

## Backend Architecture

### Tech Stack

- **Runtime** — Node.js 22.14.0
- **Framework** — Express.js
- **Database** — MongoDB Atlas (Cloud)
- **ODM** — Mongoose
- **Validation** — Custom validators (E.164 phone)

### Endpoints

| Method | Route | Handler | Response |
|---|---|---|---|
| `GET` | `/api/Contacts` | Get all contacts | `Contact[]` |
| `POST` | `/api/Contacts` | Create contact | `Contact` |
| `DELETE` | `/api/Contacts/:id` | Delete by ID | `{ success: true }` |

### Database Schema

**Contact (Mongoose)**

```javascript
{
  _id: ObjectId,              // MongoDB ID
  name: String,               // Required
  email: String,              // Optional
  phone: String,              // Required, E.164 format
  isActive: Boolean,          // Default: true
  createdAt: Date,            // Auto timestamp
  updatedAt: Date             // Auto timestamp
}
```

**Virtual field** `id` exposes MongoDB `_id` for API contracts.

### CORS Configuration

Frontend allowed origins:
- `http://127.0.0.1:9887`
- `http://localhost:4200`
- `http://localhost:9887`

---

## Data Flow

### Add Contact

```
user fills form
  ↓
contact-form emits (formSubmit)
  ↓
dashboard.onFormSubmit()
  ↓
ContactService.createContact(data)
  ↓
POST /api/Contacts
  ↓
backend creates MongoDB document
  ↓
response with new Contact
  ↓
dashboard.loadContacts() (refresh list)
  ↓
contacts signal updated
  ↓
contact-list rerenders
```

### Delete Contact

```
user clicks delete btn on card
  ↓
contact-card emits (delete)
  ↓
dashboard.onDeleteContact(id)
  ↓
modal shows confirmation
  ↓
user clicks "DELETE"
  ↓
dashboard.confirmDelete()
  ↓
ContactService.deleteContact(id)
  ↓
DELETE /api/Contacts/:id
  ↓
backend removes from MongoDB
  ↓
success toast shown
  ↓
dashboard.loadContacts() (refresh)
  ↓
contact removed from list
```

### Search & Sort

```
user types in search box
  ↓
contact-list emits (searchChange)
  ↓
dashboard.onSearch()
  ↓
searchTerm signal updated
  ↓
contact-list computes filtered/sorted contacts (computed signal)
  ↓
contact-list rerenders only changed cards
```

---

## Styling Strategy

### Tailwind CSS Approach

- **Utility-first** — All styles are inline Tailwind classes
- **Component CSS files** — Empty (all in templates via `[ngClass]`)
- **Global styles** — `src/styles.css` for scrollbar, animations
- **Dark mode** — Class strategy (`[class.dark]`)

### Component File Structure

```
component-name/
├── component-name.ts         # Logic & state
├── component-name.html       # Template with Tailwind
├── component-name.css        # Empty (reserved)
```

### Dark Mode Implementation

```html
<div [class.dark]="darkMode()">
  <!-- Content with dark: variants -->
</div>
```

CSS automatically applies:
- `dark:bg-gray-800`
- `dark:text-white`
- `dark:border-gray-700`
- etc.

---

## Build Pipeline

### Development

```bash
npm start
  ↓
ng serve --host 127.0.0.1 --port 9887
  ↓
Webpack bundles with HMR
  ↓
Browser refreshes on file change
```

### Production

```bash
npm run build
  ↓
ng build (production config)
  ↓
Tree-shaking, minification, AOT compilation
  ↓
Output: dist/angular-contact/
  ↓
Ready for deployment to Vercel, Netlify, etc.
```

---

## Performance Optimizations

1. **Lazy component loading** — Standalone components (no module overhead)
2. **OnPush change detection** — Signals optimize re-renders
3. **TrackBy in *ngFor** — Prevents DOM thrashing on list updates
4. **Skeleton loaders** — Better perceived performance
5. **Custom scrollbars** — No browser default styling overhead

---

## Testing Strategy

- **Unit tests** — Karma + Jasmine for services & components
- **E2E tests** — Protractor for user workflows (optional)
- **Manual testing** — Browser DevTools for real-world scenarios

See [TESTING.md](./TESTING.md) for detailed testing guide.

---

## Deployment

### Frontend

Options:
- **Vercel** — Zero-config Angular deployment
- **Netlify** — Git-connected builds
- **GitHub Pages** — Static hosting
- **AWS S3 + CloudFront** — CDN delivery

### Backend

Options:
- **Vercel** — Serverless Node.js
- **Railway** — Container-based Node.js
- **Render** — Fully managed hosting
- **Heroku** — Simple, familiar platform

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step guides.

---

## Scalability Considerations

### Current Limits

- **Contacts per page** — 5/10/20 (configurable)
- **Search scope** — In-memory filtering (local)
- **Sorting** — Client-side sorting (local)

### Future Enhancements

- **Server-side pagination** — Offset-based or cursor pagination
- **Server-side search** — MongoDB text search / Elasticsearch
- **Server-side sorting** — Query parameter sorting
- **Caching** — Redis for frequently accessed contacts
- **Infinite scroll** — Instead of pagination
- **Real-time updates** — WebSocket / Socket.io

---

## Security

### Frontend

- **XSS prevention** — Angular sanitization + DomSanitizer
- **CSRF protection** — CORS-enabled API requests
- **No secrets in code** — All API URLs in `environment.ts`

### Backend

- **Input validation** — E.164 phone validation, name/email checks
- **CORS whitelist** — Only allow known origins
- **MongoDB injection** — Mongoose prevents (use parameterized queries)
- **Environment variables** — `.env` file for secrets (not in repo)

See [SECURITY.md](./SECURITY.md) for detailed guidelines.

---

## Monitoring & Logging

### Frontend

- **Browser console errors** — Global ErrorHandler logs to console
- **Toast notifications** — User-facing error messages
- **Sentry integration** — Optional (not configured yet)

### Backend

- **Console logs** — Express middleware logs requests
- **Error tracking** — Errors sent to console
- **Database monitoring** — MongoDB Atlas dashboard

---

## Contributing

See [CONTRIBUTING.md](../.github/CONTRIBUTING.md) for coding standards, PR process, and git workflow.
