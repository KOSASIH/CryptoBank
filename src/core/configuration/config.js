// src/core/configuration/config.js

const envConfig = require('./env');

const config = {
    // General application settings
    APP_NAME: 'CryptoBank',
    APP_VERSION: '1.0.0',
    API_PORT: process.env.API_PORT || 3000, // Default API port
    DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/cryptobank', // Default MongoDB URL

    // Logging settings
    LOG_LEVEL: process.env.LOG_LEVEL || 'info', // Default log level

    // Blockchain settings
    BLOCKCHAIN_URL: process.env.BLOCKCHAIN_URL || 'http://localhost:8545', // Default blockchain URL

    // Other settings can be added here
};

// Merge environment-specific configurations
const finalConfig = { ...config, ...envConfig };

module.exports = finalConfig;
