const express = require('express');
const session = require('express-session');
let passport = require('passport');
let crypto = require('crypto');
let routes = require('./routes');
const connection = require('./config/database');

const MongoStore = require('connect-mongo')(session);

require('./config/passport');

/**
 * -------------- GENERAL SETUP ----------------
 */

 // accses to variables set n the .env file via 'process.env.VARIABLE_NAME'\
 require('dotenv').config();

 // create the express app
 const app = express();

 app.use(express.json());
 app.use(express.urlencoded({extended: true}));

 /**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions'});

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
  }
}));

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------- ROUTES ----------------
 */

// imports all of the routes from ./routes/index.js
app.use(routes);

/**
 * -------------- SERVER ----------------
 */

 const port = process.env.PORT || 3000;
 app.listen(port, () => console.log(`Listening on port ${port}...`));
