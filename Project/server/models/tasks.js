const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Title required"],
        trim: true
    },

    description: {
        type: String
    },

    completed: {
        type: Boolean,
        default: false
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("tasks", tasksSchema);