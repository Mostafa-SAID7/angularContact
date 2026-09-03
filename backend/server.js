require('dotenv').config();
const express = require('express');
const cors = require('cors');

const contactsRouter = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 5001;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://127.0.0.1:9887',
    'http://localhost:9887',
    'http://localhost:4200',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/Contacts', contactsRouter);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', db: 'mock-in-memory' }));

// 404 catch-all
app.use((req, res) => res.status(404).json({ message: `Route ${req.method} ${req.path} not found` }));

// ── Start Server ────────────────────────────────────────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log('✅  Connected to in-memory database (mock mode)');
    console.log(`🚀  Server running at http://localhost:${PORT}`);
    console.log(`📋  Contacts API  → http://localhost:${PORT}/api/Contacts`);
    console.log(`❤️   Health check  → http://localhost:${PORT}/health`);
  });
}

module.exports = app;
