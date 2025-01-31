// src/utils/config.js

require('dotenv').config(); // Load environment variables from .env file

const config = {
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/cryptobank',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    CACHE_TTL: process.env.CACHE_TTL || 3600, // Cache time-to-live in seconds
};

module.exports = config;
