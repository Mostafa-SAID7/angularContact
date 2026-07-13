/**
 * In-memory database mock (for testing when MongoDB is unavailable)
 * Replace with real Mongoose connection when MongoDB is accessible
 */

let contacts = [
  {
    _id: '66a1b2c3d4e5f6g7h8i9j0k1',
    id: '66a1b2c3d4e5f6g7h8i9j0k1',
    name: 'Mostafa Said',
    email: 'm.ssaid356@gmail.com',
    phone: '+201001234567',
    isActive: true,
  },
  {
    _id: '66a1b2c3d4e5f6g7h8i9j0k2',
    id: '66a1b2c3d4e5f6g7h8i9j0k2',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    phone: '+201112345678',
    isActive: true,
  },
  {
    _id: '66a1b2c3d4e5f6g7h8i9j0k3',
    id: '66a1b2c3d4e5f6g7h8i9j0k3',
    name: 'Sara El-Shafei',
    email: 'sara.elshafei@example.com',
    phone: '+201223456789',
    isActive: true,
  },
  {
    _id: '66a1b2c3d4e5f6g7h8i9j0k4',
    id: '66a1b2c3d4e5f6g7h8i9j0k4',
    name: 'Omar Khalil',
    email: 'omar.khalil@example.com',
    phone: '+201334567890',
    isActive: false,
  },
  {
    _id: '66a1b2c3d4e5f6g7h8i9j0k5',
    id: '66a1b2c3d4e5f6g7h8i9j0k5',
    name: 'Nour Abdelrahman',
    email: 'nour.abdelrahman@example.com',
    phone: '+201445678901',
    isActive: true,
  },
  {
    _id: '66a1b2c3d4e5f6g7h8i9j0k6',
    id: '66a1b2c3d4e5f6g7h8i9j0k6',
    name: 'Youssef Magdy',
    email: null,
    phone: '+201556789012',
    isActive: true,
  },
  {
    _id: '66a1b2c3d4e5f6g7h8i9j0k7',
    id: '66a1b2c3d4e5f6g7h8i9j0k7',
    name: 'Layla Ibrahim',
    email: 'layla.ibrahim@example.com',
    phone: '+201667890123',
    isActive: false,
  },
  {
    _id: '66a1b2c3d4e5f6g7h8i9j0k8',
    id: '66a1b2c3d4e5f6g7h8i9j0k8',
    name: 'Karim Nasser',
    email: 'karim.nasser@example.com',
    phone: '+201778901234',
    isActive: true,
  },
  {
    _id: '66a1b2c3d4e5f6g7h8i9j0k9',
    id: '66a1b2c3d4e5f6g7h8i9j0k9',
    name: 'Dina Fawzy',
    email: 'dina.fawzy@example.com',
    phone: '+201889012345',
    isActive: true,
  },
  {
    _id: '66a1b2c3d4e5f6g7h8i9j0ka',
    id: '66a1b2c3d4e5f6g7h8i9j0ka',
    name: 'Tarek Salah',
    email: null,
    phone: '+201990123456',
    isActive: false,
  },
  {
    _id: '66a1b2c3d4e5f6g7h8i9j0kb',
    id: '66a1b2c3d4e5f6g7h8i9j0kb',
    name: 'Hana Mahmoud',
    email: 'hana.mahmoud@example.com',
    phone: '+201201234567',
    isActive: true,
  },
  {
    _id: '66a1b2c3d4e5f6g7h8i9j0kc',
    id: '66a1b2c3d4e5f6g7h8i9j0kc',
    name: 'Ramy Adel',
    email: 'ramy.adel@example.com',
    phone: '+201312345678',
    isActive: true,
  },
];

let nextId = 13;

module.exports = {
  // GET all contacts
  getAll: () => {
    return Promise.resolve([...contacts].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)));
  },

  // GET by ID
  getById: (id) => {
    const contact = contacts.find(c => c._id === id || c.id === id);
    return contact ? Promise.resolve(contact) : Promise.reject(new Error('Not found'));
  },

  // CREATE
  create: (data) => {
    const id = `66a1b2c3d4e5f6g7h8i9j0k${nextId++}`;
    const newContact = {
      _id: id,
      id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    contacts.push(newContact);
    return Promise.resolve(newContact);
  },

  // UPDATE
  update: (id, data) => {
    const idx = contacts.findIndex(c => c._id === id || c.id === id);
    if (idx === -1) return Promise.reject(new Error('Not found'));
    
    contacts[idx] = { ...contacts[idx], ...data, updatedAt: new Date() };
    return Promise.resolve(contacts[idx]);
  },

  // DELETE
  delete: (id) => {
    const idx = contacts.findIndex(c => c._id === id || c.id === id);
    if (idx === -1) return Promise.reject(new Error('Not found'));
    
    const deleted = contacts.splice(idx, 1)[0];
    return Promise.resolve(deleted);
  },
};
