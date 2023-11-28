const express = require('express');


const router = express.Router();
const { createUser, userLogin, getUsers } = require('../controllers/user');


// Apply rate limiting to specific routes
router.post("/signup", createUser);

router.post("/login", userLogin);

router.get("/users", getUsers);

module.exports = router;