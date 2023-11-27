// Project\server\routes\events.js

const express = require('express');
const router = express.Router();
const { createEvent, getEvents } = require('../controllers/event');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const limiter = new RateLimiterMemory({
    points: 5,
    duration: 1,
});

const rateLimiterMiddleware = async (req, res, next) => {
    try {
        await limiter.consume(req.ip);
        next();
    } catch (error) {
        res.status(429).send('Too many requests');
    }
};

router.post('/', rateLimiterMiddleware, createEvent);
router.get('/', getEvents);
// Additional routes for events can be added here

module.exports = router;
