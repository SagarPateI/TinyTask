// Project\server\models\event.js
const mongoose = require('mongoose');
const User = require('./user'); // Import the User model (Update the path as needed)

const eventSchema = new mongoose.Schema({

  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: 'New Event',
  },
  summary: String,
  color: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referring to the User model
  },
});

const eventModel = mongoose.model('Event', eventSchema);
module.exports = eventModel;