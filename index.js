const express = require ('express');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const key = require('./config/keys');
const cookeiSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');


const app = express();

app.use(
    cookeiSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [key.cookeiKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(key.mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    console.log(err)
});

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);