const express = require('express');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const limiter = new RateLimiterMemory({
    points: 5,
    duration: 1,
});

const router = express.Router();
const { createEvent, getEvents, deleteEvent } = require('../controllers/event');

router.post('/', async (req, res, next) => {
    try {
        await limiter.consume(req.ip);
        next();
    } catch (error) {
        res.status(429).send('Too many requests');
    }
}, createEvent);

router.get('/', async (req, res, next) => {
    try {
        await limiter.consume(req.ip);
        next();
    } catch (error) {
        res.status(429).send('Too many requests');
    }
}, getEvents);

router.delete('/:id', async (req, res, next) => {
    try {
        await limiter.consume(req.ip);
        next();
    } catch (error) {
        res.status(429).send('Too many requests');
    }
}, deleteEvent);

module.exports = router;
