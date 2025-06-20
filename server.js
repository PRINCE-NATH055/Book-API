const express = require('express');
const path = require('path');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middleware
app.use(express.json());

// API Routes
app.use('/api/books', bookRoutes);

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'frontend')));

// No wildcard route here to avoid path-to-regexp bug

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
