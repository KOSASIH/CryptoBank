// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Investment {
    // State variables
    address public owner;
    uint256 public investmentCounter; // Counter for investment IDs
    uint256 public interestRate; // Annual interest rate in basis points (1/100th of a percent)

    // Investment structure
    struct InvestmentDetails {
        uint256 id;
        address investor;
        uint256 amount;
        uint256 interest;
        uint256 totalReturn;
        uint256 maturityDate;
        bool isWithdrawn;
    }

    // Mapping to store investments by ID
    mapping(uint256 => InvestmentDetails) public investments;

    // Events
    event InvestmentMade(uint256 indexed investmentId, address indexed investor, uint256 amount, uint256 maturityDate);
    event InvestmentWithdrawn(uint256 indexed investmentId, address indexed investor);

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

    // Function to make an investment
    function makeInvestment(uint256 amount, uint256 duration) external {
        require(amount > 0, "Investment amount must be greater than zero");
        require(duration > 0, "Investment duration must be greater than zero");

        // Calculate interest and total return amount
        uint256 interest = (amount * interestRate) / 10000; // Calculate interest in basis points
        uint256 totalReturn = amount + interest; // Total return amount
        uint256 maturityDate = block.timestamp + duration; // Maturity date for the investment

        // Increment investment counter and create a new investment
        investmentCounter++;
        investments[investmentCounter] = InvestmentDetails(investmentCounter, msg.sender, amount, interest, totalReturn, maturityDate, false);

        emit InvestmentMade(investmentCounter, msg.sender, amount, maturityDate);
    }

    // Function to withdraw investment returns
    function withdrawInvestment(uint256 investmentId) external {
        InvestmentDetails storage investment = investments[investmentId];

        require(investment.investor == msg.sender, "Only the investor can withdraw the investment");
        require(!investment.isWithdrawn, "Investment has already been withdrawn");
        require(block.timestamp >= investment.maturityDate, "Investment is not yet matured");

        // Mark the investment as withdrawn
        investment.isWithdrawn = true;

        // Transfer the total return amount to the investor
        payable(msg.sender).transfer(investment.totalReturn);

        emit InvestmentWithdrawn(investmentId, msg.sender);
    }

    // Function to get investment details
    function getInvestmentDetails(uint256 investmentId) external view returns (InvestmentDetails memory) {
        return investments[investmentId];
    }

    // Function to change the interest rate (for owner use)
    function setInterestRate(uint256 newRate) external onlyOwner {
        interestRate = newRate;
    }
}
