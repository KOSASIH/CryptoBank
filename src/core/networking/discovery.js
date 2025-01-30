// src/core/networking/discovery.js

const dgram = require('dgram');

class NodeDiscovery {
    constructor(port, broadcastInterval) {
        this.port = port; // Port for the discovery service
        this.broadcastInterval = broadcastInterval; // Interval for broadcasting discovery messages
        this.socket = dgram.createSocket('udp4'); // Create a UDP socket
        this.peers = new Set(); // Set to hold discovered peers

        // Start the discovery service
        this.start();
    }

    // Method to start the discovery service
    start() {
        this.socket.bind(this.port, () => {
            console.log(`Discovery service running on port ${this.port}`);
            this.socket.setBroadcast(true); // Enable broadcasting
            this.broadcast(); // Start broadcasting discovery messages
        });

        // Listen for incoming discovery messages
        this.socket.on('message', (message, rinfo) => {
            this.handleMessage(message, rinfo);
        });
    }

    // Method to broadcast discovery messages
    broadcast() {
        const message = Buffer.from('DISCOVER_NODE');
        this.socket.send(message, 0, message.length, this.port, '255.255.255.255', (err) => {
            if (err) {
                console.error('Error broadcasting discovery message:', err);
            }
        });

        // Repeat broadcasting at the specified interval
        setTimeout(() => this.broadcast(), this.broadcastInterval);
    }

    // Method to handle incoming discovery messages
    handleMessage(message, rinfo) {
        if (message.toString() === 'DISCOVER_NODE') {
            console.log(`Discovered node at ${rinfo.address}:${rinfo.port}`);
            this.peers.add(`${rinfo.address}:${rinfo.port}`);
        }
    }

    // Method to get the list of discovered peers
    getPeers() {
        return Array.from(this.peers);
    }
}

module.exports = NodeDiscovery;
