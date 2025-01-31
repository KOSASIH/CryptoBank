// src/core/middleware/authMiddleware.js

function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Here you would typically verify the token (e.g., using JWT)
    // For demonstration, we'll assume the token is valid
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded;

    next(); // Proceed to the next middleware or route handler
}

module.exports = authMiddleware;
