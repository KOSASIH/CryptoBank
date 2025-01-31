// src/core/eventEmitter.js

class EventEmitter {
    constructor() {
        this.events = {}; // Object to hold event listeners
    }

    // Method to register an event listener
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = []; // Create an array for the event if it doesn't exist
        }
        this.events[event].push(listener); // Add the listener to the event's array
        console.log(`Listener added for event: ${event}`);
    }

    // Method to emit an event, calling all registered listeners
    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => {
                listener(...args); // Call each listener with the provided arguments
            });
            console.log(`Event emitted: ${event}`);
        } else {
            console.warn(`No listeners for event: ${event}`);
        }
    }

    // Method to remove a specific listener for an event
    off(event, listener) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(l => l !== listener); // Remove the listener
            console.log(`Listener removed for event: ${event}`);
        }
    }

    // Method to remove all listeners for a specific event
    removeAllListeners(event) {
        if (this.events[event]) {
            delete this.events[event]; // Delete the event from the events object
            console.log(`All listeners removed for event: ${event}`);
        }
    }
}

module.exports = EventEmitter;
