// Project\server\controllers\event.js
const Event = require('../models/event');

exports.createEvent = async (req, res) => {
  try {
    const { start, end, title, summary, color } = req.body;
    const newEvent = new Event({ start, end, title, summary, color });
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

// Additional controller methods for events can also be defined here
