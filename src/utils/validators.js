// src/utils/validators.js

/**
 * Validates an email address format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates a cryptocurrency address format.
 * @param {string} address - The cryptocurrency address to validate.
 * @returns {boolean} - Returns true if the address is valid, otherwise false.
 */
function validateCryptoAddress(address) {
    // Example validation for Ethereum addresses (0x followed by 40 hex characters)
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    return addressRegex.test(address);
}

/**
 * Validates a positive number.
 * @param {number} amount - The amount to validate.
 * @returns {boolean} - Returns true if the amount is a positive number, otherwise false.
 */
function validatePositiveNumber(amount) {
    return typeof amount === 'number' && amount > 0;
}

/**
 * Validates a string to ensure it is not empty.
 * @param {string} str - The string to validate.
 * @returns {boolean} - Returns true if the string is not empty, otherwise false.
 */
function validateNonEmptyString(str) {
    return typeof str === 'string' && str.trim().length > 0;
}

/**
 * Validates a transaction object.
 * @param {object} transaction - The transaction object to validate.
 * @returns {boolean} - Returns true if the transaction is valid, otherwise false.
 */
function validateTransaction(transaction) {
    const { sender, receiver, amount } = transaction;
    return (
        validateCryptoAddress(sender) &&
        validateCryptoAddress(receiver) &&
        validatePositiveNumber(amount)
    );
}

module.exports = {
    validateEmail,
    validateCryptoAddress,
    validatePositiveNumber,
    validateNonEmptyString,
    validateTransaction,
};
