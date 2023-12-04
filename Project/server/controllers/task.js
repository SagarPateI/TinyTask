// Project\server\controllers\task.js
const Task = require('../models/task');

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user._id; // Access user ID from req.user

        const newTask = new Task({ title, description, userId });
        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
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
        const task = await Task.findById(id); // Use Task for finding the task
        task.completed = !task.completed;
        await task.save(); // Save the updated task
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};