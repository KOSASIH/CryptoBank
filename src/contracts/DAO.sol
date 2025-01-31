// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DAO is Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;

    // The DAO token contract
    DAOToken public daoToken;

    // The minimum amount of tokens required to create a proposal
    uint256 public constant MIN_PROPOSAL_THRESHOLD = 1000 * 10**18;

    // The minimum amount of tokens required to vote on a proposal
    uint256 public constant MIN_VOTING_THRESHOLD = 100 * 10**18;

    // Proposal struct
    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 amount;
        address payable recipient;
        uint256 startTime;
        uint256 endTime;
        uint256 yesVotes;
        uint256 noVotes;
        EnumerableSet.AddressSet voters;
        bool executed;
    }

    // Array of all proposals
    Proposal[] public proposals;

    // Mapping to check if an address has an active proposal
    mapping(address => bool) public activeProposals;

    // Event for a new proposal
    event NewProposal(uint256 indexed proposalId, address indexed proposer, string description);

    // Event for a proposal execution
    event ProposalExecuted(uint256 indexed proposalId, address indexed proposer, address indexed recipient, uint256 amount);

    constructor(DAOToken _daoToken) {
        daoToken = _daoToken;
    }

    // Function to create a new proposal
    function createProposal(string memory _description, uint256 _amount, address payable _recipient) external {
        require(daoToken.balanceOf(msg.sender) >= MIN_PROPOSAL_THRESHOLD, "Insufficient tokens to create proposal");
        require(!activeProposals[msg.sender], "You already have an active proposal");

        Proposal memory newProposal = Proposal({
            id: proposals.length,
            proposer: msg.sender,
            description: _description,
            amount: _amount,
            recipient: _recipient,
            startTime: block.timestamp,
            endTime: block.timestamp + 7 days,
            yesVotes: 0,
            noVotes: 0,
            voters: new EnumerableSet.AddressSet(),
            executed: false
        });

        proposals.push(newProposal);
        activeProposals[msg.sender] = true;
        emit NewProposal(newProposal.id, msg.sender, _description);
    }

    // Function to vote on a proposal
    function vote(uint256 _proposalId, bool _support) external {
        require(daoToken.balanceOf(msg.sender) >= MIN_VOTING_THRESHOLD, "Insufficient tokens to vote");
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp >= proposal.startTime && block.timestamp <= proposal.endTime, "Voting is not active");
        require(!proposal.voters.contains(msg.sender), "You have already voted");

        proposal.voters.add(msg.sender);
        if (_support) {
            proposal.yesVotes += daoToken.balanceOf(msg.sender);
        } else {
            proposal.noVotes += daoToken.balanceOf(msg.sender);
        }
    }

    // Function to execute a proposal
    function executeProposal(uint256 _proposalId) external {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp > proposal.endTime, "Voting is still active");
        require(!proposal.executed, "Proposal has already been executed");

        if (proposal.yesVotes > proposal.noVotes) {
            proposal.recipient.transfer(proposal.amount);
            emit ProposalExecuted(proposal.id, proposal.proposer, proposal.recipient, proposal.amount);
        }
        proposal.executed = true;
    }
}
