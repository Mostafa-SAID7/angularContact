# Deployment Guide

Guide to deploying the Angular Contact Manager to production.

## Deployment Platforms

### Option 1: Vercel (Frontend)

**Benefits:**
- Free tier available
- Automatic deployments on push
- CDN included
- Environment variables support

**Steps:**

1. Connect your GitHub repo to Vercel
2. Configure build settings:
   - Framework: Angular
   - Build command: `npm run build`
   - Output directory: `dist/angularContact`
3. Add environment variables in Vercel dashboard
4. Deploy!

### Option 2: Railway (Backend + Frontend)

**Benefits:**
- Full-stack deployment
- PostgreSQL/MongoDB integration
- GitHub auto-deploy

**Steps:**

1. Connect GitHub to Railway
2. Create new project from repo
3. Railway auto-detects `package.json`
4. Set environment variables
5. Deploy!

### Option 3: Docker + Render

**Create Dockerfile:**

```dockerfile
# Frontend
FROM node:22 AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Backend
FROM node:22
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --production
COPY backend/ ./
EXPOSE 5001

CMD ["npm", "start"]
```

**Deploy to Render:**

1. Push Dockerfile to repo
2. Connect repo to Render
3. Select `Dockerfile` as runtime
4. Set environment variables
5. Deploy!

### Option 4: Self-Hosted (AWS EC2 / DigitalOcean)

**Steps:**

1. SSH into server
2. Install Node.js and npm
3. Clone repo: `git clone <repo> && cd angularContact`
4. Install dependencies: `npm install --workspaces`
5. Build frontend: `cd frontend && npm run build`
6. Setup backend environment: `cd ../backend && cp .env.example .env`
7. Update `.env` with production values
8. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name "contact-api"
   pm2 startup
   pm2 save
   ```
9. Setup reverse proxy with Nginx/Apache
10. Setup SSL with Let's Encrypt

---

## Environment Variables

### Frontend (.env)

Create `frontend/.env.production`:

```
NG_APP_API_URL=https://api.yourdomain.com
NG_APP_ANALYTICS=true
```

### Backend (.env.production)

```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://<prod_user>:<prod_pass>@<prod_cluster>.mongodb.net/?retryWrites=true&w=majority
LOG_LEVEL=info
```

---

## Performance Optimization

### Frontend

1. **Enable Angular Production Mode:**
   ```bash
   npm run build -- --configuration production
   ```

2. **Compression:**
   ```bash
   npm install compression
   ```

3. **CDN Configuration:**
   - Serve `dist/` from CDN
   - Cache assets for 1 year
   - Cache HTML for 5 minutes

### Backend

1. **Database Indexing:**
   ```javascript
   db.contacts.createIndex({ name: 1 });
   db.contacts.createIndex({ email: 1 });
   db.contacts.createIndex({ phone: 1 });
   ```

2. **Connection Pooling:**
   ```javascript
   const mongooseOptions = {
     maxPoolSize: 10,
     minPoolSize: 5
   };
   ```

---

## SSL/TLS Certificate

### Using Let's Encrypt (Free)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com
```

### Nginx Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:9887;
    }

    location /api {
        proxy_pass http://localhost:5001;
    }
}

server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## Monitoring & Logging

### Application Monitoring

- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **New Relic**: Performance monitoring

### Set up Sentry

```bash
npm install @sentry/angular
```

In `main.ts`:

```typescript
import * as Sentry from "@sentry/angular";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
  tracesSampleRate: 0.1,
});
```

---

## Database Backups

### Automated MongoDB Atlas Backups

- Enable in Atlas dashboard: Backup > Backup Settings
- Automatic daily backups retained for 35 days
- Point-in-time recovery available

### Manual Backup

```bash
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/db"
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22.x
      
      - name: Build
        run: |
          cd frontend && npm install && npm run build
          cd ../backend && npm install
      
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: |
          npm install -g vercel
          vercel deploy --prod --token=$VERCEL_TOKEN
```

---

## Health Checks

### Frontend Health Check

```bash
curl -f https://yourdomain.com || exit 1
```

### Backend Health Check

```bash
curl -f https://api.yourdomain.com/api/Contacts || exit 1
```

Add to monitoring service (Uptime Robot, Pingdom, etc.)

---

## Rollback Strategy

1. Keep previous versions deployed
2. Use blue-green deployment
3. Monitor error rates after deploy
4. Quick rollback command:

```bash
git revert <commit-hash>
git push origin main
```

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] SQL injection protection
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented
- [ ] Secrets in environment variables
- [ ] Database backups automated
- [ ] Access logs enabled
- [ ] Error monitoring setup
- [ ] DDoS protection (Cloudflare)
- [ ] Regular security audits

---

## Post-Deployment

1. Verify all features working
2. Check performance metrics
3. Review error logs
4. Monitor database queries
5. Test API endpoints
6. Verify email notifications
7. Check analytics

---

For deployment issues and questions, see [../.github/SUPPORT.md](../.github/SUPPORT.md).
