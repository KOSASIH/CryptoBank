// src/core/middleware/loggingMiddleware.js

function loggingMiddleware(req, res, next) {
    const { method, url } = req;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${method} request to ${url}`);
    next(); // Proceed to the next middleware or route handler
}

module.exports = loggingMiddleware;
