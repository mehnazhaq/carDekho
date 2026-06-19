require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or CURL)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    },
    credentials: true,
  })
);
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB using a separate config file
const connectDB = require('./config/db');
if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.warn('⚠️ MONGO_URI not set – running without DB connection (using static data).');
}

// Routes
const carRoutes = require('./routes/cars');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Simple health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', timestamp: new Date() }));

app.listen(PORT, () => {
  console.log(`🚀 Server listening on https://cardekho-1-i552.onrender.com:${PORT}`);
});
