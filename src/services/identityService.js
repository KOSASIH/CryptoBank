// src/services/identityService.js

const crypto = require('crypto');

class IdentityService {
    constructor() {
        this.identities = new Map(); // Store identities in a Map for quick access
    }

    // Method to create a new identity
    createIdentity(username, email) {
        if (this.identities.has(username)) {
            throw new Error('Identity already exists');
        }

        // Generate a unique identifier for the identity
        const identityId = this.generateIdentityId(username, email);
        const identity = {
            id: identityId,
            username,
            email,
            createdAt: new Date().toISOString(),
        };

        this.identities.set(username, identity); // Store the identity
        return identity; // Return the created identity
    }

    // Method to retrieve an identity by username
    getIdentity(username) {
        const identity = this.identities.get(username);
        if (!identity) {
            throw new Error('Identity not found');
        }
        return identity; // Return the found identity
    }

    // Method to update an identity
    updateIdentity(username, newEmail) {
        const identity = this.getIdentity(username);
        identity.email = newEmail; // Update the email
        return identity; // Return the updated identity
    }

    // Method to delete an identity
    deleteIdentity(username) {
        const identity = this.identities.get(username);
        if (!identity) {
            throw new Error('Identity not found');
        }
        this.identities.delete(username); // Remove the identity
        return identity; // Return the deleted identity
    }

    // Method to generate a unique identity ID
    generateIdentityId(username, email) {
        const hash = crypto.createHash('sha256');
        hash.update(`${username}-${email}-${Date.now()}`); // Create a unique hash
        return hash.digest('hex'); // Return the hash as a hexadecimal string
    }
}

module.exports = IdentityService;
