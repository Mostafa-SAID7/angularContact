# Setup Guide

Complete step-by-step guide to set up the Angular Contact Manager locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v20.19.0 or higher (check with `node --version`)
- **npm**: v8.0.0 or higher (check with `npm --version`)
- **Git**: Latest version
- **MongoDB Atlas Account** (for backend database)

## Frontend Setup

### 1. Clone the repository

```bash
git clone https://github.com/Mostafa-SAID7/angularContact.git
cd angularContact/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

The environment files are located in `src/environments/`:

- **Development**: `src/environments/environment.ts`
- **Production**: `src/environments/environment.prod.ts`

Default API URL for development:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5001/api'
};
```

If your backend runs on a different port, update `apiUrl` accordingly.

### 4. Start the development server

```bash
npm start
```

Open your browser: **[http://127.0.0.1:9887](http://127.0.0.1:9887)**

## Backend Setup

### 1. Navigate to backend directory

```bash
cd ../backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file in the backend root:

```env
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

Replace with your MongoDB Atlas credentials.

### 4. Seed the database

```bash
npm run seed
```

This populates the database with 12 sample contacts.

### 5. Start the backend server

```bash
npm start
```

Server runs at: **[http://localhost:5001](http://localhost:5001)**

## MongoDB Atlas Setup

### 1. Create a cluster

- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a new project
- Create a new cluster (free tier available)

### 2. Create database user

- In the cluster settings, navigate to Database Access
- Create a new database user with username and password
- Note these credentials for the `.env` file

### 3. Get connection string

- In the cluster overview, click "Connect"
- Choose "Connect your application"
- Copy the connection string and replace `<username>`, `<password>`

### 4. Whitelist IP

- Go to Network Access
- Add your IP address (or 0.0.0.0/0 for development)

## Available Commands

### Frontend

```bash
npm start           # Development server
npm run build       # Production build
npm run watch       # Watch mode
npm test            # Run unit tests
npm run lint        # Lint code
```

### Backend

```bash
npm start           # Start server
npm run seed        # Seed database with sample data
npm run dev         # Start with nodemon
```

## Verification Checklist

- [ ] Node.js and npm installed
- [ ] Repository cloned
- [ ] Frontend dependencies installed
- [ ] Backend dependencies installed
- [ ] MongoDB Atlas configured
- [ ] `.env` file created in backend
- [ ] Backend server running on port 5001
- [ ] Frontend dev server running on port 9887
- [ ] Can access [http://127.0.0.1:9887](http://127.0.0.1:9887)
- [ ] Can create, view, and delete contacts

## Troubleshooting

### Backend won't start

Check MongoDB connection:
```bash
npm run seed
```

### Frontend won't load

Clear cache:
```bash
npm install --legacy-peer-deps
npm start
```

### Port already in use

Change port in frontend:
```bash
ng serve --port 4200
```

Or kill the process:
```bash
# macOS/Linux
lsof -ti:5001 | xargs kill

# Windows
netstat -ano | findstr :5001
taskkill /PID <PID> /F
```

## Next Steps

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for project structure
- Check [CONTRIBUTING.md](.github/CONTRIBUTING.md) before making changes
- Review [API.md](./API.md) for backend API documentation

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with details
3. Contact: [m.ssaid356@gmail.com](mailto:m.ssaid356@gmail.com)
