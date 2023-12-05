// Project\server\controllers\task.js


const taskModel = require('../models/task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title} = req.body;
        const task = new taskModel({ title, completed: false });
        const newTask = await task.save();
        res.json(newTask);
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