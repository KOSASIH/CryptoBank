// src/core/consensus/proofOfStake.js

class ProofOfStake {
    constructor(totalSupply) {
        this.totalSupply = totalSupply; // Total supply of tokens in the network
        this.stakes = new Map(); // Map to hold stakes of each validator
    }

    // Method to delegate stake to a validator
    delegateStake(validatorAddress, amount) {
        if (amount <= 0) {
            throw new Error('Stake amount must be greater than zero.');
        }

        if (!this.stakes.has(validatorAddress)) {
            this.stakes.set(validatorAddress, 0);
        }

        const currentStake = this.stakes.get(validatorAddress);
        this.stakes.set(validatorAddress, currentStake + amount);
        console.log(`Delegated ${amount} tokens to ${validatorAddress}. Total stake: ${this.stakes.get(validatorAddress)}`);
    }

    // Method to calculate the probability of a validator being chosen to create the next block
    calculateProbability(validatorAddress) {
        const totalStaked = Array.from(this.stakes.values()).reduce((acc, stake) => acc + stake, 0);
        const validatorStake = this.stakes.get(validatorAddress) || 0;

        if (totalStaked === 0) {
            return 0; // No stakes in the network
        }

        return validatorStake / totalStaked; // Probability based on stake proportion
    }

    // Method to select a validator to create the next block
    selectValidator() {
        const randomValue = Math.random(); // Generate a random value between 0 and 1
        let cumulativeProbability = 0;

        for (const [validatorAddress, stake] of this.stakes.entries()) {
            const probability = this.calculateProbability(validatorAddress);
            cumulativeProbability += probability;

            if (randomValue <= cumulativeProbability) {
                console.log(`Selected validator: ${validatorAddress}`);
                return validatorAddress; // Return the selected validator
            }
        }

        throw new Error('No validator selected.'); // In case no validator is selected
    }

    // Method to get the stakes of all validators
    getStakes() {
        return Array.from(this.stakes.entries()).map(([address, stake]) => ({ address, stake }));
    }
}

module.exports = ProofOfStake;
