// src/core/networking/p2p.js

const WebSocket = require('ws');

class P2PNetwork {
    constructor(port) {
        this.port = port; // Port for the WebSocket server
        this.sockets = []; // Array to hold connected peers
        this.server = new WebSocket.Server({ port: this.port }); // Create WebSocket server

        // Event listeners for the WebSocket server
        this.server.on('connection', (socket) => this.handleConnection(socket));
        console.log(`P2P server running on port ${this.port}`);
    }

    // Method to handle new connections
    handleConnection(socket) {
        console.log('New peer connected');
        this.sockets.push(socket);

        // Listen for messages from the peer
        socket.on('message', (message) => this.handleMessage(message, socket));

        // Handle disconnection
        socket.on('close', () => {
            console.log('Peer disconnected');
            this.sockets = this.sockets.filter(s => s !== socket);
        });
    }

    // Method to handle incoming messages
    handleMessage(message, socket) {
        console.log('Received message:', message);
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
        this.sockets.forEach(socket => {
            socket.send(data);
        });
        console.log('Broadcasted message:', message);
    }

    // Method to connect to a new peer
    connectToPeer(peerAddress) {
        const socket = new WebSocket(peerAddress);

        socket.on('open', () => {
            console.log(`Connected to peer: ${peerAddress}`);
            this.sockets.push(socket);
        });

        socket.on('message', (message) => this.handleMessage(message, socket));

        socket.on('close', () => {
            console.log('Disconnected from peer:', peerAddress);
            this.sockets = this.sockets.filter(s => s !== socket);
        });
    }
}

module.exports = P2PNetwork;
