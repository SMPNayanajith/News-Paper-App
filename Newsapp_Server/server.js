const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');


app.use(bodyparser.json());

const corsOptions = {
    origin: 'http://localhost:3000', // Allow request frrom your frontend
}
app.use(cors(corsOptions));

//serve files from the upload directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//make sure u have upload fokder
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}
app.use('/uploads', express.static((uploadDir)));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Database and models
require('./db');
require('./models/Reader');
require('./models/Reporter');
require('./models/AuthUser');
require('./models/Articles');
require('./models/Draft');


// Routes
const authRoutes = require('./auth/authRoutes');
app.use('/auth', authRoutes); // Prefix all auth routes with /auth

// Example route for testing
app.get('/test', (req, res) => {
    res.json({ message: 'Test route working!' });
});

// Catch all routes for handling requests to invalid routes
app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

// Error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ error: error.message });
});