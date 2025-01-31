// src/core/stateManagement.js

class StateManagement {
    constructor() {
        this.chain = []; // Array to hold the blockchain
        this.currentTransactions = []; // Array to hold the current transaction pool
    }

    // Method to add a new block to the blockchain
    addBlock(block) {
        this.chain.push(block);
        console.log('Block added to the chain:', block);
    }

    // Method to get the latest block in the blockchain
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Method to create a new transaction and add it to the pool
    createTransaction(sender, recipient, amount) {
        const transaction = {
            sender,
            recipient,
            amount,
            timestamp: Date.now(),
        };
        this.currentTransactions.push(transaction);
        console.log('Transaction added to the pool:', transaction);
        return transaction;
    }

    // Method to get all transactions in the pool
    getTransactions() {
        return this.currentTransactions;
    }

    // Method to clear the transaction pool after a block is mined
    clearTransactions() {
        this.currentTransactions = [];
        console.log('Transaction pool cleared.');
    }

    // Method to get the entire blockchain
    getChain() {
        return this.chain;
    }

    // Method to get the number of blocks in the blockchain
    getBlockCount() {
        return this.chain.length;
    }

    // Method to validate the blockchain (basic validation)
    validateChain() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Check if the previous hash matches
            if (currentBlock.previousHash !== this.hashBlock(previousBlock)) {
                console.error('Blockchain is invalid: Previous hash does not match.');
                return false;
            }

            // Additional validation checks can be added here
        }
        console.log('Blockchain is valid.');
        return true;
    }

    // Method to hash a block (simple hash function for demonstration)
    hashBlock(block) {
        const blockString = JSON.stringify(block);
        return require('crypto').createHash('sha256').update(blockString).digest('hex');
    }
}

module.exports = StateManagement;
