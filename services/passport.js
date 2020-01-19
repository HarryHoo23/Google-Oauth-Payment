const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
    //user.id means the id in the mongoDB, the id that mongoDB automatically generated.
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
            
            if (existingUser) {
                //we already have the record with the given profile ID
                return done(null, existingUser);
            } else {
                //we create a new user now
                const user = await new User({
                        googleId: profile.id
                    }).save();
                done(null, user);
            }
        }
    )
);