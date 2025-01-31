// src/tests/unit/royalty.test.js

const { expect } = require('chai');
const Royalty = require('../../path/to/your/royalty'); // Adjust the path accordingly

describe('Royalty', () => {
    let royalty;

    beforeEach(() => {
        royalty = new Royalty();
    });

    it('should calculate royalty correctly', () => {
        royalty.setSalePrice(1000);
        royalty.setRoyaltyPercentage(10); // 10%
        const calculatedRoyalty = royalty.calculateRoyalty();
        expect(calculatedRoyalty).to.equal(100);
    });

    it('should distribute royalties to the correct addresses', () => {
        royalty.setSalePrice(1000);
        royalty.setRoyaltyPercentage(10);
        const recipients = ['artistAddress', 'platformAddress'];
        const distribution = royalty.distributeRoyalties(recipients);
        expect(distribution).to.deep.equal({
            artistAddress: 80, // 80% of the royalty
            platformAddress: 20 // 20% of the royalty
        });
    });

    // Add more tests as needed
});
