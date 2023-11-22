require('dotenv').config();
require('./models/database');
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 8000;

const User = require('./models/user');
const TaskRouter = require('./routes/tasks'); // Importing task routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// User routes
const authRouter = require('./routes/user');
app.use('/auth', authRouter);

// Task routes
app.use('/tasks', TaskRouter); // Using task routes

http.listen(port, () => {
    console.log('Server is running on port:', port);
});
