// src/utils/helpers.js

/**
 * Validates an email address format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates a cryptocurrency address format.
 * @param {string} address - The cryptocurrency address to validate.
 * @returns {boolean} - Returns true if the address is valid, otherwise false.
 */
function isValidCryptoAddress(address) {
    // Example validation for Ethereum addresses (0x followed by 40 hex characters)
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    return addressRegex.test(address);
}

/**
 * Formats a number to a specified decimal place.
 * @param {number} number - The number to format.
 * @param {number} decimalPlaces - The number of decimal places to keep.
 * @returns {string} - Returns the formatted number as a string.
 */
function formatNumber(number, decimalPlaces) {
    return number.toFixed(decimalPlaces);
}

/**
 * Generates a unique identifier (UUID).
 * @returns {string} - Returns a UUID string.
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Logs an error message to the console.
 * @param {Error} error - The error object to log.
 */
function logError(error) {
    console.error('Error:', error.message);
}

module.exports = {
    isValidEmail,
    isValidCryptoAddress,
    formatNumber,
    generateUUID,
    logError,
};
