const express = require('express');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const connectdb = require('./db/dbconnect');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoute=require('./routes/reviewRoutes')
const watchlistRoute=require('./routes/watchlistRoute')

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;

// Enable CORS (configure origins as needed)
app.use(cors());

// Serve static files from React build (client)
app.use(express.static("./client/build"))
app.use(express.static("./build"))

// Serve uploaded videos & files with correct content-type

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(SECRET_KEY));

// Test route
app.get('/', (req, res) => {
  res.send('Backend is working');
});

// API routes
// NOTE: movieRoutes expects requests with videoUrl in body (no file uploads here)
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use("/api/reviews", reviewRoute);
app.use("/api/watchlist", watchlistRoute);

// Optional: Serve React app for unknown routes (SPA fallback)
// Uncomment if needed
/*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
*/

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
});

// Start server and connect DB
app.listen(PORT, () => {
  connectdb();
  console.log(`✅ Backend running at http://localhost:${PORT}.....`);
});
