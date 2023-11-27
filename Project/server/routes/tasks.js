const express = require('express');

const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/task');


router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;