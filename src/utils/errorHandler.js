// src/utils/errorHandler.js

/**
 * Error handling middleware for Express applications.
 * @param {Error} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {Function} next - The next middleware function.
 */
function errorHandler(err, req, res, next) {
    console.error('Error:', err.message); // Log the error message

    // Set the response status code based on the error type
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
}

module.exports = errorHandler;
