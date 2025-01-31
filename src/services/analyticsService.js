// src/services/analyticsService.js

class AnalyticsService {
    constructor() {
        // Initialize any necessary properties or configurations
        this.events = []; // Array to store tracked events
    }

    // Method to track an event
    trackEvent(eventName, properties = {}) {
        const event = {
            name: eventName,
            properties: {
                ...properties,
                timestamp: new Date().toISOString(), // Add a timestamp to the event
            },
        };

        this.events.push(event); // Store the event in the array
        console.log('Event tracked:', event); // Log the event for debugging

        // Optionally, send the event to an external analytics service
        // this.sendToAnalyticsService(event);
    }

    // Method to send events to an external analytics service (optional)
    async sendToAnalyticsService(event) {
        try {
            // Example: Send the event to an external API
            const response = await fetch('https://api.analytics-service.com/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            });

            if (!response.ok) {
                throw new Error('Failed to send event to analytics service');
            }

            console.log('Event sent to analytics service:', event);
        } catch (error) {
            console.error('Analytics Service Error:', error.message);
        }
    }

    // Method to get tracked events (for debugging or reporting)
    getTrackedEvents() {
        return this.events; // Return the array of tracked events
    }
}

module.exports = AnalyticsService;
