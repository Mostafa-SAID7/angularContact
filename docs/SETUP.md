# Setup Guide

Complete step-by-step guide to get the project running locally.

## Prerequisites

| Tool | Version | Download |
|---|---|---|
| Node.js | ^20.19.0 or ^22.12.0 | [nodejs.org](https://nodejs.org) |
| npm | ^8.0.0 | Bundled with Node.js |
| Git | Latest | [git-scm.com](https://git-scm.com) |
| MongoDB Account | Free | [mongodb.com/cloud](https://www.mongodb.com/cloud) |

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/Mostafa-SAID7/angularContact.git
cd angularContact
```

---

## Step 2: Backend Setup

### 2.1 Navigate to backend folder

```bash
cd backend
```

### 2.2 Create `.env` file

Create `backend/.env`:

```env
PORT=5001
MONGODB_URI=mongodb+srv://Vercel-Admin-angularContact:v8fkF4OsJQZr0mHn@angularcontact.5lncwtv.mongodb.net/?retryWrites=true&w=majority
NODE_ENV=development
```

> **Note:** Replace `MONGODB_URI` with your own MongoDB Atlas connection string if using a different database.

### 2.3 Install dependencies

```bash
npm install
```

### 2.4 Seed sample data (optional)

```bash
npm run seed
```

This inserts 12 sample contacts into MongoDB.

### 2.5 Start the backend server

```bash
npm start
```

**Expected output:**
```
Server running on http://localhost:5001
Connected to MongoDB
```

Backend is now listening at **http://localhost:5001**

---

## Step 3: Frontend Setup

### 3.1 Open new terminal and navigate to frontend

```bash
cd frontend
```

### 3.2 Create environment files (if needed)

Frontend uses `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5001/api'
};
```

Already configured, but verify if API URL differs.

### 3.3 Install dependencies

```bash
npm install
```

### 3.4 Start development server

```bash
npm start
```

**Expected output:**
```
✔ Building...
Application bundle generation complete. [X seconds]
Watch mode enabled. Application will auto reload on change.
⠙ Serving Angular application...

Local: http://127.0.0.1:9887/
```

Frontend is now running at **http://127.0.0.1:9887**

---

## Step 4: Verify Everything Works

1. **Open browser** → http://127.0.0.1:9887
2. **Check console** → No errors (F12)
3. **Check Network tab** → API calls to `http://localhost:5001/api/Contacts`
4. **Add a contact** → Form should submit successfully
5. **See toast notification** → "Contact added successfully"
6. **Search** → Search box filters contacts in real-time
7. **Toggle dark mode** → Click moon icon in header

---

## Environment Configuration

### Frontend (`frontend/src/environments/`)

**environment.ts** (development):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5001/api'
};
```

**environment.prod.ts** (production):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com/api'  // Change to your production API
};
```

### Backend (`backend/.env`)

```env
PORT=5001                                    # Server port
MONGODB_URI=mongodb+srv://...                # MongoDB connection string
NODE_ENV=development                         # development or production
```

---

## Troubleshooting

### "Cannot find module" errors

**Solution:** Reinstall dependencies

```bash
# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd ../backend
rm -rf node_modules package-lock.json
npm install
```

### Backend not connecting to MongoDB

**Solution:** Verify `.env` file

```bash
# Check MONGODB_URI is correct
cat backend/.env

# Test connection
node -e "require('mongoose').connect(process.env.MONGODB_URI)"
```

### Frontend can't reach backend API

**Solution:** Verify backend is running and CORS is configured

```bash
# Check backend is listening
curl http://localhost:5001/api/Contacts

# Expected response: JSON array of contacts (or empty array)
```

If CORS error, ensure backend `server.js` has:

```javascript
const corsOptions = {
  origin: ['http://127.0.0.1:9887', 'http://localhost:4200', 'http://localhost:9887'],
  credentials: true
};
app.use(cors(corsOptions));
```

### Port already in use

**Solution:** Kill process or change port

```bash
# Kill process using port 5001 (backend)
lsof -ti:5001 | xargs kill -9

# Kill process using port 9887 (frontend)
lsof -ti:9887 | xargs kill -9

# Or change port in backend/.env or frontend/angular.json
```

### Dark mode not persisting

**Solution:** Check localStorage

```javascript
// In browser console
localStorage.getItem('darkMode')  // Should return 'true' or 'false'
localStorage.setItem('darkMode', 'true')
```

---

## Running Tests

### Frontend unit tests

```bash
cd frontend
npm test
```

Karma launches Chrome and runs tests in watch mode.

### Backend tests (if configured)

```bash
cd backend
npm test
```

---

## Build for Production

### Frontend

```bash
cd frontend
npm run build
```

Output → `frontend/dist/angular-contact/`

### Backend (if deploying)

```bash
cd backend
npm run build  # If a build script exists
```

---

## Useful Commands

| Command | Purpose |
|---|---|
| `npm start` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm test` | Run unit tests |
| `npm run lint` | Run linter (if configured) |
| `npm run seed` | Seed sample data (backend only) |
| `ng generate component <name>` | Scaffold new component |
| `git status` | Check git status |
| `git log --oneline` | View recent commits |

---

## Next Steps

1. **Explore codebase** → See [ARCHITECTURE.md](./ARCHITECTURE.md)
2. **Understand components** → See [COMPONENTS.md](./COMPONENTS.md)
3. **Learn API** → See [API.md](./API.md)
4. **Set up deployment** → See [DEPLOYMENT.md](./DEPLOYMENT.md)
5. **Contribute** → See [CONTRIBUTING.md](../.github/CONTRIBUTING.md)

---

## Support

For issues:

1. Check [Troubleshooting](#troubleshooting) section
2. Search [GitHub Issues](https://github.com/Mostafa-SAID7/angularContact/issues)
3. Create a new issue with:
   - OS (Windows / macOS / Linux)
   - Node.js version (`node --version`)
   - Error message & stack trace
   - Steps to reproduce
