// src/core/logging/logger.js

const fs = require('fs');
const path = require('path');
const logFormatter = require('./logFormatter');

class Logger {
    constructor(logFilePath) {
        this.logFilePath = logFilePath || path.join(__dirname, 'application.log');
        this.createLogFile();
    }

    // Method to create the log file if it doesn't exist
    createLogFile() {
        fs.open(this.logFilePath, 'a', (err) => {
            if (err) {
                console.error('Error creating log file:', err);
            }
        });
    }

    // Method to log an info message
    info(message) {
        this.log('INFO', message);
    }

    // Method to log a warning message
    warn(message) {
        this.log('WARN', message);
    }

    // Method to log an error message
    error(message) {
        this.log('ERROR', message);
    }

    // Method to log a message with a specific level
    log(level, message) {
        const formattedMessage = logFormatter.format(level, message);
        fs.appendFile(this.logFilePath, formattedMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });
        console.log(formattedMessage); // Also log to console
    }
}

module.exports = new Logger();
