// src/utils/rateLimiter.js

const rateLimit = require('express-rate-limit');

/**
 * Creates a rate limiter middleware for Express applications.
 * @param {number} windowMs - The time frame for which requests are checked (in milliseconds).
 * @param {number} max - The maximum number of requests allowed within the time frame.
 * @returns {function} - The rate limiter middleware function.
 */
function createRateLimiter(windowMs, max) {
    return rateLimit({
        windowMs, // Time frame for which requests are checked
        max, // Limit each IP to max requests per windowMs
        message: 'Too many requests, please try again later.', // Response message when limit is exceeded
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
}

module.exports = createRateLimiter;
