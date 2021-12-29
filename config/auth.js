module.exports = {
    ensuredAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash('error_msg', 'Please log in to the system')
        res.redirect('/users/login')
    }
}