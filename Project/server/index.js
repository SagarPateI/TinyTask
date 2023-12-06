//Project/server/index.js

require('dotenv').config();
require('./models/database');
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 8000;


const User = require('./models/user');
const TaskRouter = require('./routes/tasks'); // Importing task routes
const EventRouter = require('./routes/events'); // Importing event routes
const SettingsRouter = require('./routes/settings'); // Importing settings routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// const auth = require('./middleware/auth');

const PORT = 8000;
const HOST = '0.0.0.0'; // Listen on all network interfaces

// User routes
const authRouter = require('./routes/user');
app.use('/auth', authRouter);

// Task routes
app.use('/tasks', TaskRouter); // Using task routes

// Event routes
app.use('/events', EventRouter); // Using event routes

// Settings routes
app.use('/settings', SettingsRouter); // Using settings routes

// http.listen(port, () => {
//     console.log('Server is running on port:', port);
// });

app.listen(PORT, HOST, () => {
    console.log(`Server is running on port: ${PORT}`);
});

