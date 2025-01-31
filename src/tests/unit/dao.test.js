// src/tests/unit/dao.test.js

const { expect } = require('chai');
const DAO = require('../../path/to/your/dao'); // Adjust the path accordingly

describe('DAO', () => {
    let dao;

    beforeEach(() => {
        dao = new DAO();
    });

    it('should allow members to propose a fund allocation', () => {
        const proposal = dao.proposeAllocation('Allocate funds for project X', 1000);
        expect(proposal.amount).to.equal(1000);
        expect(dao.proposals).to.include(proposal);
    });

    it('should allow voting on proposals', () => {
        const proposal = dao.proposeAllocation('Allocate funds for project X', 1000);
        dao.vote(proposal.id, 'memberAddress');
        expect(proposal.votes).to.include('memberAddress');
    });

    // Add more tests as needed
});
