const express = require('express');


const router = express.Router();
const { createUser, userLogin } = require('../controllers/user');


// Apply rate limiting to specific routes
router.post("/signup", createUser);

router.post("/login", userLogin);

module.exports = router;