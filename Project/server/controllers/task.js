// Project\server\controllers\task.js
const Task = require('../models/task');

exports.createTask = async (req, res) => {
    try {
        console.log('Creating task...', req.body); // Add this log
        const { title, completed } = req.body;
        let userId;

        // Check if the user ID is in the request body
        if (req.body.userId) {
            userId = req.body.userId;
        } else if (req.user && req.user._id) { // Otherwise, check if it's in req.user
            userId = req.user._id;
        } else {
            throw new Error('User ID not found');
        }

        const newTask = new Task({ title, completed, userId });
        await newTask.save();

        console.log('Task created:', newTask); // Add this log
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find(); // Use Task for retrieving tasks
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id); // Use Task for finding the task
    task.completed = req.body.completed;
    task.description = req.body.description;
    task.title = req.body.title;
    await task.save(); // Save the updated task
    res.json(task);
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndRemove(id); // Use Task for finding and removing the task
        res.status(204).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.completedTask = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Updating task with ID:', id);

        const task = await Task.findById(id);
        if (!task) {
            console.log('Task not found.');
            return res.status(404).json({ error: 'Task not found' });
        }

        task.completed = true;
        console.log('About to save the updated task with ID:', id);

        await task.save();

        console.log('Task with ID:', id, 'updated successfully.');
        res.json(task);

    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: error.message });
    }
};