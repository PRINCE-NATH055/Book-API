const express = require('express');
const path = require('path');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(express.json());

app.use('/api/books', bookRoutes);

app.use(express.static(path.join(__dirname, 'frontend')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
