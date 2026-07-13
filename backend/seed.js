/**
 * Seed script — populates MongoDB with 12 realistic sample contacts.
 * Run: npm run seed  (from the backend/ directory)
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Contact = require('./models/Contact');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI is not set. Check backend/.env');
  process.exit(1);
}

const seeds = [
  {
    name: 'Mostafa Said',
    email: 'm.ssaid356@gmail.com',
    phone: '+201001234567',
    isActive: true,
  },
  {
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    phone: '+201112345678',
    isActive: true,
  },
  {
    name: 'Sara El-Shafei',
    email: 'sara.elshafei@example.com',
    phone: '+201223456789',
    isActive: true,
  },
  {
    name: 'Omar Khalil',
    email: 'omar.khalil@example.com',
    phone: '+201334567890',
    isActive: false,
  },
  {
    name: 'Nour Abdelrahman',
    email: 'nour.abdelrahman@example.com',
    phone: '+201445678901',
    isActive: true,
  },
  {
    name: 'Youssef Magdy',
    email: null,
    phone: '+201556789012',
    isActive: true,
  },
  {
    name: 'Layla Ibrahim',
    email: 'layla.ibrahim@example.com',
    phone: '+201667890123',
    isActive: false,
  },
  {
    name: 'Karim Nasser',
    email: 'karim.nasser@example.com',
    phone: '+201778901234',
    isActive: true,
  },
  {
    name: 'Dina Fawzy',
    email: 'dina.fawzy@example.com',
    phone: '+201889012345',
    isActive: true,
  },
  {
    name: 'Tarek Salah',
    email: null,
    phone: '+201990123456',
    isActive: false,
  },
  {
    name: 'Hana Mahmoud',
    email: 'hana.mahmoud@example.com',
    phone: '+201201234567',
    isActive: true,
  },
  {
    name: 'Ramy Adel',
    email: 'ramy.adel@example.com',
    phone: '+201312345678',
    isActive: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅  Connected to MongoDB Atlas');

    // Clear existing contacts first
    const deleted = await Contact.deleteMany({});
    console.log(`🗑️   Cleared ${deleted.deletedCount} existing contacts`);

    // Insert seeds
    const inserted = await Contact.insertMany(seeds);
    console.log(`🌱  Inserted ${inserted.length} contacts:`);
    inserted.forEach((c) => console.log(`   • ${c.name} — ${c.phone} [${c.isActive ? 'active' : 'inactive'}]`));

    console.log('\n✅  Seed complete!');
  } catch (err) {
    console.error('❌  Seed failed:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌  Disconnected from MongoDB');
  }
}

seed();
