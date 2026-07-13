# API Documentation

Complete REST API reference for the Angular Contact Manager backend.

## Base URL

```
http://localhost:5001/api
```

## Authentication

Currently, no authentication is required. This is a development setup.

For production, implement JWT or OAuth2 token-based authentication.

## Endpoints

### Get All Contacts

```http
GET /Contacts
```

**Response:**

```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "_id": "507f1f77bcf86cd799439011",
    "name": "Ahmed Hassan",
    "email": "ahmed@example.com",
    "phone": "+201001234567",
    "isActive": true,
    "createdAt": "2024-07-13T10:30:00Z",
    "updatedAt": "2024-07-13T10:30:00Z"
  }
]
```

**Status Codes:**
- `200 OK` — Successfully retrieved
- `500 Server Error` — Database error

---

### Create Contact

```http
POST /Contacts
Content-Type: application/json

{
  "name": "Sara El-Shafei",
  "email": "sara@example.com",
  "phone": "+201001234567",
  "isActive": true
}
```

**Required Fields:**
- `name` (string, 2-100 chars)
- `phone` (string, E.164 format)

**Optional Fields:**
- `email` (string, valid email)
- `isActive` (boolean, default: true)

**Response:**

```json
{
  "id": "507f1f77bcf86cd799439012",
  "_id": "507f1f77bcf86cd799439012",
  "name": "Sara El-Shafei",
  "email": "sara@example.com",
  "phone": "+201001234567",
  "isActive": true,
  "createdAt": "2024-07-13T10:35:00Z",
  "updatedAt": "2024-07-13T10:35:00Z"
}
```

**Status Codes:**
- `201 Created` — Contact created successfully
- `400 Bad Request` — Validation error (missing required fields, invalid email, etc.)
- `500 Server Error` — Database error

**Validation Rules:**
```
name:       Required, 2-100 chars, alphanumeric + spaces
email:      Optional, must be valid email format
phone:      Required, E.164 international format
            Examples: +1-234-567-8900, +44-20-7946-0958
isActive:   Optional boolean (default: true)
```

---

### Delete Contact

```http
DELETE /Contacts/:id
```

**Path Parameters:**
- `id` (string) — MongoDB ObjectId of the contact

**Response:**

```json
{
  "message": "Contact deleted successfully",
  "id": "507f1f77bcf86cd799439011"
}
```

**Status Codes:**
- `200 OK` — Contact deleted successfully
- `404 Not Found` — Contact ID not found
- `500 Server Error` — Database error

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message",
  "statusCode": 400,
  "timestamp": "2024-07-13T10:35:00Z"
}
```

### Common Errors

**400 Bad Request**
```json
{
  "error": "Name is required",
  "statusCode": 400
}
```

**404 Not Found**
```json
{
  "error": "Contact not found",
  "statusCode": 404
}
```

**500 Server Error**
```json
{
  "error": "Internal server error",
  "statusCode": 500
}
```

---

## Contact Model

### Schema

```typescript
interface Contact {
  _id: ObjectId;           // MongoDB ObjectId
  id?: ObjectId;           // Virtual field (same as _id)
  name: string;            // Required, 2-100 chars
  email?: string | null;   // Optional, valid email
  phone: string;           // Required, E.164 format
  isActive: boolean;       // Default: true
  createdAt: Date;         // Auto-generated
  updatedAt: Date;         // Auto-generated
}
```

### Phone Format (E.164)

E.164 is the international standard for phone numbers.

**Format:** `+<country_code><number>`

**Examples:**
- USA: `+1-201-555-0123`
- UK: `+44-20-7946-0958`
- Egypt: `+20-100-123-4567`
- Spain: `+34-91-123-4567`

---

## CORS Configuration

Frontend is allowed from:
- `http://127.0.0.1:9887`
- `http://localhost:4200`
- `http://localhost:9887`

To add more origins, update `backend/server.js`:

```javascript
const corsOptions = {
  origin: ['http://your-domain.com', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
};
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider using:

```bash
npm install express-rate-limit
```

---

## Database

**Provider:** MongoDB Atlas (Cloud)

**URI Format:**
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

**Seed Data:**
```bash
npm run seed
```

This creates 12 sample contacts including names, emails, and phone numbers.

---

## Deployment

### Environment Variables

```env
NODE_ENV=production
PORT=5001
MONGODB_URI=<production-mongodb-uri>
```

### Running in Production

```bash
npm install --production
NODE_ENV=production npm start
```

---

## Testing API with cURL

### Get all contacts

```bash
curl http://localhost:5001/api/Contacts
```

### Create contact

```bash
curl -X POST http://localhost:5001/api/Contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-201-555-0123",
    "isActive": true
  }'
```

### Delete contact

```bash
curl -X DELETE http://localhost:5001/api/Contacts/507f1f77bcf86cd799439011
```

---

## Future Enhancements

- [ ] Update/PUT endpoint for editing contacts
- [ ] Authentication (JWT tokens)
- [ ] Rate limiting
- [ ] Request validation middleware
- [ ] Pagination on GET /Contacts
- [ ] Search query parameters
- [ ] File upload support (profile pictures)
- [ ] Activity logging
