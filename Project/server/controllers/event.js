// Project\server\controllers\event.js
const Event = require('../models/event');

exports.createEvent = async (req, res) => {
  try {
    console.log('Creating event...', req.body); // Add this log
    const { start, end, title, summary, color } = req.body;
    let userId;

    // Check if the user ID is in the request body
    if (req.body.userId) {
      userId = req.body.userId;
    } else if (req.user && req.user._id) { // Otherwise, check if it's in req.user
      userId = req.user._id;
    } else {
      throw new Error('User ID not found');
    }

    const newEvent = new Event({ start, end, title, summary, color, userId });
    await newEvent.save();

    console.log('Event created:', newEvent); // added a log
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
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

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const { start, end, title, summary, color } = req.body;

    event.start = start || event.start;
    event.end = end || event.end;
    event.title = title || event.title;
    event.summary = summary || event.summary;
    event.color = color || event.color;

    await event.save();
    res.json(event);
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

exports.completedEvent = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Updating event with ID:', id);

    const event = await Event.findById(id);
    if (!event) {
      console.log('Event not found.');
      return res.status(404).json({ error: 'Event not found' });
    }

    event.completed = true;
    console.log('About to save the updated event with ID:', id);

    await event.save();

    console.log('Event with ID:', id, 'updated successfully.');
    res.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: error.message });
  }
};

// Additional controller methods for events can also be defined here
