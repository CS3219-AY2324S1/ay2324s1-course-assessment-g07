const jwt = require('jsonwebtoken');
require('dotenv').config();

// can i get this logic from the user-service instead?
const jwtAuth = async (req, res, next) => {

    const tokenHeader = req.headers['authorization'];
    
    if (!tokenHeader) {
        // if auth header is not present
        console.error('auth header not present');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const [bearer, token] = tokenHeader.split(' ');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // token is invalid
            console.error('invalid jwt token', err);
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Valid token
        // Store the decoded user ID in the request object for later use
        req.userId = decoded.userId;
        next();
    });
}

module.exports = { jwtAuth };