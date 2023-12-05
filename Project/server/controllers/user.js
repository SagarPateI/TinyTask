// Project\server\controllers\user.js
/*
    this files has important components related to user information in the database

        - checks email in db when a new user tries to register before saving so there are no duplicates
        - if no duplicate email is found, user's name, email, and password are stored in db
        -when user tries to login, request is sent to db for email and password validaion

*/

const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Handles the creation of new users
exports.createUser = async (req, res) => {
    console.log('User hit sign up button');

    try {
        const { name, email, password } = req.body;

        if (!name) {
            return res.json({
                error: "Name is required"
            });
        }

        if (!email) {
            return res.json({
                error: "Email is required"
            });
        }

        if (!password || password.length < 8) {
            return res.json({
                error: "Password is required and should be at least 8 characters long"
            });
        }

        // Searching if the email has already been used
        const isNewUser = await User.isEmailInUse(email);
        if (!isNewUser) {
            return res.json({
                success: false,
                message: 'Email is taken',
            });
        }

        try {
            // Saves user sign-up information to the database
            const user = await new User({
                name,
                email,
                password,
            });

            await user.save();
        } catch (err) {
            console.log('Error during user creation:', err);
            return res.status(500).json({
                success: false,
                message: 'Internal server error during user creation',
            });
        }
    } catch (err) {
        console.log('Error in createUser:', err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// Handles user logins
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found with the given email');
            return res.json({
                success: false,
                message: 'User not found with the given email',
            });
        }

        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) {
            console.log('Password does not match');
            return res.status(401).json({
                success: false,
                message: 'Email/password is incorrect',
            });
        }

        // Signing USER ID WITH SPECIAL TOKEN IF THEY LOG IN PROPERLY
        const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
            expiresIn: "7d",
        });
    //SIGNING USER ID WITH SPECIAL TOKEN IF THEY LOGIN PROPERLY
    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_TOKEN, {
        expiresIn: "365d",
    });

    const { password: userPassword, ...rest } = user._doc;
    //sends user a token as response 
    return res.json({
        token,
        user: rest,
    })
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(201).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Unable to fetch user data' });
    }
}
