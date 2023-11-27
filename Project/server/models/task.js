// Project\server\models\task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    
    completed: {
        type: Boolean,
        default: false,
    },
});

const taskModel = mongoose.model('Tasks', taskSchema);
module.exports = taskModel;