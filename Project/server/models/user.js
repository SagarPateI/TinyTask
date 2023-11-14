const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


//mongoose schema

const userSchema = new mongoose.Schema({
    
    name: {

        type: String,
        trim: true,
        required: true,

    },

    email: {
        
        type: String,
        trim: true,
        required: true,
        unique: true,

    },

    password: {
        type: String,
        required: true, 
        min: 8,
        max: 64,
    },

    avatar: {
        type: Buffer,
    },

});

//running function before saving user inside DB; 
//function hashes password
userSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hash) => {
            if(err) return next(err);

            this.password = hash;
            next();
        });
    }
});


//checking hashed password from userSchema

userSchema.methods.comparePassword = async function (password) {
    if (!password) throw new Error('Password is missing, can not compare');

    try {
        const result = await bcrypt.compare (password, this.password);
        return result;
    } catch (error) {
        console.log('Error while comparing password', error.message);
    }
}
;
/*
isThisEmailInUse method checks if email is already in database 
*/
userSchema.statics.isEmailInUse = async function(email) {
    
    //error if no email is provided
    if (!email) throw new Error('Invalid Email')

    try {

        //'this' is referring to the current User; checking if email has already been used
        const user = await this.findOne({email})
        if (user) return false

        return true;
    } catch (error) {
        console.log('isEmailInUse method error', error.message)
        return false
    }
}


module.exports = mongoose.model('User', userSchema);