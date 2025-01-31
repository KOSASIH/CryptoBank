// src/core/configuration/env.js

const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

const envConfig = {
    // Environment-specific settings can be defined here
    NODE_ENV: process.env.NODE_ENV || 'development', // Default to development
    API_PORT: process.env.API_PORT, // API port can be overridden
    DB_URL: process.env.DB_URL, // Database URL can be overridden
    BLOCKCHAIN_URL: process.env.BLOCKCHAIN_URL, // Blockchain URL can be overridden
    LOG_LEVEL: process.env.LOG_LEVEL, // Log level can be overridden
};

module.exports = envConfig;
