// Project\server\models\event.js
const mongoose = require('mongoose');

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
});

module.exports = mongoose.model('Event', eventSchema);