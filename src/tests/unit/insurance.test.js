// src/tests/unit/insurance.test.js

const { expect } = require('chai');
const Insurance = require('../../path/to/your/insurance'); // Adjust the path accordingly

describe('Insurance', () => {
    let insurance;

    beforeEach(() => {
        insurance = new Insurance('policyHolderAddress', 1000);
    });

    it('should create a new insurance policy', () => {
        expect(insurance.policyHolder).to.equal('policyHolderAddress');
        expect(insurance.coverageAmount).to.equal(1000);
    });

    it('should process a claim', () => {
        insurance.processClaim(500);
        expect(insurance.claimsProcessed).to.include(500);
        expect(insurance.remainingCoverage).to.equal(500);
    });

    // Add more tests as needed
});
