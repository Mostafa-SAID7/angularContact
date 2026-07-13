<div align="center">

# Angular Contact Manager

**Full-stack contact management application** — Node.js/Express backend + Angular 20 frontend with MongoDB Atlas.

[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE.txt)

</div>

---

## 📁 Project Structure

```
angularContact/
├── backend/          Node.js/Express REST API
│   ├── models/       Mongoose schemas
│   ├── routes/       API endpoints (/api/Contacts)
│   ├── server.js     Express app
│   ├── seed.js       MongoDB seed script (12 sample contacts)
│   ├── package.json
│   └── .env          MongoDB Atlas credentials
│
└── frontend/         Angular 20 SPA
    ├── src/
    │   ├── app/
    │   │   └── app.ts   Main component (all CRUD logic)
    │   └── environments/
    │       ├── environment.ts       Dev: http://localhost:5001/api
    │       └── environment.prod.ts  Prod: your-backend-url/api
    ├── public/
    │   └── assets/i18n/
    │       ├── en.json  English
    │       ├── ar.json  Arabic (RTL)
    │       └── es.json  Spanish
    ├── package.json
    └── angular.json
```

---

## 🚀 Quick Start

### 1. Install dependencies (both apps)

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Seed sample data

```bash
cd backend
npm run seed
```

This inserts **12 realistic sample contacts** into MongoDB Atlas.

### 3. Start backend (Terminal 1)

```bash
cd backend
npm start
```

✅ Runs on `http://localhost:5001`  
📋 Contacts API: `GET/POST/DELETE http://localhost:5001/api/Contacts`

### 4. Start frontend (Terminal 2)

```bash
cd frontend
npm start
```

✅ Runs on `http://127.0.0.1:9887`  
Open browser and start managing contacts!

---

## 📋 Backend API

### Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/Contacts` | Fetch all contacts (newest first) |
| `GET` | `/api/Contacts/:id` | Fetch single contact |
| `POST` | `/api/Contacts` | Create contact |
| `PUT` | `/api/Contacts/:id` | Update contact |
| `DELETE` | `/api/Contacts/:id` | Delete contact |
| `GET` | `/health` | Health check |

### Request/Response

**POST /api/Contacts**

```json
{
  "name": "Ahmed Hassan",
  "email": "ahmed@example.com",
  "phone": "+201001234567",
  "isActive": true
}
```

**Response** (201 Created)

```json
{
  "_id": "66a1b2c3d4e5f6g7h8i9j0k1",
  "id": "66a1b2c3d4e5f6g7h8i9j0k1",
  "name": "Ahmed Hassan",
  "email": "ahmed@example.com",
  "phone": "+201001234567",
  "isActive": true,
  "createdAt": "2026-07-13T23:45:00.000Z",
  "updatedAt": "2026-07-13T23:45:00.000Z"
}
```

---

## 🎨 Frontend Features

- **CRUD operations** — Add, search, sort, paginate, delete contacts
- **Real-time search** — Filter by name, email, phone
- **Sorting** — By name, email, or phone (asc/desc)
- **Pagination** — 5, 10, or 20 items per page
- **Dark mode** — Toggle with `localStorage` persistence
- **i18n** — English, Arabic (RTL), Spanish via ngx-translate
- **Form validation** — Email, phone (E.164), required fields
- **Loading skeletons** — UX polish while fetching data

---

## 🛠 Environment Configuration

### Backend `.env`

```env
MONGODB_URI="mongodb+srv://Vercel-Admin-angularContact:v8fkF4OsJQZr0mHn@angularcontact.5lncwtv.mongodb.net/?retryWrites=true&w=majority"
PORT=5001
```

### Frontend Environment

Edit `frontend/src/environments/environment.prod.ts` to point to your deployed backend:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-domain.com/api',
};
```

---

## 📦 Scripts

### Frontend

```bash
cd frontend
npm start          # Dev server @ http://127.0.0.1:9887
npm run build      # Production build → dist/
npm test           # Unit tests (Karma + Jasmine)
npm run watch      # Build in watch mode
```

### Backend

```bash
cd backend
npm start          # Production mode
npm run dev        # Dev mode with nodemon (auto-reload)
npm run seed       # Populate MongoDB with 12 sample contacts
```

---

## 🌐 Deployment

### Deploy Backend

Push to **Vercel**, **Railway**, **Render**, or **Heroku**:

```bash
cd backend
# Push to your hosting service
# Set MONGODB_URI in their environment variables
```

### Deploy Frontend

Build & push to **Vercel**, **Netlify**, or GitHub Pages:

```bash
cd frontend
npm run build
# Push dist/ to your hosting service
# Update environment.prod.ts with your backend URL
```

---

## 📝 Git Workflow

```bash
git add frontend/ backend/
git commit -m "feat: full-stack contact manager"
git push -u origin feature/contacts
```

**Never commit:**
- `backend/.env` — contains MongoDB credentials
- `frontend/node_modules/` — regenerate with `npm install`
- Build artifacts (`dist/`, `.angular/`)

---

## 🤝 Contributing

See [frontend/.github/CONTRIBUTING.md](./frontend/.github/CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT — See [frontend/LICENSE.txt](./frontend/LICENSE.txt)

---

<div align="center">
Made with ❤️ by <a href="https://github.com/Mostafa-SAID7">Mostafa SAID</a>
</div>
