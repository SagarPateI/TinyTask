
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
        const { title, completed } = req.body;
        const newTask = new taskModel({ title, completed: false });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateTask = async (req,res) => {
    const{id} = req.params;
    const task = await taskModel.findById(id);
    task.completed = req.body.completed;
    task.title = req.body.title;
    res.json(task);
}
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskModel.findById(id);
        await task.remove();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Additional controller methods like updateTask can also be defined here
