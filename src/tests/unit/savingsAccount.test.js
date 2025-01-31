// src/tests/unit/savingsAccount.test.js

const { expect } = require('chai');
const SavingsAccount = require('../../path/to/your/savingsAccount'); // Adjust the path accordingly

describe('SavingsAccount', () => {
    let savingsAccount;

    beforeEach(() => {
        savingsAccount = new SavingsAccount();
    });

    it('should deposit funds correctly', () => {
        savingsAccount.deposit(100);
        expect(savingsAccount.balance).to.equal(100);
    });

    it('should withdraw funds correctly', () => {
        savingsAccount.deposit(100);
        savingsAccount.withdraw(50);
        expect(savingsAccount.balance).to.equal(50);
    });

    it('should not allow withdrawal exceeding balance', () => {
        savingsAccount.deposit(100);
        expect(() => savingsAccount.withdraw(150)).to.throw('Insufficient funds');
    });

    // Add more tests as needed
});
