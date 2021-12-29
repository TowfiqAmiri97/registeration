const express = require('express');
const expressLayout = require('express-ejs-layouts');
const http = require('http');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const  passport  = require('passport');

const MongoURI = require('./config/keys');
const ResttlingRegister = require('./models/ResttlingUser');
const SeekingRegister = require('./models/SeekingUser');

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 5000;

// connect to mongo
mongoose.connect(MongoURI, { useNewUrlParser: true })
.then(console.log('MongoDB is Connected... '))
.catch(err => console.log(err));


//  ejs  
app.use(expressLayout)
app.set('view engine', 'ejs')

// Bodyparser
app.use(express.urlencoded({ extended: true }))

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

require('./config/resttlingPassport')(passport)
require('./config/seekingPassport')(passport)
// Connect flash
app.use(flash())

// Global varible
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    
    next()
})

//  router
app.use('/', require('./routes/index') )
app.use('/users', require('./routes/users'))
app.use('/user_form', require('./routes/user_form'))
app.use('/list_form', require('./routes/formList'))


server.listen(port, () => {
    console.log("Server is running... ");
})