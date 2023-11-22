/*
handles user signup and login API endpoints

*/





const express = require('express');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const limiter = new RateLimiterMemory({
    // number of requests
    points: 5,
    // per second
    duration: 1,
});

const router = express.Router();
const { createUser, userLogin } = require('../controllers/user');

// Apply rate limiting to specific routes
router.post("/signup", async (req, res, next) => {
    try {
        // Limit requests by IP
        await limiter.consume(req.ip);
        next();
    } catch (error) {
        res.status(429).send('Too many requests');
    }
}, createUser);

router.post("/login", async (req, res, next) => {
    try {
        // Limit requests by IP
        await limiter.consume(req.ip);
        next();
    } catch (error) {
        res.status(429).send('Too many requests');
    }
}, userLogin);

module.exports = router;