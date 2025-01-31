// src/tests/e2e/userJourney.test.js

const request = require('supertest');
const { expect } = require('chai');
const app = require('../../path/to/your/app'); // Adjust the path to your Express app

describe('User  Journey End-to-End Tests', () => {
    let userToken;

    before(async () => {
        // Simulate user registration and login to obtain a token
        const registerResponse = await request(app)
            .post('/api/register')
            .send({ username: 'testuser', password: 'password123' });
        
        expect(registerResponse.status).to.equal(201);

        const loginResponse = await request(app)
            .post('/api/login')
            .send({ username: 'testuser', password: 'password123' });
        
        expect(loginResponse.status).to.equal(200);
        userToken = loginResponse.body.token; // Store the token for authenticated requests
    });

    it('should allow the user to create a transaction', async () => {
        const transactionData = {
            receiver: '0xReceiverAddress',
            amount: 100,
        };

        const res = await request(app)
            .post('/api/transactions')
            .set('Authorization', `Bearer ${userToken}`)
            .send(transactionData);
        
        expect(res.status).to.equal(201);
        expect(res.body).to.include(transactionData);
    });

    it('should allow the user to view transaction history', async () => {
        const res = await request(app)
            .get('/api/transactions')
            .set('Authorization', `Bearer ${userToken}`);
        
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    // Add more user journey tests as needed
});
