// Project\server\routes\events.js
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const { getEvents, createEvent, updateEvent, deleteEvent, completedEvent } = require('../controllers/event');

router.get('/', getEvents);
router.post('/', createEvent);
router.patch('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.put('/:id', completedEvent);

module.exports = router;