// Project\server\models\settings.js
const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    theme: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    notification_settings: {
        type: Object,
    },
    other_preferences: {
        type: Object,
    },
});

module.exports = mongoose.model('Settings', settingsSchema);
