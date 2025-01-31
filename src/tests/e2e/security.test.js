// src/tests/e2e/security.test.js

const request = require('supertest');
const { expect } = require('chai');
const app = require('../../path/to/your/app'); // Adjust the path to your Express app

describe('Security Tests', () => {
    it('should not allow SQL injection in login', async () => {
        const maliciousInput = {
            username: 'testuser"; DROP TABLE users; --',
            password: 'password123',
        };

        const res = await request(app).post('/api/login').send(maliciousInput);
        expect(res.status).to.equal(401); // Expect unauthorized access
    });

    it('should not allow XSS attacks in user input', async () => {
        const maliciousInput = {
            username: '<script>alert("XSS")</script>',
            password: 'password123',
        };

        const res = await request(app).post('/api/register').send(maliciousInput);
        expect(res.status).to.equal(400); // Expect bad request due to validation
    });

    // Add more security tests as needed
});
