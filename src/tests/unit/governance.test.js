// src/tests/unit/governance.test.js

const { expect } = require('chai');
const Governance = require('../../path/to/your/governance'); // Adjust the path accordingly

describe('Governance', () => {
    let governance;

    beforeEach(() => {
        governance = new Governance();
    });

    it('should create a new proposal', () => {
        const proposal = governance.createProposal('Increase block size', 'Proposal to increase the block size to improve transaction throughput.');
        expect(proposal.title).to.equal('Increase block size');
        expect(governance.proposals).to.include(proposal);
    });

    it('should allow voting on a proposal', () => {
        const proposal = governance.createProposal('Increase block size', 'Proposal to increase the block size.');
        governance.vote(proposal.id, 'yes');
        expect(proposal.votes.yes).to.equal(1);
    });

    // Add more tests as needed
});
