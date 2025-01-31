// src/core/middleware/errorHandler.js

function errorHandler(err, req, res, next) {
    console.error('Error occurred:', err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
}

module.exports = errorHandler;
