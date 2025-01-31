// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SavingsAccount {
    // State variables
    address public owner;
    uint256 public interestRate; // Annual interest rate in basis points (1/100th of a percent)
    mapping(address => uint256) private balances; // User balances
    mapping(address => uint256) private lastDepositTime; // Last deposit time for interest calculation

    // Events
    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event InterestPaid(address indexed user, uint256 interest);

    // Constructor to set the owner and interest rate
    constructor(uint256 _interestRate) {
        owner = msg.sender; // Set the contract deployer as the owner
        interestRate = _interestRate; // Set the interest rate
    }

    // Modifier to check if the caller is the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    // Function to deposit funds into the savings account
    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");

        // Calculate and pay interest before updating the balance
        payInterest(msg.sender);

        balances[msg.sender] += msg.value; // Update the user's balance
        lastDepositTime[msg.sender] = block.timestamp; // Update the last deposit time

        emit Deposited(msg.sender, msg.value);
    }

    // Function to withdraw funds from the savings account
    function withdraw(uint256 amount) external {
        require(amount > 0, "Withdrawal amount must be greater than zero");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        // Calculate and pay interest before updating the balance
        payInterest(msg.sender);

        balances[msg.sender] -= amount; // Update the user's balance
        payable(msg.sender).transfer(amount); // Transfer the amount to the user

        emit Withdrawn(msg.sender, amount);
    }

    // Function to calculate and pay interest to the user
    function payInterest(address user) internal {
        uint256 timeElapsed = block.timestamp - lastDepositTime[user]; // Time since last deposit
        if (timeElapsed > 0) {
            uint256 interest = (balances[user] * interestRate * timeElapsed) / (365 days * 10000); // Calculate interest
            if (interest > 0) {
                balances[user] += interest; // Update the user's balance with interest
                emit InterestPaid(user, interest);
            }
            lastDepositTime[user] = block.timestamp; // Update the last deposit time
        }
    }

    // Function to get the balance of the caller
    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    // Function to get the total balance of the contract (for owner use)
    function getTotalBalance() external view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    // Function to change the interest rate (for owner use)
    function setInterestRate(uint256 newRate) external onlyOwner {
        interestRate = newRate;
    }
}
