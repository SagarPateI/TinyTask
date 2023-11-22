require('dotenv').config();
require('./models/database');
const cors = require("cors");
const express = require('express');
const User = require('./models/user');
const app = express();
const authRouter = require('./routes/user');
const tasksRouter = require('./routes/tasks'); // Import the tasks router
const http = require("http").createServer(app);
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(express.json());
app.use(cors());

// User routes
const authRouter = require('./routes/user');
app.use('/auth', authRouter);

// Task routes
const taskRouter = require('./routes/tasks');
app.use('/tasks', taskRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//app.use(authRouter);

//listen = express function
http.listen(port, () => {
    console.log('Listening at http://localhost:', port);
});
