const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const ResttlingRegister = require('../models/ResttlingUser');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            ResttlingRegister.findOne({ email })
                .then(user => {
                    // Match user
                    if (!user) {
                        return done(null, false, {message: 'That email is not registered'})
                    }
                    // Match Password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) console.log(err);
                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, {message: 'Password incorrect'})
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    )

    passport.serializeUser((ResttlingRegister, done) => {
        done(null, ResttlingRegister.id)
    })

    passport.deserializeUser((id, done) => {
        ResttlingRegister.findById(id, (err, user) => {
            done(err, user)
            
        })
    })
}
