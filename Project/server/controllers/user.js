/*
    this files has important components related to user information in the database

        - checks email in db when a new user tries to register before saving so there are no duplicates
        - if no duplicate email is found, user's name, email, and password are stored in db
        -when user tries to login, request is sent to db for email and password validaion

*/

const User = require('../models/user');
const jwt = require('jsonwebtoken');


//handles the creation of new users
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

        //searching if the email has already been used
        const isNewUser = await User.isEmailInUse(email);
        if (!isNewUser) {
            return res.json({
                success: false,
                message: 'Email is taken',

            });
        }

        try {

            //saves user sign-up information to the database 
            const user = await new User({
                name,
                email,
                password,
            });

            await user.save();

        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
};

//handles user logins 
exports.userLogin = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {

        return res.json({
            success: false, message: 'user not found with given email'
        });
    }

    const passwordMatch = await user.comparePassword(password)
    if (!passwordMatch) {
        return res.json({
            success: false, message: 'email/password is incorrect'
        });
    }

    //SIGNING USER ID WITH SPECIAL TOKEN IF THEY LOGIN PROPERLY
    const token = jwt.sign({ userId: user._id, userName: user.name }, process.env.JWT_TOKEN, {
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
