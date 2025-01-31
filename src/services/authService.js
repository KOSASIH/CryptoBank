// src/services/authService.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User'); // Assuming you have a User model defined

class AuthService {
    constructor(secret, tokenExpiration) {
        this.secret = secret; // JWT secret key
        this.tokenExpiration = tokenExpiration; // Token expiration time
    }

    // Method to register a new user
    async register(username, password) {
        // Check if the user already exists
        const existingUser  = await UserModel.findOne({ username });
        if (existingUser ) {
            throw new Error('User  already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser  = new UserModel({
            username,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser .save();
        return newUser ;
    }

    // Method to log in a user
    async login(username, password) {
        // Find the user by username
        const user = await UserModel.findOne({ username });
        if (!user) {
            throw new Error('Invalid username or password');
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid username or password');
        }

        // Generate a JWT token
        const token = this.generateToken(user._id);
        return { user, token };
    }

    // Method to generate a JWT token
    generateToken(userId) {
        return jwt.sign({ id: userId }, this.secret, { expiresIn: this.tokenExpiration });
    }

    // Method to verify a JWT token
    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, this.secret);
            return decoded; // Return the decoded token payload
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

module.exports = AuthService;
