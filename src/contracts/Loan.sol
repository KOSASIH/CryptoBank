// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Loan {
    // State variables
    address public owner;
    uint256 public loanCounter; // Counter for loan IDs
    uint256 public interestRate; // Annual interest rate in basis points (1/100th of a percent)

    // Loan structure
    struct LoanDetails {
        uint256 id;
        address borrower;
        uint256 amount;
        uint256 interest;
        uint256 totalRepayment;
        uint256 dueDate;
        bool isRepaid;
    }

    // Mapping to store loans by ID
    mapping(uint256 => LoanDetails) public loans;

    // Events
    event LoanApplied(uint256 indexed loanId, address indexed borrower, uint256 amount, uint256 dueDate);
    event LoanRepaid(uint256 indexed loanId, address indexed borrower);

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

    // Function to apply for a loan
    function applyForLoan(uint256 amount, uint256 duration) external {
        require(amount > 0, "Loan amount must be greater than zero");
        require(duration > 0, "Loan duration must be greater than zero");

        // Calculate interest and total repayment amount
        uint256 interest = (amount * interestRate) / 10000; // Calculate interest in basis points
        uint256 totalRepayment = amount + interest; // Total repayment amount
        uint256 dueDate = block.timestamp + duration; // Due date for the loan

        // Increment loan counter and create a new loan
        loanCounter++;
        loans[loanCounter] = LoanDetails(loanCounter, msg.sender, amount, interest, totalRepayment, dueDate, false);

        emit LoanApplied(loanCounter, msg.sender, amount, dueDate);
    }

    // Function to repay a loan
    function repayLoan(uint256 loanId) external payable {
        LoanDetails storage loan = loans[loanId];

        require(loan.borrower == msg.sender, "Only the borrower can repay the loan");
        require(!loan.isRepaid, "Loan has already been repaid");
        require(msg.value == loan.totalRepayment, "Incorrect repayment amount");

        // Mark the loan as repaid
        loan.isRepaid = true;

        // Transfer the repayment amount to the contract owner
        payable(owner).transfer(msg.value);

        emit LoanRepaid(loanId, msg.sender);
    }

    // Function to get loan details
    function getLoanDetails(uint256 loanId) external view returns (LoanDetails memory) {
        return loans[loanId];
    }

    // Function to change the interest rate (for owner use)
    function setInterestRate(uint256 newRate) external onlyOwner {
        interestRate = newRate;
    }
}
