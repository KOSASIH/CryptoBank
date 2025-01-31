// src/tests/unit/blockchain.test.js

const { expect } = require('chai');
const Blockchain = require('../../path/to/your/blockchain'); // Adjust the path accordingly

describe('Blockchain', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    it('should create a new block', () => {
        const previousBlock = blockchain.getLatestBlock();
        const newBlock = blockchain.createNewBlock('testData');

        expect(newBlock.index).to.equal(previousBlock.index + 1);
        expect(newBlock.previousHash).to.equal(previousBlock.hash);
    });

    it('should validate a valid chain', () => {
        const isValid = blockchain.isChainValid(blockchain.chain);
        expect(isValid).to.be.true;
    });

    // Add more tests as needed
});
