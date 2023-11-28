// Project\server\routes\user.js
const express = require('express');


const router = express.Router();
const { createUser, userLogin } = require('../controllers/user');


// Apply rate limiting to specific routes
router.post("/signup", createUser);

router.post("/login", (req, res) => {
    console.log('Login Request Body:', req.body);
    // ... rest of the code
    userLogin(req, res);
});

module.exports = router;