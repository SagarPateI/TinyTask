// Project\server\controllers\settings.js
const Settings = require('../models/settings');

exports.createSettings = async (req, res) => {
    try {
        const {
            user_id,
            theme,
            language,
            notification_settings,
            other_preferences,
        } = req.body;
        const newSettings = new Settings({
            user_id,
            theme,
            language,
            notification_settings,
            other_preferences,
        });
        await newSettings.save();
        res.status(201).json(newSettings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSettings = async (req, res) => {
    try {
        const settings = await Settings.find();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSettings = async (req, res) => {
    try {
        const { id } = req.params;
        await Settings.findByIdAndDelete(id);
        res.json({ message: 'Settings deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Additional controller methods like updateSettings can also be defined here
