// src/services/notificationService.js

const nodemailer = require('nodemailer');

class NotificationService {
    constructor(emailConfig) {
        this.transporter = nodemailer.createTransport(emailConfig); // Configure the email transporter
    }

    // Method to send an email notification
    async sendEmail(to, subject, text) {
        const mailOptions = {
            from: '"CryptoBank" <no-reply@cryptobank.com>', // Sender address
            to, // Recipient address
            subject, // Subject line
            text, // Plain text body
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent:', info.messageId);
        } catch (error) {
            this.handleError(error);
        }
    }

    // Method to handle errors
    handleError(error) {
        console.error('Notification Service Error:', error.message);
        throw new Error('Notification sending failed'); // Throw a generic error
    }
}

module.exports = NotificationService;
