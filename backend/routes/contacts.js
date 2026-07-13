const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET /api/Contacts — return all contacts, newest first
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error('GET /api/Contacts error:', err);
    res.status(500).json({ message: 'Failed to fetch contacts', error: err.message });
  }
});

// GET /api/Contacts/:id — single contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    console.error('GET /api/Contacts/:id error:', err);
    res.status(500).json({ message: 'Failed to fetch contact', error: err.message });
  }
});

// POST /api/Contacts — create contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, isActive } = req.body;

    const contact = new Contact({
      name,
      email: email || null,
      phone,
      isActive: isActive !== undefined ? isActive : true,
    });

    const saved = await contact.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('POST /api/Contacts error:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', errors: err.errors });
    }
    res.status(500).json({ message: 'Failed to create contact', error: err.message });
  }
});

// PUT /api/Contacts/:id — update contact
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, isActive } = req.body;
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email: email || null, phone, isActive },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Contact not found' });
    res.json(updated);
  } catch (err) {
    console.error('PUT /api/Contacts/:id error:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', errors: err.errors });
    }
    res.status(500).json({ message: 'Failed to update contact', error: err.message });
  }
});

// DELETE /api/Contacts/:id — delete contact
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Contact not found' });
    // return the deleted doc so Angular's `res !== null` check passes
    res.json(deleted);
  } catch (err) {
    console.error('DELETE /api/Contacts/:id error:', err);
    res.status(500).json({ message: 'Failed to delete contact', error: err.message });
  }
});

module.exports = router;
