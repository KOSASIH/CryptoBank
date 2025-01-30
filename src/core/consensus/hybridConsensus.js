// src/core/consensus/hybridConsensus.js

const ProofOfWork = require('./proofOfWork');
const ProofOfStake = require('./proofOfStake');

class HybridConsensus {
    constructor(totalSupply, difficulty, maxDelegates) {
        this.totalSupply = totalSupply; // Total supply of tokens in the network
        this.difficulty = difficulty; // Difficulty level for PoW
        this.maxDelegates = maxDelegates; // Maximum number of delegates for PoS
        this.poW = new ProofOfWork(this.difficulty); // Instance of Proof of Work
        this.poS = new ProofOfStake(this.totalSupply); // Instance of Proof of Stake
    }

    // Method to mine a block using Proof of Work
    mineBlock(block) {
        console.log('Mining block using Proof of Work...');
        const { hash, nonce } = this.poW.mineBlock(block);
        return { hash, nonce };
    }

    // Method to delegate stake to a validator using Proof of Stake
    delegateStake(delegateAddress, voterAddress, amount) {
        console.log(`Delegating stake to ${delegateAddress}...`);
        this.poS.delegateStake(delegateAddress, voterAddress, amount);
    }

    // Method to select a delegate using Proof of Stake
    selectDelegate() {
        console.log('Selecting delegate using Proof of Stake...');
        return this.poS.selectDelegate();
    }

    // Method to create a new block using the hybrid consensus mechanism
    createBlock(blockData, fromAddress) {
        // First, select a delegate using PoS
        const selectedDelegate = this.selectDelegate();

        // Then, mine the block using PoW
        const block = {
            data: blockData,
            delegate: selectedDelegate,
            timestamp: Date.now(),
        };

        const minedBlock = this.mineBlock(block);
        console.log(`Block created by delegate ${selectedDelegate}:`, minedBlock);
        return { ...minedBlock, delegate: selectedDelegate };
    }

    // Method to get the stakes of all delegates
    getDelegateStakes() {
        return this.poS.getDelegateStakes();
    }

    // Method to get the stakes of all voters
    getVoterStakes() {
        return this.poS.getVoterStakes();
    }
}

module.exports = HybridConsensus;
