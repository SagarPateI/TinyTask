// Project\server\middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log('Auth Header:', authHeader);

    if (!authHeader) {
        return res.status(401).send('Invalid credentials');
    }

    const token = authHeader.split(' ')[1];

    console.log('Token:', token);

    if (!token) {
        return res.status(401).send('Invalid credentials');
    }

    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
        if (err) {
            console.log('JWT Verification Error:', err);
            return res.status(401).send('Invalid credentials');
        }

        console.log('Decoded User Information:', decoded);

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Continue to the next middleware
        next();
    });
};