// src/tests/unit/multisig.test.js

const { expect } = require('chai');
const MultiSigWallet = require('../../path/to/your/multisig'); // Adjust the path accordingly

describe('MultiSigWallet', () => {
    let wallet;

    beforeEach(() => {
        wallet = new MultiSigWallet(['address1', 'address2', 'address3'], 2); // 2 of 3 required
    });

    it('should allow adding a transaction', () => {
        const tx = wallet.addTransaction('address4', 100);
        expect(tx.amount).to.equal(100);
        expect(wallet.transactions).to.include(tx);
    });

    it('should require approvals for a transaction', () => {
        const tx = wallet.addTransaction('address4', 100);
        wallet.approveTransaction(tx.id, 'address1');
        expect(tx.approvals).to.include('address1');
        expect(tx.approvals.length).to.equal(1);
    });

    // Add more tests as needed
});
