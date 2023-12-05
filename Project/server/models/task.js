// Project\server\models\task.js
const mongoose = require('mongoose');
const User = require('./user'); // Import the User model (Update the path as needed)

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referring to the User model
    },
});

const taskModel = mongoose.model('Task', taskSchema);
module.exports = taskModel;
