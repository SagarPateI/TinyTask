/*
    this files has important components related to user information in the database

        - checks email in db when a new user tries to register before saving so there are no duplicates
        - if no duplicate email is found, user's name, email, and password are stored in db
        -when user tries to login, request is sent to db for email and password validaion


        1. Validates input
        2. checks for duplicate emails on signup
        3. saves new users to DB
        4. on login, gets user from DB
        5. compares login pw to hashed pw
        6. sends back authentication tokens on success

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
            const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
                expiresIn: "1h",
            });

            const { password: userPassword, ...rest } = user._doc;

            //sends user a token as response 
            return res.json({
                token,
                user: rest,
            });
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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
        expiresIn: "7d",
    });

    user.password = undefined;
    user.token = undefined;
    res.json({ user, token });
}

