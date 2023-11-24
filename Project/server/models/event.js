const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start_time: {
        type: Date,
        required: true,
    },
    end_time: {
        type: Date,
        required: true,
    },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
