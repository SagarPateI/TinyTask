// Project\server\routes\events.js

const express = require('express');
const router = express.Router();
const { createEvent, getEvents, deleteEvent } = require('../controllers/event');

router.post('/', createEvent);
router.get('/', getEvents);
router.delete('/:id', deleteEvent);
// Additional routes can be added for updating tasks

module.exports = router;