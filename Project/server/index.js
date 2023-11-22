require('dotenv').config();
require('./models/database');
const cors = require("cors");
const express = require('express');
const User = require('./models/user');
const app = express();
const authRouter = require('./routes/user');
const tasksRouter = require('./routes/tasks'); // Import the tasks router
const http = require("http").createServer(app);
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(authRouter);
app.use('/tasks', tasksRouter); // Use the tasks router for '/tasks' endpoints

//listen = express function
http.listen(port, () => {
    console.log('Listening at http://localhost:', port);
});
