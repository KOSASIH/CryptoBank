// src/core/blockchain.js

const Web3 = require('web3');
const { config } = require('./configuration');

// Initialize Web3 instance
let web3;

// Connect to the blockchain network
async function connectToBlockchain() {
    try {
        // Connect to the Ethereum network (or any other supported network)
        web3 = new Web3(new Web3.providers.HttpProvider(config.BLOCKCHAIN_URL));
        console.log('Blockchain connection established');

        // Optionally, check the network ID
        const networkId = await web3.eth.net.getId();
        console.log(`Connected to network ID: ${networkId}`);
    } catch (error) {
        console.error('Error connecting to the blockchain:', error);
        throw error; // Rethrow the error for handling in the main application
    }
}

// Function to send a transaction
async function sendTransaction(fromAddress, toAddress, amount, privateKey) {
    try {
        // Create a transaction object
        const transaction = {
            from: fromAddress,
            to: toAddress,
            value: web3.utils.toWei(amount.toString(), 'ether'),
            gas: 2000000,
        };

        // Sign the transaction
        const signedTransaction = await web3.eth.accounts.signTransaction(transaction, privateKey);

        // Send the transaction
        const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        console.log('Transaction successful with hash:', receipt.transactionHash);
        return receipt;
    } catch (error) {
        console.error('Error sending transaction:', error);
        throw error; // Rethrow the error for handling in the main application
    }
}

// Function to interact with a smart contract
async function callSmartContractMethod(contractAddress, abi, methodName, params, fromAddress) {
    try {
        // Create a contract instance
        const contract = new web3.eth.Contract(abi, contractAddress);

        // Call the specified method
        const result = await contract.methods[methodName](...params).call({ from: fromAddress });
        return result;
    } catch (error) {
        console.error('Error calling smart contract method:', error);
        throw error; // Rethrow the error for handling in the main application
    }
}

// Function to deploy a smart contract
async function deploySmartContract(abi, bytecode, fromAddress, privateKey, constructorArgs) {
    try {
        const contract = new web3.eth.Contract(abi);

        // Create a transaction for contract deployment
        const deployTransaction = contract.deploy({
            data: bytecode,
            arguments: constructorArgs,
        });

        // Sign the transaction
        const signedTransaction = await web3.eth.accounts.signTransaction(
            {
                data: deployTransaction.encodeABI(),
                gas: 2000000,
            },
            privateKey
        );

        // Send the transaction
        const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        console.log('Contract deployed at address:', receipt.contractAddress);
        return receipt.contractAddress;
    } catch (error) {
        console.error('Error deploying smart contract:', error);
        throw error; // Rethrow the error for handling in the main application
    }
}

// Function to get the balance of an address
async function getBalance(address) {
    try {
        const balance = await web3.eth.getBalance(address);
        return web3.utils.fromWei(balance, 'ether'); // Convert balance from Wei to Ether
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error; // Rethrow the error for handling in the main application
    }
}

// Function to listen for events from a smart contract
async function listenToContractEvents(contractAddress, abi, eventName) {
    try {
        const contract = new web3.eth.Contract(abi, contractAddress);
        contract.events[eventName]({}, (error, event) => {
            if (error) {
                console.error('Error listening to events:', error);
            } else {
                console.log('Event received:', event);
            }
        });
    } catch (error) {
        console.error('Error setting up event listener:', error);
        throw error; // Rethrow the error for handling in the main application
    }
}

// Export functions for use in other modules
module.exports = {
    connectToBlockchain,
    sendTransaction,
    callSmartContractMethod,
    deploySmartContract,
    getBalance,
    listenToContractEvents,
};
