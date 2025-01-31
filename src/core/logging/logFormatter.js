// src/core/logging/logFormatter.js

class LogFormatter {
    // Method to format log messages
    format(level, message) {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] ${message}\n`;
    }
}

module.exports = new LogFormatter();
