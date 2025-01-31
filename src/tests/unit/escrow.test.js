// src/tests/unit/escrow.test.js

const { expect } = require('chai');
const Escrow = require('../../path/to/your/escrow'); // Adjust the path accordingly

describe('Escrow', () => {
    let escrow;

    beforeEach(() => {
        escrow = new Escrow('buyerAddress', 'sellerAddress', 100);
    });

    it('should release funds to the seller', () => {
        escrow.releaseFunds();
        expect(escrow.status).to.equal('completed');
        expect(escrow.fundsReleased).to.be.true;
    });

    it('should allow dispute resolution', () => {
        escrow.raiseDispute();
        expect(escrow.status).to.equal('disputed');
    });

    // Add more tests as needed
});
