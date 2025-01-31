// src/tests/e2e/performance.test.js

const { expect } = require('chai');
const { performance } = require('perf_hooks');
const request = require('supertest');
const app = require('../../path/to/your/app'); // Adjust the path to your Express app

describe('Performance Tests', () => {
    it('should respond to the transaction creation endpoint within acceptable time', async () => {
        const transactionData = {
            sender: '0xSenderAddress',
            receiver: '0xReceiverAddress',
            amount: 100,
        };

        const start = performance.now();
        const res = await request(app).post('/api/transactions').send(transactionData);
        const end = performance.now();

        expect(res.status).to.equal(201);
        expect(end - start).to.be.below(200); // Expect response time to be below 200ms
    });

    // Add more performance tests as needed
});
