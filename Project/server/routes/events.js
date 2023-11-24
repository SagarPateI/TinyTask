const express = require('express');
const router = express.Router();
const Event = require('../models/event');

// Route to create a new event
router.post('/events', async (req, res) => {
    try {
        const { name, notes, start_time, end_time } = req.body;

        const newEvent = await Event.create({
            name,
            notes,
            start_time,
            end_time,
        });

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// add the other routes related to events can be added here

module.exports = router;
