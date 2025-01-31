// src/core/middleware/validationMiddleware.js

function validationMiddleware(req, res, next) {
    const { body } = req;

    // Example validation: Check if required fields are present
    if (!body.sender || !body.recipient || !body.amount) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Additional validation logic can be added here

    next(); // Proceed to the next middleware or route handler
}

module.exports = validationMiddleware;
