const express = require('express');
const router = express.Router();
const db = require('../db'); // Use in-memory DB mock

// GET /api/Contacts — return all contacts, newest first
router.get('/', async (req, res) => {
  try {
    const contacts = await db.getAll();
    res.json(contacts);
  } catch (err) {
    console.error('GET /api/Contacts error:', err);
    res.status(500).json({ message: 'Failed to fetch contacts', error: err.message });
  }
});

// GET /api/Contacts/:id — single contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await db.getById(req.params.id);
    res.json(contact);
  } catch (err) {
    console.error('GET /api/Contacts/:id error:', err);
    res.status(404).json({ message: 'Contact not found' });
  }
});

// POST /api/Contacts — create contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, isActive } = req.body;

    // Validation
    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }

    const contact = await db.create({
      name,
      email: email || null,
      phone,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json(contact);
  } catch (err) {
    console.error('POST /api/Contacts error:', err);
    res.status(500).json({ message: 'Failed to create contact', error: err.message });
  }
});

// PUT /api/Contacts/:id — update contact
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, isActive } = req.body;
    const updated = await db.update(req.params.id, {
      name,
      email: email || null,
      phone,
      isActive,
    });
    res.json(updated);
  } catch (err) {
    console.error('PUT /api/Contacts/:id error:', err);
    res.status(404).json({ message: 'Contact not found' });
  }
});

// DELETE /api/Contacts/:id — delete contact
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await db.delete(req.params.id);
    res.json(deleted);
  } catch (err) {
    console.error('DELETE /api/Contacts/:id error:', err);
    res.status(404).json({ message: 'Contact not found' });
  }
});

module.exports = router;
