// cPanel default startup file
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Mathumi Backend API is running' });
});

// Mock routes based on frontend needs
app.get('/api/academy-courses', (req, res) => {
  res.json([]);
});

app.get('/api/bookings', (req, res) => {
  res.json([]);
});

app.get('/api/inquiries', (req, res) => {
  res.json([]);
});

app.get('/api/sarees', (req, res) => {
  res.json([]);
});

app.get('/api/salon-services', (req, res) => {
  res.json([]);
});

app.get('/api/gallery', (req, res) => {
  res.json([]);
});

app.get('/api/salon-categories', (req, res) => {
  res.json([]);
});

// Allow cPanel to assign the port via environment variables
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
