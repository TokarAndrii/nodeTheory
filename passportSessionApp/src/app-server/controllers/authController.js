module.exports = function authMiddleware() {

    return function (req, res, next) {

        if (req.isAuthenticated()) {
            return next()
        }

        else {
            res.redirect('/login')
        }
    }
}