const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const SeekingRegister = require('../models/SeekingUser');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            SeekingRegister.findOne({ email })
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

    passport.serializeUser((SeekingRegister, done) => {
        done(null, SeekingRegister.id)
    })

    passport.deserializeUser((id, done) => {
        SeekingRegister.findById(id, (err, user) => {
            done(err, user)
            
        })
    })
}
