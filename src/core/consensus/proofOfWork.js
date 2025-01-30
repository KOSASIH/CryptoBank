// src/core/consensus/proofOfWork.js

const crypto = require('crypto');

class ProofOfWork {
    constructor(difficulty) {
        this.difficulty = difficulty; // Difficulty level for mining
        this.prefix = '0'.repeat(difficulty); // Required prefix for the hash
    }

    // Method to calculate the hash of a block
    calculateHash(block) {
        const blockString = JSON.stringify(block);
        return crypto.createHash('sha256').update(blockString).digest('hex');
    }

    // Method to mine a block
    mineBlock(block) {
        let nonce = 0; // Nonce value to be incremented
        let hash = this.calculateHash({ ...block, nonce });

        // Keep incrementing nonce until the hash meets the difficulty requirement
        while (!hash.startsWith(this.prefix)) {
            nonce++;
            hash = this.calculateHash({ ...block, nonce });
        }

        console.log(`Block mined: ${hash}`);
        return { hash, nonce };
    }
}

module.exports = ProofOfWork;
