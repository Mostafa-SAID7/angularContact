# API Documentation

Complete REST API reference for the Angular Contact Manager backend.

## Base URL

```
http://localhost:5001/api
```

## Authentication

No authentication required (open API).

## Content-Type

All requests and responses use `application/json`.

---

## Endpoints

### GET /Contacts

**Description:** Fetch all contacts

**Request:**
```http
GET /api/Contacts
```

**Response:** `200 OK`
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "_id": "507f1f77bcf86cd799439011",
    "name": "Mostafa Said",
    "email": "mostafa@example.com",
    "phone": "+20123456789",
    "isActive": true,
    "createdAt": "2026-07-13T20:30:00Z",
    "updatedAt": "2026-07-13T20:30:00Z"
  },
  {
    "id": "507f1f77bcf86cd799439012",
    "_id": "507f1f77bcf86cd799439012",
    "name": "Ahmed Hassan",
    "email": "ahmed@example.com",
    "phone": "+20987654321",
    "isActive": false,
    "createdAt": "2026-07-13T20:31:00Z",
    "updatedAt": "2026-07-13T20:31:00Z"
  }
]
```

**Error Response:** `500 Internal Server Error`
```json
{
  "error": "Failed to retrieve contacts"
}
```

---

### POST /Contacts

**Description:** Create a new contact

**Request:**
```http
POST /api/Contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+11234567890",
  "isActive": true
}
```

**Request Body:**

| Field | Type | Required | Validation |
|---|---|---|---|
| `name` | String | Yes | Min 2 chars |
| `email` | String | No | Valid email format |
| `phone` | String | Yes | E.164 format (e.g., +1234567890) |
| `isActive` | Boolean | No | Default: `true` |

**Response:** `201 Created`
```json
{
  "id": "507f1f77bcf86cd799439013",
  "_id": "507f1f77bcf86cd799439013",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+11234567890",
  "isActive": true,
  "createdAt": "2026-07-13T21:00:00Z",
  "updatedAt": "2026-07-13T21:00:00Z"
}
```

**Error Responses:**

**400 Bad Request** — Invalid input
```json
{
  "error": "Validation failed: phone field is required"
}
```

**400 Bad Request** — Invalid phone format
```json
{
  "error": "Phone must be in E.164 format"
}
```

**500 Internal Server Error**
```json
{
  "error": "Failed to create contact"
}
```

---

### DELETE /Contacts/:id

**Description:** Delete a contact by ID

**Request:**
```http
DELETE /api/Contacts/507f1f77bcf86cd799439011
```

**Path Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | String | Yes | MongoDB ObjectId of the contact |

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

**Error Responses:**

**404 Not Found** — Contact doesn't exist
```json
{
  "error": "Contact not found"
}
```

**500 Internal Server Error**
```json
{
  "error": "Failed to delete contact"
}
```

---

## Response Codes

| Code | Meaning |
|---|---|
| `200` | Success — Request completed successfully |
| `201` | Created — New resource created successfully |
| `400` | Bad Request — Invalid input or validation error |
| `404` | Not Found — Resource doesn't exist |
| `500` | Internal Server Error — Server error |

---

## Data Models

### Contact

```typescript
interface Contact {
  id: string;                    // MongoDB ObjectId (virtual field)
  _id: string;                   // MongoDB ObjectId (actual DB field)
  name: string;                  // Contact full name (required)
  email?: string | null;         // Email address (optional)
  phone: string;                 // Phone number in E.164 format (required)
  isActive: boolean;             // Active status (default: true)
  createdAt: string;             // ISO 8601 timestamp
  updatedAt: string;             // ISO 8601 timestamp
}
```

### Phone Format (E.164)

E.164 is the international phone format:

```
+[country code][area code][local number]
```

**Examples:**
- `+11234567890` — USA/Canada
- `+441632960000` — UK
- `+33123456789` — France
- `+49301234567` — Germany
- `+20123456789` — Egypt
- `+966123456789` — Saudi Arabia

To validate E.164 format:
```javascript
const e164Regex = /^\+?[1-9]\d{1,14}$/;
e164Regex.test('+11234567890');  // true
e164Regex.test('1234567890');    // false
```

---

## CORS Headers

The API sends the following CORS headers:

```
Access-Control-Allow-Origin: http://127.0.0.1:9887
Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Credentials: true
```

Allowed origins:
- `http://127.0.0.1:9887`
- `http://localhost:4200`
- `http://localhost:9887`

---

## Rate Limiting

No rate limiting currently configured. For production, consider implementing:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100                    // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## Pagination (Future Enhancement)

Current implementation: All contacts returned at once.

Recommended pagination format:

```http
GET /api/Contacts?page=1&limit=10&sort=-createdAt
```

Response:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "pages": 5
  }
}
```

---

## Filtering (Future Enhancement)

Recommended filter format:

```http
GET /api/Contacts?name=John&isActive=true
```

---

## Sorting (Future Enhancement)

Recommended sort format:

```http
GET /api/Contacts?sort=name,-createdAt
```

Prefix with `-` for descending order.

---

## Examples

### cURL

```bash
# Get all contacts
curl http://localhost:5001/api/Contacts

# Create a contact
curl -X POST http://localhost:5001/api/Contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+11234567890",
    "isActive": true
  }'

# Delete a contact
curl -X DELETE http://localhost:5001/api/Contacts/507f1f77bcf86cd799439011
```

### JavaScript (Fetch API)

```javascript
// Get all contacts
const contacts = await fetch('http://localhost:5001/api/Contacts')
  .then(res => res.json());

// Create a contact
const newContact = await fetch('http://localhost:5001/api/Contacts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+11234567890',
    isActive: true
  })
}).then(res => res.json());

// Delete a contact
await fetch(`http://localhost:5001/api/Contacts/${id}`, {
  method: 'DELETE'
});
```

### Angular (HttpClient)

```typescript
// In ContactService
getContacts(): Observable<Contact[]> {
  return this.http.get<Contact[]>(`${this.apiUrl}/Contacts`);
}

createContact(contact: Partial<Contact>): Observable<Contact> {
  return this.http.post<Contact>(`${this.apiUrl}/Contacts`, contact);
}

deleteContact(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/Contacts/${id}`);
}
```

---

## Testing the API

### Using Postman

1. Import collection: [Angular Contact API.postman_collection.json](../postman/)
2. Set environment variable: `base_url = http://localhost:5001/api`
3. Run requests from the collection

### Using Thunder Client (VS Code)

1. Create new request
2. Method: `GET`
3. URL: `http://localhost:5001/api/Contacts`
4. Send

---

## Monitoring

### View API Logs

Check backend server console for request/response logs:

```
GET /api/Contacts 200 5ms
POST /api/Contacts 201 12ms
DELETE /api/Contacts/507f1f77bcf86cd799439011 200 8ms
```

---

## Troubleshooting

### Connection Refused

```
Error: connect ECONNREFUSED 127.0.0.1:5001
```

**Solution:** Start backend server

```bash
cd backend && npm start
```

### CORS Error in Browser

```
Access to XMLHttpRequest... has been blocked by CORS policy
```

**Solution:** Verify backend has CORS enabled and frontend URL is whitelisted in `server.js`

### Invalid Phone Format

```json
{
  "error": "Phone must be in E.164 format"
}
```

**Solution:** Use E.164 format: `+[country code][area code][local number]`

---

## Database Schema (MongoDB)

```javascript
// contacts collection
db.contacts.createIndex({ phone: 1 }, { unique: true });  // Optional: ensure unique phones

db.contacts.insertOne({
  name: "John Doe",
  email: "john@example.com",
  phone: "+11234567890",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});
```

---

## Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — System design
- [SETUP.md](./SETUP.md) — Local development setup
- [SECURITY.md](./SECURITY.md) — Security best practices
