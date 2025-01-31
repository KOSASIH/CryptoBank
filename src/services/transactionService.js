// src/services/transactionService.js

class TransactionService {
    constructor() {
        this.transactions = []; // Store transactions
    }

    // Method to create a new transaction
    createTransaction(sender, receiver, amount) {
        const transaction = {
            id: this.transactions.length + 1,
            sender,
            receiver,
            amount,
            timestamp: new Date().toISOString(),
            status: 'pending',
        };

        this.transactions.push(transaction); // Add transaction to the list
        return transaction; // Return the created transaction
    }

    // Method to process a transaction
    processTransaction(transactionId) {
        const transaction = this.transactions.find(tx => tx.id === transactionId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }

        // Simulate transaction processing logic
        transaction.status = 'completed'; // Update status to completed
        return transaction; // Return the processed transaction
    }

    // Method to get transaction history
    getTransactionHistory() {
        return this.transactions; // Return all transactions
    }
}

module.exports = TransactionService;
