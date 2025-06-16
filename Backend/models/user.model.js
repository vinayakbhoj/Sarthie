const mongoose = require('mongoose');
const { emit } = require('../app');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {

        firstname: {
            type: String,
            required: true,
            minlength: [2, 'First name must be at least 2 characters long'],
        },
        lastname: {
            type: String,
            minlength: [2, 'Last name must be at least 2 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from queries by default
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    socketId: {
        type: String,
    },
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
    });
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (error) {
        throw new Error('Password comparison failed');
    }
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
// This code defines a Mongoose schema for a User model with fields for fullname, email, password, and socketId.