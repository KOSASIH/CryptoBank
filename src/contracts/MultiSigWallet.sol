// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiSigWallet {
    // State variables
    address[] public owners; // List of owners
    mapping(address => bool) public isOwner; // Mapping to check if an address is an owner
    uint256 public requiredConfirmations; // Number of confirmations required to execute a transaction

    struct Transaction {
        address to; // Recipient address
        uint256 value; // Amount to send
        bool executed; // Execution status
        uint256 confirmations; // Number of confirmations
        mapping(address => bool) isConfirmed; // Mapping to track confirmations
    }

    Transaction[] public transactions; // List of transactions

    // Events
    event Deposit(address indexed sender, uint256 amount);
    event TransactionCreated(uint256 indexed transactionId, address indexed to, uint256 value);
    event TransactionConfirmed(uint256 indexed transactionId, address indexed owner);
    event TransactionExecuted(uint256 indexed transactionId);
    event TransactionRevoked(uint256 indexed transactionId, address indexed owner);

    // Modifier to check if the caller is an owner
    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not an owner");
        _;
    }

    // Constructor to set the owners and required confirmations
    constructor(address[] memory _owners, uint256 _requiredConfirmations) {
        require(_owners.length > 0, "Owners required");
        require(_requiredConfirmations > 0 && _requiredConfirmations <= _owners.length, "Invalid number of required confirmations");

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "Invalid owner address");
            require(!isOwner[owner], "Owner is not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }

        requiredConfirmations = _requiredConfirmations;
    }

    // Fallback function to accept Ether
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // Function to create a new transaction
    function createTransaction(address to, uint256 value) external onlyOwner {
        require(value > 0, "Value must be greater than zero");

        Transaction storage newTransaction = transactions.push();
        newTransaction.to = to;
        newTransaction.value = value;
        newTransaction.executed = false;
        newTransaction.confirmations = 0;

        emit TransactionCreated(transactions.length - 1, to, value);
    }

    // Function to confirm a transaction
    function confirmTransaction(uint256 transactionId) external onlyOwner {
        Transaction storage transaction = transactions[transactionId];

        require(!transaction.executed, "Transaction already executed");
        require(!transaction.isConfirmed[msg.sender], "Transaction already confirmed");

        transaction.isConfirmed[msg.sender] = true;
        transaction.confirmations++;

        emit TransactionConfirmed(transactionId, msg.sender);

        // Execute the transaction if enough confirmations are received
        if (transaction.confirmations >= requiredConfirmations) {
            executeTransaction(transactionId);
        }
    }

    // Function to execute a transaction
    function executeTransaction(uint256 transactionId) internal {
        Transaction storage transaction = transactions[transactionId];

        require(transaction.confirmations >= requiredConfirmations, "Not enough confirmations");
        require(!transaction.executed, "Transaction already executed");

        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.value}("");
        require(success, "Transaction execution failed");

        emit TransactionExecuted(transactionId);
    }

    // Function to revoke a confirmation
    function revokeConfirmation(uint256 transactionId) external onlyOwner {
        Transaction storage transaction = transactions[transactionId];

        require(!transaction.executed, "Transaction already executed");
        require(transaction.isConfirmed[msg.sender], "Transaction not confirmed");

        transaction.isConfirmed[msg.sender] = false;
        transaction.confirmations--;

        emit TransactionRevoked(transactionId, msg.sender);
    }

    // Function to get the number of transactions
    function getTransactionCount() external view returns (uint256) {
        return transactions.length;
    }

    // Function to get transaction details
    function getTransaction(uint256 transactionId) external view returns (address, uint256, bool, uint256) {
        Transaction storage transaction = transactions[transactionId];
        return (transaction.to, transaction.value, transaction.executed, transaction.confirmations);
    }
}
