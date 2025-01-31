// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    // State variables
    address public buyer;
    address public seller;
    address public arbiter; // Third party to resolve disputes
    uint256 public amount; // Amount held in escrow
    bool public isCompleted; // Status of the escrow
    bool public isRefunded; // Status of refund

    // Events
    event Deposited(address indexed buyer, uint256 amount);
    event Released(address indexed seller, uint256 amount);
    event Refunded(address indexed buyer, uint256 amount);
    event DisputeResolved(address indexed arbiter, bool favoringBuyer);

    // Modifier to check if the caller is the buyer
    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only the buyer can call this function");
        _;
    }

    // Modifier to check if the caller is the seller
    modifier onlySeller() {
        require(msg.sender == seller, "Only the seller can call this function");
        _;
    }

    // Modifier to check if the caller is the arbiter
    modifier onlyArbiter() {
        require(msg.sender == arbiter, "Only the arbiter can call this function");
        _;
    }

    // Constructor to set the buyer, seller, and arbiter
    constructor(address _seller, address _arbiter) {
        buyer = msg.sender; // The contract deployer is the buyer
        seller = _seller;
        arbiter = _arbiter;
        isCompleted = false;
        isRefunded = false;
    }

    // Function to deposit funds into escrow
    function deposit() external payable onlyBuyer {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        require(!isCompleted, "Transaction already completed");
        require(!isRefunded, "Transaction already refunded");

        amount += msg.value; // Update the escrow amount
        emit Deposited(buyer, msg.value);
    }

    // Function to release funds to the seller
    function release() external onlyBuyer {
        require(amount > 0, "No funds to release");
        require(!isCompleted, "Transaction already completed");

        isCompleted = true; // Mark the transaction as completed
        payable(seller).transfer(amount); // Transfer funds to the seller
        emit Released(seller, amount);
    }

    // Function to refund the buyer
    function refund() external onlySeller {
        require(amount > 0, "No funds to refund");
        require(!isCompleted, "Transaction already completed");
        require(!isRefunded, "Transaction already refunded");

        isRefunded = true; // Mark the transaction as refunded
        payable(buyer).transfer(amount); // Transfer funds back to the buyer
        emit Refunded(buyer, amount);
    }

    // Function for the arbiter to resolve disputes
    function resolveDispute(bool favoringBuyer) external onlyArbiter {
        require(!isCompleted, "Transaction already completed");
        require(!isRefunded, "Transaction already refunded");

        if (favoringBuyer) {
            isRefunded = true; // Refund the buyer
            payable(buyer).transfer(amount);
            emit Refunded(buyer, amount);
        } else {
            isCompleted = true; // Release funds to the seller
            payable(seller).transfer(amount);
            emit Released(seller, amount);
        }

        emit DisputeResolved(arbiter, favoringBuyer);
    }

    // Function to get the current escrow status
    function getEscrowStatus() external view returns (string memory) {
        if (isCompleted) {
            return "Completed";
        } else if (isRefunded) {
            return "Refunded";
        } else {
            return "In Progress";
        }
    }
}
