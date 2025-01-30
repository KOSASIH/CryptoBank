// src/core/consensus/ByzantineFaultTolerance.js

class ByzantineFaultTolerance {
    constructor(validators) {
        this.validators = validators; // List of validator addresses
        this.quorum = Math.ceil(validators.length * 2 / 3); // Quorum size for BFT
        this.messages = new Map(); // Store messages from validators
    }

    // Method to propose a new block
    proposeBlock(block, proposer) {
        console.log(`Validator ${proposer} proposes a new block:`, block);
        this.broadcastProposal(block, proposer);
    }

    // Method to broadcast the proposal to all validators
    broadcastProposal(block, proposer) {
        this.validators.forEach(validator => {
            if (validator !== proposer) {
                this.receiveProposal(block, proposer, validator);
            }
        });
    }

    // Method to receive a proposal from a validator
    receiveProposal(block, proposer, validator) {
        console.log(`Validator ${validator} received a proposal from ${proposer}`);
        this.recordMessage(block, proposer, validator);
    }

    // Method to record messages from validators
    recordMessage(block, proposer, validator) {
        if (!this.messages.has(block)) {
            this.messages.set(block, { proposer, votes: new Set() });
        }

        const message = this.messages.get(block);
        message.votes.add(validator);

        // Check if we have enough votes to reach consensus
        if (message.votes.size >= this.quorum) {
            this.commitBlock(block);
        }
    }

    // Method to commit a block once consensus is reached
    commitBlock(block) {
        console.log(`Block committed:`, block);
        // Here you would typically add the block to the blockchain
        this.messages.delete(block); // Clear the messages for this block
    }

    // Method to simulate a validator sending a vote
    vote(block, validator) {
        console.log(`Validator ${validator} votes for block:`, block);
        this.recordMessage(block, this.messages.get(block).proposer, validator);
    }
}

module.exports = ByzantineFaultTolerance;
