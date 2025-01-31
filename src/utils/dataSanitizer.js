// src/utils/dataSanitizer.js

const sanitizeHtml = require('sanitize-html');

/**
 * Sanitizes a string to prevent XSS attacks.
 * @param {string} input - The input string to sanitize.
 * @returns {string} - The sanitized string.
 */
function sanitizeString(input) {
    return sanitizeHtml(input, {
        allowedTags: [], // No HTML tags allowed
        allowedAttributes: {},
    });
}

/**
 * Sanitizes an object by sanitizing each string property.
 * @param {object} obj - The object to sanitize.
 * @returns {object} - The sanitized object.
 */
function sanitizeObject(obj) {
    const sanitizedObj = {};
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            sanitizedObj[key] = sanitizeString(obj[key]);
        } else {
            sanitizedObj[key] = obj[key]; // Keep non-string properties unchanged
        }
    }
    return sanitizedObj;
}

module.exports = {
    sanitizeString,
    sanitizeObject,
};
