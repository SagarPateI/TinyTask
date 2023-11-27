const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/task');

router.get('/', auth, getTasks);
router.post('/', auth,  createTask);
router.put('/:id', auth,  updateTask);
router.delete('/:id', auth, deleteTask);


module.exports = router;