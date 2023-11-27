// Project\server\controllers\event.js
const Event = require('../models/event');

exports.createEvent = async (req, res) => {
  try {
    const { start, end, title, summary, color } = req.body;
    const newEvent = new Event({ start, end, title, summary, color });
    await newEvent.save(); // Save to MongoDB
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: error.message });
  }
};

