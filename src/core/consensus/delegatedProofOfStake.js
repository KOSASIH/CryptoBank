// src/core/consensus/delegatedProofOfStake.js

class DelegatedProofOfStake {
    constructor(totalSupply, maxDelegates) {
        this.totalSupply = totalSupply; // Total supply of tokens in the network
        this.maxDelegates = maxDelegates; // Maximum number of delegates
        this.delegates = new Map(); // Map to hold delegates and their stakes
        this.voters = new Map(); // Map to hold voters and their delegated stakes
    }

    // Method to delegate stake to a delegate
    delegateStake(delegateAddress, voterAddress, amount) {
        if (amount <= 0) {
            throw new Error('Stake amount must be greater than zero.');
        }

        // Update the voter's stake
        if (!this.voters.has(voterAddress)) {
            this.voters.set(voterAddress, 0);
        }

        const currentVoterStake = this.voters.get(voterAddress);
        this.voters.set(voterAddress, currentVoterStake + amount);

        // Update the delegate's stake
        if (!this.delegates.has(delegateAddress)) {
            this.delegates.set(delegateAddress, 0);
        }

        const currentDelegateStake = this.delegates.get(delegateAddress);
        this.delegates.set(delegateAddress, currentDelegateStake + amount);

        console.log(`Voter ${voterAddress} delegated ${amount} tokens to delegate ${delegateAddress}.`);
    }

    // Method to get the list of elected delegates based on their stakes
    getElectedDelegates() {
        const sortedDelegates = Array.from(this.delegates.entries())
            .sort((a, b) => b[1] - a[1]) // Sort by stake in descending order
            .slice(0, this.maxDelegates); // Select top delegates

        return sortedDelegates.map(([address, stake]) => ({ address, stake }));
    }

    // Method to select a delegate to create the next block
    selectDelegate() {
        const electedDelegates = this.getElectedDelegates();
        if (electedDelegates.length === 0) {
            throw new Error('No delegates available to select.');
        }

        // Randomly select a delegate from the elected delegates
        const randomIndex = Math.floor(Math.random() * electedDelegates.length);
        const selectedDelegate = electedDelegates[randomIndex].address;

        console.log(`Selected delegate: ${selectedDelegate}`);
        return selectedDelegate; // Return the selected delegate
    }

    // Method to get the stakes of all delegates
    getDelegateStakes() {
        return Array.from(this.delegates.entries()).map(([address, stake]) => ({ address, stake }));
    }

    // Method to get the stakes of all voters
    getVoterStakes() {
        return Array.from(this.voters.entries()).map(([address, stake]) => ({ address, stake }));
    }
}

module.exports = DelegatedProofOfStake;
