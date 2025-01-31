// src/utils/cache.js

const NodeCache = require('node-cache');

// Create a new cache instance with a default TTL of 1 hour (3600 seconds)
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

// Function to set a value in the cache
function setCache(key, value) {
    cache.set(key, value);
}

// Function to get a value from the cache
function getCache(key) {
    return cache.get(key);
}

// Function to delete a value from the cache
function deleteCache(key) {
    cache.del(key);
}

// Function to flush the entire cache
function flushCache() {
    cache.flushAll();
}

// Function to get cache statistics
function getCacheStats() {
    return {
        keys: cache.keys(),
        stats: cache.getStats(),
    };
}

module.exports = {
    setCache,
    getCache,
    deleteCache,
    flushCache,
    getCacheStats,
};
