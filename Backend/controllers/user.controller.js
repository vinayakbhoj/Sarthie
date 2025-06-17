const userModel = require('../models/user.model');
const userServices = require('../services/user.services');
const {validationResult} = require('express-validator');
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullname, email, password} = req.body;
    
    
    const hashPassword = await userModel.hashPassword(password);
    
    
    const user = await userServices.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({user,token});
        
    
}

module.exports.loginUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    
    
    const user = await userModel.findOne({email}).select('+password');
    if (!user) {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({user, token});
}

module.exports.getUserProfile = async (req, res, next) => {
    
    res.status(200).json({user: req.user});
    
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await BlacklistToken.create({ token });
    res.status(200).json({message: 'Logout successful'});
}