const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { createTask, getTasks, deleteTask } = require('../controllers/task');

// Set up rate limiting middleware
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 5, // 5 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

// Apply rate limiting middleware to specific routes
router.post('/', limiter, createTask);
router.get('/', limiter, getTasks);
router.delete('/:id', limiter, deleteTask);

// Additional routes can be added for updating tasks

module.exports = router;
