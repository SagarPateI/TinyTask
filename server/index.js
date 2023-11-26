
require('dotenv').config();
require('./models/database');
const cors = require("cors");
const express = require('express');
const jwt = require('jsonwebtoken');
const authRoutes = require( "./routes/auth");

const app = express();
const http = require("http").createServer(app);
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(authRoutes);

//listen = express function
http.listen(port, () => {
    console.log('Listening at http://localhost:', port);
});