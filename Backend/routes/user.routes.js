const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const {registerUser, loginUser, getUserProfile, logoutUser} = require('../controllers/user.controller');
const {authUser} = require('../middleware/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({ min: 2 }).withMessage('First name at least 2 character required'),
    body('password').isLength({ min: 6 }).withMessage('Password at least 6 character required'),
], registerUser);    

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password at least 6 character required'),

], loginUser)

router.get('/profile',authUser, getUserProfile)
router.get('/logout', authUser, logoutUser);

module.exports = router;