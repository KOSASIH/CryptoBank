// src/core/networking/messageQueue.js

class MessageQueue {
    constructor() {
        this.queue = []; // Array to hold messages
        this.processing = false; // Flag to indicate if processing is in progress
    }

    // Method to add a message to the queue
    enqueue(message) {
        this.queue.push(message);
        console.log('Message added to queue:', message);
        this.processQueue(); // Start processing the queue
    }

    // Method to process messages in the queue
    async processQueue() {
        if (this.processing) return; // Prevent concurrent processing
        this.processing = true;

        while (this.queue.length > 0) {
            const message = this.queue.shift(); // Get the next message
            await this.handleMessage(message); // Process the message
        }

        this.processing = false; // Reset processing flag
    }

    // Method to handle a message (to be implemented by the user)
    async handleMessage(message) {
        // Simulate message processing (replace with actual logic)
        console.log('Processing message:', message);
        return new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async processing
    }
}

module.exports = MessageQueue;
