// src/services/dataIntegrityService.js

const crypto = require('crypto');

class DataIntegrityService {
    constructor() {
        this.dataStore = new Map(); // Store data with integrity checks
    }

    // Method to add data with integrity check
    addData(key, data) {
        const hash = this.generateHash(data);
        this.dataStore.set(key, { data, hash });
    }

    // Method to verify data integrity
    verifyData(key) {
        const entry = this.dataStore.get(key);
        if (!entry) {
            throw new Error('Data not found');
        }

        const { data, hash } = entry;
        const currentHash = this.generateHash(data);
        return currentHash === hash; // Return true if data is intact
    }

    // Method to generate a hash for data
    generateHash(data) {
        return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
    }
}

module.exports = DataIntegrityService;
