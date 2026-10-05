import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import Contact from './models/Contact.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.post('/api/contacts', async (request, response) => {
  const { name, phone, email } = request.body ?? {};

  if (![name, phone, email].every((value) => typeof value === 'string' && value.trim())) {
    return response.status(400).json({ message: 'Please provide your name, phone number, and email address.' });
  }

  const cleanName = name.trim();
  const cleanPhone = phone.trim();
  const cleanEmail = email.trim().toLowerCase();
  const digitCount = cleanPhone.replace(/\D/g, '').length;

  if (cleanName.length > 100 || cleanPhone.length > 30 || cleanEmail.length > 254 || digitCount < 7 || digitCount > 20) {
    return response.status(400).json({ message: 'Please check your details and try again.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return response.status(400).json({ message: 'Please enter a valid email address.' });
  }

  try {
    const contact = await Contact.create({ name: cleanName, phone: cleanPhone, email: cleanEmail });
    return response.status(201).json({ message: 'Contact saved.', contact: { id: contact.id } });
  } catch (error) {
    console.error('Unable to save contact:', error.message);
    return response.status(500).json({ message: 'We could not save your details. Please try again.' });
  }
});

async function startServer() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing. Add it to your .env file.');
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB || 'mobilapplic',
  });
  app.listen(port, () => console.log(`mobilapplic API listening on http://localhost:${port}`));
}

startServer().catch((error) => {
  console.error(`Could not start mobilapplic API: ${error.message}`);
  process.exit(1);
});
