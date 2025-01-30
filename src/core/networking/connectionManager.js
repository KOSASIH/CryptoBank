// src/core/networking/connectionManager.js

const WebSocket = require('ws');

class ConnectionManager {
    constructor() {
        this.peers = new Set(); // Set to hold connected peers
    }

    // Method to connect to a new peer
    connectToPeer(peerAddress) {
        const socket = new WebSocket(peerAddress);

        socket.on('open', () => {
            console.log(`Connected to peer: ${peerAddress}`);
            this.peers.add(socket); // Add the socket to the set of peers
        });

        socket.on('message', (message) => this.handleMessage(message, socket));

        socket.on('close', () => {
            console.log(`Disconnected from peer: ${peerAddress}`);
            this.peers.delete(socket); // Remove the socket from the set of peers
        });

        socket.on('error', (error) => {
            console.error(`Error with peer ${peerAddress}:`, error);
            this.peers.delete(socket); // Remove the socket on error
        });
    }

    // Method to handle incoming messages from peers
    handleMessage(message, socket) {
        console.log('Received message from peer:', message);
        const data = JSON.parse(message);

        // Handle different message types
        switch (data.type) {
            case 'NEW_BLOCK':
                this.handleNewBlock(data.block);
                break;
            case 'TRANSACTION':
                this.handleTransaction(data.transaction);
                break;
            default:
                console.error('Unknown message type:', data.type);
        }
    }

    // Method to handle new blocks
    handleNewBlock(block) {
        console.log('New block received:', block);
        // Here you would typically add the block to the blockchain
    }

    // Method to handle transactions
    handleTransaction(transaction) {
        console.log('Transaction received:', transaction);
        // Here you would typically add the transaction to the mempool
    }

    // Method to broadcast a message to all connected peers
    broadcast(message) {
        const data = JSON.stringify(message);
        this.peers.forEach(socket => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(data);
            }
        });
        console.log('Broadcasted message:', message);
    }

    // Method to get the list of connected peers
    getConnectedPeers() {
        return Array.from(this.peers).map(socket => socket.url);
    }
}

module.exports = ConnectionManager;
