const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask, completedTask } = require('../controllers/task');

router.get('/',  getTasks);
router.post('/', createTask);
router.patch('/:id',  updateTask);
router.delete('/:id',  deleteTask);
router.put('/:id', completedTask );


module.exports = router;