// src/tests/unit/investment.test.js

const { expect } = require('chai');
const Investment = require('../../path/to/your/investment'); // Adjust the path accordingly

describe('Investment', () => {
    let investment;

    beforeEach(() => {
        investment = new Investment();
    });

    it('should add an investment correctly', () => {
        investment.addInvestment(1000);
        expect(investment.totalInvested).to.equal(1000);
    });

    it('should calculate returns correctly', () => {
        investment.addInvestment(1000);
        investment.setReturnRate(0.05); // 5% return
        const returns = investment.calculateReturns();
        expect(returns).to.equal(50);
    });

    // Add more tests as needed
});
