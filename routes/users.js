const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const { v4: uuid } = require('uuid')

const SeekingRegister = require('../models/SeekingUser');
const ResttlingRegister = require('../models/ResttlingUser');


const router = express.Router();

// Express session
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secret: true
    }
}))

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/seekingRegister', (req, res) => {
    res.render('register', {path: '/users/seekingRegister'})
})


router.get('/resttlingRegister', (req, res) => {
    res.render('register', {path: '/users/resttlingRegister'})
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard' )
})

let sessionData;

//  const oldNameImage = 'image.png';
// const splitImage = oldNameImage.split('.');
// const vid = uuid();
//         console.log("new Image name: ", vid+"."+splitImage[1]);
        

// Seeking registeration form
router.post('/seekingRegister', (req, res, next) => {
    const errors = [];
    sessionData = req.session;

    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        const image = files.image.size;
        
        const firstName = fields.firstName;
        const lastName = fields.lastName;
        const email = fields.email;
        sessionData.user_email = email;
        const password = fields.password;
        const password2  = fields.password2;
        const country  = fields.country;
        const state  = fields.state;
        const city  = fields.city;
        const phone  = fields.phone;
            
         req.body = {
            email: email,
            password: password
        }

    if (!firstName || !email || !password || !password2 || !image  ) {
        errors.push({ msg: 'Please fill in all fields' })
        }

    if (password.length < 5) {
        errors.push({ msg: 'Password should be at least 6 characters' })
    }
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' })
    }
    if (image == 0 ) {
        errors.push({ msg: 'You should choose an image' })
    }
    
    if (errors.length > 0) {
        res.render('register', {
            path: '/users/seekingRegister',
            errors,
            firstName,
            lastName,
            email,
            password,
            password2,
            country,
            state,
            city,
            image,
            phone
        })
    } else {
        // Validation passed
        SeekingRegister.findOne({ email })
            .then((user) => {
                if (user) {
                    // User exists
                    errors.push({ msg: 'Email already registered' })
                    res.render('register', {
                        path: '/users/seekingRegister',
                        errors,
                        firstName,
                        email,
                        password,
                        password2,
                        country,
                        state,
                        city,
                        image,
                        phone
                    })
                } else {
                    let oldpath = files.image.filepath;
                    let originalFilename = files.image.originalFilename;
                    let newNameImage = files.image.newFilename;
                    let extImageName = originalFilename.split('.');
                    let newName = newNameImage+"."+extImageName[1];

                    let newpath = path.join(__dirname, '../imageFolder/');
                    let newpathAndFile = newpath + newName;
                    fs.copyFile(oldpath, newpathAndFile, (err) => {
                        if (err) {
                            throw err;
                        }
                        console.log('File uploaded and moved!');
                    });
                    const newUser = new SeekingRegister({
                        firstName,
                        lastName,
                        email,
                        password,
                        country,
                        state,
                        city,
                        phone,
                        image
                    })
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;

                            newUser.password = hash;
                            newUser.save()
                                .then(user => {

                                    passport.authenticate('local', {
                                        successRedirect: res.render('indexForm', { 'email': sessionData.user_email, path: '/user_form/seekingRegister/form' }),
                                        failureRedirect: '/users/seekingRegister',
                                        failureFlash: true
                                    })(req, res, next);
                                })
                                .catch(err => console.log(err));
                        })
                    })
                    
                   
                }
            })
        }
    })

});


// Resttling registeration form
router.post('/resttlingRegister', (req, res, next) => {

    sessionData = req.session;
    const errors = [];
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        const image = files.image.size;
        const firstName = fields.firstName;
        const lastName = fields.lastName;
        const email = fields.email;
        sessionData.user_email = email;
        const password = fields.password;
        const password2  = fields.password2;
        const country  = fields.country;
        const state  = fields.state;
        const city  = fields.city;
        const phone  = fields.phone;
         
         req.body = {
            email: email,
            password: password
        }

    if (!firstName || !email || !password || !password2 || !image  ) {
        errors.push({ msg: 'Please fill in all fields' })
        }

    if (password.length < 5) {
        errors.push({ msg: 'Password should be at least 6 characters' })
    }
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' })
    }
    if (image == 0 ) {
        errors.push({ msg: 'You should choose an image' })
    }
    
    if (errors.length > 0) {
        res.render('register', {
            path: '/users/resttlingRegister',
            errors,
            firstName,
            lastName,
            email,
            password,
            password2,
            country,
            state,
            city,
            image,
            phone
        })
    } else {


        // Validation passed
        ResttlingRegister.findOne({ email })
            .then((user) => {
                if (user) {
                    // User exists
                    errors.push({ msg: 'Email already registered' })
                    res.render('register', {
                        path: '/users/resttlingRegister',
                        errors,
                        firstName,
                        email,
                        password,
                        password2,
                        country,
                        state,
                        city,
                        image,
                        phone
                    })
                } else {
                      
                    let oldpath = files.image.filepath;
                    let newpath = path.join(__dirname, '../imageFolder/');
                     
                        let originalFilename = files.image.originalFilename;
                        let newNameImage = files.image.newFilename;
                        let extImageName = originalFilename.split('.');
                        let newName = newNameImage+"."+extImageName[1];
                        let newpathAndFile = newpath + newName;

                        fs.copyFile(oldpath, newpathAndFile, (err) => {
                            if (err) {
                                throw err;
                            }
                            console.log('File uploaded and moved!');
                
                        });

                    const newUser = new ResttlingRegister({
                        firstName,
                        lastName,
                        email,
                        password,
                        country,
                        state,
                        city,
                        phone,
                        image
                    })

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;

                            newUser.password = hash;
                            newUser.save()
                            .then(user => {
                                passport.authenticate('local', {
                                        successRedirect: res.render('indexForm', { 'email': sessionData.user_email, path: '/user_form/resttlingRegister/form' }),
                                        failureRedirect: '/users/resttlingRegister',
                                        failureFlash: true
                                    })(req, res, next);
                                })
                                .catch(err => console.log(err));
                            })
                        })
                   
                   
                }
            })
        
        }
        
    })
});

router.post('/login', (req, res, next) => {
    sessionData = req.session;
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        const email = fields.email;
        sessionData.user_email = email;
    
        req.flash('email', sessionData.user_email)
        const password = fields.password;
        req.body = {
            email: email,
            password: password
        }
        passport.authenticate('local', {
            successRedirect: res.render('dashboard', { 'email': sessionData.user_email }),
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);
    })
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login')
})

module.exports = router;