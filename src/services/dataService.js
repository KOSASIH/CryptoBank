// src/services/dataService.js

const mongoose = require('mongoose');

class DataService {
    constructor(model) {
        this.model = model; // The Mongoose model to interact with
    }

    // Method to create a new record
    async create(data) {
        try {
            const record = new this.model(data);
            await record.save();
            return record; // Return the created record
        } catch (error) {
            this.handleError(error);
        }
    }

    // Method to find a record by ID
    async findById(id) {
        try {
            const record = await this.model.findById(id);
            if (!record) {
                throw new Error('Record not found');
            }
            return record; // Return the found record
        } catch (error) {
            this.handleError(error);
        }
    }

    // Method to find all records
    async findAll() {
        try {
            const records = await this.model.find();
            return records; // Return all records
        } catch (error) {
            this.handleError(error);
        }
    }

    // Method to update a record by ID
    async update(id, data) {
        try {
            const updatedRecord = await this.model.findByIdAndUpdate(id, data, { new: true });
            if (!updatedRecord) {
                throw new Error('Record not found');
            }
            return updatedRecord; // Return the updated record
        } catch (error) {
            this.handleError(error);
        }
    }

    // Method to delete a record by ID
    async delete(id) {
        try {
            const deletedRecord = await this.model.findByIdAndDelete(id);
            if (!deletedRecord) {
                throw new Error('Record not found');
            }
            return deletedRecord; // Return the deleted record
        } catch (error) {
            this.handleError(error);
        }
    }

    // Method to handle errors
    handleError(error) {
        console.error('Data Service Error:', error.message);
        throw new Error('Data operation failed'); // Throw a generic error
    }
}

module.exports = DataService;
