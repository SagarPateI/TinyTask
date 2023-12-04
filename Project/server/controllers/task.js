// Project\server\controllers\task.js
const taskModel = require('../models/task');

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id; // Assuming auth middleware sets req.user with user information

        const newTask = new Task({ title, description, userId });
        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const task = await taskModel.findById(id);
    task.completed = req.body.completed;
    task.description = req.body.description
    task.title = req.body.title;
    res.json(task);
}

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskModel.findByIdAndRemove(id);
        res.status(204).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.completedTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskModel.findById(id);
        task.completed = !task.completed;
        task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Additional controller methods like updateTask can also be defined here
