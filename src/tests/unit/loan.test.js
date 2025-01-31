// src/tests/unit/loan.test.js

const { expect } = require('chai');
const Loan = require('../../path/to/your/loan'); // Adjust the path accordingly

describe('Loan', () => {
    let loan;

    beforeEach(() => {
        loan = new Loan(1000, 5, 12); // Principal, interest rate, term
    });

    it('should calculate monthly payment correctly', () => {
        const payment = loan.calculateMonthlyPayment();
        expect(payment).to.be.closeTo(85.61, 0.01); // Example expected value
    });

    it('should allow repayment of the loan', () => {
        loan.repay(500);
        expect(loan.remainingBalance).to.equal(500);
    });

    // Add more tests as needed
});
