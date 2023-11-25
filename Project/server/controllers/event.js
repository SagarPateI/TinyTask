// Project\server\controllers\event.js
const Event = require('../models/event');

exports.createEvent = async (req, res) => {
    try {
        const { name, notes, start_time, end_time } = req.body;
        const newEvent = new Event({ name, notes, start_time, end_time });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await Event.findByIdAndDelete(id);
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Additional controller methods like updateEvent can also be defined here
