const express = require('express');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const limiter = new RateLimiterMemory({
    points: 5,
    duration: 1,
});

const router = express.Router();
const { createTask, getTasks, deleteTask, updateTask} = require('../controllers/task');

router.post('/', async (req, res, next) => {
    try {
        await limiter.consume(req.ip);
        next();
    } catch (error) {
        res.status(429).send('Too many requests');
    }
}, createTask);

router.get('/getTasks/:id', async (req, res, next) => {
    try {
        await limiter.consume(req.ip);
        next();
    } catch (error) {
        res.status(429).send('Too many requests');
    }
}, getTasks);

router.delete('/deleteTask/:id', async (req, res, next) => {
    try {
        await limiter.consume(req.ip);
        next();
    } catch (error) {
        res.status(429).send('Too many requests');
    }
}, deleteTask);

router.put('/updateTask/:id', async (req, res, next) => {
    try {
        await limiter.consume(req.ip);
        next();
    } catch (error) {
        res.status(429).send('Too many requests');
    }
}, updateTask);


module.exports = router;
