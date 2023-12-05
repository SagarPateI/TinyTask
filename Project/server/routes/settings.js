const express = require('express');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const limiter = new RateLimiterMemory({
    points: 5,
    duration: 1,
});

const router = express.Router();
const {
    createSettings,
    getSettings,
    deleteSettings,
} = require('../controllers/settings');

router.post('/', async (req, res, next) => {
    try {
        await limiter.consume(req.ip);
        next();
    } catch (error) {
        res.status(429).send('Too many requests');
    }
}, createSettings);

router.get('/', async (req, res, next) => {
    try {
        await limiter.consume(req.ip);
        next();
    } catch (error) {
        res.status(429).send('Too many requests');
    }
}, getSettings);

router.delete('/:id', async (req, res, next) => {
    try {
        await limiter.consume(req.ip);
        next();
    } catch (error) {
        res.status(429).send('Too many requests');
    }
}, deleteSettings);

module.exports = router;
