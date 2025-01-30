// src/core/index.js

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');
const apiRoutes = require('./routes/api');
const { connectToBlockchain } = require('./blockchain');
const { errorHandler } = require('./middleware/errorHandler');
const { config } = require('./configuration');

// Initialize Express app
const app = express();
const server = createServer(app);
const io = new Server(server);

// Middleware setup
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(morgan('combined')); // HTTP request logging

// Connect to MongoDB
mongoose.connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// Connect to the blockchain network
connectToBlockchain()
    .then(() => {
        console.log('Connected to the blockchain network');
    })
    .catch(err => {
        console.error('Blockchain connection error:', err);
    });

// API routes
app.use('/api', apiRoutes);

// WebSocket setup for real-time features
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Handle events
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = config.API_PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = { app, server, io };
