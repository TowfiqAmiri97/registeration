const express = require('express');
const User = require('../models/SeekingUser')
const router = express.Router();
const { ensuredAuthenticated } = require('../config/auth');
const formidable = require('formidable');

// Welcome
router.get('/', (req, res) => {
    res.render('welcome');
})

// Dashboard
router.get('/dashboard', ensuredAuthenticated, (req, res) => {
        res.render('dashboard');
})


// Seeking Register Form
router.get('/user_form/seekingRegister/form', ensuredAuthenticated, (req, res) => {
    res.render('indexForm');
})

// 

// Resttling Register Form
router.get('/user_form/resttlingRegister/form', ensuredAuthenticated, (req, res) => {
    res.render('indexForm');
})



module.exports = router;

// export default  router ;
