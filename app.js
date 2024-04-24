const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const path = require('path');
const mongoose = require('mongoose');
const crypto = require('crypto');
const passportConfig = require('./passport-config');
const User = require('./models/User');

const app = express();

const generateSessionSecret = () => {
    return crypto.randomBytes(64).toString('hex');
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: generateSessionSecret(),
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error: Wait, Let me check ');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
