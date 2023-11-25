// Project\server\routes\settings.js
const express = require('express');
const router = express.Router();
const {
    createSettings,
    getSettings,
    deleteSettings,
} = require('../controllers/settings');

router.post('/', createSettings);
router.get('/', getSettings);
router.delete('/:id', deleteSettings);
// Additional routes can be added for updating settings

module.exports = router;
