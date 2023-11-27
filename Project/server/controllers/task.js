const Task = require('../models/task');
const User = require('../models/user');


exports.getTasks = async (req, res) => {
    const userId =  req.params.id;
    console.log("User id", userId);
    try {
        const tasks = await Task.find({user: userId});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const userExists = await User.findOne({email});
        const newTask = await new Task({title, description, completed: false, user: userExists}).save();
        userExists.task.push(newTask);
        await userExists.save();
        res.status(200).json({ message: "Todo Added Successfully", newTask});
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req,res) => {
    const { title, description } = req.body;
    const taskId = req.params.id;

    try {
        const userExists = await User.findOne({email});

        if(!userExists) return res.status(401).json({ message: "You're not allowed to perform this operation" });

        const tasks = await Task.findByIdAndUpdate(taskId, {title, description});
        await tasks.save();

        res.status(200).json({ message: "Task Updated Successfully", tasks });

    } catch (error) {
        res.status(500).json({ message: "Internal server Error", error });
    }
}


exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const userExists = await User.findOne({email}, {$pull: {tasks: taskId}});   
        const deleteTask = await Task.findByIdAndDelete(taskId);
        res.json({ message: 'Task deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Additional controller methods like updateTask can also be defined here
