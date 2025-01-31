// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Governance {
    // State variables
    address public owner;
    uint256 public proposalCounter; // Counter for proposal IDs
    uint256 public votingDuration; // Duration for voting in seconds

    // Proposal structure
    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 endTime;
        bool executed;
        mapping(address => bool) hasVoted; // Track if an address has voted
    }

    // Mapping to store proposals by ID
    mapping(uint256 => Proposal) public proposals;

    // Events
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string description);
    event Voted(uint256 indexed proposalId, address indexed voter, bool support);
    event ProposalExecuted(uint256 indexed proposalId);

    // Constructor to set the owner and voting duration
    constructor(uint256 _votingDuration) {
        owner = msg.sender; // Set the contract deployer as the owner
        votingDuration = _votingDuration; // Set the voting duration
    }

    // Modifier to check if the caller is the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    // Function to create a new proposal
    function createProposal(string calldata description) external {
        proposalCounter++;
        Proposal storage newProposal = proposals[proposalCounter];
        newProposal.id = proposalCounter;
        newProposal.proposer = msg.sender;
        newProposal.description = description;
        newProposal.endTime = block.timestamp + votingDuration; // Set the end time for voting
        newProposal.executed = false;

        emit ProposalCreated(proposalCounter, msg.sender, description);
    }

    // Function to vote on a proposal
    function vote(uint256 proposalId, bool support) external {
        Proposal storage proposal = proposals[proposalId];

        require(block.timestamp < proposal.endTime, "Voting has ended");
        require(!proposal.hasVoted[msg.sender], "You have already voted");

        // Record the vote
        proposal.hasVoted[msg.sender] = true;

        if (support) {
            proposal.votesFor++;
        } else {
            proposal.votesAgainst++;
        }

        emit Voted(proposalId, msg.sender, support);
    }

    // Function to execute a proposal if it has passed
    function executeProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];

        require(block.timestamp >= proposal.endTime, "Voting is still ongoing");
        require(!proposal.executed, "Proposal has already been executed");

        // Check if the proposal has enough votes to pass
        require(proposal.votesFor > proposal.votesAgainst, "Proposal did not pass");

        // Execute the proposal (implementation depends on the proposal's nature)
        // For example, this could involve changing a state variable or calling another contract

        proposal.executed = true; // Mark the proposal as executed

        emit ProposalExecuted(proposalId);
    }

    // Function to get proposal details
    function getProposal(uint256 proposalId) external view returns (Proposal memory) {
        return proposals[proposalId];
    }

    // Function to change the voting duration (for owner use)
    function setVotingDuration(uint256 newDuration) external onlyOwner {
        votingDuration = newDuration;
    }
}
