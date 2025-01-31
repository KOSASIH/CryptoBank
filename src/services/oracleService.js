// src/services/oracleService.js

const axios = require('axios');

class OracleService {
    constructor(oracleUrl, oracleKey) {
        this.oracleUrl = oracleUrl; // URL of the oracle API
        this.oracleKey = oracleKey; // API key for the oracle
    }

    // Method to fetch data from the oracle
    async fetchData(oracleId, params) {
        try {
            const response = await axios.get(`${this.oracleUrl}/${oracleId}`, {
                params,
                headers: {
                    'X-API-KEY': this.oracleKey,
                },
            });
            return response.data; // Return the fetched data
        } catch (error) {
            this.handleError(error);
        }
    }

    // Method to handle errors
    handleError(error) {
        console.error('Oracle Service Error:', error.message);
        throw new Error('Oracle data fetch failed'); // Throw a generic error
    }
}

module.exports = OracleService;
