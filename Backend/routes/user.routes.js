const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const {registerUser, loginUser} = require('../controllers/user.controller');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({ min: 2 }).withMessage('First name at least 2 character required'),
    body('password').isLength({ min: 6 }).withMessage('Password at least 6 character required'),
], registerUser);    

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password at least 6 character required'),

], loginUser)


module.exports = router;