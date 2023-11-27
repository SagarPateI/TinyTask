const express = require('express');
const router = express.Router();
const { createTask, getTasks, deleteTask } = require('../controllers/task');

router.post('/', createTask);
router.get('/', getTasks);
router.delete('/:id', deleteTask);
// Additional routes can be added for updating tasks

module.exports = router;
