# Security Guidelines

Security best practices and configuration for the Angular Contact Manager.

## Frontend Security

### 1. Content Security Policy (CSP)

Add to `src/index.html`:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'wasm-unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  connect-src 'self' http://localhost:5001 https://localhost:5001;
  font-src 'self';
  object-src 'none';
  frame-ancestors 'none';
">
```

### 2. XSS Prevention

Angular built-in protections:
- DomSanitizer for dynamic HTML
- Automatic escaping in templates
- No eval() or innerHTML

Example safe binding:

```typescript
// ✅ SAFE — Angular escapes automatically
<p>{{ userInput }}</p>

// ⚠️ UNSAFE — Only use for trusted HTML
<div [innerHTML]="trustedHtml | sanitize"></div>

constructor(private sanitizer: DomSanitizer) {}

getSafeHtml(html: string) {
  return this.sanitizer.sanitize(SecurityContext.HTML, html);
}
```

### 3. CSRF Protection

Angular HttpClient includes:
- Automatic XSRF token injection
- XSRF header validation

Configure in `src/main.ts`:

```typescript
import { HTTP_XSRF_TOKEN_EXTRACTOR } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN',
        excludedUrls: [
          'http://localhost:5001/api/auth'  // Don't include XSRF for auth
        ]
      })
    )
  ]
});
```

### 4. Environment Secrets

**❌ DO NOT commit secrets:**

```typescript
// ❌ NEVER do this
export const API_KEY = 'sk_live_xxx';
export const PASSWORD = 'mypassword123';
```

**✅ USE environment variables:**

```bash
# .env file (add to .gitignore)
VITE_API_URL=http://localhost:5001/api
VITE_API_KEY=sk_live_xxx
```

```typescript
// Use via environment.ts
export const environment = {
  apiUrl: process.env['VITE_API_URL']
};
```

---

## Backend Security

### 1. Environment Variables

Store secrets in `.env` (not in code):

```env
PORT=5001
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
CORS_ORIGINS=https://example.com,https://app.example.com
```

Access via:

```javascript
const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT || 5001;
```

### 2. CORS Configuration

**Current (Development):**

```javascript
const corsOptions = {
  origin: [
    'http://127.0.0.1:9887',
    'http://localhost:4200',
    'http://localhost:9887'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  maxAge: 3600
};

app.use(cors(corsOptions));
```

**Production:**

```javascript
const corsOptions = {
  origin: process.env.CORS_ORIGINS?.split(',') || [],
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

### 3. Input Validation

**Phone validation (E.164):**

```javascript
// backend/models/Contact.js
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

if (!phoneRegex.test(phone)) {
  throw new Error('Invalid phone format');
}
```

**Name validation:**

```javascript
if (name.length < 2 || name.length > 100) {
  throw new Error('Name must be 2-100 characters');
}
```

**Email validation:**

```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  throw new Error('Invalid email format');
}
```

### 4. MongoDB Security

**Use parameterized queries (Mongoose):**

```javascript
// ✅ SAFE — Uses parameterized query
Contact.findById(id);
Contact.find({ name: userInput });

// ❌ UNSAFE — Vulnerable to injection
db.contacts.find({ $where: `this.name == '${userInput}'` });
```

**Enable authentication:**

```javascript
const uri = 'mongodb+srv://user:password@cluster.mongodb.net/database?authSource=admin';
```

**Use read-only views for production:**

```javascript
// Create read-only role
db.createUser({
  user: 'read_only_user',
  pwd: 'password',
  roles: [{ role: 'read', db: 'contacts' }]
});
```

### 5. Rate Limiting

Add rate limiting to prevent abuse:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                   // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  standardHeaders: true,      // Return rate limit info in RateLimit-* headers
  legacyHeaders: false        // Disable X-RateLimit-* headers
});

app.use('/api/', limiter);
```

### 6. Error Handling

**Don't expose stack traces:**

```javascript
// ❌ BAD — Leaks server details
app.get('/api/contacts', (req, res) => {
  Contact.find()
    .then(contacts => res.json(contacts))
    .catch(err => res.status(500).json({ error: err.stack }));
});

// ✅ GOOD — Generic error message
app.get('/api/contacts', (req, res) => {
  Contact.find()
    .then(contacts => res.json(contacts))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve contacts' });
    });
});
```

### 7. HTTPS in Production

**Use HTTPS everywhere:**

```javascript
// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});
```

### 8. Security Headers

```javascript
const helmet = require('helmet');

app.use(helmet()); // Sets various HTTP headers
```

This sets:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`
- etc.

---

## Authentication & Authorization

### Current Status

**No authentication implemented** (public API).

### Adding Authentication

#### 1. Backend (Node.js + JWT)

```bash
npm install jsonwebtoken bcryptjs
```

```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.json({ token });
});

// Middleware to verify token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Protect routes
app.get('/api/contacts', authMiddleware, (req, res) => {
  // Only authenticated users can access
});
```

#### 2. Frontend (Angular)

```typescript
// services/auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  
  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', {
      email,
      password
    }).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
      })
    );
  }
  
  logout() {
    localStorage.removeItem('auth_token');
  }
  
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
```

```typescript
// services/auth.interceptor.ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    
    return next.handle(req);
  }
}
```

---

## Deployment Security

### 1. Environment Separation

| Environment | Security Level | Settings |
|---|---|---|
| Development | Low | Debug enabled, localhost CORS |
| Staging | Medium | Debug disabled, CORS whitelist |
| Production | High | HTTPS only, limited CORS, monitoring |

### 2. Secrets Management

Use platform-specific secrets:

**Vercel:**
```
Settings → Environment Variables
MONGODB_URI=***
JWT_SECRET=***
```

**Railway:**
```
Project → Variables
MONGODB_URI=***
JWT_SECRET=***
```

**Docker:**
```dockerfile
ENV MONGODB_URI=${MONGODB_URI}
ENV JWT_SECRET=${JWT_SECRET}
```

### 3. Monitoring & Logging

- Track failed login attempts
- Log API errors
- Monitor database queries
- Set up alerts for suspicious activity

---

## Compliance

### GDPR Compliance

- User consent for data collection
- Right to data access
- Right to be forgotten (delete account)
- Data export functionality

### CCPA Compliance

- Privacy policy link
- Data opt-out option
- Security notifications

---

## Regular Security Audits

```bash
# Check for vulnerabilities
npm audit
npm audit fix

# Frontend scanning
npm audit --production

# OWASP Top 10 checklist
- Injection flaws
- Broken authentication
- Sensitive data exposure
- XML external entities
- Broken access control
- Security misconfiguration
- XSS
- Insecure deserialization
- Using components with known vulnerabilities
- Insufficient logging & monitoring
```

---

## Additional Resources

- [OWASP Top 10](https://owasp.org/Top10/)
- [Angular Security](https://angular.io/guide/security)
- [Express.js Security](https://expressjs.com/en/advanced/best-practice-security.html)
- [MongoDB Security](https://docs.mongodb.com/manual/security/)
- [Node.js Security](https://nodejs.org/en/docs/guides/security/)
