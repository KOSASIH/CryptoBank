// src/services/apiService.js

const axios = require('axios');

class ApiService {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL: baseURL,
            timeout: 5000, // Set a timeout for requests
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    // Method to make a GET request
    async get(endpoint, params = {}) {
        try {
            const response = await this.client.get(endpoint, { params });
            return response.data; // Return the response data
        } catch (error) {
            this.handleError(error);
        }
    }

    // Method to make a POST request
    async post(endpoint, data) {
        try {
            const response = await this.client.post(endpoint, data);
            return response.data; // Return the response data
        } catch (error) {
            this.handleError(error);
        }
    }

    // Method to make a PUT request
    async put(endpoint, data) {
        try {
            const response = await this.client.put(endpoint, data);
            return response.data; // Return the response data
        } catch (error) {
            this.handleError(error);
        }
    }

    // Method to make a DELETE request
    async delete(endpoint) {
        try {
            const response = await this.client.delete(endpoint);
            return response.data; // Return the response data
        } catch (error) {
            this.handleError(error);
        }
    }

    // Method to handle errors
    handleError(error) {
        if (axios.isAxiosError(error)) {
            console.error('API Error:', error.response ? error.response.data : error.message);
        } else {
            console.error('Unexpected Error:', error);
        }
        throw new Error('API request failed'); // Throw a generic error
    }
}

module.exports = ApiService;
