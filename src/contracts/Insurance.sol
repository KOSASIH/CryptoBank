// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "chainlink/contracts/ChainlinkClient.sol";
import "chainlink/contracts/vendor/Ownable.sol";
import "chainlink/contracts/interfaces/LinkTokenInterface.sol";

contract InsuranceProvider is Ownable {
    // State variables
    mapping(address => InsuranceContract) public contracts; // Mapping of insurance contracts

    // Events
    event ContractCreated(address indexed contractAddress, uint256 premium, uint256 payoutValue);

    // Function to create a new insurance contract
    function newContract(
        address _client,
        uint _duration,
        uint _premium,
        uint _payoutValue,
        string memory _cropLocation
    ) public payable onlyOwner returns (address) {
        // Create contract and fund it
        InsuranceContract insuranceContract = new InsuranceContract{value: msg.value}(
            _client,
            _duration,
            _premium,
            _payoutValue,
            _cropLocation,
            LINK_KOVAN,
            ORACLE_PAYMENT
        );

        contracts[address(insuranceContract)] = insuranceContract; // Store contract
        emit ContractCreated(address(insuranceContract), _premium, _payoutValue);
        return address(insuranceContract);
    }
}

contract InsuranceContract is ChainlinkClient, Ownable {
    // State variables
    address public client;
    uint public duration;
    uint public premium;
    uint public payoutValue;
    string public cropLocation;
    bool public contractActive;

    // Events
    event DataReceived(uint256 rainfall);
    event ContractPaidOut(uint256 payoutValue);

    // Constructor to initialize the contract
    constructor(
        address _client,
        uint _duration,
        uint _premium,
        uint _payoutValue,
        string memory _cropLocation,
        address _link,
        uint256 _oraclePaymentAmount
    ) payable {
        client = _client;
        duration = _duration;
        premium = _premium;
        payoutValue = _payoutValue;
        cropLocation = _cropLocation;
        contractActive = true;

        setChainlinkToken(_link);
        // Additional initialization logic
    }

    // Function to update the contract with rainfall data
    function updateContract() public {
        require(contractActive, "Contract is not active");
        // Logic to request rainfall data from oracles
    }

    // Function to handle payout
    function payOutContract() private {
        require(contractActive, "Contract is not active");
        payable(client).transfer(payoutValue);
        emit ContractPaidOut(payoutValue);
        contractActive = false; // Mark contract as inactive
    }

    // Function to check rainfall data
    function checkRainfall() external {
        // Logic to check rainfall and trigger payout if conditions are met
    }
}
