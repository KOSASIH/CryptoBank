// src/tests/integration/api.test.js

const request = require('supertest');
const { expect } = require('chai');
const app = require('../../path/to/your/app'); // Adjust the path to your Express app

describe('API Integration Tests', () => {
    it('should return a list of transactions', async () => {
        const res = await request(app).get('/api/transactions');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('should create a new transaction', async () => {
        const transactionData = {
            sender: '0xSenderAddress',
            receiver: '0xReceiverAddress',
            amount: 100,
        };

        const res = await request(app).post('/api/transactions').send(transactionData);
        expect(res.status).to.equal(201);
        expect(res.body).to.include(transactionData);
    });

    it('should return 404 for non-existent endpoint', async () => {
        const res = await request(app).get('/api/non-existent');
        expect(res.status).to.equal(404);
    });

    // Add more tests for other API endpoints as needed
});
