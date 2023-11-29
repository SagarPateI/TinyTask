// Project\server\models\task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    // description: {
    //     type: String,
    //     required: true,
    // },
    completed: {
        type: Boolean,
        default: false,
    },
    userId: { // Adding a field to store the user ID associated with the task
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const taskModel = mongoose.model('Tasks', taskSchema);
module.exports = taskModel;