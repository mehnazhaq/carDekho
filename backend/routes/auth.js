// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Simple in‑memory user store (fallback if no DB model)
let User;
try {
  User = require('../models/User');
} catch (_) {
  const users = [];
  User = {
    async findOne(query) {
      return users.find(u => u.email === query.email);
    },
    async create(data) {
      const newUser = { id: users.length + 1, ...data };
      users.push(newUser);
      return newUser;
    },
  };
}

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// Register endpoint
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: 'Email already used' });
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, passwordHash: hash });
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user.id, name, email } });
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email & password required' });
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user.id, name: user.name, email } });
});

module.exports = router;
