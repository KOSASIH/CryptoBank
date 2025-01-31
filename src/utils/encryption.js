// src/utils/encryption.js

const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc'; // Encryption algorithm
const IV_LENGTH = 16; // Initialization vector length

/**
 * Encrypts a given text using AES-256-CBC encryption.
 * @param {string} text - The text to encrypt.
 * @param {string} key - The encryption key (must be 32 bytes).
 * @returns {string} - The encrypted text in base64 format.
 */
function encrypt(text, key) {
    // Generate a random initialization vector
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    // Return the IV and encrypted text concatenated
    return iv.toString('hex') + ':' + encrypted;
}

/**
 * Decrypts a given encrypted text using AES-256-CBC decryption.
 * @param {string} encryptedText - The encrypted text in base64 format.
 * @param {string} key - The decryption key (must be 32 bytes).
 * @returns {string} - The decrypted text.
 */
function decrypt(encryptedText, key) {
    const parts = encryptedText.split(':');
    const iv = Buffer.from(parts.shift(), 'hex'); // Extract the IV
    const encryptedTextBuffer = Buffer.from(parts.join(':'), 'base64');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key, 'hex'), iv);
    let decrypted = decipher.update(encryptedTextBuffer, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = {
    encrypt,
    decrypt,
};
