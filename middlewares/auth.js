const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: true, message: 'No token provided' });
    }
    
    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).send({ error: true, message: 'Token provided is not made up of 2 parts' });
    }
    
    const [ prefix , token ] = parts;

    if (prefix.trim() !== 'Bearer') {
        return res.status(401).send({ error: true, message: 'First part of the token does not contain the word Bearer' });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: true, message: 'Invalid token' });
        }
        
        req.authenticatedUser = decoded.id;
        
        return next();
    });
}