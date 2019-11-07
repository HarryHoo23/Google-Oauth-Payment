const passport = require('passport');

module.exports = app => {
    app.get('/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
        }) 
    );

    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req,res) => {
        req.logout();
        res.send("you are logout")
        res.send(req.user);
    });

    //req means incoming request, res means outgoing result
    app.get('/api/currentuser', (req, res) => {
        res.send(req.user);
    });
};

